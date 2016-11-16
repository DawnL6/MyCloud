import React from 'react';
import {Icon,Modal,Input} from 'antd';


var Action = React.createClass({
    render(){
        const {visible,newValue,onChange,onCancel,type,onRename,onNewFolder} =this.props;
        var title = this.getTitle();
        var onOK = this.getOk()
        return(
            <div>
                <Modal
                    title={title}
                    visible={visible}
                    onCancel={onCancel}
                    onOk={(e)=>onOK(newValue)}
                >
                    <Input value={newValue} onChange={onChange}/>
                </Modal>

            </div>
        )
    },
    getOk(){
        const {visible,newValue,onChange,onCancel,type,onRename,onNewFolder} =this.props;
        if(type==="newFolder"){
            return onNewFolder
        }
        if(type==="rename"){
            return onRename
        }
        return '未知操作';
    },
    getTitle(){
        const {type,oldValue} =this.props;
        if(type==="newFolder"){
            return '新建文件夹';
        }
        if(type==="rename"){
            return '给'+oldValue+'重命名';
        }
        return '未知操作';
    }
});
export default Action;