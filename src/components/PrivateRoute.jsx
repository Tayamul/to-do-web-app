import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../Auth'

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext)
    
    return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute