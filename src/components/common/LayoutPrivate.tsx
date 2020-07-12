import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from 'classnames'
import Header from './Header'
import Footer from './Footer'

import { Layout, Menu, Breadcrumb } from 'antd';
const {  Content, Sider } = Layout;

import Sidebar from './Sidebar'
import Authenticate from '@kookjs-client/auth/components/Authenticate'
import { getPlugin } from '@kookjs-client/core'
import Auth from '@kookjs-client/auth'

function LayoutPrivate(props: {className?: string, children: React.ReactChild}) {
  const { className } = props
	const history = useHistory()
	
	const auth = getPlugin(Auth)

	// if(!Sapp.Auth.check()) {
	// 	history.push('/login')
	// 	return null
	// }

	useEffect(() => {
		// Sapp.Auth.validateToken()
	})
	
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

export default LayoutPrivate