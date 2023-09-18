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
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const StyledRoot = styled(Box)(({theme})=>({
    padding:theme.spacing(10),
    display:'flex',
    justifyContent:'center',
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
const ManageRolesPermissions = (props) => {
  const permissions = useSelector((state)=>state.admin.user.permissions)
  const user = useSelector((state)=>state.admin.user)
  // console.log(user, "User")
  const initialValues = {
    user_id:user.id,
    facilities:permissions.facilities,
    categories:permissions.categories,
    vendors:permissions.vendors,
    users:permissions.users
}
    const [selectedValues, setSelectedValues] = React.useState(initialValues)

    const handleRadioChange = (category, value) => {
        setSelectedValues((prevState) => ({
          ...prevState,
          [category]: value,
        }));
      };
      const displaySelectedValues = () => {
        console.log(selectedValues);
      };
      const handleFacilityChange = (e) => {
        setSelectedValues({...selectedValues, facilities:e.target.value})
      }
    const theme=useTheme()
  return (
    <div>
      <Dialog
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
                    {/* {tableData.map((val, ind)=> {
                        return(
                            <TableRow>
                        <TableCell>
                            {val.name}
                        </TableCell>
                        <TableCell>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={val.description[0].value}
                                value={selectedValues[val.name]}
                                name={`radio-buttons-group-${val.name}`}
                                onChange={(e) =>
                                  handleRadioChange(val.name, e.target.value)
                                }
                            >
                                {val.description.map((val, ind)=> {
                                    return(

                                        <FormControlLabel value={val.value} control={<Radio />} label={val.name} />
                                    )
                                })}
                            </RadioGroup>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                        )
                    })} */}
                    
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
      </Dialog>

    </div>
  )
}

export default ManageRolesPermissions
