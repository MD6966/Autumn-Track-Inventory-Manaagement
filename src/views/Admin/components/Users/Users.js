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
import { getRoles, getUsers } from '../../../../store/actions/adminActions';
import AddUser from './components/AddUser';
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
const Users = () => {
    const theme = useTheme()
    const [data, setData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [roles, setRoles] = React.useState([])
    const dispatch = useDispatch()
    const getAllRoles = () => {
      dispatch(getRoles()).then((result) => {
        setRoles(result.data.data)
      }).catch((err) => {
        console.log(err)
      });
    }
    const getAllUsers = () => {
        dispatch(getUsers()).then((result) => {
          setData(result.data.data)
        }).catch((err) => {
          console.log(err)
        });
      }
      React.useEffect(() => {
        getAllUsers()
        getAllRoles()
      },[])
      const handleCreateSuccess = () => {
        setOpen(false);
        getAllUsers()
      };
  return (
    <Page
    title="Categories"
    >
      <StyledRoot>
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={()=>setOpen(true)}>
            Add User
          </Button>
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Users
            </Typography>
          </Box>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>               
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
        <AddUser 
        open={open} 
        close={()=>setOpen(false)}
        data={roles}
         onCreateSuccess={handleCreateSuccess}
        
        />
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

export default Users
