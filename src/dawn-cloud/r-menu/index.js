import React from 'react';
import './index.css'
var Menu = React.createClass({
    render(){
        const {display,x,y,canNewFolder,canRename,canDelete,canCopy,canPaste,canCut} = this.props;
        return(
            <ul
                className="menu"
                style={{display:display ? 'block' : 'none',
                    left:x+'px',top:y+'px'}}
                onClick={this.handleClick}
            >
                <li style={{display:this.getShow(canNewFolder)}} className="items" onMouseDown={(e)=>this.mousedown(e,'newFolder')}>新建文件夹</li>
                <li style={{display:this.getShow(canRename)}} className="items" onMouseDown={(e)=>this.mousedown(e,'rename')}>重命名</li>
                <li style={{display:this.getShow(canDelete)}} className="items" onMouseDown={(e)=>this.mousedown(e,'delete')}>删除</li>
                <li style={{display:this.getShow(canCopy)}} className="items" onMouseDown={(e)=>this.mousedown(e,'copy')}>复制</li>
                <li style={{display:this.getShow(canPaste)}} className="items" onMouseDown={(e)=>this.mousedown(e,'paste')}>粘贴</li>
                <li style={{display:this.getShow(canCut)}} className="items" onMouseDown={(e)=>this.mousedown(e,'cut')}>剪贴</li>
            </ul>
        )
    },
    getShow(bool){
        if(bool){
            return 'block'
        }
        return 'none'
    },
    mousedown(e,type){
        const {onAction}=this.props;
        e.preventDefault();
        e.stopPropagation();
        onAction(type);

    }
});
export default Menu;