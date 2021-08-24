import React, { useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import './User.css'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

function ViewUserTransaction() {
    const { state } = useLocation();
    const [disabled, setDisabled] = useState(false)
    const history = useHistory()

    return (
        <div className="container">
            <div className="wrapper">
                <div className="wrapper-paper">
                    <div className="grid-wrapper">
                        <p className="label-form">Transaction</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="name" className="form-inputField" size="small" label="Name" defaultValue={state.data.userName} disabled InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="grid-wrapper">
                        <p className="label-form">Contact Information</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField id="email" className="form-inputField" size="small" label="Email" defaultValue={state.data.userEmail} disabled
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="phone-number" className="form-inputField" size="small" label="Phone Number" defaultValue={state.data.userPhoneNumber} disabled
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
                                            {state.data.productLists.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.title}</TableCell>
                                                    <TableCell align="right">{row.quantity}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </div>
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
                                <TextField id="rentDate" className="form-inputField" size="small" label="Rent Date" disabled defaultValue={state.data.statusRent}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="grid-wrapper">
                        <p className="label-form">Return Form</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField id="returnAddress" className="form-inputField" size="small" label="Return Address" disabled
                                    defaultValue={state.data.returnAddressDetail + "," + state.data.returnAddressCity + "," + state.data.returnAddressKodePos} InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="returnDate" className="form-inputField" size="small" label="Return Date" disabled defaultValue={state.data.returnDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="returnDate" className="form-inputField" size="small" label="Return Date" disabled defaultValue={state.data.statusReturn}
                                    InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </Grid>
                    </div>
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
                        {state.data.statusPayment === 'Processing' ?
                            <Link style={{ textDecoration: "none", color: "#000000" }} to={{ pathname: `/paymentProof/${state.data.paymentId}`, state: { data: state.data } }}>
                                <button className="btn-store">Bayar</button>
                            </Link>
                            :
                            <button disabled className="btn-store">Bayar</button>
                        }
                        <button onClick={() => history.push('/profile')} className="btn-store">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ViewUserTransaction
