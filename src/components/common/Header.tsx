import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

// import { getPlugin } from '@kookjs-client/core'
// import Auth from '@kookjs-client/auth'
import Authenticate from '@kookjs-client/auth/components/Authenticate'
// import { getAppConfig } from '../../contants'
import ProfileDropdown from './ProfileDropdown'

function Header() {
	// const appConfig = getAppConfig()
	// const auth = getPlugin(Auth)
	
	return (
		<Fragment>
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