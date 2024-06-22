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
import { Button, Breadcrumbs, Chip, Box, Grid } from '@mui/material';
import { setLocalStorage, removeItem } from '../../common/utils/LocalStorage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

const ProductList = () => {
    const navigate = useNavigate();
    const { data: DeliveryData, isLoading } = useQuery({
        queryKey: 'deliveries',
        queryFn: getDeliveries
    });
    
    const columns = useMemo(
        () => [
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
            },
           
        ],
        []
    );

    const tableTheme = useMemo(
        () =>
            createTheme({

                palette: {
                    background: {
                        default: '#fff'
                    }
                }
            })
    );
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
                        data={DeliveryData?.data || []}
                        isLoading={isLoading}
                        renderTopToolbarCustomActions={({ table }) => (
                            <Box
                              sx={{
                                display: "flex",
                                gap: "1rem",
                                p: "4px",
                                right: "15px",
                                position: "absolute",
                              }}
                            >
                              <Button
                                variant="contained"
                                startIcon={<AddCircleIcon />}
                                onClick={() => {
                                  removeItem('row-data');
                                  navigate("/pweza/newProduct");
                                }}
                                sx={{
                                  fontWeight: "bolder",
                                  background: "Black",
                                  "&:hover": {
                                    background: "Black",
                                    color: "white",
                                  },
                                }}
                              >
                                New Product
                              </Button>
            
                            </Box>
                          )}
                    />
                </ThemeProvider>
            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default ProductList;