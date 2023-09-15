import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton, 
  Dialog,DialogTitle,DialogContent,TextField,DialogActions
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { deleteCategory, getCategories, getCategory, updateCategory } from '../../../../store/actions/adminActions';
import AddCategory from './components/AddCategory';
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
const Categories = () => {
    const [loading, setLoading] = React.useState(false)
    const initialValues ={
        name:'',
    }
    const [formValues,setFormValues] = React.useState(initialValues)
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
  const classes = useStyles();
  const theme = useTheme()
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const[editDialog, setEditDialog] = React.useState(false)
  const[id, setId] = React.useState('')
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch()
  const getAllCategories = () => {
    dispatch(getCategories()).then((result) => {
      setData(result.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(() => {
    getAllCategories()
  },[])
  const handleCreateSuccess = () => {
    setOpen(false);
    getAllCategories()
  };
  const handleEdit =(id) => {
    setId(id)
    setEditDialog(true)
    dispatch(getCategory(id)).then((result) => {
      setFormValues(...result.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Delete?',
      message: 'Are you sure to want to delete ?',
      buttons:[
        {
          label: 'Yes',
          onClick: ()=>{
            dispatch(deleteCategory(id)).then((result) => {
              enqueueSnackbar(result.data.message, {
                variant:'success'
              })
              getAllCategories()
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
      dispatch(updateCategory(formValues, id)).then((result) => {
        setLoading(false)  
        enqueueSnackbar(result.data.message, {
          variant:'success'
        })
        setFormValues(initialValues)
        getAllCategories()
        setEditDialog(false)
      }).catch((err) => {
        setLoading(false)
          console.log(err)
      });
  }
  return (
    <Page
    title="Categories"
    >
      <StyledRoot>
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add Category
          </Button>
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Categories
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Category Name</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
               
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
        <AddCategory open={open} close={()=>setOpen(false)} onCreateSuccess={handleCreateSuccess}/>
        {
          data.length < 1 && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
      </StyledRoot>

      {/* --------------UPDATE CATEGORY--------------  */}
      <Dialog open={editDialog} onClose={()=>setEditDialog(false)}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Add Category</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              />
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
          > Add </Button>
        }
          </DialogActions>
                </form>
        </Dialog>
    </Page>
  )
}

export default Categories
