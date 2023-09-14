import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody, Skeleton 

} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { getCategories } from '../../../../store/actions/adminActions';
import AddCategory from './components/AddCategory';
const StyledRoot = styled(Box)(({theme})=> ({
  padding: theme.spacing(3)
}))
const useStyles = makeStyles((theme) => ({
  listItemHover: {
    '&:hover': {
      backgroundColor: '#e2e2e2',
    },
  },
}));
const Categories = () => {
  const classes = useStyles();
  const theme = useTheme()
  const [data, setData] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const items = [
    { id: 1, name: 'Item 1', email: 'email1@example.com' },
    { id: 2, name: 'Item 2', email: 'email2@example.com' },
    { id: 3, name: 'Item 3', email: 'email3@example.com' },
  ];
  const getAllCategories = () => {
    dispatch(getCategories()).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(() => {
    getAllCategories()
  },[])
  return (
    <Page
    title="Categories"
    >
      <StyledRoot>
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add Category
          </Button>
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Categories
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Category Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Name">
                      <IconButton edge="end" aria-label="Edit">
                        <EditIcon sx={{ color: theme.palette.primary.main }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Name">
                      <IconButton edge="end" aria-label="Delete">
                        <DeleteIcon sx={{ color: theme.palette.primary.main }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <AddCategory open={open} close={()=>setOpen(false)} />
        {
          data.length < 1 && <>
          <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />
        <Skeleton variant="rectangular" sx={{width:'100%', mb:1}}  height={80} />

          </>
        }
      </StyledRoot>
    </Page>
  )
}

export default Categories
