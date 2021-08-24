import React, { useRef, useState } from 'react'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import { useAuth } from '../../context/AuthContext'
import { Alert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar';
import './Payment.css'
import { useHistory } from 'react-router-dom';

function RentFormDetail({ next }) {

    const nameRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const addressCityRef = useRef();
    const addressKodePosRef = useRef();
    const phoneNumberRef = useRef();
    const rentDateRef = useRef();
    const { userData } = useAuth();
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false)
    const history = useHistory();

    function handleSubmit() {

        if (addressCityRef.current.value === '' || addressRef.current.value === '' || addressKodePosRef.current.value === '' ||
            rentDateRef.current.value === '') {
            setError("Form Harus Diisi")
            setOpen(true)
        } else {
            let data = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                address: addressRef.current.value,
                city: addressCityRef.current.value,
                kodePos: addressKodePosRef.current.value,
                rentDate: rentDateRef.current.value,
            }

            next(data)
        }

    }

    const handleClose = () => {
        setOpen(false);
    };

    function back() {
        history.push('/checkout')
    }

    return (
        <div className="rentform-container">
            <div className="grid-wrapper">
                <p className="label-form">Booking Form</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="name" className="form-inputField" size="small" label="Name" inputRef={nameRef} required
                            defaultValue={userData.name} InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                </Grid>
            </div>
            <div className="grid-wrapper">
                <p className="label-form">Contact Information</p>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField id="email" className="form-inputField" size="small" label="Email" inputRef={emailRef} required defaultValue={userData.email} InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="phone-number" className="form-inputField" size="small" label="Phone Number" inputRef={phoneNumberRef} required defaultValue={userData.phoneNumber} InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                </Grid>
            </div>
            <div className="grid-wrapper">
                <p className="label-form">Address</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="address" className="form-inputField" size="small" label="Address" inputRef={addressRef} required
                            defaultValue={userData.address} InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="addressCity" className="form-inputField" size="small" label="City" inputRef={addressCityRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField id="kode-pos" className="form-inputField" size="small" label="Kode Pos" inputRef={addressKodePosRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                </Grid>
            </div>
            <div className="grid-wrapper">
                <p className="label-form">Rent Date</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="rent-date" className="form-inputField" size="small" label="Rent Date" inputRef={rentDateRef} type="date" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                </Grid>
            </div>
            <div className="btn-wrapper">
                <button onClick={back} className="btn-payment" >Back</button>
                <button onClick={handleSubmit} className="btn-payment">Next</button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {error && <Alert onClose={handleClose} severity="error">{error}</Alert>}
            </Snackbar>
        </div >
    )
}

export default RentFormDetail
