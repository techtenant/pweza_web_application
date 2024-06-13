import React, { useState, useMemo } from 'react';
import {
    MaterialReactTable
  
  } from 'material-react-table';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getSettings, postSettings, updateSettings, deleteSettings } from '../../common/apis/settings';
import { Button, TextField, Dialog, DialogActions,Paper, Box,DialogContent, DialogTitle, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SettingsTable = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ key: '', value: '' });
    const { data: settingsData, isLoading } = useQuery({
        queryKey: 'settings',
        queryFn: getSettings
    });
    const addSettingMutation = useMutation({
      mutationFn: postSettings,
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        toast.success('Setting added successfully');
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  
    const updateSettingMutation = useMutation({
      mutationFn: updateSettings,
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        toast.success('Setting updated successfully');
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  
    const deleteSettingMutation = useMutation({
      mutationFn: deleteSettings,
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        toast.success('Setting deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
  
    const columns = useMemo(
      () => [
        {
          accessorKey: 'key',
          header: 'Key',
        },
        {
          accessorKey: 'value',
          header: 'Value',
        },
        // Add other columns as needed
      ],
      []
    );
  
    const handleAdd = async (values) => {
      await addSettingMutation.mutateAsync(values);
    };
  
    const handleUpdate = async (values) => {
      await updateSettingMutation.mutateAsync(values);
    };
  
    const handleDelete = async (values) => {
      await deleteSettingMutation.mutateAsync(values.id);
    };
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleCreate = async () => {
        await addSettingMutation.mutateAsync(formData);
        setFormData({ key: '', value: '' }); // Reset form
      };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        <Grid item md={12} style={{ display: "flex", marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
        <Paper
          square={true}
          sx={{
            borderTop: 5,
            borderColor: "#000",
            width: "100%",
            px: 3,
            py: 5,
          }}
          elevation={8}
        >
           <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns}
          data={settingsData?.data || []}
          isLoading={isLoading}
          onEditingRowSave={async (newRow, oldRow) => {
            if (oldRow) {
              await handleUpdate({ ...oldRow, ...newRow });
            } else {
              await handleAdd(newRow);
            }
          }}
          onRowDelete={async (oldRow) => {
            await handleDelete(oldRow);
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
                New Settings
              </Button>

            </Box>
          )}          
          enableEditing
          enableDeleting
          enablePinning
        />
        </ThemeProvider>
       
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Setting</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="key"
            label="Key"
            type="text"
            fullWidth
            value={formData.key}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            name="value"
            label="Value"
            type="text"
            fullWidth
            value={formData.value}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Add</Button>
        </DialogActions>
      </Dialog>
      </Paper>
    </Grid>
    </Grid>
    );
  };
  
  export default SettingsTable;