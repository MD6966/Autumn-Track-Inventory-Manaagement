import { Box, styled,Table,TableCell,Button,TableRow,Skeleton,
  Typography,TableBody,TableContainer,TableHead, useTheme } from '@mui/material'
import React from 'react'
import Page from '../../../../components/page'
import { useDispatch, useSelector } from 'react-redux'
import { getInvoices } from '../../../../store/actions/adminActions'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const StyledRoot = styled(Box)(({theme})=> ({
  padding: theme.spacing(3)
}))
const NewInvoices = () => {
  const type = 'new_invoices'
  const [invoices, setInvoices] = React.useState([])
  const user_Id = useSelector((state)=>state.admin.user.id)
  const [iL, setIl] = React.useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()
  const getAllInoices = () => {
    setIl(true)
    dispatch(getInvoices(user_Id, type)).then((result) => {
      setInvoices(result.data.data.new_invoices)
      setIl(false)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getAllInoices()
  }, [])

  return (
    <Page
    title="New Invoices"
    >
      <StyledRoot>
          <Box sx={{mt:2, mb:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All New Invoices
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead sx={{background:theme.palette.primary.main}}>
              <TableRow>
                <TableCell sx={{color:'#fff'}}>Invoice Number</TableCell>
                <TableCell sx={{color:'#fff'}}>Date of Invoice</TableCell>
                <TableCell sx={{color:'#fff'}}>Due Date</TableCell>
                <TableCell sx={{color:'#fff'}}>Amount Due</TableCell>
                <TableCell sx={{color:'#fff'}}>Status</TableCell>
                <TableCell sx={{color:'#fff'}}>Invoice</TableCell>
                <TableCell sx={{color:'#fff'}}>User</TableCell>


              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((item) => {
                return(
                  <TableRow key={item.id}>
                  <TableCell>{item.invoice_number}</TableCell>
                  <TableCell>{item.date_of_invoice}</TableCell>
                  <TableCell>{item.due_date}</TableCell>
                  <TableCell>{item.total_amount_due}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    <Button
                    variant='contained'
                    endIcon={
                      <RemoveRedEyeIcon />
                    }
                    >
                      View
                    </Button>
                  </TableCell>
                  <TableCell>{item.assign ? item.assign.name : "User Deleted"}</TableCell>
                </TableRow>
                )
              })}
               { (invoices.length < 1 && !iL) &&
          <TableRow >
            <TableCell colSpan={9} sx={{textAlign:'center'}}>
               No Data Found...
            </TableCell>
        </TableRow>
        }
            </TableBody>
          </Table>
        </TableContainer>
        {
          iL && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
      </StyledRoot>
    </Page>
  )
}

export default NewInvoices
