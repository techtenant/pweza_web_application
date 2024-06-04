import * as React from 'react';
import {Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';

export const mainListItems = (
  <React.Fragment>
     <ListItemButton component={Link} to="/pweza/dashboard">
      <ListItemIcon sx={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/orders">
      <ListItemIcon sx={{ color: 'white' }}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton >
      <ListItemIcon sx={{ color: 'white' }}>
        <CreditCardIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/pweza/delivery">
      <ListItemIcon sx={{ color: 'white' }}>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Product Delivery" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/feedback">
      <ListItemIcon sx={{ color: 'white' }}>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="UserFeedback" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton component={Link} to="/pweza/account">
      <ListItemIcon sx={{ color: 'white' }}>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon sx={{ color: 'white' }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
   
  </React.Fragment>
);
