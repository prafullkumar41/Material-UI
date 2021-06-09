import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { Drawer, ListItem, ListItemIcon, ListItemText, makeStyles, Typography,List, AppBar, Toolbar } from '@material-ui/core'
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons'


const drawerWidth = 240
const useStyles = makeStyles((theme) => {
  return{
    root:{
      display:'flex'
    },
    page:{
      background: '#f9f9f9',
      width:'100%'
    },
    drawer:{
      width:drawerWidth
    },
    drawerPaper:{
      width:drawerWidth
    },
    active:{
      background:'#f4f4f4'
    },
    appbar:{
      width :`calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar
}})

function Layout({children}) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const menuItems = [
    {
      text: 'My Notes',
      icon : <SubjectOutlined color="secondary"/>,
      path : '/'
    },
    {
      text: 'Create Notes',
      icon : <AddCircleOutline color="secondary"/>,
      path : '/create'
    }
  ]
  return (
    <div className={classes.root}> 
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography>
            Welcome to website
          </Typography>
        </Toolbar>  
      </AppBar>  
      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{paper: classes.drawerPaper}}
      >
        <Typography variant='h5'>
          Ninja Notes
        </Typography>

        <List>
          {
            menuItems.map(item => (
              <ListItem 
                key={item.text}
                button
                onClick ={() => history.push(item.path) }
                className={location.pathname == item.path ? classes.active: null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItem>
            ))
          }
        </List>

      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout
