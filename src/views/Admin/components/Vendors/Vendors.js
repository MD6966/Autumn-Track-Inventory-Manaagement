import React from 'react';
import { Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Tooltip, styled, Box, Button, useTheme, Skeleton } from '@mui/material';
import Page from '../../../../components/page';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddVendor from './components/AddVendor';
import { useDispatch } from 'react-redux';
import { deleteVendor, getCategories, getVendors } from '../../../../store/actions/adminActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSnackbar } from 'notistack';
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
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()
  const classes = useStyles();
  const theme = useTheme()
  const vendors = [
    { id: 1, name: 'Vendor 1', category: 'Category A' },
    { id: 2, name: 'Vendor 2', category: 'Category B' },
    { id: 3, name: 'Vendor 3', category: 'Category C' },
  ];
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
  const handleEdit =() => {

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
  return (
    <Page
    title="Vendors"
    >
      <StyledRoot>
      <Button variant='contained' endIcon={<AddCircleIcon />} sx={{mb:2}}
      onClick={()=>setOpen(true)}
      >
            Add Vendor
          </Button>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Vendors Table">
        <TableHead>
          <TableRow>
            <TableCell>Sr no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
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
              <TableCell>
              <Tooltip
            title="Edit"
            >
            <IconButton edge="end" aria-label="Edit">
              <EditIcon 
              sx={{color:theme.palette.primary.main}}
              onClick={()=>handleEdit(vendor.id)}
              
              />
            </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
            <IconButton edge="end" aria-label="Delete">
              <DeleteIcon 
              sx={{color:theme.palette.primary.main}}
              onClick={()=> handleDelete(vendor.id)}

              />
            </IconButton>
              </Tooltip>
              </TableCell>
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
    </Page>
  )
}

export default Vendors
