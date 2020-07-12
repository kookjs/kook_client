import React, { Fragment, forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react';

import Portal from './Portal'
function Modal(props, ref) {
  const { children, classDialog } = props
  // const {visible, setVisible} = useState(false)

  const modalEl = useRef(null);

  // useEffect(() => {
  //   // jQuery(modalEl.current).modal('show')
  //   // console.log(modalEl)
  // }, [])

  useImperativeHandle(ref, () => ({
    get: () => {
      return jQuery(modalEl.current)
    },
    show: () => {
      jQuery(modalEl.current).modal('show')
    },
    hide: () => {
      jQuery(modalEl.current).modal('hide')
    }
  }));
  
  // if(!show) return null

  return (
    <Fragment>
      <Portal id="modalPortal">
        
        <div className="modal fade ModalComp" tabIndex="-1" role="dialog" ref={modalEl}>
        <div className={"modal-dialog " + classDialog} role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
      </Portal>
    </Fragment>
  );
}


Modal = forwardRef(Modal);


export default Modal