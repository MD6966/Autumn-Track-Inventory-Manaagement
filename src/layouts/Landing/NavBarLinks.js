import { Button, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom/dist'
const StyledButton = styled(Button)(({theme})=> ({
  background: theme.palette.secondary.main,
  textTransform:'none',
  '&:hover': {
    background:"#f49b27",
    color:'#fff'
  }
}))

const StyledRegister = styled(Button)(({theme})=> ({
  borderColor: theme.palette.secondary.main,
  color:'#fff',
  marginLeft:'10px',
  textTransform:'none',
  '&:hover': {
    borderColor:"#f49b27",
  }
}))

const NavBarLinks = () => {
  return (
    <div>
      <StyledButton
      component={Link}
      to="/admin-login"
      >
        Login
      </StyledButton>
      <StyledRegister variant='outlined'>
        Register
      </StyledRegister>
      {/* <Button variant='contained'
      component={Link}
      to='/home'
      > Home</Button>
       <Button variant='contained'
      component={Link}
      to='/auth/login'
      > Login</Button>
       <Button variant='contained'
      component={Link}
      to='auth/register'
      > SignUp</Button> */}
    </div>
  )
}

export default NavBarLinks
