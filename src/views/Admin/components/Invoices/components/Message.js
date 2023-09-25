import { Box, Typography } from '@mui/material'
import React from 'react'

const Message = (props) => {
  const {isSent, val} = props
    return (
    <div>
        
        <Box sx={{display:'flex', justifyContent:isSent ? 'flex-end' : 'flex-start',}}>
            <Box sx={{background:isSent ? '#e2e2e2' : '#002448', mb:2, p:2, borderRadius:10}}>
                <Typography sx={{color:isSent ? '#000' : '#fff'}}>
                    {val.text}
                </Typography>
            </Box>
        </Box>
    </div>
  )
}

export default Message
