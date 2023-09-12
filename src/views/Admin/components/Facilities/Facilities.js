import React, {useState} from 'react'
import Page from '../../../../components/page'
import { Box, Button, styled,
  List, ListItem, ListItemText, ListItemSecondaryAction, 
  IconButton, Typography, Divider, useTheme, Tooltip,
  Dialog, DialogTitle,DialogActions,TextField, DialogContent 
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
const Facilities = () => {
  const classes = useStyles();
  const theme = useTheme()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [facilityName, setFacilityName] = useState('');
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddFacility = () => {
    console.log('Adding facility:', facilityName);
    handleCloseDialog();
  };
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];
  return (
    <Page
    title="Facilities"
    >
      <StyledRoot>
          <Button variant='contained' endIcon={<AddCircleIcon />} onClick={handleOpenDialog}>
            Add Facility Name
          </Button>
          <Box sx={{mt:2}}>
            <Typography variant='h4' fontWeight="bold" textAlign="center">
              All Facilities Names
            </Typography>
          </Box>
          <List>
      {items.map((item) => (
        <>
        <ListItem key={item.id} className={classes.listItemHover}>
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
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
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
        </>
      ))}
    </List>
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Add Facility Name</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              label="Facility Name"
              variant="outlined"
              fullWidth
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddFacility} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </StyledRoot>
    </Page>
  )
}

export default Facilities
