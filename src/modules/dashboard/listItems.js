import * as React from 'react';
import {Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InventoryIcon from '@mui/icons-material/Inventory';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import GroupIcon from '@mui/icons-material/Group';

import { getFromLocalStorage,removeItem } from '../../common/utils/LocalStorage';
 
 
const getUserRole = () => {
  const account = getFromLocalStorage("user");
  console.log("ACCOUNT",account);
  return account ? account.roles : null;
};

const userRole = getUserRole();
 
const handleLogout = () => {
  // Remove user data from local storage
  removeItem("user");
 
 
};


export const mainListItems = (
 
     <React.Fragment>
     {(userRole && (userRole?.includes("Customer") || userRole?.includes("Admin")) || userRole?.includes("SuperAdmin")) && (
    <> 
     <ListItemButton component={Link} to="/pweza/dashboard">
      <ListItemIcon sx={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>    
    <ListItemButton component={Link} to="/pweza/products">
      <ListItemIcon sx={{ color: 'white' }}>
        <ProductionQuantityLimitsIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pweza/orders">
      <ListItemIcon sx={{ color: 'white' }}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
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
    </>
     )}
    {(userRole && (userRole?.includes("Rider") || userRole?.includes("Admin")) || userRole?.includes("SuperAdmin")) && (
      <>
      <ListItemButton component={Link} to="/pweza/riderdashboard">
      <ListItemIcon sx={{ color: 'white' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton> 
    <ListItemButton component={Link} to="/pweza/notifications">
      <ListItemIcon sx={{ color: 'white' }}>
        <CircleNotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Upcoming Orders" />
    </ListItemButton>
   </>
  
     )}


{(userRole && (userRole?.includes("Admin")) || userRole?.includes("SuperAdmin")) && ( 
    <>
  <ListItemButton component={Link} to="/pweza/roles">
    <ListItemIcon sx={{ color: 'white' }}>
      <ManageAccountsIcon />
    </ListItemIcon>
    <ListItemText primary="Roles" />
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
 <ListItemButton component={Link} to="/pweza/userManagement">
   <ListItemIcon sx={{ color: 'white' }}>
     <GroupIcon />
   </ListItemIcon>
   <ListItemText primary="User Management" />
 </ListItemButton>
   </>
       )}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      
    </ListSubheader>

    <ListItemButton component={Link} to="/pweza/account">
      <ListItemIcon sx={{ color: 'white' }}>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account" />
    </ListItemButton>
    <ListItemButton component={Link} to="/sign-in" onClick={handleLogout}>
      <ListItemIcon sx={{ color: 'white' }}>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>

   
  </React.Fragment>
);
