import React from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, 
  Typography, Divider, useTheme, Tooltip,
  Table,TableHead,TableContainer,TableRow, TableCell,TableBody 

} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
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
  const items = [
    { id: 1, name: 'Item 1', email: 'email1@example.com' },
    { id: 2, name: 'Item 2', email: 'email2@example.com' },
    { id: 3, name: 'Item 3', email: 'email3@example.com' },
  ];
  return (
    <Page
    title="Categories"
    >
      <StyledRoot>
          <Button variant='contained' endIcon={<AddCircleIcon />}>
            Add Category Name
          </Button>
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Categories Names
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
              {items.map((item) => (
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
      </StyledRoot>
    </Page>
  )
}

export default Categories
