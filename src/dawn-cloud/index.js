import React from 'react';
import {Modal,message} from 'antd';
import FileList from './list-file';
import _ from 'underscore';
import Nav from './nav';
import Menu from './r-menu';
import Action from './action';
import {getFileList,newFolder,rename,remove,paste,cut} from './api'
import './index.css';
import Loading from './loading';
import {Router, Route, hashHistory} from 'react-router';



var R = React.createClass({
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="*" component={Cloud}/>
            </Router>
        )
    }
});
var Cloud = React.createClass({
    getInitialState(){
      return{
          file:[],
          path:[],
          loading:true,
          copyItem:{},
          cutItem:{},
          menu:{
              display:false,
              x:0,
              y:0
          },
          active:'',
          actionType:null,
          newValue:'',
          showAction:false
      }
    },
    render(){
        return(
            <div
                className="wrapper"
                onContextMenu={(e)=>e.preventDefault()}
                onMouseDown={this.mouseDown}
            >
                <div style={{display:this.state.loading?'none':'block'}}>
                    <Loading/>
                </div>
                <h3>步惊云</h3>
                <Nav
                    value={this.state.path}
                />
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    onPick={this.pickItem}
                    active={this.state.active}
                />
                <Menu
                    display={this.state.menu.display}
                    x={this.state.menu.x}
                    y={this.state.menu.y}

                    canNewFolder={true}
                    canRename={!!this.state.active}
                    canDelete={!!this.state.active}
                    canCopy={this.state.active}
                    canPaste={_.keys(this.state.copyItem).length || _.keys(this.state.cutItem).length}
                    canCut={this.state.active}

                    onAction={(type)=>this.handelAction(type)}
                />
                <Action
                    visible={this.state.showAction}
                    type={this.state.actionType}
                    newValue={this.state.newValue}
                    oldValue={this.state.active}
                    onChange={(e)=>this.setState({newValue:e.target.value})}
                    onCancel={(e)=>this.hideAction()}

                    onRename={this.handleRename}
                    onNewFolder={this.handleNewFolder}
                />
            </div>
        )
    },
    deleteFile(){
        let that=this;
        let path = this.state.path.join('/') +'/' + this.state.active;
        let query = {
            path:path
        };
        Modal.confirm({
            title:'是否想删除这个文件',
            content:'该操作很危险，请小心',
            onOk:function () {
                remove(query,function (res) {
                    var file = that.state.file;
                    var json=[];
                    for(let i=0;i<file.length;i++){
                        if(file[i].name != that.state.active){
                            json.push(file[i])
                        }
                    }
                    that.setState({
                        file:json
                    });
                    that.hideAction();
                    message.success('成功删除文件'+name);
                })
            },
            onCancel:function(){
                console.log("333")
            }
        })

    },
    handleRename(name){
        var path = this.state.path.join('/')+'/'+this.state.active;
        var query = {
            name:name,
            path:path
        };
        var that = this;
        rename(query,function (res) {
            var file = that.state.file;
            var json=[];
            file.map(function (obj) {
                if(obj.name==that.state.active){
                    json.push(res);
                }else{
                    json.push(obj)
                }
            });
            that.setState({
                file:json
            });
            that.hideAction();
            message.success('成功重命名文件'+name);
            that.pickItem(name);

        })
    },
    handleNewFolder(name){
        let that =this;
        let path = this.state.path.join('/');
        newFolder({
            name:name,
            path:path
        },function (res) {
            let file = that.state.file;
            file.push(res);
            that.setState({file:file});
            message.success('成功新建文件'+name);
            that.hideAction();
        })
    },
    handelAction(type){
        let that=this;
        this.hideMenu();
        this.setState({
            actionType:type
        });
        if(type==="newFolder"){
            let times=0;
            this.state.file.map(function (obj) {
                if(/^test/.test(obj.name)){
                    times++
                }
            });
            this.setState({
                newValue:'test'+times
            });
            this.showAction();
            this.setState({active:""})
        }
        if(type==="rename"){
            this.setState({
                newValue:this.state.active
            });
            this.showAction();
        }
        if(type == 'delete'){
            this.deleteFile();
        }
        if(type=="copy"){
            let file = this.state.file;
            let item = [];
            file.map(function (obj) {
                if(obj.name===that.state.active){
                   item=obj
                }
            });
            that.setState({
                copyItem:item,
                active:""
            });
            message.success('成功复制文件'+that.state.active);
        }
        if(type == 'cut'){
            let file = this.state.file;
            let that = this;
            let item = {};
            file.map(function (obj) {
                if(obj.name == that.state.active){
                    item = obj
                }
            });
            that.setState({
                cutItem:item,
                active:''
            });
            message.success('已经复制文件'+that.state.active+'到剪切板')
        }
        if(type == 'paste'){
            let isCopy = !!_.keys(this.state.copyItem).length;
            let isCut = !!_.keys(this.state.cutItem).length;
            if(isCopy){
                let item = this.state.copyItem;
                let file = this.state.file;
                let has = false;
                for(let i=0;i<file.length;i++){
                    if(file[i].name == item.name){
                        has = true
                    }
                }
                let query={
                    old_path:that.state.copyItem.path,
                    new_path:that.state.path.join('/')+'/'+that.state.copyItem.name
                };
                if(has){
                    query.new_path = that.state.path.join('/')+'/'+'-1'+that.state.copyItem.name
                }
                paste(query,function (res) {
                    file.push(res);
                    that.setState({
                        file:file
                    });
                    message.success('成功复制文件'+that.state.active)
                })
            }
            if(isCut){
                let item = this.state.cutItem;
                let file = this.state.file;
                let has = false;
                for(let i=0;i<file.length;i++){
                    if(file[i].name == item.name){
                        has = true
                    }
                }
                let query={
                    old_path:that.state.cutItem.path,
                    new_path:that.state.path.join('/')+'/'+that.state.cutItem.name
                };
                if(has){
                    query.new_path = that.state.path.join('/')+'/'+'-1'+that.state.cutItem.name
                }
                cut(query,function (res) {
                    file.push(res);
                    that.setState({
                        file:file
                    });
                    message.success('成功剪切文件'+that.state.active)
                })
            }

        }
    },
    pickItem(name){
        this.setState({active:name,newValue:name})
    },
    unPickItem(){
        this.setState({active:'',newValue:''})
    },
    showAction(){
        this.setState({showAction:true})
    },
    hideAction(){
        this.setState({showAction:false})
    },
    showMenu(e){
        this.setState({
            menu:{
                x:e.clientX,
                y:e.clientY,
                display:true
            }
        })
    },
    hideMenu(){
        this.setState({
            menu:{
                display:false,
            },
        })
    },
    mouseDown(e){
        if(e.button===2){
            this.showMenu(e)
        }else{
            this.hideMenu();
            this.unPickItem(name)
        }
    },
    getFile(path){
        var that =this;
        that.setState({
            loading:false
        });
        getFileList(path,function (res) {
            that.setState({
                file:res.file,
                path:res.path.split("/"),
                loading:true
            })
        },function (err) {
            console.log(err);
        })
    },
    componentDidMount(){
        const{params} = this.props;
        const{splat} = params;
        this.getFile(splat)
    },
    componentWillReceiveProps(nextProps){
        const{params} = nextProps;
        const{splat} = params;
        this.getFile(splat)
    }
});
export default R;