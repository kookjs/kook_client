import React, { Component } from "react";
import { getAppConfig } from '../../contants'
function Footer() {
	var d = new Date();
	var n = d.getFullYear();

	const appConfig = getAppConfig()

	return (
		<footer>
			<div className="text-center">
				{`Copyright © ${n} ${appConfig.appName}`}
			</div>
		</footer>
	);
}

export default Footer;