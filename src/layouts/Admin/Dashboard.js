import React from 'react'
import Page from '../../components/page/page';
import { Link, Outlet } from 'react-router-dom'
import { ExitToApp } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';
import {Avatar, Box, CssBaseline, Divider, 
  IconButton, Button, 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, styled, Toolbar, Typography, AppBar, useTheme} from '@mui/material'
import { useLocation } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { makeStyles } from '@mui/styles'
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { adminLogOut } from '../../store/actions/adminActions';
const useStyles = makeStyles((theme)=> ({
    selected : {
      background:'#fcbd6a',
    },
    icon: {
      marginLeft:'auto',
    },
    drawer : {
    },
    btn: {
    }
  }))
  const drawerWidth = 240;
  

  const StyledRoot = styled(AppBar)(({theme})=> ({
    position:'fixed',
    background: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      zIndex:theme.zIndex.drawer + 1,
    }
  }))
  const StyledToolbar = styled(Toolbar)(({theme})=> ({
    display:'flex',
    justifyContent:'space-between'
   }))
   const Dashboard = () => {
     const permission = useSelector((state)=>state.admin.user.permissions)
     const user = useSelector((state)=>state.admin.user)
    //  console.log(userId)
     const ListData = [
      {id:1, title:'Dashboard', icon:<DashboardIcon />, to:'/admin/dashboard'  },
      {id:2, title:'Facilities', icon:<LocationOnIcon />, to:'/admin/facilities',
      permission:permission.facilities
    },
      {id:3, title:'Invoices', icon:<ReceiptIcon />, to:'/admin/invoices',
      permission:permission.invoices
    },
      {id:4, title:'Categories', icon:<CategoryIcon />, to:'/admin/categories',
      permission:permission.categories
    },
      {id:5, title:'Vendors', icon:<AdminPanelSettingsIcon />, to:'/admin/vendors',
      permission:permission.vendors
    },
      {id:6, title:'Users', icon:<PeopleIcon />, to:'/admin/users',
      permission:permission.users
    },
      
    ]
     const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [dOpen, setDopen] = React.useState(false)
    const location = useLocation();
    React.useEffect(() => {
      const matchingItem = ListData.find((item) => item.to === location.pathname);
      if (matchingItem) {
        setSelectedIndex(matchingItem.id);
      }
    }, [location.pathname]);
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
      setDopen(false)
    };
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = () => {
      setDopen(false)
        confirmAlert({
          title: 'Log Out',
          message: 'Are you sure to log out ?',
          buttons:[
            {
              label: 'Yes',
              onClick: ()=>{
                dispatch(adminLogOut(user.id))
                navigate('/',{ replace: true})
              }
            },
           {
            label: 'No',
           }
    
          ]
        })
        
    
      }
      const handleClose = (e) => {
        setDopen(!dOpen)
      }
      const theme = useTheme()
  return (
    <Page
    title = "Admin Dashboard"
    >
        <Box sx={{display:'flex'}}>
        <CssBaseline /> 
        <StyledRoot >
    <StyledToolbar>
      <Box
      sx={{flex:1}}
      >
        <Typography> Admin Pannel </Typography>
      </Box>
      <Box>
        <Button sx={{color:'#fff', ml:2}} 
        className={classes.btn}
        endIcon={<ExitToApp />} onClick={handleLogOut}>
          Sign Out
        </Button>
        <IconButton
        className={classes.icon}
        onClick={() => setDopen(true)}
        >
          {/* <MenuIcon sx={{color:'#fff'}} />  */}
        </IconButton>
      </Box>
    </StyledToolbar>
</StyledRoot>
<Drawer
      className={classes.drawer}
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        // zIndex:-1,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: theme.palette.primary.main
        },
      }}
    >
          <Toolbar /> 
          <Box>
            <Box sx={{display:'flex', justifyContent:'center',}}>
              <Avatar src='/assets/images/admin.webp' sx={{height:'120px', width:'120px', mt:'2rem'}} />
            </Box>
            <Typography sx={{color:'#fff', textAlign:'center'}} variant='h6' gutterBottom> {user.role_name} </Typography>
            <Divider /> 
            <Box sx={{p:1}}>
              <Typography sx={{color:'#fff', fontSize:'15px', mt:1 }}> Admin Dashboard</Typography>
              <List component="nav">
                {ListData.map((val)=> {
                  return(
                    <>
                    {
                       val.permission == 'no_permission' ?
                       null :
                    <ListItem key={val} disablePadding
                    className={clsx(classes.root, {
                      [classes.selected]: selectedIndex === val.id,
                    })}
                    component={Link}
                    to={val.to}
                    >
                      <ListItemButton
                       selected={selectedIndex === val.id}
                       onClick={(event) => handleListItemClick(event, val.id)}
                       
                      >
                        <ListItemIcon sx={{ color: selectedIndex === val.id ? 'black' : '#fff' }}>
                          {val.icon}
                        </ListItemIcon>
                      <ListItemText primary={val.title} sx={{ color: selectedIndex === val.id ? 'black' : '#fff' }} />
                      </ListItemButton>
                    </ListItem>
                    }
                    </>
                  )
                })}
              </List>
            </Box>
          </Box>
        </Drawer>
        <Drawer
        open={dOpen}
        onClose={handleClose}
        variant='temporary'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        PaperProps={{
          sx: {
            background:'#822824'
          }
        }}
        >
          <Toolbar /> 
          <Box>
            <Box sx={{display:'flex', justifyContent:'center',}}>
              <Avatar src='/assets/images/admin.png' sx={{height:'120px', width:'120px', mt:'2rem'}} />
            </Box>
            <Typography sx={{color:'#fff', textAlign:'center'}} variant='h6' gutterBottom> Admin </Typography>
            <Divider /> 
            <Box sx={{p:1}}>
              <Typography sx={{color:'#fff', fontSize:'15px', mt:1 }}> Admin Dashboard</Typography>
              <List component="nav">
                {ListData.map((val)=> {
                  return(
                    <>
                    <ListItem key={val} disablePadding
                    className={clsx(classes.root, {
                      [classes.selected]: selectedIndex === val.id,
                    })}
                    component={Link}
                    to={val.to}
                    >
                      <ListItemButton
                       selected={selectedIndex === val.id}
                       onClick={(event) => handleListItemClick(event, val.id)}
                       
                      >
                        <ListItemIcon sx={{color:'#fff'}}>
                          {val.icon}
                        </ListItemIcon>
                      <ListItemText primary={val.title} sx={{color:'#fff'}} />
                      </ListItemButton>
                    </ListItem>
                    </>
                  )
                })}
              </List>
              <Divider
              sx={{background:'#fff'}}
              /> 
             
              <Button 
              variant='contained'
              color='secondary'
              sx={{color:'#fff', ml:'20%', mt:3}} 
        endIcon={<ExitToApp />} onClick={handleLogOut}>
          Sign Out
        </Button>
      
            </Box>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, }}>
        <Toolbar /> 
          <Outlet /> 
        </Box>
      </Box>
    </Page>
  )
}

export default Dashboard
