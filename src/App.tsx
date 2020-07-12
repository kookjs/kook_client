import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import * as mobx from 'mobx';

import _ from 'lodash'

import LayoutDefault, { LayoutProps } from './components/common/LayoutDefault'
import LayoutPrivate from './components/common/LayoutPrivate'
import NoMatch from './components/common/NoMatch'

import { routeStore } from '@kookjs-client/route/store'

// const Layouts = {
//   LayoutDefault,
//   // LayoutPrint,
//   // // LayoutJoinProsper,
//   // LayoutPrivate,
//   // LayoutPublic
// }

interface LayoutRenderer {
  ChildComponent: React.ComponentType;
  layoutProps?: LayoutProps
}

function LayoutRenderer(props: LayoutRenderer) {
  const { layoutProps={}, ChildComponent } = props
  
  return (
    <LayoutPrivate {...layoutProps}>
      <ChildComponent />
    </LayoutPrivate>
  )
}

const App = () => {
  // const history = useHistory()
  let routes = _.sortBy(mobx.toJS(routeStore.routes), ['priority']);
  // console.log(routes)

  return (
      <Switch>
          {routes.map((route,i) => {
              const {path, exact, component, layoutCssClass} = route
              return (
                  <Route key={location.pathname} path={path} exact={exact} render={(props) => {
                    return <LayoutRenderer 
                        // layoutComponentName={layout}
                        layoutProps={
                          {
                            className: layoutCssClass
                          }
                        }
                        ChildComponent={component}
                      />
                  } } />
              )
          })}
          <Route render={(props) => <NoMatch /> } />
      </Switch>
  )
}

export default App