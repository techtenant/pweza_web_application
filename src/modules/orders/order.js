import React, { useState, useMemo, useContext, useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import {
    Grid, InputLabel, Button, Select, IconButton, TextField, Checkbox, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import Card from "@mui/material/Card";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardContent from "@mui/material/CardContent";
import { ToastContainer, toast } from "react-toastify";
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { useMutation, useQuery } from "@tanstack/react-query";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { postOrders } from "../../common/apis/orders.js";
import { getFromLocalStorage } from '../../common/utils/LocalStorage';



import 'react-toastify/dist/ReactToastify.min.css'
import { getProducts } from "../../common/apis/product.js";
import { date } from "yup";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const popError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

const popSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
};

const orderHeaderCss = {
    fontSize: "34px",
    fontWeight: "bolder",
    textAlign: "left",
    margin: "10px 15px"
}

const headerTopGrid = {
    border: "none",
    mariginBotton: "10px",
    boxShadow: "5px"
}
const orderHeaderCssSmall = {
    fontSize: "24px",
    fontWeight: "normal",
    textAlign: "left",
    margin: "10px 15px"
}
const CreateNewOrder = () => {
    const account = getFromLocalStorage("user");
    const [supplyPlanUploadData, setSupplyPlanUploadData] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [items, setItems] = useState([]);
    const [createdDate, setCreatedDate] = useState();
    const [createdBy, setCreatedBy] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemDetails, setItemDetails] = useState({});
    const navigate = useNavigate();


    const handleNvigate = () => {
        navigate("/pweza/orders")
    };


    useEffect(() => {
        getProducts({}).then((res) => {
            setItems(res.data);
        })

    }, []);


    const mutation = useMutation({
        mutationFn: postOrders,
        onError: (error, variables, context) => {
            // An error happened!
            toast.error('Error occurred while making an order', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
        onSuccess: (data, variables, context) => {
            toast.success('Order made successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                onClose: () => {
                    setUploadedFileName(null);
                    setSupplyPlanUploadData([]);
                    navigate('/pweza/orders');
                }
            });

        }
    });


    const submitSupplyPlanUpload = async () => {
        // Validate all fields

        // Validate selected items and their details
        if (selectedItems.length === 0) {
            toast.error('Please select at least one Product.');
            return;
        }

        // Validate selected items and their details
        const invalidItems = selectedItems.filter(itemId => {
            const details = itemDetails[itemId];
            const item = items.find(item => item.id === itemId);
            const missingFields = [];
            if (!details || !details.quantity) missingFields.push('quantity');
            if (missingFields.length > 0) {
                toast.error(`Please fill in all details for ${item.name}: ${missingFields.join(', ')}`);
                return true;
            }
            return false;
        });

        if (invalidItems.length > 0) {
            return;
        }

        const payload = {
            orderDate: new Date(Date.now()),
            userId: account.id,
            Status: 0,

            orderDetails: selectedItems.map((itemId) => {
                const selectedItem = items.find((item) => item.id === itemId);
                if (!selectedItem) {
                    // Handle the case when the selected item is not found

                    return null; // Or handle it as per your requirement
                }
                return {
                    productId: itemId,
                    ...itemDetails[itemId], // Include additional details
                   
                };
            }).filter(item => item !== null), // Remove null values
        };

        console.log("payload", payload);
        // Perform mutation to save supply plan
        mutation.mutate(payload);
    };

    // Function to handle checkbox selection of items
    const handleItemSelect = (itemId) => (event) => {
        const selectedIndex = selectedItems.indexOf(itemId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedItems, itemId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedItems.slice(1));
        } else if (selectedIndex === selectedItems.length - 1) {
            newSelected = newSelected.concat(selectedItems.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedItems.slice(0, selectedIndex),
                selectedItems.slice(selectedIndex + 1)
            );
        }

        setSelectedItems(newSelected);
    };

    // Function to handle input change for item details
    const handleItemDetailChange = (itemId, field) => (event) => {

        const value = event.target.value;

        // Validate non-negative numbers
        if (['quantity'].includes(field)) {
            if (parseFloat(value) < 0) {
                toast.error('Please enter a non-negative value.');
                return;
            }
        }


        const updatedItemDetails = { ...itemDetails };
        if (!updatedItemDetails[itemId]) {
            updatedItemDetails[itemId] = {};
        }
        updatedItemDetails[itemId][field] = event.target.value;
        setItemDetails(updatedItemDetails);
    };

    // Function to remove item from selected list
    const removeSelectedItem = (itemId) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((id) => id !== itemId)
        );
        setItemDetails((prevItemDetails) => {
            const updatedItemDetails = { ...prevItemDetails };
            delete updatedItemDetails[itemId];
            return updatedItemDetails;
        });
    };


    return (

        <Grid container alignItems="stretch">
            <ToastContainer />
            <Grid item md={12} xs={12} style={{ display: "flex", width: "100%" }}>
                <Paper
                    square={true}
                    sx={{
                        borderTop: 5,
                        borderColor: "#000000",
                        px: 3,
                        py: 5,
                        width: "100%",
                    }}
                    elevation={8}
                >
                    <Grid
                        item
                        xs={12}
                        md={12}
                        sm={12}
                        sx={{ padding: "10px", textAlign: "left" }}
                    >
                        <form onSubmit="submitSupplyPlanUpload">
                            <Grid item xs={12} >
                                <Grid container style={headerTopGrid}>
                                    <Grid item xs={12} md={11} >
                                        <div style={orderHeaderCss} >Create New Order </div>
                                        <div style={orderHeaderCssSmall} ><small>Add new Order</small> </div>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <hr style={{ width: "98%", margin: "0 auto" }} />
                                    </Grid>
                                </Grid>

                                <Grid container direction="row"
                                    justifyContent="flex-start" alignItems="center"
                                    spacing={2}  >

                                    <Grid item xs={6}>
                                        <Card sx={{ boxShadow: 'none' }}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 18, color: '#845EBC', fontWeight: 'bold' }}>
                                                    Created By
                                                </Typography>
                                                <FormControl fullWidth sx={{ marginTop: '10px' }}>
                                                    <TextField id="created_by"
                                                        variant="standard"
                                                        error={createdBy}
                                                        value={account.firstName}
                                                        onChange={(e) => setCreatedBy(e.target.value)}
                                                    />
                                                </FormControl>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card sx={{ boxShadow: 'none' }}>
                                            <CardContent>
                                                <Typography sx={{ fontSize: 18, color: '#845EBC', fontWeight: 'bold' }}>
                                                    Select Product
                                                </Typography>

                                                <Autocomplete
                                                    multiple
                                                    id="item-select"
                                                    options={items}
                                                    getOptionLabel={(option) => option.name}
                                                    onChange={(event, newValue) => {
                                                        setSelectedItems(newValue.map((item) => item.id));
                                                    }}
                                                    value={selectedItems.map((id) => items.find((item) => item.id === id))}
                                                    disableCloseOnSelect
                                                    renderOption={(props, option, { selected }) => (
                                                        <li {...props}>
                                                            <Checkbox
                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option.name}
                                                        </li>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"

                                                            placeholder="Search items"
                                                        />
                                                    )}
                                                    PaperComponent={({ children }) => (
                                                        <Paper style={{ maxHeight: 300, overflowY: 'auto' }}>
                                                            {children}
                                                        </Paper>
                                                    )}
                                                />

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Paper>
            </Grid>

            <Grid item md={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="selected items table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>





                                <TableCell>Quantity</TableCell>


                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedItems.map((itemId) => (
                                <TableRow key={itemId}>
                                    <TableCell>
                                        {items.find((item) => item.id === itemId)?.name}
                                    </TableCell>




                                    <TableCell>
                                        <TextField
                                            variant="standard"
                                            type="number"
                                            value={itemDetails[itemId]?.quantity || ''}
                                            onChange={handleItemDetailChange(itemId, 'quantity')}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => removeSelectedItem(itemId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xl={12} xs={12} md={12}>
                <Grid container spacing={2} p={6}>
                    <Grid item xs={6} md={6}>

                        <Button
                            variant="contained"
                            sx={{
                                fontSize: '14px',
                                fontWeight: 'bolder',
                                backgroundColor: '#333333',
                            }}
                            startIcon={<ArrowBackIcon />}
                            onClick={handleNvigate}

                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        md={6}
                        sx={{ display: "flex", justifyContent: "right" }}
                    >
                        <Button
                            variant="contained"
                            disabled={selectedItems.length === 0}
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bolder",
                                backgroundColor: "#333333",
                                "&:hover": {
                                    background: "#E19133",
                                    color: "white",
                                },
                            }}
                            startIcon={<AddCircleIcon />}
                            onClick={submitSupplyPlanUpload}
                            type='submit'
                        >
                            Submit
                        </Button>


                    </Grid>
                </Grid>
            </Grid>

        </Grid>

    );
};

export default CreateNewOrder;