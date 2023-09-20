import React from 'react';
import { Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Tooltip, 
  styled, Box, Button, useTheme, Skeleton,
  Dialog,DialogTitle,Divider,DialogContent,MenuItem,TextField,
  DialogActions,FormControl,Select,InputLabel, Avatar
} from '@mui/material';
import Page from '../../../../components/page';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddVendor from './components/AddVendor';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendor, getCategories, getVendor, getVendors, updateVendor } from '../../../../store/actions/adminActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSnackbar } from 'notistack';
import { RotatingLines } from 'react-loader-spinner';
const StyledRoot = styled(Box)(({theme})=> ({
  padding: theme.spacing(3)
}))
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));
const Vendors = () => {
  const [open , setOpen] = React.useState(false)
  const [data, setData] =React.useState([])
  const [cData, setCdata] = React.useState([])
  const [editDialog, setEditDialog] = React.useState(false)
  const [id, setId] = React.useState('')
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()
  const classes = useStyles();
  const theme = useTheme()
  const initialValues ={
    name:'',
    email:'',
    category_id:'',
    password:''
}
const [loading, setLoading] = React.useState(false)
const handleChangeC = (event) => {
setFormValues({...formValues, category_id :event.target.value})
};
const [formValues,setFormValues] = React.useState(initialValues)
const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name]:value})
}
const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    dispatch(updateVendor(formValues, id)).then((result) => {
      setLoading(false)
      setFormValues(initialValues)
      enqueueSnackbar(result.data.message, {
          variant:'success'
        })
        getAllVendors()
        setEditDialog(false)
    }).catch((err) => {
      setLoading(false)
        console.log(err)
    });
}

  const getAllVendors = () => {
    dispatch(getVendors()).then((result) => {
      setData(result.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  const getAllCategories = () => {
    dispatch(getCategories()).then((result) => {
      setCdata(result.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(() => {
    getAllVendors()
    getAllCategories()
  },[])
  const handleCreateSuccess = () => {
    setOpen(false);
    getAllVendors()
  };
  const handleEdit =(id) => {
    setId(id)
    setEditDialog(true)
    dispatch(getVendor(id)).then((result) => {
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
            dispatch(deleteVendor(id)).then((result) => {
              enqueueSnackbar(result.data.message, {
                variant:'success'
              })
              getAllVendors()
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
  const permission = useSelector((state)=>state.admin.user.permissions)

  return (
    <Page
    title="Vendors"
    >
      <StyledRoot>
        {
          permission.vendors == "view_edit" &&
      <Button variant='contained' endIcon={<AddCircleIcon />} sx={{mb:2}}
      onClick={()=>setOpen(true)}
      >
            Add Vendor
          </Button>
        }
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Vendors Table">
        <TableHead>
          <TableRow>
            <TableCell>Sr no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Email</TableCell>
            {
          permission.vendors == "view_edit" &&
          <TableCell>Actions</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((vendor, index) => {
            return(
              <TableRow key={vendor.id}>
              <TableCell>{vendor.id}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.category == null ? 'Null' : vendor.category.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              {
          permission.vendors == "view_edit" &&
              <TableCell>
              <Tooltip
            title="Edit"
            >
            <IconButton edge="end" aria-label="Edit">
              <Avatar sx={{background:'none', border:'1px solid #002448'}}>
              <EditIcon 
              sx={{color:theme.palette.primary.main}}
              onClick={()=>handleEdit(vendor.id)}
              />
              </Avatar>
            </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
            <IconButton edge="end" aria-label="Delete">
              <Avatar sx={{background:'none', border:'1px solid red', '&:hover':{background:'#f7d2d2'}}}>
              <DeleteIcon 
              sx={{color:'#F70000'}}
              onClick={()=> handleDelete(vendor.id)}
              />
              </Avatar>
            </IconButton>
              </Tooltip>
              </TableCell>
              }
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    {
          data.length < 1 && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
    <AddVendor 
    open={open} 
    close={()=>setOpen(false)} 
    onCreateSuccess={handleCreateSuccess}
    data={cData}
    />
      </StyledRoot>

      {/* ----------------UPDATE VENDOR---------------- */}
      <Dialog open={editDialog} onClose={()=>setEditDialog(false)}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Add Vendor</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Vendor Name"
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
            sx={{mt:2,}}
            />
             <TextField
            type='password'
            label="Password"
            placeholder='This is Optional'
            fullWidth
            name='password'
            value={formValues.password}
            onChange={handleChange}
            sx={{mt:2, mb:2}}
            />
             <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues.category_id}
          label="Category"
          name="category"
          onChange={handleChangeC}
        >
          {
            cData.map((val,ind)=>{
              return(
                <MenuItem value={val.id}>{val.name}</MenuItem>
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

export default Vendors
