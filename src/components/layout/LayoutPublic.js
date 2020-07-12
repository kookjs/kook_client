import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from '../Common/Header'
import Footer from '../Common/Footer'

const qs = require('query-string');


function LayoutPublic(props) {
  const { className } = props
  const history = useHistory()

	/*
	 Auto Login or Login with UXM e.g. UXM Analytics
	 Test URL: http://localhost:6002/login?redirect=http://localhost:3000/login/&token=1
	*/
	const qparam = qs.parse(window.location.search);
  if(Sapp.Auth.check()) {
		let url = qparam.redirect || '/'	
		if(qparam.token) url = url + `?token=${Sapp.Auth.getToken()}`
		window.location.href = url
		return null
	}
  
	return (
		<div className={"layout " + className}>
			<Header />
			<div className="main">
				{props.children}
			</div>
			<Footer />
		</div>
	);

}

export default LayoutPublic