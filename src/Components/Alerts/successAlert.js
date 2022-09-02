import React from 'react'
import { Alert } from 'react-bootstrap'

const UserAlert = (props) => { 
  const bgcolor=props.color 
  return (
    <div>
      <Alert variant={bgcolor}>
      <div class="alert-alert-" role="alert">
       <span>{props.message}</span>
     </div>
     </Alert>
    </div>
  )
}
export default UserAlert;