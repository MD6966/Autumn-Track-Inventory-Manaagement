import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton,
  TextField,InputLabel,Select,Dialog,DialogActions,
  DialogTitle,FormControl,MenuItem,DialogContent, Avatar, Input, InputAdornment 
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { changeInvoiceStatus, changeInvoiceStatus2, getInternalNotes, getInvoiceStatuses, getInvoices } from '../../../../store/actions/adminActions';
import AddInvoice from './components/AddInvoice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ApproveInvoices from './components/ApproveInvoices';
import { useSnackbar } from 'notistack';
import AddIcon from '@mui/icons-material/Add';
import ArchiveDialog from './components/ArchiveDialog';
import { Link } from 'react-router-dom';
import ArchiveIcon from '@mui/icons-material/Archive';
import InternalNoteDialog from './components/InternalNoteDialog';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import AssignFacilityDialog from './components/AssignFacilityDialog';

const StyledRoot = styled(Box)(({theme})=> ({
  padding: theme.spacing(3)
}))
const ManageInvoices = () => {
  const initialValues ={
    category_id:'',
    user_id:'',
    invoice_number:'',
    date_of_invoice:'',
    due_date:'',
    total_amount_due:'',
    status:'',
    upload_id:'',
    assign:''
  }
  const [formValues, setFormValues] = React.useState(initialValues)
const {enqueueSnackbar} = useSnackbar()
const [open , setOpen] = React.useState(false)
const [apOpen, setApOpen] = React.useState(false)
const dispatch = useDispatch()
const theme = useTheme()
const user_Id = useSelector((state)=>state.admin.user.id)
const [data , setData] = React.useState([])
const [invoiceId, setInvoiceId] = React.useState('')
const [aLoading, setALoading] = React.useState(false)
// console.log(data, "Thisssss")
const [age, setAge] = React.useState('');
const [iL, setIl] = React.useState(false)
const [statuses, setStatuses]=React.useState([])
const [sId, setSid]=React.useState('')
const [statusDialog, setStatusDialog]=React.useState(false)
const [sLoading, setSloading] = React.useState(false)
const [archiveOpen, setArchiveOpen] = React.useState(false)
const [archiveId, setArchiveId] =React.useState('')
const [noteDialog, setNoteDialog] = React.useState(false)
const [noteId, setNoteId] = React.useState('')
const [noteData, setNoteData] = React.useState([])
const [searchInput, setSearchInput] = React.useState("")
const [filteredData, setFilteredData] = React.useState([])
const [facilityDialog, setFacilityDialog] = React.useState(false)
const [assignId, setAssignId] = React.useState('')
const type = 'total_invoices'


const getAllInoices = () => {
  setIl(true)
  dispatch(getInvoices(user_Id, type)).then((result) => {
    setData(result.data.data.total_invoices)
    setIl(false)
  }).catch((err) => {
    console.log(err)
  });
}
React.useEffect(()=> {
  getAllInoices()
  // getInvoiceStatuses()
}, [])
const handleEdit = () => {

}
const handleDelete = () => {

}

const handleCreateSuccess = () => {
  setOpen(false);
  getAllInoices()
}
  const handleStatusChange = (id) => {
    const status = 'in_review'
    if(role=="user") {

      dispatch(changeInvoiceStatus(id, status)).then((result) => {
        getAllInoices()
      }).catch((err) => {
        console.log(err)
      });
    }

  }
  const handleApprove = (val) => {
    if(role=="regional_admin") {
      // setInvoiceId(val)
      handleApproveRA(val)
    }
    else {
      setInvoiceId(val)
      setApOpen(true)
    }
  }
  const createSuccess  =() => {
    setApOpen(false);
    getAllInoices()
   
  }
  const handleApproveRA =(val) => {
    // console.log(invoiceId, '+++++')
    setALoading(true)
    const status = 'approved_for_payment'
    dispatch(changeInvoiceStatus2(val, status)).then((result) => {
      enqueueSnackbar(result.data.message, {
        variant:'success'
      })
      getAllInoices()
      setALoading(false)
    }).catch((err) => {
      setALoading(false)
      console.log(err)
    });
  }
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const getStatuses = () => {
    dispatch(getInvoiceStatuses()).then((result) => {
      setStatuses(result.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getStatuses()
  },[])
  const arr = Object.keys(statuses).map((key) => ({
    key,
    value: statuses[key],
  }));
  const handleClick = (val) => {
    setStatusDialog(true)
    setSid(val.id)
  }
  const changeStatus = () => {
    setSloading(true)
    dispatch(changeInvoiceStatus(sId, age)).then((result) => {
      enqueueSnackbar(result.data.message, {
        variant:'success'
      })
      setSloading(false)
      setStatusDialog(false)
      getAllInoices();
    }).catch((err) => {
      setSloading(false)
      console.log(err)
    });
  }
  const handleArchiveDialog = (val) => {
    setArchiveOpen(true)
    setArchiveId(val.id)
  }
  const invoiceArchiveSuccess = () => {
    setArchiveOpen(false)
    getAllInoices()
  }
  const handleNoteDialog = (id) => {
      setNoteId(id)
      setNoteDialog(true)
  }
  const getNotes = () => {
    dispatch(getInternalNotes(noteId)).then((result) => {
        setNoteData(result.data.data)
    }).catch((err) => {
        console.log(err)
    });
  }
  React.useEffect(() => {
        getNotes()
  }, [noteId])
  const createNoteSuccess = () => {
    setNoteDialog(false)
    setNoteId('')
    getNotes()
  }
  const handleChangeSearch =(e) => {
    setSearchInput(e.target.value);
      filterData(e.target.value);
  }
  const filterData = (searchText) => {
    const filtered = data.filter((data) => {
    return (
      data.invoice_number.toLowerCase().includes(searchText.toLowerCase())||
      data.vendor && data.vendor.name.toLowerCase().includes(searchText.toLowerCase())
      // data.assign && data.assign.name.toLowerCase().includes(searchText.toLowerCase())

      // data.address.toLowerCase().includes(searchText.toLowerCase())
    );
    });
    setFilteredData(filtered);
    };
    React.useEffect(() => {
      if (searchInput === "") {
        setFilteredData(data);
      } else {
        filterData(searchInput);
      }
    }, [searchInput, data, filteredData]);
    const handleAssign = (val) => {
      setFacilityDialog(true)
      setAssignId(val.id)
    }
    const createAssignSuccess = () => {
      setFacilityDialog(false)
      getAllInoices()
    }
  const permissions = useSelector((state)=>state.admin.user.permissions)
  const role = useSelector((state)=>state.admin.user.role)
  // console.log(role) 

  return (
    <Page
    title="invoices"
    >
      <StyledRoot>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <Box>
          {
          permissions.invoices == 'view_edit' ? 
      <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add Invoice
          </Button>
          : null
      }
      {
        role == 'super_admin' ? 
        <Button variant='contained'
        component={Link}
        sx={{ml:2}}
        to="/admin/archived"
        endIcon={<ArchiveIcon />}
        >
        View Archived Invoices
      </Button>
      : null
      }
          </Box>
          <Box>
          <FormControl

        sx={{width:'100%',}}
        >
          <InputLabel> Search </InputLabel>
          <Input 
          placeholder='invoice number/vendor/user'
           value={searchInput}
           onChange={(e) => handleChangeSearch(e)}
          endAdornment={
            <InputAdornment position='end'>
            <SearchIcon />
            </InputAdornment>
          }
          
          
          />
        </FormControl>
          </Box>
        </Box>
      
          <Box sx={{mt:2, mb:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Invoices
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead sx={{background:theme.palette.primary.main}}>
              <TableRow>
                <TableCell sx={{color:'#fff'}}>Invoice Number</TableCell>
                <TableCell sx={{color:'#fff'}}>Date of Invoice</TableCell>
                <TableCell sx={{color:'#fff'}}>Due Date</TableCell>
                <TableCell sx={{color:'#fff'}}>Amount Due</TableCell>
                <TableCell sx={{color:'#fff'}}>Status</TableCell>
                {
                  role=="super_admin" ?
                <TableCell sx={{color:'#fff'}}>Archive</TableCell>
                  : null
                }
                {
                  role == 'super_admin' ? 
                  <TableCell sx={{color:'#fff'}}>Change Status</TableCell>
                  : null
                }
                <TableCell sx={{color:'#fff'}}>Internal Note</TableCell>
                {
                  role == "super_admin" ?
                  <TableCell sx={{color:'#fff'}}>Add Facility</TableCell>
                : null
                }


                {
                  role == 'vendor' ? null :
                <TableCell sx={{color:'#fff'}}>Vendor</TableCell>
                }
                <TableCell sx={{color:'#fff'}}>Invoice</TableCell>
                {
                  role == 'vendor' ? null :
                <TableCell sx={{color:'#fff'}}>Approve</TableCell>
                }
                <TableCell sx={{color:'#fff'}}>Chat</TableCell>
                {
                  role == 'vendor' ? null : 
                <TableCell sx={{color:'#fff'}}>User</TableCell>
                }

                {
                  permissions.invoices == 'view_edit' ? 
                <TableCell sx={{color:'#fff'}}>Actions</TableCell>
                : null
                }


              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => {
                // console.log(item, "+++++++")
                let newVar = role == "super_admin" ? "regional_admin" : role
                const filteredData = item.assign.filter(item => item.role == newVar);

                
                return(
                  <TableRow key={item.id}>
                  <TableCell>{item.invoice_number}</TableCell>
                  <TableCell>{item.date_of_invoice}</TableCell>
                  <TableCell>{item.due_date}</TableCell>
                  <TableCell>{item.total_amount_due}</TableCell>
                  <TableCell>{item.status_name}</TableCell>
                  {
                    role=="super_admin" ?
                  <TableCell>
                    <Button
                    variant='outlined'
                    onClick={()=>handleArchiveDialog(item)}
                    endIcon={
                      <AddIcon />
                    }
                    >
                      Archive
                    </Button>
                  </TableCell>
                    : null
                  }
                  {
                    role=='super_admin' ? 
                  <TableCell>
                    <Button variant='outlined'
                    onClick={()=>handleClick(item)}
                    >
                      Change
                    </Button>
                  </TableCell>
                  : null
                  }
                  <TableCell>
                    <Button variant='outlined' endIcon={<AddIcon />}
                    onClick={()=>handleNoteDialog(item.id)}
                    >
                      Add
                    </Button>
                  </TableCell>
                  {
                    role=="super_admin" ?
                    <TableCell>
                      <Button variant='outlined' endIcon={<AddIcon /> } 
                      onClick={()=>handleAssign(item)}
                      >
                        Add
                      </Button>
                    </TableCell> : null
                  }
                  {
                  role == 'vendor' ? null :
                  <TableCell>{item.vendor ? item.vendor.name : 'Vendor Deleted'}</TableCell>
                  }

                  <TableCell>
                    <Button
                    variant='contained'
                    href={`${process.env.REACT_APP_URL}${item.upload.path}`}
                    target="_blank"
                    endIcon={
                      <RemoveRedEyeIcon />
                    }
                    onClick={()=>handleStatusChange(item.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                  {
                  role == 'vendor' ? null :
                <TableCell>
                  {
                    filteredData[0].pivot.approved == 0 ? 
                    <Button variant={aLoading ? 'disabled' : 'outlined'}
                  onClick={()=>handleApprove(item.id)}
                  >
                    Approve
                  </Button> :
                  <Button variant='disabled'
                  >
                    Approved
                  </Button>
                  }
                  
                </TableCell>
                  }
                  <TableCell>
                    <Tooltip title="Chat">
                   <IconButton
                   component={Link}
                   to={`/admin/chat/${item.id}`}
                   >
                        <ChatIcon />
                   </IconButton>
                    </Tooltip>
                  </TableCell>
                  {
                    role == 'vendor' ? null :
                    <TableCell>
                    {role == 'super_admin' ? 'Regional Admin' : filteredData[0].name}
                  </TableCell>
                  }
              

                  {
                    permissions.invoices == 'view_edit' ?
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
                  </TableCell> : null
                  }
                </TableRow>
                )
              })}
               { (data.length < 1 && !iL) &&
          <TableRow >
            <TableCell colSpan={9} sx={{textAlign:'center'}}>
               No Data Found...
            </TableCell>
        </TableRow>
        }
            </TableBody>
          </Table>
        </TableContainer>
        {
          iL && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
      </StyledRoot>
      <AddInvoice 
      open={open} 
      close={()=>setOpen(false)}
       onCreateSuccess={handleCreateSuccess}
      />
      {
        role =="user" ? 
        <ApproveInvoices
        status='pending_admin_approval' 
        invoiceId = {invoiceId}
        createSuccess = {createSuccess}
        open={apOpen}
        close = {()=>setApOpen(false)}
        data = "admin"
        /> : role == "admin" ?
        <ApproveInvoices
        status='pending_ap_approval'
        invoiceId = {invoiceId}
        open={apOpen}
        createSuccess = {createSuccess}
        close = {()=>setApOpen(false)}
        data="regional_admin"
        />
        : null
      }
     
      <Dialog open={statusDialog} 
      onClose={()=>setStatusDialog(false)}
      fullWidth>
        <DialogTitle>
          Change Status
        </DialogTitle>
        <Divider />
        <DialogContent>
        <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Status</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={age}
  label="Status"
  onChange={handleChange}
>
  {
    arr.map((val,ind)=> {
      // console.log(val)
      return(
        <MenuItem value={val.key}>{val.value}</MenuItem>
      )
    })
  }
</Select>
</FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={()=>setStatusDialog(false)}>
            Cancel
          </Button>
          {
            sLoading ? 
            <Button variant='disabled'>
            ...Loading
          </Button> :
           <Button variant='contained' onClick={changeStatus}>
           Change
         </Button>
          }
         
        </DialogActions>
      </Dialog>
      <ArchiveDialog 
      open={archiveOpen}
      close={()=>setArchiveOpen(false)}
      invoiceId={archiveId}
      createSuccess = {invoiceArchiveSuccess}
      />
      <InternalNoteDialog 
      open={noteDialog}
      close = {()=>setNoteDialog(false)}
      invoiceId = {noteId}
      data = {noteData}
      createsuccess = {createNoteSuccess}
      />
      <AssignFacilityDialog 
      open={facilityDialog}
      close = {()=> setFacilityDialog(false)}
      invoiceId = {assignId}
      createSuccess = {createAssignSuccess}
      />
    </Page>
  )
}

export default ManageInvoices

