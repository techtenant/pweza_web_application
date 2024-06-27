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
import { getUsers, postUser, updateUser,getRoles } from '../../common/apis/account';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, TextField, Dialog,Breadcrumbs, DialogActions, FormControl,FormLabel,Chip, Box, DialogContent, DialogTitle,IconButton,MenuItem, Grid,Select,InputAdornment } from '@mui/material';
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
});

const   UserManagement = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({ name: ''});
  const { data: userData, isLoading } = useQuery({
    queryKey: 'users',
    queryFn: getUsers
  });
  const addMutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User added successfully');
      handleClose();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  
  const { data: rolesData } = useQuery({
    queryKey: 'userRoles',
    queryFn: getRoles,

  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 80,
      },     
      {
        accessorKey: 'email',
        header: 'Email',
        size: 80,
      }, 
      {
        accessorKey: 'phone',
        header: 'Phone',
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
                setFormData({ name: row.original.name });
                setEditOpen(true);
              }}
            >
              <EditIcon />
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


  const handleEdit = async () => {
    if (selectedRow) {
      await updateMutation.mutateAsync({ ...selectedRow, ...formData });
      setFormData({ name: ''}); // Reset form
      handleEditClose(); // Close dialog after editing
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    await addMutation.mutateAsync(formData);
    setFormData({ name: '' }); // Reset form
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
        <StyledBreadcrumb component="a" href="#" label="Users" />
        
      </Breadcrumbs>
        <ThemeProvider theme={tableTheme}>
          <MaterialReactTable
            columns={columns}
            data={rolesData?.data || []}
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
                  New User
                </Button>

              </Box>
            )}
          />
        </ThemeProvider>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent sx={{display: 'flex', flexDirection: 'column',gap:'1rem',minWidth:'400px'}}>
          <FormControl>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <TextField
              autoFocus
              variant="standard"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={formData.firstName}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <TextField
                 variant="standard"
                 name="lastName"
                 label="Last Name"
                 type="text"
                 fullWidth
                 value={formData.lastName}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="userName">User Name</FormLabel>
                <TextField
                 variant="standard"
                 name="userName"
                 label="User Name"
                 type="text"
                 fullWidth
                 value={formData.userName}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Phone Number</FormLabel>
                <TextField
                 variant="standard"
                 name="phone"
                 label="Phone"
                 type="text"
                 fullWidth
                 value={formData.phone}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                 variant="standard"
                 name="email"
                 label="Email"
                 type="text"
                 fullWidth
                 value={formData.email}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type={showPassword ? 'text' : 'password'}
                  id="password"                 
                  variant="standard"                  
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl >
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Roles
                  </FormLabel>
                  <Select
                name="role"
                id="role"
                value={formData.email}
                onChange={handleFormChange}
                fullWidth
                variant="outlined"
                sx={{
                    marginTop: 2,
                    '& legend': { display: 'none' },
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
                }}
            >
                {rolesData?.data?.map((role) => (
                    <MenuItem key={role.name} value={role.name}>
                        {role.name}
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent sx={{display: 'flex', flexDirection: 'column',gap:'1rem',minWidth:'400px'}}>
          <FormControl>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <TextField
              autoFocus
              variant="standard"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              value={formData.firstName}
              onChange={handleFormChange}
              sx={{
                marginBottom: '16px'
              }}
            />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <TextField
                 variant="standard"
                 name="lastName"
                 label="Last Name"
                 type="text"
                 fullWidth
                 value={formData.lastName}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="userName">User Name</FormLabel>
                <TextField
                 variant="standard"
                 name="userName"
                 label="User Name"
                 type="text"
                 fullWidth
                 value={formData.userName}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="name">Phone Number</FormLabel>
                <TextField
                 variant="standard"
                 name="phone"
                 label="Phone"
                 type="text"
                 fullWidth
                 value={formData.phone}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                 variant="standard"
                 name="email"
                 label="Email"
                 type="text"
                 fullWidth
                 value={formData.email}
                 onChange={handleFormChange}
                 sx={{
                   marginBottom: '16px'
                 }}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type={showPassword ? 'text' : 'password'}
                  id="password"                 
                  variant="standard"                  
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl >
                  <FormLabel
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Roles
                  </FormLabel>
                  <Select
                name="role"
                id="role"
                value={formData.email}
                onChange={handleFormChange}
                fullWidth
                variant="outlined"
                sx={{
                    marginTop: 2,
                    '& legend': { display: 'none' },
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" }
                }}
            >
                {rolesData?.data?.map((role) => (
                    <MenuItem key={role.name} value={role.name}>
                        {role.name}
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
       
      </Grid>
      <ToastContainer />    
    </Grid>
  );
};

export default UserManagement;