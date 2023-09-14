import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
    Button,DialogActions
    } from '@mui/material'
    import { useDispatch } from 'react-redux'
    import { addFacility } from '../../../../../store/actions/adminActions'
    import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddVendor = (props) => {
    const initialValues ={
        name:'',
        email:'',
        category:''
    }
    const dispatch = useDispatch()
    const [C, setC] = React.useState('');
  const handleChangeC = (event) => {
    setFormValues({...formValues, category :event.target.value})
  };
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
            sx={{mt:2, mb:2}}
            />
             <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValues.category}
          label="Category"
          name="category"
          onChange={handleChangeC}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
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

export default AddVendor
