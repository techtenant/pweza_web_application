import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { green, orange, red ,grey} from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return green[500];
    case 'Pending':
      return orange[500];
    case 'Refunded':
      return red[500];
    default:
      return grey[500];
  }
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '10px',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.action.hover,
  color: theme.palette.text.primary,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Hover effect for rows
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));



const LatestOrders = ({ orders }) => {

  

  if (!orders || orders.length === 0) {
    return (
      <Typography variant="body1">No orders available.</Typography>
    );
  }

  return (
    <StyledTableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center', fontWeight: 'medium' }}>
        Active Orders
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="latest orders table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Order No</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {orders.slice(0, 5).map((order) => (
            <StyledTableRow key={order.orderNo}>
              <StyledTableCell>{order.orderNo}</StyledTableCell>
              <StyledTableCell>{order.customerName}</StyledTableCell>
              <StyledTableCell>{order.date}</StyledTableCell>
              <StyledTableCell 
                sx={{
                  backgroundColor: getStatusColor(order.status),
                  borderRadius: '10px',
                  color: '#fff',
                  padding: '5px 10px',
                  display: 'inline-block',
                }}
              >
                {order.status}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" sx={{ p: 2, textAlign: 'right' }}>
        <a href="/view-all-orders">View All</a>
      </Typography>
    </StyledTableContainer>
  );
};

export default LatestOrders;
