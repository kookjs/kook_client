import React from "react";
import { getAppConfig } from "../../contants";
export default function Footer() {
	var d = new Date();
	var n = d.getFullYear();

	const appConfig = getAppConfig();

	return (
		<footer>
			<div className="text-center">{`Copyright © ${n} ${appConfig.appName}`}</div>
		</footer>
	);
}