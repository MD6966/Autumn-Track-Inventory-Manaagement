import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react'
import { useDispatch } from 'react-redux';
import { assignFacility, getFacilities } from '../../../../../store/actions/adminActions';
import { useSnackbar } from 'notistack';

const AssignFacilityDialog = (props) => {
    const [age, setAge] = React.useState('');
    const [facilityData, setFacilityData] = React.useState([])
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const getFacilitiesData = () => {
        dispatch(getFacilities()).then((result) => {
            setFacilityData(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    React.useEffect(()=> {
        getFacilitiesData()
    }, [])

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch(assignFacility(props.invoiceId,age)).then((result) => {
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            setAge('')
            setLoading(false)
            props.createSuccess()
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
    }
  return (
    <div>
      <Dialog open={props.open} fullWidth onClose={props.close}>
        <form onSubmit={handleSubmit}>

        <DialogTitle>
            Assign Facility 
        </DialogTitle>
        <Divider />
        <DialogContent>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose Facility</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Choose Facility"
          onChange={handleChange}
        >
            {
                facilityData.map((val)=> {
                    return(
                        <MenuItem value={val.id}>{val.name}</MenuItem>
                    )
                })
            }
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close}>
                Cancel
            </Button>
            {
                loading ? 
                <Button variant='disabled'>
                ......Loading
            </Button> :
            <Button variant='contained' type='submit'>
            Assign
        </Button>
            }
        </DialogActions>
          </form>
      </Dialog>
    </div>
  )
}

export default AssignFacilityDialog
