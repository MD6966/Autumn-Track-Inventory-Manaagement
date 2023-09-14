import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
    Button,DialogActions
    } from '@mui/material'
    import { useDispatch } from 'react-redux'
import { addCategory } from '../../../../../store/actions/adminActions'


const AddCategory = (props) => {
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
        dispatch(addCategory(formValues)).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }

  return (
    <div>
     <Dialog open={props.open} onClose={props.close}>
            <form onSubmit={handleSubmit}>
          <DialogTitle>Add Category</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Category Name"
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

export default AddCategory
