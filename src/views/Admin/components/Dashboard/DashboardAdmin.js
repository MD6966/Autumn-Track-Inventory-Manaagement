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
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardCounts, getUserPermissions } from '../../../../store/actions/adminActions';
import { useSpring, animated } from 'react-spring';
import { Link, useNavigate } from 'react-router-dom';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChartComponent from './components/ChartComponent';
import {Chart as ChartJS} from 'chart.js/auto'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';

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
  padding:theme.spacing(2),
  cursor:'pointer'
}))


const DashboardAdmin = () => {
  const [counts, setCounts] = React.useState([])
  const [chartData , setChartData] = React.useState([])
  const dispatch = useDispatch()
  const id = useSelector((state)=>state.admin.user.id)
  // console.log(id)
  const getCounts = () => {
    dispatch(getDashboardCounts(id)).then((result) => {
      setCounts(result.data.data)
      setChartData(result.data.data.six_month_invoices)
    }).catch((err) => {
      console.log(err)
    });
  }
  React.useEffect(()=> {
    getCounts()
  },[])
  const permission = useSelector((state)=>state.admin.user.permissions)
  // console.log(counts)
  const CardData = [
    {id:1, title:'Total Facilities', value:counts.facilities, 
    permission:permission.facilities,
    icon:<LocationOnIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>, to:"/admin/facilities"},
    {id:2, title:'Total Categories', value:counts.categories, 
    permission:permission.categories,
    icon:<CategoryIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>, to:"/admin/categories"},
    {id:3, title:'Total Vendors', value:counts.vendors,
    permission:permission.vendors,
    icon:<AdminPanelSettingsIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>,to:"/admin/vendors"},
    {id:4, title:'Total Users', value:counts.users, 
    permission:permission.users,
    icon:<GroupIcon sx={{color:'#fff', fontSize:'2.25rem'}}/> ,to:"/admin/users"},
    {id:5, title:'Total Invoices', value:counts.invoices, 
    permission:permission.invoices,
    icon:<ReceiptIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>, to:"/admin/invoices" },
    {id:6, title:'Pending Approvals', value:counts.pending_invoices, 
    icon:<ApprovalIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>,  to:"/admin/invoices"},
    {id:7, title:'New Invoices', value:counts.new_invoices, 
    permission:permission.new_invoices,
    icon:<ReceiptIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>, to:"/admin/new-invoices" },
    {id:8, title:'Approved By Admin', value:counts.approved_by_admin, 
    permission:permission.approved_by_admin,
    icon:<CheckBoxIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>, to:"/admin/approved-by-admin" },
    {id:9, title:'Approved By RA', value:counts.approved_by_RA, 
    permission:permission.approved_by_RA,
    icon:<CheckBoxIcon sx={{color:'#fff', fontSize:'2.25rem'}}/>, to:"/admin/approved-by-ra"},
    {
      id:10, title:'Unread Messages',icon:<MarkChatUnreadIcon sx={{color:'#fff', fontSize:'2.25rem'}} />,
      value:counts.unread_text_count, to:"/admin/invoices"
    }
  ]
  const AnimatedText = ({ value }) => {
    const springProps = useSpring({
      opacity: 1,
      from: { opacity: 0 },
    });
  
    return <animated.span style={springProps}>{value}</animated.span>;
  };
  const navigate= useNavigate()
  const seeDetail = (data) => {
    navigate(data.to)

  }
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
                  <>
                  {
                    val.permission == 'no_permission' ?
                    null :
                    <Grid item
                    xs={12}
                    md={6}
                    lg={3}
                    > 
                <StyledCard
                onClick={()=>seeDetail(val)}
                >
                  <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Box>
                   <Typography sx={{color:'#fff',}} 
                   fontWeight="bold" 
                   variant='h4'
                   >
                       <AnimatedText value={val.value} />
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
                    
                  }
                  </>
                )
              })
            }
                </Grid>
                <Divider sx={{mt:2}} />
                <Box sx={{width:'70vw',}}>
                  <ChartComponent data={chartData} />
                </Box>
            </StyledPaper> 
      </StyledRoot>
      
    </Page>
  )
}

export default DashboardAdmin
