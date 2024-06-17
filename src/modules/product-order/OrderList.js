import { useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Box,
    Button,
    ThemeProvider,
    createTheme,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Grid
} from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { getSettings, postSettings, updateSettings, deleteSettings } from '../../common/apis/settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultTheme = createTheme();

const ProductOrders = () => {
    const [validationErrors, setValidationErrors] = useState({});
   

    const columns = useMemo(
        () => [
            {
                accessorKey: 'key',
                header: 'Key',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'value',
                header: 'Value',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.value,
                    helperText: validationErrors?.value,
                  
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            value: undefined,
                        }),
                  
                },
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createSetting, isPending: isCreating } =
    useCreateSetting();
    //call READ hook
    const {
        data: fetchedData = [],
        isError: isLoadingError,
        isFetching: isFetching,
        isLoading: isLoading,
    } = useGetData();
    //call UPDATE hook
    const { mutateAsync: update, isPending: isUpdating } =
        useUpdate();
    //call DELETE hook
    const { mutateAsync: deleteSettings, isPending: isDeleting } =
        useDelete();

    //CREATE action
    const handleCreateSettings = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createSetting(values);
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleUpdate = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await update(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this Settings?')) {
            deleteSettings(row.original.id);
        }
    };

   
    const table = useMaterialReactTable({
        columns,
        data: fetchedData.data,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateSettings,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleUpdate,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New Settings</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit Settings</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New Settings
            </Button>
        ),
        state: {
            isLoading: isLoading,
            isSaving: isCreating || isUpdating || isDeleting,
            showAlertBanner: isLoadingError,
            showProgressBars: isFetching,
        },
    });

    return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateSetting() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postSettings,
        onSuccess: () => {
          queryClient.invalidateQueries('settings');
          toast.success('Setting added successfully');
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
    });
}

//READ hook (get Data from api)
function useGetData() {
    return useQuery({
        queryKey: 'settings',
        queryFn: getSettings,
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
function useUpdate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSettings,
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        toast.success('Setting updated successfully');
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
       
    });
}

//DELETE hook (delete user in api)
function useDelete() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSettings,
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
        toast.success('Setting deleted successfully');
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });
}

const queryClient = new QueryClient();

const OrderList = () => (
    <ThemeProvider theme={defaultTheme}>
    <QueryClientProvider client={queryClient}>
        <Grid container alignItems="stretch">
            <Grid item md={12} style={{ display: "flex", marginTop: "50px", marginLeft: "50px", marginRight: "50px", width: "100%" }}>
                <ProductOrders />
            </Grid>
        </Grid>
    </QueryClientProvider>
    </ThemeProvider>
);

export default OrderList;

const validateRequired = (value) => !!value.length;

function validateUser(settings) {
    return {
        value: !validateRequired(settings.value)
            ? 'Value Required'
            : '',
               
    };
}
