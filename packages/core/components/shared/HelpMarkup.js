import React from 'react'

function HelpMarkup(props) { 
  const {text} = props
  // console.log(text)
  const html = {__html: text}
  return (
    <div dangerouslySetInnerHTML={html} />
  )
}

export default HelpMarkup