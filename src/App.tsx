import React from "react";
import { Route, Switch } from "react-router-dom";
import * as mobx from "mobx";
import _ from "lodash";

import { routeStore } from "@kookjs-client/route/store";
import NoMatch from "./components/common/NoMatch";
import LayoutContainer from "./LayoutContainer";

const App = () => {
	let routes = _.sortBy(mobx.toJS(routeStore.routes), ["priority"]);
	// console.log(routes)
	return (
		<Switch>
			{routes.map((route, i) => {
				const { path, exact, component, layoutCssClass } = route;
				return (
					<Route
						key={location.pathname}
						path={path}
						exact={exact}
						render={(props) => {
							return (
								<LayoutContainer
									ChildComponent={component}
									authenticate={route.authenticate}
									roles={route.roles}
									capabilites={route.capabilites}
									title={route.title}
									layoutName={route.layoutName}
									layoutProps={{
										className: layoutCssClass,
									}}
								/>
							);
						}}
					/>
				);
			})}
			<Route render={(props) => <NoMatch />} />
		</Switch>
	);
};

export default App;