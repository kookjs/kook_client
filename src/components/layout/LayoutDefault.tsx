import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from 'classnames'
import Header from '../common/Header'
import Footer from '../common/Footer'

import { Layout, Menu, Breadcrumb } from 'antd';
const {  Content, Sider } = Layout;

import Sidebar from '../common/Sidebar'
import Authenticate from '@kookjs-client/auth/components/Authenticate'
import { getPlugin } from '@kookjs-client/core'
import Auth from '@kookjs-client/auth'
import { LayoutProps } from '../../types'

export default (props: LayoutProps) => {
  const { className } = props

	const auth = getPlugin(Auth)

	const cssClass = classNames(className, {'isLoggedIn' : auth.isUserLoggedIn()} )

	return (
		<div id="layout" className={cssClass}>
			<Header />
			<Layout className="main">
				<Authenticate>
					<Sidebar />
				</Authenticate>
				<Layout>
					<Content style={{ margin: '0 16px' }}>
						<div className="content-inner">
								{props.children}
						</div>
					</Content>
				</Layout>
			</Layout>
			<Footer />
		</div>
	);
}