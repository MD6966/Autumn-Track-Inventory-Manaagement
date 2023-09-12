import React from 'react'
import { Box, AppBar, Toolbar, styled, 
    Typography, Stack } from '@mui/material'
import AdminLoginForm from './AdminLoginForm'
import Page from '../../../components/page/page'
const StyledRoot = styled('div')(({theme})=> ({
    // backgroundImage: Gradients.Custom,
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
  }))
  const CenteredBox = styled(Box)(({theme})=> ({
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }))
  const StyledAppBar = styled(AppBar)(({theme})=> ({
    background:theme.palette.primary.main,
    position:'fixed',
  
  }))
  const StyledToolbar = styled(Toolbar)(({theme})=> ({
    display:'flex',
    justifyContent:'space-between'
   }))
const AdminLogin = () => {
  return (
    <Page
    title="Login"
    >
    <StyledAppBar>
   <StyledToolbar>
    <Typography>
    Login
     </Typography> 
   </StyledToolbar>
 </StyledAppBar>
 <StyledRoot>
     <Stack>
         
         <Typography variant='h4' sx={{textAlign:'center'}}> Login </Typography>
         <Typography sx={{textAlign:'center', mb:'1rem'}}> Sign in on the internal platform </Typography>
                 <AdminLoginForm />
           
     </Stack>
 </StyledRoot>
 </Page>
  )
}

export default AdminLogin
