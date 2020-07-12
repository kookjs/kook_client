import React, { Fragment } from 'react';

function HideWrap(props) {
  const { hide } = props
  
  if(hide) return null

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}

export default HideWrap