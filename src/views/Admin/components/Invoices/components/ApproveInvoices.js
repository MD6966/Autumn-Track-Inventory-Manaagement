import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { changeInvoiceAssign, getUsersByRole } from '../../../../../store/actions/adminActions';
import { useSnackbar } from 'notistack';
import { RotatingLines } from 'react-loader-spinner';
const ApproveInvoices = (props) => {
    console.log(props.invoiceId)
    const [data , setData] = React.useState([])
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const getUsers = () => {
        dispatch(getUsersByRole(props.data)).then((result) => {
            setData(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    React.useEffect(()=> {
        getUsers()
    },[])
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(changeInvoiceAssign(props.invoiceId,age,props.status)).then((result) => {
            setLoading(false)
            props.close()
            setAge('')
            enqueueSnackbar(result.data.message, {
                variant: "success",
            })
            props.createSuccess()
        }).catch((err) => {
            console.log(err)
        });
       
    }
  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={props.close}>
            <form onSubmit={handleSubmit}>
        <DialogTitle>
            Assign To
        </DialogTitle>
        <Divider />
        <DialogContent>

        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select"
          onChange={handleChange}
        >
         {data.map((val, ind)=> {
             return(
                 <MenuItem value={val.id}>{val.name}</MenuItem>
            )
        })}
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={props.close}>
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
                > Approve </Button>
                }
        </DialogActions>
        </form>
        </Dialog> 
    </div>
  )
}

export default ApproveInvoices
