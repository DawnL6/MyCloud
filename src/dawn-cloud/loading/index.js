import React from 'react';
import {Icon} from 'antd';
import './index.css'
var Loading = React.createClass({
    render(){
        return(
            <div className="loading">
                <Icon type="loading" />
            </div>
        )
    }
});
export default Loading;
