import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableHead, TableRow, TextField, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addInternalNote, getInternalNotes } from '../../../../../store/actions/adminActions'
import { useSnackbar } from 'notistack'

const InternalNoteDialog = (props) => {
    console.log(props.data)
  const theme = useTheme()
  const user_Id = useSelector((state)=> state.admin.user.id)
  const [note, setNote] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()

  const handleChange = (e) => {
    setNote(e.target.value)
  }
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const body={
        invoice_id : props.invoiceId,
        user_id : user_Id,
        note: note
    }
    dispatch(addInternalNote(body)).then((result) => {
        enqueueSnackbar(result.data.message, {
            variant:'success'
        })
        setLoading(false)
        setNote('')
        props.createsuccess()
        // props.close()
    }).catch((err) => {
        setLoading(false)
        console.log(err)
    });
  }
    return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.close}>
        <DialogTitle>
            All internal Notes
        </DialogTitle>
        <Divider />
        <DialogContent>
            <Table sx={{mb:3}}>
                <TableHead>
                    <TableRow sx={{background:theme.palette.primary.main}}>
                        <TableCell sx={{color:'#fff'}}>User</TableCell>
                        <TableCell sx={{color:'#fff'}}>Note</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data.map((val,ind)=> {
                            return(
                                <TableRow>
                        <TableCell>{val.user ? val.user.name : 'User Deleted'}</TableCell>
                        <TableCell>{val.note ? val.note : 'No Notes'}</TableCell>
                    </TableRow>
                            )
                        })
                    }
                    
                </TableBody>
            </Table>
            <form onSubmit={handleSubmit}>
            <TextField fullWidth multiline rows={4} label="Add Your Internal Note"
            name='note' value={note}
            onChange={handleChange}
            />
            {
                loading ?
            <Button sx={{float:'right', mt:2}} variant='contained'>...Loading</Button> :
            <Button sx={{float:'right', mt:2}} variant='contained' type='submit'> Add</Button>
            }
            </form>
        </DialogContent>
            <Divider />
        <DialogActions>
                <Button variant='outlined' onClick={props.close}>
                    Cancel
                </Button>
            </DialogActions>
      </Dialog>
    </div>
  )
}

export default InternalNoteDialog
