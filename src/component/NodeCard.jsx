import { Avatar, Card, CardContent, CardHeader, IconButton,makeStyles,Typography } from '@material-ui/core'
import React from 'react'
import {DeleteOutlined} from '@material-ui/icons'
import{red,green,yellow,pink} from '@material-ui/core/colors'

const useStyles = makeStyles({
  unique: {
    border : (note) => {
      if (note.gender == 'female') {
        return '1px solid red'
      }
    }
  },
  avatar : {
    background : (note) => {
      if (note.gender == 'male') {
        return red[300]
      } 
      if (note.gender == 'female') {
        return pink[300]
      }
      if (note.trans == 'transgender') {
        return green[300]
      }
      return yellow[700]
    }
  }
})

function NodeCard({note, handleDelete}) {
  const classes = useStyles(note)
  return (
    <div>
      <Card elevation={2} className={classes.unique}>
        <CardHeader
          avatar = {
            <Avatar className={classes.avatar
            }>
              {note.gender[0].toUpperCase()}
            </Avatar>
          }
          title={note.title}
          subheader={note.gender}
          action = {
            <IconButton onClick={() => handleDelete(note.id) }>
              <DeleteOutlined/> 
            </IconButton>
          } 
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default NodeCard
