import React from 'react';
import { useHistory } from "react-router-dom";
// import * as mobx from 'mobx';
// import dotObject from '@khanakiajs/dot-object'
import _ from 'lodash'
import { Helmet } from "react-helmet";

import { LayoutContainerProps } from './types'

// import LayoutDefault, { LayoutProps } from './components/common/LayoutDefault'
import { getPlugin } from '@kookjs-client/core'
import Auth from '@kookjs-client/auth'
import LayoutDefault from './components/layout/LayoutDefault'
import LayoutRaw from './components/layout/LayoutRaw'
import { getAppConfig } from './contants'

const Layouts = {
  default: LayoutDefault,
  raw: LayoutRaw
}

export default (props: LayoutContainerProps) => {
  const appConfig = getAppConfig()

  const { title=appConfig.siteTitle, layoutName='default', authenticate=false, roles=[], capabilites=[], layoutProps, ChildComponent } = props
  const auth = getPlugin(Auth)
	const history = useHistory()
  
  console.log(authenticate)
  if(authenticate && !auth.isUserLoggedIn()) {
    history.push('/login')
  }
  // const authenticate = dotObject.get(layoutProps, 'name', 'default')

  const LayoutComp = Layouts[layoutName]
  // console.log(layoutName)

  
  return (
    <React.Fragment>
      <Helmet>
				<meta charSet="utf-8" />
				<link rel="canonical" href={appConfig.domain} />
        <title>{title}</title>
				{/* <link rel="shortcut icon" href={APP_CONFIG.domain + `/images/favicon.ico`} /> */}
			</Helmet>
      <LayoutComp {...layoutProps}>
        <ChildComponent />
      </LayoutComp>
    </React.Fragment>
  )
}