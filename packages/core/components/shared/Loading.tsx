import React, { useState, useImperativeHandle, forwardRef, Ref } from 'react';

export interface LoadingElement {
  show: () => void
  hide: () => void
}

function LoadingFunc(props: {overlay?: boolean, show?: boolean}, ref: Ref<LoadingElement>) {
  const { overlay=false, show=false } = props
  const [visible, setVisible] = useState(show)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    }
  }));
  
  if(!visible) return null

  return (
    <div className="LoadingComp">
      {overlay ? <div className="overlay"></div> : null}
      <div className="spinnerWrapper">
        <div className="spinner-border text-primary-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}



export const Loading = forwardRef(LoadingFunc);

// export default Loading
// export default LoadingFunc