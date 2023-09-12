import {Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        color:'red',
        fontSize:'3rem'
    }
}))
const Test = () => {
    const classes = useStyles()
  return (
    <div>
        <Typography className={classes.root}>
      Test abc
        </Typography>
    </div>
  )
}

export default Test
