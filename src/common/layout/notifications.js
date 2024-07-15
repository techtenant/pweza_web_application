import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
  Badge,
  Box,
} from '@mui/material';
import { Notifications as NotificationsIcon, Close as CloseIcon, Mail as MailIcon } from '@mui/icons-material';

const Notifications = ({ anchorEl, onClose, notifications, markAsRead }) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{ sx: { width: 350, maxHeight: 400 } }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', pb: 1 }}>
          Notifications
        </Typography>
        <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={onClose}>
          <MailIcon />
        </IconButton>
        <List>
          {notifications.map((notif) => (
            <ListItem key={notif.id} sx={{ display: 'flex', alignItems: 'flex-start' }}>
             
              <ListItemText
                primary={
                  <>
                    <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                      {notif.senderName}
                    </Typography>
                    {' added a new job '}
                    <Typography variant="body2" component="span" color="primary" sx={{ cursor: 'pointer' }}>
                      {notif.jobTitle}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      {notif.date}
                    </Typography>
                    {' - '}
                    <Typography variant="body2" component="span" color="textSecondary">
                      {notif.time}
                    </Typography>
                  </>
                }
              />
              <IconButton edge="end" onClick={() => markAsRead(notif.id)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>
  );
};

export default Notifications;
