import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
    Button,DialogActions,FormControl,InputLabel,Select,MenuItem
    } from '@mui/material'
    import { useDispatch } from 'react-redux'
import {addUser } from '../../../../../store/actions/adminActions'
import { useSnackbar } from 'notistack'
import { RotatingLines } from 'react-loader-spinner'
const AddUser = (props) => {
  const arr = Object.keys(props.data).map((key) => ({
    key,
    value: props.data[key],
  }));
    const dispatch = useDispatch()
    const initialValues ={
        name:'',
        email:'',
        password:'',
        role:''
    }
    const [formValues,setFormValues] = React.useState(initialValues)
    const {enqueueSnackbar} = useSnackbar()
    const [loading, setLoading] = React.useState(false)
    const handleChangeR = (event) => {
      setFormValues({...formValues, role :event.target.value})
    };
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
      console.log(formValues)
      setLoading(true)
        e.preventDefault()
        dispatch(addUser(formValues)).then((result) => {
          setLoading(false)
          setFormValues(initialValues)  
          enqueueSnackbar(result.data.message, {
              variant:'success'
            })
            props.onCreateSuccess()
        }).catch((err) => {
          setLoading(false)
            console.log(err)
        });
    }
  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Add User</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Name"
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
             <TextField 
            required
            label="Password"
            fullWidth
            name='password'
            value={formValues.password}
            onChange={handleChange}
            sx={{mt:2, mb:2}}
            />
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues.role}
          label="Role"
          name="role"
          onChange={handleChangeR}
        >
          {
            arr.map((val,ind)=>{
              // console.log(val)
              return(
                <MenuItem value={val.value}>{val.value}</MenuItem>
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

export default AddUser
