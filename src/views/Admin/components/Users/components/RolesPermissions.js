import React from 'react'
import { Table, TableCell,TableRow,RadioGroup,FormLabel, FormControl,
Radio,FormControlLabel,TableHead,TableBody, useTheme, Button, Typography
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { UpdatePermissions } from '../../../../../store/actions/adminActions'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import { RotatingLines } from 'react-loader-spinner'

const RolesPermissions = (props) => {
  const {permissions} = props
  const theme = useTheme()
  const {enqueueSnackbar} = useSnackbar()
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()
  const initialValues = {
      user_id:permissions.user_id,
      facilities:permissions.facilities,
      categories:permissions.categories,
      vendors:permissions.vendors,
      users:permissions.users
    }
    const [selectedValues , setSelectedValues] = React.useState(initialValues)
    const handleFacilityChange = (e) => {
        setSelectedValues({...selectedValues, facilities:e.target.value})
    }  
    const handleCategoryChange = (e) => {
        setSelectedValues({...selectedValues, categories:e.target.value})
    }
      const handleVendorChange = (e) => {
          setSelectedValues({...selectedValues, vendors:e.target.value})
      }
      const handleUserChange = (e) => {
        setSelectedValues({...selectedValues, users:e.target.value})
      }
      const displaySelectedValues = () => {
        setLoading(true)
          dispatch(UpdatePermissions(selectedValues)).then((result) => {
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            setLoading(false)
            navigate('/admin/users')
          }).catch((err) => {
            setLoading(false)
            console.log(err)
          });
      };
    return (
    <div>
        {
            permissions ? 
            <>
            <Table sx={{mb:2}}>
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
                 {
          loading ? <Button variant='disabled'>    <RotatingLines
          strokeColor="#002448"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={loading}/> </Button> :
          <Button
          variant="contained"
          color="primary"
          onClick={displaySelectedValues}
        >
          Update Permissions
        </Button>
        }
                 
             </> : <Typography> ...Loading </Typography>
        }
       
    </div>
  )
}

export default RolesPermissions
