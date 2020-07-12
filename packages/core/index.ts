// import React from 'react'
// import { render } from 'react-dom'
// import { BrowserRouter } from "react-router-dom";
// import * as _ from 'lodash'
import App from './App'
/*
 get Node.js global Variable
*/
export function getGlobalVariable(): any {
	return window;
}

/*
 Create new App from App constructor
*/
function _createApp(): App {
	const app = new App();
	return app;
}

/*
 Create new App and to the globalScope if not exists otherwise
 get existing app from globalScope 
*/
export function createApp(): App {
	const globalScope = getGlobalVariable();
	if (!globalScope.App) globalScope.App = _createApp();

	return globalScope.App;
}

export function getApp(): App {
	const globalScope = getGlobalVariable();
	return globalScope.App;
}

/*
 get Plugin Instance from App globalScope
*/
export function getPlugin<T>(c: new (...args: any) => T): T {
	const app = getApp();
	return app.getPlugin(c);
}

export * from './constants'
export * from './helper/KookErrorParser'
