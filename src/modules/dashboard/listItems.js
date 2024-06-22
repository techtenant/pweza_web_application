import * as React from 'react';
import {Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import BarChartIcon from '@mui/icons-material/BarChart';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

export const mainListItems = (
  <React.Fragment>
     <ListItemButton component={Link} to="/pweza/dashboard">
      <ListItemIcon sx={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/settings">
      <ListItemIcon sx={{ color: 'white' }}>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/packages">
      <ListItemIcon sx={{ color: 'white' }}>
        <InventoryIcon />
      </ListItemIcon>
      <ListItemText primary="Packages" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/biketypes">
      <ListItemIcon sx={{ color: 'white' }}>
        <TwoWheelerIcon />
      </ListItemIcon>
      <ListItemText primary="Bike Types" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/bikes">
      <ListItemIcon sx={{ color: 'white' }}>
        <SportsMotorsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Bikes" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/products">
      <ListItemIcon sx={{ color: 'white' }}>
        <ProductionQuantityLimitsIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/delivery">
      <ListItemIcon sx={{ color: 'white' }}>
        <DeliveryDiningIcon />
      </ListItemIcon>
      <ListItemText primary="Product Delivery" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/payment">
      <ListItemIcon sx={{ color: 'white' }}>
        <CreditCardIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItemButton>  
    <ListItemButton component={Link} to="/pweza/feedback">
      <ListItemIcon sx={{ color: 'white' }}>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="UserFeedback" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/notifications">
      <ListItemIcon sx={{ color: 'white' }}>
        <CircleNotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
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
