import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
    Button,DialogActions
    } from '@mui/material'
    import { useDispatch } from 'react-redux'
import { addCategory } from '../../../../../store/actions/adminActions'
import { RotatingLines } from 'react-loader-spinner'
import { useSnackbar } from 'notistack'

const AddCategory = (props) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const{enqueueSnackbar} = useSnackbar()
    const initialValues ={
        name:'',
    }
    const [formValues,setFormValues] = React.useState(initialValues)
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
      setLoading(true) 
      e.preventDefault()
        dispatch(addCategory(formValues)).then((result) => {
          setLoading(false)  
          enqueueSnackbar(result.data.message, {
            variant:'success'
          })
          setFormValues(initialValues)
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

export default AddCategory
