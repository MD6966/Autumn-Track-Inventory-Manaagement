import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
Button,DialogActions
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addFacility } from '../../../../../store/actions/adminActions'

const AddFacility = (props) => {
    const dispatch = useDispatch()
    const initialValues ={
        name:'',
        email:''
    }
    const [formValues,setFormValues] = React.useState(initialValues)
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addFacility(formValues)).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }

  return (
    <div>
       <Dialog open={props.open} onClose={props.close}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Add Facility Name</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Facility Name"
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
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button 
             color="primary" variant="contained"
            type='submit'
            >
              Add
            </Button>
          </DialogActions>
                </form>
        </Dialog>
    </div>
  )
}

export default AddFacility