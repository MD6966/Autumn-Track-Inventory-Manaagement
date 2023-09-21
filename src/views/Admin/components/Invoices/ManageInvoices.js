import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton,
  TextField,InputLabel,Select,Dialog,DialogActions,
  DialogTitle,FormControl,MenuItem,DialogContent, Avatar 

} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoices } from '../../../../store/actions/adminActions';
import AddInvoice from './components/AddInvoice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
const [open , setOpen] = React.useState(false)
const dispatch = useDispatch()
const theme = useTheme()
const user_Id = useSelector((state)=>state.admin.user.id)
const [data , setData] = React.useState([])
// console.log(data, "Thisssss")
const [iL, setIl] = React.useState(false)
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
}, [])
const handleEdit = () => {

}
const handleDelete = () => {

}

const handleCreateSuccess = () => {
  setOpen(false);
  getAllInoices()
}

  return (
    <Page
    title="invoices"
    >
      <StyledRoot>
      <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add Invoice
          </Button>
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
                <TableCell sx={{color:'#fff'}}>Invoice</TableCell>
                <TableCell sx={{color:'#fff'}}>User</TableCell>
                <TableCell sx={{color:'#fff'}}>Actions</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return(
                  <TableRow key={item.id}>
                  <TableCell>{item.invoice_number}</TableCell>
                  <TableCell>{item.date_of_invoice}</TableCell>
                  <TableCell>{item.due_date}</TableCell>
                  <TableCell>{item.total_amount_due}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <Button
                    variant='contained'
                    endIcon={
                      <RemoveRedEyeIcon />
                    }
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{item.assign ? item.assign.name : "User Deleted"}</TableCell>
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
    </Page>
  )
}

export default ManageInvoices
