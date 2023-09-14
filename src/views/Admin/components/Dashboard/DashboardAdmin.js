import React from 'react'
import Page from '../../../../components/page'
import { Box, Card, CardHeader, Divider, Grid, Paper, Typography, styled,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ApprovalIcon from '@mui/icons-material/Approval';
const StyledRoot = styled(Box)(({theme})=> ({
  minHeight:'100vh',
  background:'#e2e2e2',
  padding:theme.spacing(2)
}))
const StyledPaper=styled(Paper)(({theme})=>({
  minHeight:'100vh',
  borderRadius:theme.spacing(5),
  padding:theme.spacing(5),
}))

const StyledCard = styled(Card)(({theme})=> ({
  background: 'linear-gradient(135deg, #002448, #519ce8)',
  padding:theme.spacing(2)
}))

const CardData = [
  {id:1, title:'Total Facilities', value:3, icon:<LocationOnIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>},
  {id:2, title:'Total Categories', value:15, icon:<CategoryIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>},
  {id:3, title:'Total Vendors', value:8, icon:<AdminPanelSettingsIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>},
  {id:4, title:'Total Users', value:61, icon:<GroupIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>},
  {id:5, title:'Total Invoices', value:105, icon:<ReceiptIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>},
  {id:6, title:'Pending Approvals', value:12, icon:<ApprovalIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>},


  
]
const DashboardAdmin = () => {
  return (
    <Page
    title="Dashboard"
    >
      <StyledRoot>
          <StyledPaper>
            <Grid container spacing={4}>

            {
              CardData.map((val,ind)=> {
                return(
                  <Grid item
                  xs={12}
                  md={6}
                  lg={3}
                  > 
              <StyledCard>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                  <Box>
                 <Typography sx={{color:'#fff',}} 
                 fontWeight="bold" 
                 variant='h4'
                 >
                    {val.value}
                 </Typography>
                 <Typography sx={{color:'#fff', mt:1}} >
                  {val.title}
                 </Typography>
                   </Box>
                   <Box sx={{display:'flex',alignItems:'center'}}>
                    {val.icon}
                   </Box>
                 </Box>
              </StyledCard>

                  </Grid>
                )
              })
            }
                </Grid>
                <Divider sx={{mt:2}} />
            </StyledPaper> 
      </StyledRoot>
      
    </Page>
  )
}

export default DashboardAdmin
