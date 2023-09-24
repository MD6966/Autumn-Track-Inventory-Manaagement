import React from 'react'
import Page from '../../../../../components/page'
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, styled, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getArchivedInvoices, removeFromArchive } from '../../../../../store/actions/adminActions'
import UnarchiveIcon from '@mui/icons-material/Unarchive';
const StyledRoot = styled(Box)(({theme})=> ({
    padding: theme.spacing(3)
  }))
const ArchivedInvoices = () => {
    const theme = useTheme()
    const id = useSelector((state)=>state.admin.user.id)
    const [invoices, setInvoices]=React.useState([])
    const dispatch = useDispatch()
    const getInvoices = () => {
        dispatch(getArchivedInvoices(id)).then((result) => {
            setInvoices(result.data.data.total_invoices)
        }).catch((err) => {
            console.log(err)
        });
    }
    React.useEffect(() => {
        getInvoices()
    },[])
    const handleUnArchive = (id) => {
        dispatch(removeFromArchive(id)).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }
  return (
    <Page
    title="Archived"
    >
        <StyledRoot>
            <Table sx={{mt:5}}>
                <TableHead>
                    <TableRow sx={{
                        background:theme.palette.primary.main
                    }}>
                        <TableCell sx={{color:'#fff'}}>Invoice Number</TableCell>
                        <TableCell sx={{color:'#fff'}}>Date of Invoice</TableCell>
                        <TableCell sx={{color:'#fff'}}>Due Date</TableCell>
                        <TableCell sx={{color:'#fff'}}>Amount Due</TableCell>
                        <TableCell sx={{color:'#fff'}}>Status</TableCell>
                        <TableCell sx={{color:'#fff'}}>Unarchive</TableCell>
                        <TableCell sx={{color:'#fff'}}>User</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        invoices.map((val,ind)=>{
                            return(
                                <TableRow>
                                <TableCell>{val.invoice_number}</TableCell>
                                    <TableCell>{val.date_of_invoice}</TableCell>
                                    <TableCell>{val.due_date}</TableCell>
                                    <TableCell>{val.total_amount_due}</TableCell>
                                    <TableCell>{val.status_name}</TableCell>
                                    <TableCell>
                                        <Button
                                        variant='outlined'
                                        onClick={()=>handleUnArchive(val.id)}
                                        sx={{textTransform:'none'}}
                                        endIcon={
                                            <UnarchiveIcon />
                                        }
                                        >
                                            Unarchive
                                        </Button>
                                    </TableCell>
                                    <TableCell>{val.assign ? val.assign.name: 'User Deleted'}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                   
                </TableBody>
            </Table>
        </StyledRoot>
    </Page>
  )
}

export default ArchivedInvoices
