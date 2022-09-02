import React from 'react'
import { Spinner } from 'react-bootstrap'

const Spiner = () => {
  return (
    <div style={{marginLeft:420}}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

export default Spiner;
