import * as React from 'react';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../../modules/dashboard/listItems';
import AccountPopover from './account-popover';
import Notifications from './notifications';



const drawerWidth = 240;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        PWEZA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    marginLeft: 0,
  }),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      backgroundColor: '#121212', // Dark background color
      color: '#fff', // Text color for the items
      height: '100vh',
      ...openedMixin(theme),
      ...(!open && {
        ...closedMixin(theme),
      }),
    },
  }),
);


const defaultTheme = createTheme();


function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    { id: 1, senderName: 'Jie Yan',  jobTitle: 'Remote React / React Native Developer', date: 'Jun 21', time: '09:12 AM', read: false },
    { id: 2, senderName: 'Fran Perez',  jobTitle: 'Senior Golang Backend Engineer', date: 'Jun 17', time: '11:01 AM', read: true },
    { id: 3, senderName: 'System',  jobTitle: 'Logistics management is now available', date: 'Jun 15', time: '09:15 AM', read: false },
    // Add more notifications as needed
  ]);

  const handleClickNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const unreadNotifications = notifications.filter((notif) => !notif.read);
  const readNotifications = notifications.filter((notif) => notif.read);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={!open} sx={{
        backgroundImage: 'linear-gradient(to right, #ffffff,#FFF, #FF4000)',
        color: 'white'
      }}>
        <Toolbar
          sx={{
            pr: '24px', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              color: '#000',
              ...(!open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src="/PWEZA.svg" alt="PWEZA Logo" style={{ height: '70px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" onClick={handleClickNotifications}>
                <Badge badgeContent={unreadNotifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Notifications
                anchorEl={anchorEl}
                onClose={handleCloseNotifications}
                notifications={notifications}
                markAsRead={markAsRead}
              />
          <AccountPopover />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={!open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton sx={{color: "#fff"}} onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
       
        <Grid container spacing={3} sx={{ mt: 2, display: 'flex' ,flexGrow: 1, p: 3 }} >
          {children}
        </Grid>
     
      </Grid>
      <Box
        sx={{

        
          p: 4,
        }}
      >
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
