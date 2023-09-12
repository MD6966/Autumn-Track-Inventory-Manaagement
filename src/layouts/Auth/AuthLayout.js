import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div>
      <AppBar postion='static'>
        <Toolbar>
            My Website 
        </Toolbar>
      </AppBar>
      <Outlet /> 
    </div>
  )
}

export default AuthLayout
