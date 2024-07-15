import React, { useState, useMemo } from 'react';
import {
    MaterialReactTable,
    flexRender

} from 'material-react-table';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getBikes, postBikes, updateBikes, deleteBikes } from '../../common/apis/bike';
import { getBikeTypes } from '../../common/apis/bikeType';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, Breadcrumbs, DialogActions, Chip, Box, DialogContent, IconButton, DialogTitle, Grid } from '@mui/material';
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

const Bikes = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [formData, setFormData] = useState({ model: '', licensePlate: '', bikeTypeId: '' });
    const { data: BikesData, isLoading } = useQuery({
        queryKey: 'bikes',
        queryFn: getBikes
    });
    const { data: BikeTypesData } = useQuery({
        queryKey: 'bikeTypes',
        queryFn: getBikeTypes
    });
    const addMutation = useMutation({
        mutationFn: postBikes,
        onSuccess: () => {
            queryClient.invalidateQueries('bikes');
            toast.success('Bike details added successfully');
            handleClose();
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateBikes,
        onSuccess: () => {
            queryClient.invalidateQueries('bikes');
            toast.success('Bike details updated successfully');
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteBikes,
        onSuccess: () => {
            queryClient.invalidateQueries('bikes');
            toast.success('Bike details deleted successfully');
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
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
                accessorKey: 'model',
                header: 'Model',
                size: 80,
            },
            {
                accessorKey: 'licensePlate',
                header: 'License Plate',
                size: 80,
            },
            {
                accessorKey: 'bikeTypeId',
                header: 'Bike Type',
                size: 80,
            },
            {
                header: 'Actions',
                Cell: ({ row }) => (
                    <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                        <IconButton
                            color="primary"
                            onClick={() => {
                                setSelectedRow(row.original);
                                setFormData({ model: row.original.model, licensePlate: row.original.licensePlate,bikeTypeId: row.original.bikeTypeId });
                                setEditOpen(true);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => {
                                setSelectedRow(row.original);
                                setConfirmDeleteOpen(true);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ],
        []
    );

    const handleAdd = async (values) => {
        await addMutation.mutateAsync(values);
    };

    const handleUpdate = async (values) => {
        await updateMutation.mutateAsync(values);
    };

    const handleDelete = async () => {
        if (selectedRow) {
            await deleteMutation.mutateAsync(selectedRow.id);
            setConfirmDeleteOpen(false);
            setSelectedRow(null);
        }
    };
    const handleEdit = async () => {
        if (selectedRow) {
            await updateMutation.mutateAsync({ ...selectedRow, ...formData });
            setFormData({ model: '', licensePlate: '', bikeTypeId: '' }); // Reset form
            handleEditClose(); // Close dialog after editing
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = async () => {
        await addMutation.mutateAsync(formData);
        setFormData({ model: '', licensePlate: '', bikeTypeId: '' }); // Reset form
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(false);
    const handleConfirmDeleteClose = () => setConfirmDeleteOpen(false);
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
                    <StyledBreadcrumb component="a" href="#" label="Deliveries" />

                </Breadcrumbs>
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable
                        columns={columns}
                        data={BikesData?.data || []}
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
                                    onClick={handleOpen}
                                    sx={{
                                        fontWeight: "bolder",
                                        background: "Black",
                                        "&:hover": {
                                            background: "Black",
                                            color: "white",
                                        },
                                    }}
                                >
                                    New Bike
                                </Button>

                            </Box>
                        )}
                    />
                </ThemeProvider>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Bike</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '400px' }}>
                        <TextField
                            autoFocus
                            variant="standard"
                            name="model"
                            label="Model"
                            required
                            type="text"
                            fullWidth
                            value={formData.model}
                            onChange={handleFormChange}
                            sx={{
                                marginBottom: '1rem'
                            }}
                        />
                        <TextField
                            variant="standard"
                            name="licensePlate"
                            required
                            label="License Plate"
                            type="text"
                            fullWidth
                            value={formData.licensePlate}
                            onChange={handleFormChange}
                            sx={{
                                marginBottom: '16px'
                            }}
                        />
                        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                            <InputLabel id="bike-type-label">Bike Type</InputLabel>
                            <Select
                                labelId="bike-type-label"
                                name="bikeTypeId"
                                value={formData.bikeTypeId}
                                label="Bike Type"
                                onChange={handleFormChange}
                                required
                                variant="standard"
                            >
                                {BikeTypesData?.data?.map((bikeType) => (
                                    <MenuItem key={bikeType.id} value={bikeType.id}>
                                        {bikeType.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCreate}>Add</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={editOpen} onClose={handleEditClose}>
                    <DialogTitle>Edit Package</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '400px' }}>
                    <TextField
                            autoFocus
                            variant="standard"
                            name="model"
                            label="Model"
                            required
                            type="text"
                            fullWidth
                            value={formData.model}
                            onChange={handleFormChange}
                            sx={{
                                marginBottom: '1rem'
                            }}
                        />
                        <TextField
                            variant="standard"
                            name="licensePlate"
                            required
                            label="License Plate"
                            type="text"
                            fullWidth
                            value={formData.licensePlate}
                            onChange={handleFormChange}
                            sx={{
                                marginBottom: '16px'
                            }}
                        />
                        <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                            <InputLabel id="bike-type-label">Bike Type</InputLabel>
                            <Select
                                labelId="bike-type-label"
                                name="bikeTypeId"
                                value={formData.bikeTypeId}
                                label="Bike Type"
                                onChange={handleFormChange}
                                required
                                variant="standard"
                            >
                                {BikeTypesData?.data?.map((bikeType) => (
                                    <MenuItem key={bikeType.id} value={bikeType.id}>
                                        {bikeType.type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose}>Cancel</Button>
                        <Button onClick={handleEdit}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={confirmDeleteOpen}
                    onClose={handleConfirmDeleteClose}
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this bike?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmDeleteClose}>Cancel</Button>
                        <Button onClick={handleDelete} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>

            </Grid>
            <ToastContainer />
        </Grid>
    );
};

export default Bikes;