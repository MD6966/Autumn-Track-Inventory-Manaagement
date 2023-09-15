import React, {useState} from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled,
  List, ListItem, ListItemText, ListItemSecondaryAction, 
  IconButton, Typography, Divider, useTheme, Tooltip,
  Dialog, DialogTitle,DialogActions,TextField, DialogContent,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton 
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import AddFacility from './components/AddFacility';
import { useDispatch } from 'react-redux';
import { deleteFacility, getFacilities, getFacility, updateFacility } from '../../../../store/actions/adminActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSnackbar } from 'notistack';
import { RotatingLines } from 'react-loader-spinner';
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
const Facilities = () => {
  const initialValues ={
      name:'',
      email:''
  }
  const [formValues,setFormValues] = React.useState(initialValues)
  const handleChange = (e) => {
      const {name, value} = e.target
      setFormValues({...formValues, [name]:value})
  }
  const classes = useStyles();
  const theme = useTheme()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [id, setId]=React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [fOpen, setFopen] = React.useState(false)
  const [fData, setFdata] = React.useState([])
  const [uData, setUdata] = React.useState([])
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch()
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const getAllFacilities = () => {
    dispatch(getFacilities()).then((result) => {
      setFdata(result.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getAllFacilities()
  }, [])
  const handleCreateSuccess = () => {
    setDialogOpen(false);
    getAllFacilities()
  };
  const handleEdit =(id) => {
    setId(id)
    setFopen(true)
    dispatch(getFacility(id)).then((result) => {
      setFormValues(...result.data.data)
    }).catch((err) => {
      console.log(err)
    });
    setFopen(true)
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Delete?',
      message: 'Are you sure to want to delete ?',
      buttons:[
        {
          label: 'Yes',
          onClick: ()=>{
            dispatch(deleteFacility(id)).then((result) => {
              enqueueSnackbar(result.data.message, {
                variant:'success'
              })
              getAllFacilities()
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

   const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(updateFacility(formValues, id)).then((result) => {
            setLoading(false)
            setFormValues(initialValues)
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            getAllFacilities()
            setFopen(false)
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
    }
  return (
    <Page
    title="Facilities"
    >
      <StyledRoot>
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={handleOpenDialog}>
            Add Facility
          </Button>
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Facilities Names
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Facility Name</TableCell>
                <TableCell>Facility Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
           
            <TableBody>
              {fData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Name">
                      <IconButton edge="end" aria-label="Edit">
                        <EditIcon sx={{ color: theme.palette.primary.main }} 
                          onClick={()=>handleEdit(item.id)}

                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Name">
                      <IconButton edge="end" aria-label="Delete">
                        <DeleteIcon sx={{ color: theme.palette.primary.main }} 
                        onClick={()=> handleDelete(item.id)}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          fData.length < 1 && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
        <AddFacility open={isDialogOpen} close={()=>setDialogOpen(false)} onCreateSuccess={handleCreateSuccess}  />
        
        {/* -------------------EDIT FACILITY----------------- */}
        
        <Dialog open={fOpen} onClose={()=>setFopen(false)}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Facility</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Facility Name"
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
            sx={{mt:2}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setFopen(false)} color="primary">
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
        
      </StyledRoot>
    </Page>
  )
}

export default Facilities
