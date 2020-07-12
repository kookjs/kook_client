import React, { Fragment } from 'react';

import { getApp, getPlugin } from '@kookjs-client/core'
import Auth from '../'

interface Props { 
  children?: React.ReactChild
}

export default (props: Props) => {
  const auth = getPlugin(Auth)
  if(!auth.isUserLoggedIn()) return null

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}