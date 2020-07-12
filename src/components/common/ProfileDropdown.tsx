import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { getPlugin } from '@kookjs-client/core'
import Auth from '@kookjs-client/auth'

import Authenticate from '@kookjs-client/auth/components/Authenticate'

function ProfileDropdown(props) {
	const auth = getPlugin(Auth)

	const history = useHistory()
	function logout(e) {
		e.preventDefault()
		auth.logout()
		history.push('/login')
	}



	return (
		<div className="dropdown">
			<span className="mr-2">You are logged in as {auth.getUserEmail()}</span>
			<a href="#" className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<i className="far fa-user"></i><i className="fa fa-chevron-down ml-1 fs-10"></i>
				
			</a>
			<div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">				
				<Link className="dropdown-item" to={'/change_password'}>Change Password</Link>
				<a className="dropdown-item" href="#" onClick={logout}>Sign Out</a>
			</div>
		</div>
	)

}

export default ProfileDropdown