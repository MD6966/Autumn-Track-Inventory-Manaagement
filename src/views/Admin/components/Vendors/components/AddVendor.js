import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
    Button,DialogActions
    } from '@mui/material'
    import { useDispatch } from 'react-redux'
    import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {addVendor } from '../../../../../store/actions/adminActions';
import { useSnackbar } from 'notistack';
import { RotatingLines } from 'react-loader-spinner';
const AddVendor = (props) => {
    const initialValues ={
        name:'',
        email:'',
        category_id:'',
        password:'',
    }
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
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
        dispatch(addVendor(formValues)).then((result) => {
          setLoading(false)
          setFormValues(initialValues)
          props.onCreateSuccess()  
          enqueueSnackbar(result.data.message, {
              variant:'success'
            })
        }).catch((err) => {
          setLoading(false)
            console.log(err)
        });
    }

  return (
    <div>
     <Dialog open={props.open} onClose={props.close}>
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
            required
            type='passsword'
            label="Password"
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
            props.data.map((val,ind)=>{
              return(
                <MenuItem value={val.id}>{val.name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
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
          variant='contained'
          > Add </Button>
        }
          </DialogActions>
                </form>
        </Dialog>
    </div>
  )
}

export default AddVendor
