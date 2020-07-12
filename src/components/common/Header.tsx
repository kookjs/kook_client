import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import ProfileDropdown from './ProfileDropdown'
import { Helmet } from "react-helmet";
import ShowWrap from '@kookjs-client/core/components/shared/ShowWrap'
import { getAppConfig } from '../../contants'

import { getPlugin } from '@kookjs-client/core'
import Auth from '@kookjs-client/auth'

import Authenticate from '@kookjs-client/auth/components/Authenticate'

function Header() {
	const appConfig = getAppConfig()
	const auth = getPlugin(Auth)
	
	return (
		<Fragment>
			<Helmet>
				<meta charSet="utf-8" />
				<link rel="canonical" href={appConfig.domain} />
				{/* <link rel="shortcut icon" href={APP_CONFIG.domain + `/images/favicon.ico`} /> */}
			</Helmet>
			<header className="headerUser">
				<div className="headerUser_inner">
					<div className="left">
						<Link to={'/'} key="nav4"><img className="imgLogo" src={APP_CONFIG.logoUrl} /></Link>
					</div>
					<div className="right d-flex align-items-center">
						<Authenticate>
							<ProfileDropdown />
						</Authenticate>
					</div>
				</div>
			</header>
		</Fragment>
	);
}

export default Header