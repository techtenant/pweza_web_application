import React, { useState, useMemo } from 'react';
import {
    MaterialReactTable,
    flexRender

} from 'material-react-table';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useQuery } from "@tanstack/react-query";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProducts, deleteProducts } from '../../common/apis/product';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Breadcrumbs, Chip, Box, Divider, Grid, Menu, MenuItem } from '@mui/material';
import { setLocalStorage, removeItem } from '../../common/utils/LocalStorage';
import { ToastContainer, toast } from 'react-toastify';
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDeleteModalOpen, setOpenDeleteModal] = useState(false);
    const open = Boolean(anchorEl);

    const [id, setId] = useState();


    const handleClick = (event, params) => {

        setAnchorEl(event.currentTarget);
        setSelectedRow(params);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        setLocalStorage("products-detail-row", selectedRow);
        navigate(`/pweza/newProduct`);
    };
    const handleDelete = async () => {
        try {
            await deleteProducts(selectedRow.id);
            await refetch();
            setOpenDeleteModal(false);

            toast.success(`You have Successfully deleted the product.`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                // onClose: handleToastClose,
            });

        } catch (error) {
            console.error('Error deleting Product.Please contact our ICT team for further guidance', error);
        }
    };

    function handleOpenDeleteModal(id) {
        setId(id);
        setOpenDeleteModal(true);
        handleClose();
    }

    function handleCloseModal() {
        setOpenDeleteModal(false);
    }
    const navigate = useNavigate();
    const { data: DeliveryData, isLoading, refetch } = useQuery({
        queryKey: 'products',
        queryFn: getProducts
    });

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                size: 80,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 80,
            },
            {
                accessorKey: 'size',
                header: 'Size',
                size: 80,
            },
            {
                accessorKey: 'color',
                header: 'Color',
                size: 80,
            },
            {
                accessorKey: 'weight',
                header: 'Weight',
                size: 80,
            },
            {
                accessorKey: 'condition',
                header: 'Condition',
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
                        enableRowActions
                        positionActionsColumn="last"
                        renderRowActions={({ row, table }) => {
                            return (
                                <>
                                    <Button
                                        startIcon={<MoreVertIcon />}
                                        size="small"
                                        onClick={(event) => handleClick(event, row.original)}
                                    ></Button>
                                    <Menu
                                        id={`demo-customized-menu-${row.original.id}`}
                                        MenuListProps={{
                                            'aria-labelledby': 'demo-customized-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem
                                            onClick={handleEdit}
                                            disableRipple
                                        >
                                            <EditIcon />
                                            Edit
                                        </MenuItem>

                                        <Divider />

                                        <MenuItem
                                            onClick={() => handleOpenDeleteModal(row.original.id)}
                                            disableRipple
                                        >
                                            <DeleteIcon />
                                            Delete
                                        </MenuItem>

                                    </Menu>
                                </>
                            )
                        }}

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
                <Dialog
                    open={isDeleteModalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete Product
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete The Product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleDelete}
                            color="primary"
                        >
                            Yes
                        </Button>
                        <Button onClick={handleCloseModal} color="error" autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>

            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default ProductList;