import React, { useState } from 'react';
import './dashboard.css';
import { useHistory, useLocation } from "react-router-dom";
import { TextField, InputLabel, FormControl, Select, MenuItem, Snackbar } from '@material-ui/core'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFirestore } from '../../context/FirestoreContext';

function ViewDetailTransaction() {

    const { state, type } = useLocation();
    const { updateStatusTransaksi } = useFirestore()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [statusRent, setStatusRent] = useState(state.data.statusRent)
    const [statusReturn, setStatusReturn] = useState(state.data.statusReturn)
    const [open, setOpen] = useState(false)
    const history = useHistory()

    console.log(state.data)
    console.log(statusRent)

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setStatusRent(event.target.value);
    };

    const handleChangeReturn = (event) => {
        setStatusReturn(event.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            await updateStatusTransaksi(state.data.paymentId, state.data.rentId, statusRent, state.data.returnAddressCity, statusReturn)
            setSuccess("Berhasil Mengubah Status")
            setOpen(true)
        } catch {
            setError("Failed to create product")
            setOpen(true)
        }

    }

    return (
        <div className="container">
            <div className="wrapper">
                <div className="wrapper-paper">
                    <div className="grid-wrapper">
                        <p className="label-form">Transaction</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="name" className="form-inputField" size="small" label="Name" disabled defaultValue={state.data.userName}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="grid-wrapper">
                        <p className="label-form">Contact Information</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField id="email" className="form-inputField" size="small" label="Email" disabled defaultValue={state.data.userEmail}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="phone-number" className="form-inputField" size="small" label="Phone Number" disabled defaultValue={state.data.userPhoneNumber}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="grid-wrapper">
                        <p className="label-form">Product List</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table aria-label="caption table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ color: "#4DA8DA" }}>Product Id</TableCell>
                                                <TableCell style={{ color: "#4DA8DA" }}>Name</TableCell>
                                                <TableCell style={{ color: "#4DA8DA" }} align="right">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {state.data.productLists.map((row, key) => (
                                                <TableRow key={key}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell align="right">{row.stok}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
                    {type === "rentlist" ?
                        <div className="grid-wrapper">
                            <p className="label-form">Rent Form</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="rentAddress" className="form-inputField" size="small" label="Address" disabled
                                        defaultValue={state.data.userAddress + "," + state.data.userAddressCity + "," + state.data.userAddressKodePos}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="rentDate" className="form-inputField" size="small" label="Rent Date" disabled defaultValue={state.data.rentDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Status Rent
                                        </InputLabel>
                                        <Select
                                            id="rentStatus"
                                            value={statusRent}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'Pick Up'}>Pick Up</MenuItem>
                                            <MenuItem value={'Dipesan'}>Dipesan</MenuItem>
                                            <MenuItem value={'Disewa'}>Disewa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                        :
                        <div className="grid-wrapper">
                            <p className="label-form">Return Form</p>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="rentAddress" className="form-inputField" size="small" label="Address" disabled
                                        defaultValue={state.data.returnAddress + "," + state.data.returnAddressCity + "," + state.data.returnAddressKodePos}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="rentDate" className="form-inputField" size="small" label="Rent Date" disabled defaultValue={state.data.returnDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                            Status Return
                                        </InputLabel>
                                        <Select
                                            id="rentStatus"
                                            value={statusReturn}
                                            onChange={handleChangeReturn}
                                        >
                                            <MenuItem value={'onrent'}>On Rent</MenuItem>
                                            <MenuItem value={'return'}>Return</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    }
                    <div className="grid-wrapper">
                        <p className="label-form">Payment</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="statusPayment" className="form-inputField" size="small" label="Status Payment" disabled defaultValue={state.data.statusPayment}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="btn-wrapper-edit">
                        <button onClick={handleSubmit} className="btn-store">Save</button>
                        {type === "rentlist" ?
                            <button onClick={() => history.push(`/dashboard/${type}`)} className="btn-store">Cancel</button>
                            :
                            <button onClick={() => history.push(`/dashboard/${type}`)} className="btn-store">Cancel</button>
                        }
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {success ? <Alert onClose={handleClose} severity="success">{success}</Alert> : <Alert onClose={handleClose} severity="error">{error}</Alert>}
            </Snackbar>
        </div>
    )
}

export default ViewDetailTransaction
