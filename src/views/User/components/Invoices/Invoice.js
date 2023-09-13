import React from 'react'
import Page from '../../../../components/page'
import { Button } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateInvoice from './components/CreateInvoice';
const Invoice = () => {
    const [open, setOpen] = React.useState(false)
  return (
    <Page
    title="Invoices"
    >
        <Button variant='contained'
        endIcon={<EditNoteIcon />}
        onClick={()=> setOpen(true)}
        >
            Create Invoice
        </Button>
        <CreateInvoice open={open} close={()=>setOpen(false)} />
    </Page>
  )
}

export default Invoice
