import React, { useState, useMemo } from 'react';
import {
    MaterialReactTable,
    flexRender

} from 'material-react-table';
import { useQuery } from "@tanstack/react-query";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDeliveries} from '../../common/apis/delivery';
import { getProducts} from '../../common/apis/product';
import { Button, Breadcrumbs, Chip, Box, Grid, Typography } from '@mui/material';
import { setLocalStorage, removeItem } from '../../common/utils/LocalStorage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { green, orange, red ,grey} from '@mui/material/colors';


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

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591


const deldata = [
        { id: 1, distance: 10, cost: 50, sourceAddress: '123 Main St', destinationAddress: '456 Elm St', status: 'Pending' },
        { id: 2, distance: 20, cost: 100, sourceAddress: '789 Maple St', destinationAddress: '101 Pine St', status: 'Delivered' },
    ]
    
const PaymentList = () => {
    const navigate = useNavigate();
    const { data: DeliveryData, isLoading } = useQuery({
        queryKey: 'deliveries',
        queryFn: getDeliveries
    });

    const handlePayNow = (id) => {
        navigate(`/pweza/paymentcheckout`);
    };

    const handleTracking = (id) => {
        navigate(`/pweza/orderTracking`);
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 80,
        },
        {
            accessorKey: 'distance',
            header: 'Distance',
            size: 80,
        },
        {
            accessorKey: 'cost',
            header: 'Cost',
            size: 80,
        },
        {
            accessorKey: 'sourceAddress',
            header: 'Source Address',
            size: 80,
        },
        {
            accessorKey: 'destinationAddress',
            header: 'Destination Address',
            size: 80,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            size: 80,
            Cell: ({ cell }) => (
                <Typography style={{ color: getStatusColor(cell.getValue()) }}>
                    {cell.getValue()}
                </Typography>
            )
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            size: 100,
            Cell: ({ row }) => (
                row.original.status === 'Pending' ? (
                    <Button variant="contained" color="primary" onClick={() => handlePayNow(row.original.id)}>
                        Pay Now
                    </Button>
                ) : <Button variant="contained" color="primary" onClick={() => handleTracking(row.original.id)}>
                Track Order
            </Button>
            )
        }
    ], []);

    const tableTheme = useMemo(() => createTheme({
        palette: {
            background: {
                default: '#fff'
            }
        }
    }), []);

    return (
        <Grid container alignItems="stretch">
            <Grid item md={12} style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '20px' }}>
                    <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Home"
                        icon={<HomeIcon fontSize="small" />}
                    />
                    <StyledBreadcrumb component="a" href="#" label="Products" />
                </Breadcrumbs>
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable
                        columns={columns}
                        data={deldata || []}
                        isLoading={isLoading}
                    />
                </ThemeProvider>
            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default PaymentList;
