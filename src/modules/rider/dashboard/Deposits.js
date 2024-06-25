import * as React from 'react';
import {Link,Card,Box,CardContent} from '@mui/material';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ title, value, icon: IconComponent, color }) {
  return (
    <Card sx={{ 
      flexGrow: 1,
      boxShadow: 3,
      borderRadius: '16px', // Rounded corners
      '&:hover': {
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)', // Elegant hover effect
      },
      '.MuiCardContent-root': {
        padding: '24px', // Inner spacing
      },
      '.MuiTypography-h5': {
        fontSize: '1.5rem', // Larger title font
        fontWeight: 'bold', // Bold title font
      },
      '.MuiTypography-h6': {
        fontSize: '1.25rem', // Subtitle font size
        color: 'rgba(0, 0, 0, 0.6)', // Subtitle font color for elegance
      },
      backgroundColor: '#ffffff', // Card background color
      color: '#333333', // Text color
      minHeight: '160px',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ color, mr: 1 }}>
            <IconComponent />
          </Box>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 1.5 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
