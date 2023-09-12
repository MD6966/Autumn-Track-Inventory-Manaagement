import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const StyledFooter = styled(Box)(({theme})=> ({
    minHeight:'30vh',
    background: theme.palette.primary.main,
    padding: theme.spacing(3),
    
}))
const Footer = () => {
  return (
    <StyledFooter>
      {/* <Typography
      component={Link}
      to="/admin-login"
      >
        Admin 
      </Typography> */}
      <Typography variant='h4'>
        Footer
      </Typography>
    </StyledFooter>
  )
}

export default Footer
