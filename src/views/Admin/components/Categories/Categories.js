import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton, 
  Dialog,DialogTitle,DialogContent,TextField,DialogActions, Avatar, Paper
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
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
  const [cl, setCl] = React.useState(false)
  const[editDialog, setEditDialog] = React.useState(false)
  const[id, setId] = React.useState('')
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch()
  const getAllCategories = () => {
    setCl(true)
    dispatch(getCategories()).then((result) => {
      setData(result.data.data)
      setCl(false)
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
  const permission = useSelector((state)=>state.admin.user.permissions)

  return (
    <Page
    title="Categories"
    >
      <StyledRoot>
        {
           permission.categories == "view_edit" &&
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add Category
          </Button>
        }
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Categories
            </Typography>
          </Box>
          <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{background:theme.palette.primary.main}}>
              <TableRow>
                <TableCell sx={{color:'#fff'}}>Id</TableCell>
                <TableCell sx={{color:'#fff'}}>Category Name</TableCell>
                  {
                  permission.categories == "view_edit" &&
                <TableCell sx={{color:'#fff'}}>Actions</TableCell>
                  }
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  {
           permission.categories == "view_edit" &&
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
               { (data.length < 1 && !cl) &&
            <TableRow >
            <TableCell colSpan={4} sx={{textAlign:'center'}}>
               No Data Found...
            </TableCell>
        </TableRow>
        }
            </TableBody>
          </Table>
        </TableContainer>
        <AddCategory open={open} close={()=>setOpen(false)} onCreateSuccess={handleCreateSuccess}/>
        { cl &&
           <>
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
