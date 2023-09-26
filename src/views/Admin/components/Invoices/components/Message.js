import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const Message = (props) => {
  const { isSent, val } = props;
  const user_id = useSelector((state) => state.admin.user.id);

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
            borderRadius: 10,
            background: isSent ? '#e2e2e2' : '#002448',
            maxWidth: '400px',
            minWidth:'200px',
            overflowWrap: 'break-word', 
            whiteSpace: 'pre-wrap', 
          }}
        >
          <Typography
            sx={{ color: isSent ? '#000' : '#fff', fontSize: '19px' }}
          >
            {val.text}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: isSent ? '#000' : '#fff',
              textAlign: 'right',
            }}
          >
            {val.send_by == user_id ? 'You' : val.sender.name + ' (' + val.sender.role_name + ')'}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Message;
