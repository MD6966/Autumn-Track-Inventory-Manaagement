import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
Button,DialogActions
} from '@mui/material'

const AddFacility = (props) => {
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
        console.log(formValues)
    }

  return (
    <div>
       <Dialog open={props.open} onClose={props.close}>
          <DialogTitle>Add Facility Name</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Facility Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formValues.name}
            />
            <TextField 
            label="Email"
            fullWidth
            name='email'
            value={formValues.email}
            sx={{mt:2}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={props.close} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default AddFacility
