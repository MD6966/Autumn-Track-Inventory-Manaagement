import React from 'react'
import { Dialog,DialogTitle,Divider,DialogContent,Typography,TextField,
Button,DialogActions,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addFacility } from '../../../../../store/actions/adminActions'
import { RotatingLines } from 'react-loader-spinner'
import { useSnackbar } from 'notistack'
const EditFacility = (props) => {
    console.log(...props.data)
    React.useEffect(()=> {
        // setFormValues(...props.data)
    }, [props.data])
    const dispatch = useDispatch()
    const initialValues ={
        name:'',
        email:''
    }
    const [formValues,setFormValues] = React.useState(initialValues)
    const [loading, setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(addFacility(formValues)).then((result) => {
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
          <DialogTitle>Edit Facility</DialogTitle>
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
          > Update </Button>
        }
          </DialogActions>
                </form>
        </Dialog>
    </div>
  )
}

export default EditFacility
