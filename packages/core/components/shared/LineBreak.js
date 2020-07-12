import React, { Fragment } from 'react';

function LineBreak(props) {
  const { text } = props
  
  if(!text) return null

  return text.split('\n').map(function(item, key) {
      return (
        <p key={key}>
          {item}
        </p>
      )
  })
}

export default LineBreak