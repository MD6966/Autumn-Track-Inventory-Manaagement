import { Avatar, Box, Button, TextField, Typography, styled,useTheme } from '@mui/material'
import React, { useState, useEffect }  from 'react'
import Page from '../../../../../components/page'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getMsgs, sendMessage } from '../../../../../store/actions/adminActions'
import Message from './Message'
import { RotatingLines } from 'react-loader-spinner'
const StyledRoot = styled(Box)(({theme})=> ({
    padding: theme.spacing(3)
  }))
const Chats = () => {
    const {id} = useParams()
    const user_id = useSelector((state)=>state.admin.user.id)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const theme = useTheme()
    const sendMsg = () => {
        setLoading(true)
        const body = {
            invoice_id:id,
            send_by:user_id,
            text:message
        }
        dispatch(sendMessage(body)).then((result) => {
            setLoading(false)
            getMessages()
            setMessage('')
        }).catch((err) => {
            setLoading(false)
            console.log(err)
        });
    }
    const getMessages = () => {
        dispatch(getMsgs(id)).then((result) => {
            setMessages(result.data.data)
        }).catch((err) => {
            console.log(err)
        });
    }
    React.useEffect(()=> {
        getMessages()
        const intervalId = setInterval(getMessages, 5000);
        return () => {
            clearInterval(intervalId);
          };
      
    },[])
    const scrollref = React.useRef()
    React.useEffect(()=> {
        scrollref.current?.scrollIntoView({behavior:"smooth"})
    },[messages])
  return (
    <Page
    title="Chat"
    >
        <StyledRoot>
       
    <Box sx={{p:7}}>
    <Box sx={{display:'flex', flexDirection:'column'}}>
        {
            messages.map((val, ind)=> {
                return(
                    <div ref={scrollref}>
                    <Message 
                    val={val}
                    isSent={user_id == val.send_by ? true : false}
                    />
                    </div>
                )
            })
        }

        </Box>      
    </Box>
        </StyledRoot>
        <Box sx={{ display: 'flex', position: 
        'fixed', top: 'auto', bottom: 0,
        p:2, 
        width: '100%',
        background:'#e2e2e2'
        }}>
  <TextField 
    placeholder='Write Something Here'
    name='message'
    autoComplete='off'
    value={message}
    onChange={(e)=>setMessage(e.target.value)}
    sx={{ width: '65%',ml:5 }}
  />
  {
    loading ? 
    <Button variant='contained' sx={{ width: '10%' }}>
        <RotatingLines 
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={loading}
        />
    </Button> :
     <Button variant={message == '' ? 'disabled' : 'contained'} sx={{ width: '10%' }}
     onClick={sendMsg}
     >Send</Button>

  }
 
</Box>
    </Page>
  )
}

export default Chats
