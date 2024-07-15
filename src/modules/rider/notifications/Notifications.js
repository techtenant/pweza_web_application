import React, { useState, useMemo } from 'react';
import {
    MaterialReactTable,
    flexRender

} from 'material-react-table';
import { useQuery } from "@tanstack/react-query";
import {ExpandMore as ExpandMoreIcon,Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getRiderDeliveries} from '../../../common/apis/delivery';
import { getOrderByUserId, postAcceptOrder,postRejectOrder} from '../../../common/apis/orders';
import { Button, Typography, Grid, Breadcrumbs,Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Accordion, AccordionSummary,
    AccordionDetails ,Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,Paper,Box,Divider} from '@mui/material';
import { setLocalStorage, removeItem, getFromLocalStorage } from '../../../common/utils/LocalStorage';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';


const deldata = [
    { id: 1, distance: 10, cost: 50, sourceAddress: '123 Main St', destinationAddress: '456 Elm St', status: 'Accepted' },
    { id: 2, distance: 20, cost: 100, sourceAddress: '789 Maple St', destinationAddress: '101 Pine St', status: 'Rejected' },
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
        const [rejectOpen, setRejectOpen] = useState(false);
        const [currentId, setCurrentId] = useState(null);
        const account = getFromLocalStorage("user");
    
        const navigate = useNavigate();
        const { data: deliveryData, isLoading, refetch } = useQuery({
            queryKey: ['deliveries',account.id],
            queryFn: getRiderDeliveries
        });
    
        const handleOpen = (id) => {
            setCurrentId(id);
            setOpen(true);
        };
        const handleRejectOpen = (id) => {
            setCurrentId(id);
            setRejectOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
            setCurrentId(null);
        };
        const handleRejectClose = () => {
            setRejectOpen(false);
            setCurrentId(null);
        };

        const handleRejectAction = (id) => {
            const queryKey = ["postAcceptOrder", id, account.id];

            // Call the postAcceptOrder function with the constructed queryKey
            postRejectOrder({ queryKey })
              .then((response) => {
                toast.warning(`You have rejected the delivery.`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    // onClose: handleToastClose,
                });
                refetch();
              })
              .catch((error) => {
                // Handle any errors here
                console.error("Error accepting order", error);
              });
             
              handleRejectClose();
        };
    
        const handleAction = (id) => {
            const queryKey = ["postAcceptOrder", id, account.id];

            // Call the postAcceptOrder function with the constructed queryKey
            postAcceptOrder({ queryKey })
              .then((response) => {
                toast.success(`You have Successfully accepted the delivery.`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    // onClose: handleToastClose,
                });
                refetch();
              })
              .catch((error) => {
                // Handle any errors here
                console.error("Error accepting order", error);
              });
             
            handleClose();
        };



        const handleNavigate = (selectedRow) => {
            setLocalStorage("navigation-detail-row", selectedRow);
            navigate(`/pweza/navigation`);
        }
    
    
        const columns = useMemo(() => [
           {
                accessorKey: 'id',
                header: 'Id',
                size: 80,
            },
            {
                accessorKey: 'order.orderDate',
                header: 'Order Date',
                size: 80,
            },
            {
                accessorKey: 'statusString',
                header: 'Status',
                size: 80,
                Cell: ({ cell }) => getStatusChip(cell.getValue())
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    <Button variant="contained" 
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={() => handleOpen(row.original.orderId)}
                    sx={{
                        fontWeight: "bolder",
                        background: "green",
                        "&:hover": {
                            background: "darkgreen",
                        },
                    }}
                     >
                        Accept
                    </Button>
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    <Button variant="contained" 
                    color="error"
                    startIcon={<CloseIcon />}
                    onClick={() => handleRejectOpen(row.original.id)}
                    sx={{
                        fontWeight: "bolder",
                        background: "red",
                        "&:hover": {
                            background: "darkred",
                        },
                    }}>
                        Reject
                    </Button>
                )
            },
            {
                accessorKey: 'actions',
                header: 'Actions',
                size: 100,
                Cell: ({ row }) => (
                    row.original.status === 0 ? (
                        <Button variant="contained" 
                        sx={{
                            borderRadius: '10px',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                            padding: '10px 20px',
                            fontSize: '16px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                        onClick={() => handleNavigate(row.original)}>
                           View Pickup Location
                        </Button>
                    ) : null
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
    console.log("riderDe", deliveryData?.data);
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
                            data={deliveryData?.data || []}
                            isLoading={isLoading}
                            renderDetailPanel={({ row }) => {
                                return (
                                    <Accordion>
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                    >
                                      <Typography variant="h6">Order Summary</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Product</TableCell>
                                              <TableCell align="center">Quantity</TableCell>
                                              <TableCell align="center">Size</TableCell>
                                              <TableCell align="right">Color</TableCell>
                                              <TableCell align="right">Weight</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {row?.original.order?.orderDetails?.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="center">{item.product.size}</TableCell>
                                                <TableCell align="right">{item.product.color}</TableCell>
                                                <TableCell align="right">{item.product.weight}</TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table>
                                      </TableContainer>
                                      {/* <Box sx={{ mt: 2 }}>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography>Subtotal</Typography>
                                          <Typography>43</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography>Discount</Typography>
                                          <Typography>-</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography>Shipping</Typography>
                                          <Typography>56</Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography>Taxes</Typography>
                                          <Typography>78</Typography>
                                        </Box>
                                        <Divider sx={{ my: 2 }} />
                                        <Box display="flex" justifyContent="space-between">
                                          <Typography variant="h6">Total</Typography>
                                          <Typography variant="h6">66</Typography>
                                        </Box>
                                      </Box> */}
                                    </AccordionDetails>
                                  </Accordion>
                                );
                              }}
                        />
                    </ThemeProvider>
                </Grid>
                <ToastContainer />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{"Accept Delivery"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to accept  this delivery?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                       
                        <Button onClick={() => handleAction(currentId, 'Accepted')} color="primary">
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={rejectOpen} onClose={handleRejectClose}>
                    <DialogTitle>{" Reject Delivery"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to reject this delivery?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleRejectAction(currentId, 'Rejected')} color="secondary">
                            Reject
                        </Button>                      
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    };
    
export default NotificationsList;
