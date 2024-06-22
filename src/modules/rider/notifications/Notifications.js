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
import { getDeliveries} from '../../../common/apis/delivery';
import { getProducts} from '../../../common/apis/product';
import { Button, Typography, Grid, Breadcrumbs,Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { setLocalStorage, removeItem } from '../../../common/utils/LocalStorage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';


const deldata = [
    { id: 1, distance: 10, cost: 50, sourceAddress: '123 Main St', destinationAddress: '456 Elm St', status: '' },
    { id: 2, distance: 20, cost: 100, sourceAddress: '789 Maple St', destinationAddress: '101 Pine St', status: '' },
];

const getStatusChip = (status) => {
    switch (status) {
        case 'Accepted':
            return <Chip icon={<CheckCircleIcon />} label="Accepted" style={{ backgroundColor: '#e0f7fa', color: '#00796b' }} />;
        case 'Canceled':
            return <Chip icon={<CancelIcon />} label="Canceled" style={{ backgroundColor: '#ffebee', color: '#c62828' }} />;
        case 'Rejected':
            return <Chip icon={<HighlightOffIcon />} label="Rejected" style={{ backgroundColor: '#fbe9e7', color: '#d84315' }} />;
        case 'Pending':
            return <Chip icon={<HourglassEmptyIcon />} label="Pending" style={{ backgroundColor: '#fff3e0', color: '#ef6c00' }} />;
        default:
            return <Chip label="Unknown" />;
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


    
    const NotificationsList = () => {
        const [data, setData] = useState(deldata);
        const [open, setOpen] = useState(false);
        const [currentId, setCurrentId] = useState(null);
    
        const navigate = useNavigate();
        const { data: DeliveryData, isLoading } = useQuery({
            queryKey: 'deliveries',
            queryFn: () => Promise.resolve(deldata) // Replace with your actual data fetching function
        });
    
        const handleOpen = (id) => {
            setCurrentId(id);
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
            setCurrentId(null);
        };
    
        const handleAction = (id, status) => {
            const updatedData = data.map(item => 
                item.id === id ? { ...item, status } : item
            );
            setData(updatedData);
            handleClose();
        };

        const handleNavigate = (id) => {
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
                Cell: ({ cell }) => getStatusChip(cell.getValue())
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    <Button variant="contained" sx={{borderRadius: '10px'}} color="primary" onClick={() => handleOpen(row.original.id)}>
                        Accept/Reject
                    </Button>
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    row.original.status === 'Accepted' ? (
                        <Button variant="contained" color="primary" onClick={() => handleNavigate(row.original.id)}>
                           View Pickup Location
                        </Button>
                    ) : null
                )
            }
        ], [data]);
    
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
                            data={data || []}
                            isLoading={isLoading}
                        />
                    </ThemeProvider>
                </Grid>
                <ToastContainer />
    
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Accept or Reject Delivery"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to accept or reject this delivery?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleAction(currentId, 'Rejected')} color="secondary">
                            Reject
                        </Button>
                        <Button onClick={() => handleAction(currentId, 'Accepted')} color="primary">
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    };
    
export default NotificationsList;
