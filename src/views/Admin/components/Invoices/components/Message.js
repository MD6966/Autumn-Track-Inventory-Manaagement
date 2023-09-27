import { Avatar, Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const Message = (props) => {
  const { isSent, val } = props;
  const user_id = useSelector((state) => state.admin.user.id);
    function getTimeAgo(createdAt) {
        const currentTime = new Date();
        const messageTime = new Date(createdAt);
        const timeDifferenceInSeconds = Math.floor((currentTime - messageTime) / 1000);
      
        if (timeDifferenceInSeconds < 60) {
          return `${timeDifferenceInSeconds} seconds ago`;
        } else {
          const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
          if (timeDifferenceInMinutes < 60) {
            return `${timeDifferenceInMinutes} minutes ago`;
          } else {
            const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
            if (timeDifferenceInHours < 24) {
              return `${timeDifferenceInHours} hours ago`;
            } else {
              const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
              return `${timeDifferenceInDays} days ago`;
            }
          }
        }
      }
      const timeAgo = getTimeAgo(val.created_at)
     
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isSent ? 'flex-end' : 'flex-start',
        }}
      >
        <Avatar
          sx={{
            mr: 1,
            mt: 1.5,
            height: '30px',
            width: '30px',
          }}
          src={isSent ? '/assets/images/user.png' : '/assets/images/admin.webp'}
        />
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 7,
            background: isSent ? '#e2e2e2' : '#002448',
            maxWidth: '450px',
            minWidth:'350px',
            overflowWrap: 'break-word', 
            whiteSpace: 'pre-wrap', 
          }}
        >
          <Typography
            sx={{ color: isSent ? '#000' : '#fff', fontSize: '19px' }}
          >
            {val.text}
          </Typography>
          <Divider sx={{mt:1, background:isSent?'null':'#e2e2e2',mb:0.5}}/>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography
          sx={{
            fontSize: '12px',
            color: isSent ? '#000' : '#fff',
            ml:1
        }}
          >
            {timeAgo}
          </Typography>
          <Box sx={{display:'flex'}}>
            <CheckCircleOutlineIcon sx={{fontSize:'17px', mr:0.5, color:isSent ? 'null' : '#fff'}}/>
          <Typography
            sx={{
                fontSize: '12px',
                color: isSent ? '#000' : '#fff',
                mr:1
            }}
            >
            {val.send_by == user_id ? 'You' : val.sender.name + ' (' + val.sender.role_name + ')'}
          </Typography>
                </Box>
         
              </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Message;
