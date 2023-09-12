import { AppBar, Toolbar, Box } from '@mui/material'
import React from 'react'
import NavBarLinks from '../../layouts/Landing/NavBarLinks'

const Header = () => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
            Website 
            <Box style={{marginLeft:'auto'}}>
            <NavBarLinks  /> 
            </Box>
        </Toolbar>
        </AppBar> 
    </div>
  )
}

export default Header
