import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton,
  TextField,InputLabel,Select,Dialog,DialogActions,
  DialogTitle,FormControl,MenuItem,DialogContent, Avatar 

} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getRoles, getUser, getUsers, updateUser } from '../../../../store/actions/adminActions';
import AddUser from './components/AddUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSnackbar } from 'notistack';
import { RotatingLines } from 'react-loader-spinner';
import ManageRolesPermissions from './components/ManageRoles&Permissions';
const StyledRoot = styled(Box)(({theme})=> ({
    padding: theme.spacing(3)
  }))
  const useStyles = makeStyles((theme) => ({
    listItemHover: {
      '&:hover': {
        backgroundColor: '#e2e2e2',
      },
    },
  }));
  
const Users = () => {
 
    const initialValues ={
        name:'',
        email:'',
        role:''
    }
    const [formValues,setFormValues] = React.useState(initialValues)
    const [loading, setLoading] = React.useState(false)
    const handleChangeR = (event) => {
      setFormValues({...formValues, role :event.target.value})
    };
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
      setLoading(true)
        e.preventDefault()
        dispatch(updateUser(formValues, id)).then((result) => {
          setLoading(false)
          setFormValues(initialValues)  
          enqueueSnackbar(result.data.message, {
              variant:'success'
            })
            getAllUsers()
           setEditDialog(false)
        }).catch((err) => {
          setLoading(false)
            console.log(err)
        });
    }
    const theme = useTheme()
    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [roles, setRoles] = React.useState([])
    const [rolesOpen, setRolesOpen]=React.useState(false)
    const [id, setId] = React.useState('')
    const [editDialog, setEditDialog] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const dispatch = useDispatch()
    const user_id = useSelector((state)=>state.admin.user.id)
    const getAllRoles = () => {
      dispatch(getRoles()).then((result) => {
        setRoles(result.data.data)
      }).catch((err) => {
        console.log(err)
      });
    }
    const arr = Object.keys(roles).map((key) => ({
      key,
      value: roles[key],
    }));
    const getAllUsers = () => {
        dispatch(getUsers(user_id)).then((result) => {
          setData(result.data.data)
        }).catch((err) => {
          console.log(err)
        });
      }
      React.useEffect(() => {
        getAllUsers()
        getAllRoles()
      },[])
      const handleCreateSuccess = () => {
        setOpen(false);
        getAllUsers()
      };
      const handleDelete = (id) => {
        confirmAlert({
          title: 'Delete?',
          message: 'Are you sure to want to delete ?',
          buttons:[
            {
              label: 'Yes',
              onClick: ()=>{
                dispatch(deleteUser(id)).then((result) => {
                  enqueueSnackbar(result.data.message, {
                    variant:'success'
                  })
                  getAllUsers()
                }).catch((err) => {
                  console.log(err)
                });
              }
            },
           {
            label: 'No',
           }
    
          ]
        })
      }
      const handleEdit =(id) => {
        setId(id)
        setEditDialog(true)
        dispatch(getUser(id)).then((result) => {
          setFormValues(...result.data.data)
        }).catch((err) => {
          console.log(err)
        });
      }
      const permission = useSelector((state)=>state.admin.user.permissions)
      const role = useSelector((state)=>state.admin.user.role)
  return (
    <Page
    title="Categories"
    >
      <StyledRoot>
        {
           permission.users == "view_edit" &&
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add User
          </Button>
        }
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Users
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
               {
                
                role == ("super_admin" || "regional_admin" )&&
                <TableCell>Roles & Permissions</TableCell>
               }
                {
           permission.users == "view_edit" &&
           <TableCell>Actions</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role_name}</TableCell>
                  {
                role ==( "super_admin" || "regional_admin") &&
                  <TableCell>
                    {
                      item.role == "super_admin" ?
                      "------------------------" :
                      <Button variant='contained'
                    onClick={()=>setRolesOpen(true)}
                    >
                      Manage
                    </Button> 
                    }
                    
                    </TableCell> 
                  }
                    {
           permission.users == "view_edit" &&
                  <TableCell>
                    <Tooltip title="Edit Name">
                      <IconButton edge="end" aria-label="Edit">
                        <Avatar sx={{background:'none', border:'1px solid #002448',}}>
                        <EditIcon sx={{ color: theme.palette.primary.main }} 
                          onClick={()=>handleEdit(item.id)}
                          />
                          </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Name">
                      <IconButton edge="end" aria-label="Delete">
                        <Avatar sx={{background:'none', border:'1px solid red', '&:hover':{background:'#f7d2d2'}}}>
                        <DeleteIcon sx={{ color:'#F70000'}}
                          onClick={()=> handleDelete(item.id)}
                          />
                          </Avatar>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                    }              
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddUser 
        open={open} 
        close={()=>setOpen(false)}
        data={roles}
         onCreateSuccess={handleCreateSuccess}
        
        />
        {
          data.length < 1 && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
      </StyledRoot>
      <ManageRolesPermissions open={rolesOpen} close={()=>setRolesOpen(false)} />

      {/* ---------------UPDATE USER---------------------- */}
      <Dialog open={editDialog} onClose={()=> setEditDialog(false)}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Add User</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              />
            <TextField 
            required
            type='email'
            label="Email"
            fullWidth
            name='email'
            value={formValues.email}
            onChange={handleChange}
            sx={{mt:2, mb:2}}
            />
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues.role}
          label="Role"
          name="role"
          onChange={handleChangeR}
        >
          {
            arr.map((val,ind)=>{
              return(
                <MenuItem value={val.key}>{val.value}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setEditDialog(false)} color="primary">
              Cancel
            </Button>
            {
          loading ? <Button type='submit' variant='disabled'>    <RotatingLines
          strokeColor="#002448"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={loading}/> </Button> :
          <Button
          type='submit'
          variant='contained'
          > Update </Button>
        }
          </DialogActions>
                </form>
        </Dialog>
    </Page>
  )
}

export default Users
