import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import {Box,MenuList,ListItemIcon} from '@mui/material';
import PortraitIcon from '@mui/icons-material/Portrait';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha, styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { getFromLocalStorage, removeItem } from '../../common/utils/LocalStorage';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
  '& .MuiListItemIcon-root': {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.2rem',
  },
}));

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const account = getFromLocalStorage("user") || {}
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleLogout = () => {
    removeItem("user");
    navigate(`/sign-in`);
  };

  const handleSettings = () => {
    // Navigate to account settings page
    navigate(`/pweza/account`);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src=""
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>
      <Popover
      anchorEl={open}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={handleClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{account?.firstName} {account?.lastName}</Typography>
        <Typography color="text.secondary" variant="body2">
          {account?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>

        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <PortraitIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
    
    </>
  );
}
