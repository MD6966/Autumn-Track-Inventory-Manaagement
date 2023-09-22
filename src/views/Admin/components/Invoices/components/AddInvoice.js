import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
    Button,DialogActions,FormControl,InputLabel,Select,MenuItem
    } from '@mui/material'
    import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { RotatingLines } from 'react-loader-spinner'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addInvoice, getUsersByRole, uploadInvoice } from '../../../../../store/actions/adminActions'

const AddInvoice = (props) => {
    const user = useSelector((state)=> state.admin.user)
    // console.log(user.vendor)
    const initialValues ={
        category_id:user.vendor ? user.vendor.category_id : 'Not Found',
        user_id:user.id,
        invoice_number:'',
        total_amount_due:'',
        upload_id:'',
        assign:'',
        status:'new'
      }
      const [dateOfInvoice, setDateOfInvoice] = React.useState(null)
      const [dueDate , setDueDate] = React.useState(null)
      const [formValues, setFormValues] = React.useState(initialValues)
      const [loading , setLoading] = React.useState(false)
      const [userData, setUserData] = React.useState([])
      const dispatch = useDispatch()
      const getUsers = () => {
        const role ="user"
        dispatch(getUsersByRole(role)).then((result) => {
            setUserData(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
      }
      React.useEffect(()=> {
        getUsers()
      }, [])
      const handleChange = (e) => {
        const {name,value} = e.target
        setFormValues({...formValues, [name]:value})
      }
     
      const handleChangeUser = (e) => {
            setFormValues({...formValues, assign:e.target.value})
      }
      const [resumeFile, setResumeFile] = React.useState(null);
      const [resumeFileName, setResumeFileName] = React.useState('');
      const [ILoading, setIloading] = React.useState(false)
      const {enqueueSnackbar} = useSnackbar()
      const handleFileUpload = (event) => {
        const fileN = event.target.files[0];
        setResumeFile(fileN);
        setResumeFileName(fileN ? fileN.name : '');
     
      };
      const handleUpload = () => {
        setIloading(true)
        const formData = new FormData();
        if (resumeFile) {
            formData.append('file', resumeFile);
          }
          formData.append('user_id', user.id);
          formData.append('type', 'invoice_file');
           dispatch(uploadInvoice(formData)).then((result) => {
            console.log(result.data.data.id)
            setIloading(false)
            setFormValues({...formValues, upload_id:result.data.data.id})
            // setResumeFileName(null)
        }).catch((err) => {
            console.log(err)
        });
      }
      const handleSubmit = (e) => {
        e.preventDefault()
        if(!dateOfInvoice || !dueDate) {
            enqueueSnackbar("Please Select both Date of invoice and Due Date", {
                variant:'error'
            })
        }
        else
        if(!resumeFile) {
            enqueueSnackbar(`Please Upload Invoice File`,{
                variant:'error'
            })
        }
        else
        if(!formValues.upload_id) {
            enqueueSnackbar(`Please Click Upload Button to upload file`,{
                variant:'error'
            })
        }
        const updatedValues = {
        ...formValues,
        date_of_invoice:dateOfInvoice.format('YYYY-MM-DD'),
        due_date:dueDate.format('YYYY-MM-DD'),
        }
        setLoading(true)
        dispatch(addInvoice(updatedValues)).then((result) => {
            setLoading(false)
            props.onCreateSuccess()
            setFormValues(initialValues)
            setDateOfInvoice(null)
            setDueDate(null)
            setResumeFile(null)
            setResumeFileName('')
            enqueueSnackbar(result.data.message,{
                variant:'success'
            })

        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
        console.log(updatedValues)
      }
  return (
    <Dialog open={props.open} onClose={props.close}>
    <form onSubmit={handleSubmit}>
  <DialogTitle>Add Invoice</DialogTitle>
  <Divider />
  <DialogContent>
    <TextField
      type="number"
      label="Invoice Number"
      variant="outlined"
      fullWidth
      name="invoice_number"
      value={formValues.invoice_number}
      onChange={handleChange}
      required
      sx={{mb:2}}
      />
       <LocalizationProvider dateAdapter={AdapterDayjs}>
  <FormControl fullWidth>
   <Typography sx={{ml:0.5, mb:0.5}}> Date Of invoice </Typography>
    <DatePicker
      value={dateOfInvoice}
      onChange={(date) => setDateOfInvoice(date)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          id="date-of-invoice"
          variant="outlined" 
          
        />
      )}
    />
  </FormControl>
</LocalizationProvider>
<LocalizationProvider dateAdapter={AdapterDayjs} >
  <FormControl fullWidth sx={{mt:2}}>
   <Typography sx={{ml:0.5, mb:0.5}}> Due Date </Typography>
    <DatePicker
      value={dueDate}
      onChange={(date) => setDueDate(date)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          id="date-of-invoice"
          variant="outlined" 
          
        />
      )}
    />
  </FormControl>
</LocalizationProvider>

    <TextField 
    required
    type='number'
    label="Amount Due"
    fullWidth
    name='total_amount_due'
    value={formValues.total_amount_due}
    onChange={handleChange}
    sx={{mt:2, mb:2}}
    />
    <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Assign To</InputLabel>
<Select
  required
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  value={formValues.role}
  label="Assign To"
  name="role"
  onChange={handleChangeUser}
>
  {
    userData.map((val,ind)=>{
      return(
        <MenuItem value={val.id}>{val.name}</MenuItem>
      )
    })
  }
</Select>
</FormControl>
<Typography sx={{mt:2, ml:0.5}}>
    Choose Invoice: 
</Typography>
<input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={handleFileUpload}
  style={{ display: 'none' }}
  id="invoice-upload-input"
/>
<label htmlFor="invoice-upload-input">
  <Button variant="outlined" component="span" >
  {resumeFileName ? resumeFileName : 'Choose Invoice'}
  </Button>
</label>
{
          ILoading ? <Button variant='disabled'>    <RotatingLines
          strokeColor="#002448"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={ILoading}/> </Button> :
          <Button variant={resumeFile ? 'contained' : 'disabled'} onClick={handleUpload}>
          Upload 
      </Button>
        }

  </DialogContent>
  <DialogActions>
    <Button onClick={props.close} color="primary">
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
  variant= "contained"
  > Add </Button>
}
  </DialogActions>
        </form>
</Dialog>
  )
}

export default AddInvoice
