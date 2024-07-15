import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Ellipsis icon

const LatestProductsTable = ({ products }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
       Order History
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="latest products table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(0, 5).map((product) => (
            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <img src={product.imageUrl} alt={product.description} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.lastUpdated}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="more actions">
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="body2" sx={{ p: 2, textAlign: 'right' }}>
        <a href="/view-all-products">View All</a>
      </Typography>
    </TableContainer>
  );
};

export default LatestProductsTable;
