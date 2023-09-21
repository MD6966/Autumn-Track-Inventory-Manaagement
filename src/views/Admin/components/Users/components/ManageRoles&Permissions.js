import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, styled, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getUserPermissions} from '../../../../../store/actions/adminActions'
import { useLocation, useParams } from 'react-router';
import RolesPermissions from './RolesPermissions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const StyledRoot = styled(Box)(({theme})=>({
    padding:theme.spacing(5),
    display:'flex',
    // justifyContent:'center',
    alignItems:'center'
}))

// const tableData = [
//     {name:'Facilities', description:[
//         {name:'No Permission', value:'no_permission'},
//         {name:'View', value:'view'},
//         {name:'View / Edit', value:'view_edit'},
//     ]},
//     {name:'Invoices', description:[
//         {name:'No Permission', value:'no_permission'},
//         {name:'View', value:'view'},
//         {name:'View / Edit', value:'view_edit'},
//     ]},
//     {name:'Categories', description:[
//         {name:'No Permission', value:'no_permission'},
//         {name:'View', value:'view'},
//         {name:'View / Edit', value:'view_edit'},
//     ]},
//     {name:'Vendors', description:[
//         {name:'No Permission', value:'no_permission'},
//         {name:'View', value:'view'},
//         {name:'View / Edit', value:'view_edit'},
//     ]},
//     {name:'Users', description:[
//         {name:'No Permission', value:'no_permission'},
//         {name:'View', value:'view'},
//         {name:'View / Edit', value:'view_edit'},
//     ]},
// ]
const ManageRolesPermissions = () => {
  const {state} = useLocation()
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          Manage Roles And Permissions
        </Toolbar>
      </AppBar>
      <StyledRoot>
           <RolesPermissions permissions = {state.permissions} />
        </StyledRoot>

      {/* <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Manage Roles and Permissions
            </Typography>
            <Button autoFocus color="inherit" onClick={props.close}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <StyledRoot>
            <Table>
                <TableHead >
                    <TableRow sx={{background:theme.palette.primary.main}}>
                        <TableCell sx={{color:'#fff'}}>Values</TableCell>
                        <TableCell sx={{color:'#fff'}}>Permissions</TableCell>            
                    </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Facilities
                    </TableCell>
                    <TableCell>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Permissions</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={selectedValues.facilities}
                      value={selectedValues.facilities}
                      onChange={handleFacilityChange}
                      >
                      <FormControlLabel value="no_permission" control={<Radio />} label="No Permission" />
                      <FormControlLabel value="view" control={<Radio />} label="View Only" />
                      <FormControlLabel value="view_edit" control={<Radio />} label="View & Edit" />
                      </RadioGroup>
                      </FormControl>
                    </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Categories
                        </TableCell>
                        <TableCell>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Permissions</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={selectedValues.categories}
                      value={selectedValues.categories}
                      onChange={handleCategoryChange}
                    >
                      <FormControlLabel value="no_permission" control={<Radio />} label="No Permission" />
                      <FormControlLabel value="view" control={<Radio />} label="View Only" />
                      <FormControlLabel value="view_edit" control={<Radio />} label="View & Edit" />
                      </RadioGroup>
                      </FormControl>
                    </TableCell>
                      </TableRow>
                    <TableRow>
                      <TableCell>
                        Vendors
                      </TableCell>
                      <TableCell>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Permissions</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={selectedValues.vendors}
                      value={selectedValues.vendors}
                      onChange={handleVendorChange}
                    >
                      <FormControlLabel value="no_permission" control={<Radio />} label="No Permission" />
                      <FormControlLabel value="view" control={<Radio />} label="View Only" />
                      <FormControlLabel value="view_edit" control={<Radio />} label="View & Edit" />
                      </RadioGroup>
                      </FormControl>
                    </TableCell>
                    </TableRow>
                   <TableRow>
                   <TableCell>
                    Users
                   </TableCell>
                   <TableCell>
                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Permissions</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      defaultValue={selectedValues.users}
                      value={selectedValues.users}
                      onChange={handleUserChange}
                    >
                      <FormControlLabel value="no_permission" control={<Radio />} label="No Permission" />
                      <FormControlLabel value="view" control={<Radio />} label="View Only" />
                      <FormControlLabel value="view_edit" control={<Radio />} label="View & Edit" />
                      </RadioGroup>
                      </FormControl>
                    </TableCell>
                   </TableRow>
                    
                    
                    
                </TableBody>
            </Table>

            <Button
          variant="contained"
          color="primary"
          onClick={displaySelectedValues}
        >
          Display Selected Values
        </Button>
        </StyledRoot>
      </Dialog> */}

    </div>
  )
}

export default ManageRolesPermissions
