import { FormControl, InputLabel, MenuItem, Select, Button, Box, Grid, Hidden, Typography, TextField  } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Page from '../components/page/page';
import Nav from '../components/AppBar/Header'
const Login = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState("")
  const handleChange =(e) => {
    setValue(e.target.value)
  }
  return (<Page
  title="Login"
  >
    <Nav />
    
  
    <Box className="container" >
      <Box className='neumorphism'>
     <Grid container>
      <Grid item
      className="Grid1"
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6} >
        Login here
        <Box style={{marginTop:'2rem', padding: '0px 10px'}}>
          <form>
          <TextField fullWidth label='Email' className='inputField' />
          <TextField fullWidth label='Password' style={{marginTop:'1rem'}} />
              
            

          </form>
        </Box>
      </Grid>
      <Hidden smDown>
      <Grid item
      className="Grid2"
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6} >
        <Box className="box">
        <Typography style={{color:'#ffffff', marginTop:'10rem', fontSize:'5rem'}}> Login</Typography>
        </Box>
      </Grid>
      </Hidden>
     </Grid>
      </Box>
       </Box>  
  
       
  
  </Page>
  )
}

export default Login;
    