import React from 'react';
import './iconfont.css';
import './index.css';
import {hashHistory} from 'react-router';
const host = 'http://101.200.129.112:9527/static/';
function getIcon(ext,isFolder) {
    if(isFolder){
        return  <i className="iconfont">&#xe600;</i>
    }
    if(ext==".txt"){
        return  <i className="iconfont" style={{color:"#3b8cff"}}>&#xe73f;</i>
    }else if(ext==".swp"){
        return  <i className="iconfont">&#xe60b;</i>
    }else if(ext==".html"){
        return  <i className="iconfont" style={{color:"#8183f1"}}>&#xe7bb;</i>
    }else if(ext==".js"){
        return  <i className="iconfont" style={{color:"#47ccab"}}>&#xe605;</i>
    }else if(ext==".json"){
        return  <i className="iconfont" style={{color:"#5ec7fb"}}>&#xe6a6;</i>
    }else if(ext==".md"){
        return  <i className="iconfont">&#xe670;</i>
    }else if(ext==".xml"){
        return  <i className="iconfont">&#xe823;</i>
    }else{
        return  <i className="iconfont" style={{color:"#bebebe"}}>&#xe60b;</i>
    }
}
var FileItem = React.createClass({
    render(){
        const {name,path,ext,isFolder,onPick,active} = this.props;
        var type = getIcon(ext,isFolder);
        const act = name == active;
        return(
            <li
                className={act?"file-item active":"file-item"}
                onClick={this.handelClick}
                onMouseDown={this.mousedown}
            >
                {type}
                <p>{name}</p>
            </li>
        )
    },
    mousedown(e){
        const {name,path,ext,isFolder,onPick,active} = this.props;
        if(e.button == 2){
            onPick(name)
        }
    },
    handelClick(e){
        const {name,path,ext,isFolder,active,onPick} = this.props;
        if(isFolder){
            hashHistory.push(path)
        }else{
            window.open(host+path)
        }
    }
});
var FileList = React.createClass({
    render(){
        const {path,file,loading,onPick,active} = this.props;
        var nodes = file.map(function (obj) {
            return (
                <FileItem
                    name={obj.name}
                    path={obj.path}
                    key={path+"-"+obj.name}
                    ext={obj.ext}
                    isFolder={obj.isFolder}
                    onPick={onPick}
                    active={active}
                />
            )
        });
        return(
            <div className="file-content">
                <loading/>
                <ul className="file-list">
                    {nodes}
                </ul>
            </div>
        )
    }
});
export default FileList;
