import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

const { Sider } = Layout;
const { SubMenu } = Menu;

import { Link, useHistory } from "react-router-dom";

export default function Sidebar(props) {
  const { className } = props
  const [collapsed, setCollapsed] = useState(false)

  const history = useHistory()

  const onCollapse = collapsedV => {
    console.log(collapsedV);
    setCollapsed(collapsedV)
  };

  const onClick = ({ key }) => {
    history.push(key)
  }

	return (
    <Sider  collapsed={collapsed} onCollapse={onCollapse}>
      {/* <div className="logoSidebar"><img className="imgLogo" src={APP_CONFIG.logoUrl} /></div> */}
      <Menu className="sidebarMenu" theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={onClick}>
       
        <Menu.Item key="/leads">
          <i className="far fa-user"></i>
          <span>Users</span>
        </Menu.Item>
        
        <Menu.Item key="/options">
          <i className="fa fa-cog"></i>
          <span>Options</span>
        </Menu.Item>
        
      </Menu>
    </Sider>
	);

}