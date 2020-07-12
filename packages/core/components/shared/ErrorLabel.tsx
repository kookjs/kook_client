import React from 'react'

export default function ErrorLabel(props) {
  const { field, message = 'Field required.' } = props
  if (!field) return null

  return (
    <div className="error">{message}</div>
  )
}