import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({credentials}) => {
  return (
    <>
        {
            credentials ?
                <Outlet/>//Renderizame el componente por el que se te consulto.
            :
                <Navigate to="/"/>
        }
    </>
  )
}

export default ProtectedRoutes