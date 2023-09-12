import React from 'react';
import { Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Tooltip, styled, Box, Button, useTheme } from '@mui/material';
import Page from '../../../../components/page';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const StyledRoot = styled(Box)(({theme})=> ({
  padding: theme.spacing(3)
}))
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));
const Vendors = () => {
  const classes = useStyles();
  const theme = useTheme()
  const vendors = [
    { id: 1, name: 'Vendor 1', category: 'Category A' },
    { id: 2, name: 'Vendor 2', category: 'Category B' },
    { id: 3, name: 'Vendor 3', category: 'Category C' },
  ];

  return (
    <Page
    title="Vendors"
    >
      <StyledRoot>
      <Button variant='contained' endIcon={<AddCircleIcon />} sx={{mb:2}}>
            Add Vendor
          </Button>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Vendors Table">
        <TableHead>
          <TableRow>
            <TableCell>Sr no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor, index) => (
            <TableRow key={vendor.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>
              <Tooltip
            title="Edit Name"
            >
            <IconButton edge="end" aria-label="Edit">
              <EditIcon 
              sx={{color:theme.palette.primary.main}}
              />
            </IconButton>
              </Tooltip>
              <Tooltip title="Delete Name">
            <IconButton edge="end" aria-label="Delete">
              <DeleteIcon 
              sx={{color:theme.palette.primary.main}}
              />
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

export default Vendors
