import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { increment } from './actions/counter'

export const CounterComponent = () => {
  const dispatch = useDispatch()
  
  const counter = useSelector(state => state.counter)

  useEffect(() => {
    dispatch(increment())
  }, [])
  return <div>{counter}</div>
}