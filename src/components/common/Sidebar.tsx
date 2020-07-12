import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import { Link, useHistory } from "react-router-dom";

function Sidebar(props) {
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

export default Sidebar