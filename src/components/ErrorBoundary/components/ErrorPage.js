import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import React from 'react'
const useStyles = makeStyles((theme)=> ({
    root: {
        height:'100vh',
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center'
    },
    btn: {
        width:'10rem', 
        borderRadius:'20px', 
        background:'#D33737',
        fontWeight:'bold',
        fontSize:'15px',
        marginTop:'3rem',
        height:'30px',
        textDecoration:'none',
        color:'#fff',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        '&:hover' : {
            background: '#962525'
        }
    }
}))

const ErrorPage = () => {
    const classes = useStyles()
  return (
    <div>
      <Card elevation={0} className={classes.root}>
        <Stack>

        <Typography sx={{fontWeight:'bold', fontSize:'10vw', color:'#d33737'}}>
            Oops...! 
        </Typography>
        <div style={{display:'flex'}}>
        <Typography sx={{fontWeight:800, fontSize:'4vw',}} >
            Error 404: 
        </Typography>
        <Typography sx={{fontSize:'4vw', ml:'1rem'}}>  Page Not found </Typography>
        </div>
        <Typography sx={{fontWeight:'bold',}}> We're sorry. the page you requested could not be found at the moment </Typography>
        <div style={{display:'flex', justifyContent:'center'}}>

        <a variant='contained' className={classes.btn} component={Link} href='/'> 
            Go Home 
        </a>
        </div>
       
        </Stack>
        <Box sx={{mt:'5rem'}}>
        <img src='/assets/images/error.png' /> 
        </Box>
      </Card>
      
    </div>
  )
}

export default ErrorPage