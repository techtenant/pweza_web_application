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
import { getPackages, postPackages, updatePackages, deletePackages } from '../../common/apis/packages';
import { Button, TextField, Dialog,Breadcrumbs, DialogActions, Chip, Box, DialogContent, IconButton, DialogTitle, Grid } from '@mui/material';
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

const Packages = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({ type: '', weight: 0,height:0 });
  const { data: packagesData, isLoading } = useQuery({
    queryKey: 'packages',
    queryFn: getPackages
  });
  const addMutation = useMutation({
    mutationFn: postPackages,
    onSuccess: () => {
      queryClient.invalidateQueries('packages');
      toast.success('Package added successfully');
      handleClose();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePackages,
    onSuccess: () => {
      queryClient.invalidateQueries('packages');
      toast.success('Package updated successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePackages,
    onSuccess: () => {
      queryClient.invalidateQueries('packages');
      toast.success('Package deleted successfully');
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
        accessorKey: 'type',
        header: 'Type',
        size: 80,
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
        size: 80,
      },
      {
        accessorKey: 'height',
        header: 'Height',
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
                setFormData({ type: row.original.type, weight: row.original.weight,height:row.original.height });
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
      setFormData({ type: '', weight: 0,height:0 }); // Reset form
      handleEditClose(); // Close dialog after editing
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    await addMutation.mutateAsync(formData);
    setFormData({ type: '', weight: 0,height:0 }); // Reset form
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
      <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom:'20px'}}>
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
            data={packagesData?.data || []}
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
                  New Package
                </Button>

              </Box>
            )}
          />
        </ThemeProvider>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Package</DialogTitle>
          <DialogContent sx={{display: 'flex', flexDirection: 'column',gap:'1rem',minWidth:'400px'}}>
            <TextField
              autoFocus
              variant="standard"
              name="type"
              label="Type"
              required
              type="text"
              fullWidth
              value={formData.type}
              onChange={handleFormChange}
              sx={{
                marginBottom: '1rem'
              }}
            />
            <TextField
              variant="standard"
              name="weight"
              required
              label="Weight (Kilograms)"
              type="number"
              fullWidth
              value={formData.weight}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
             <TextField
              variant="standard"
              name="height"
              required
              label="Height (Metres)"
              type="number"
              fullWidth
              value={formData.height}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Add</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Package</DialogTitle>
          <DialogContent sx={{display: 'flex', flexDirection: 'column',gap:'1rem',minWidth:'400px'}}>
            <TextField
              autoFocus
              variant="standard"
              name="type"
              label="Type"
              type="text"
              fullWidth
              value={formData.type}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
           <TextField
              variant="standard"
              name="weight"
              label="Weight (Kilograms)"
              type="number"
              required
              fullWidth
              value={formData.weight}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
             <TextField
              variant="standard"
              name="height"
              label="Height (Metres)"
              type="number"
              required
              fullWidth
              value={formData.height}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
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
            Are you sure you want to delete this package?
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

export default Packages;