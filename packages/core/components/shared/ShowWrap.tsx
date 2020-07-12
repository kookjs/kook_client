import React, { Fragment } from 'react';

interface ShowWrapProps {
  show: boolean;
  children?: any
}

function ShowWrap(props: ShowWrapProps) {
  const { show } = props
  
  if(!show) return null

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}

export default ShowWrap