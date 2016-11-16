import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import {Link} from 'react-router';
var Nav = React.createClass({
    render(){
        const {value} = this.props;
        let to = "" ;
        let nodes = value.map(function (o,i) {
            to = to + '/' + o;
            return(
                <Breadcrumb.Item key={i} style={{fontSize:"14px"}}>
                    <Link to={to}>
                        <Icon type="user" /> {o}
                    </Link>
                </Breadcrumb.Item>
            )
        });
        return(
           <div className="nav">
               <Breadcrumb>
                   <Breadcrumb.Item style={{fontSize:"14px"}}>
                       <Link to="/">
                           <Icon type="home" />Home
                       </Link>
                   </Breadcrumb.Item>
                   {nodes}
               </Breadcrumb>
           </div>
        )
    }
});
export default Nav