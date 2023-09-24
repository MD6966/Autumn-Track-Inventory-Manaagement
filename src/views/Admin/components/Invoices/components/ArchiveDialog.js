import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToArchive } from '../../../../../store/actions/adminActions'
import { useSnackbar } from 'notistack'

const ArchiveDialog = (props) => {
    // console.log(props.invoiceId)
    const user_id = useSelector((state)=>state.admin.user.id)
    const dispatch = useDispatch()
    const [note, setNote] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const {enqueueSnackbar} = useSnackbar()
    const handleArchive = () => {
        setLoading(true)
        const body = {
            note,
            user_id
        }
        dispatch(addToArchive(props.invoiceId,body)).then((result) => {
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            setLoading(false)
            setNote('')
            props.createSuccess()
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
    }
  return (
    <Dialog open={props.open} 
    fullWidth onClose={props.close}>
        <DialogTitle>
            Add to Archive
        </DialogTitle>
        <Divider />
        <DialogContent>
            <TextField 
            label="Add internal notes"
            name='note'
            value={note}
            onChange={(e)=>setNote(e.target.value)}
            fullWidth
            multiline
            rows={6}
            />
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={props.close}>
                Cancel
            </Button>
            {
                loading ? 
                <Button variant='outlined'
                >
                    ...Loading
                </Button> :
                <Button variant='contained'
                onClick={handleArchive}
                >
                    Add to Archive
                </Button>
            }
            
        </DialogActions>
    </Dialog>
  )
}

export default ArchiveDialog
