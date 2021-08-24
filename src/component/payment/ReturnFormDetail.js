import React, { useRef, useState } from 'react'
import { TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import './Payment.css'
import { useFirestore } from '../../context/FirestoreContext';

function ReturnFormDetail({ nextReturn, back }) {


    const returnDateRef = useRef();
    const returnAddressRef = useRef();
    const returnAddressCityRef = useRef();
    const returnAddressKodePosRef = useRef();
    const [error, setError] = useState("");
    const { storeDetail } = useFirestore();
    const [open, setOpen] = useState(false)
    const [address, setAddress] = useState("kantor")
    const [isTextFieldActive, setIsTextFieldActive] = useState(false)

    function handleSubmit() {

        if (!isTextFieldActive) {
            if (returnDateRef.current.value === '') {
                setError("Tanggal tidak boleh kosong")
                setOpen(true)
            } else {
                let data = {
                    returnDate: returnDateRef.current.value,
                    returnAddress: storeDetail.address,
                    returnAddressCity: storeDetail.city,
                    returnAddressKodePos: storeDetail.kodePos
                }
                nextReturn(data);
            }
        } else {
            if (returnDateRef.current.value === '' || returnAddressRef.current.value === '' || returnAddressCityRef.current.value === '' ||
                returnAddressKodePosRef.current.value === '') {
                setError("Form tidak boleh kosong")
                setOpen(true)
            } else {
                let data = {
                    returnDate: returnDateRef.current.value,
                    returnAddress: returnAddressRef.current.value,
                    returnAddressCity: returnAddressCityRef.current.value,
                    returnAddressKodePos: returnAddressKodePosRef.current.value
                }
                nextReturn(data);
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    function onChange(e) {
        setAddress(e.target.value)

        if (address === "kantor") {
            setIsTextFieldActive(true)
        } else {
            setIsTextFieldActive(false)

        }
    }

    return (
        <div className="rentform-container">
            <p className="label-form">Return Address</p>
            <FormControl className="wrapper-returnForm">
                <RadioGroup value={address} onChange={onChange}>
                    <FormControlLabel value="kantor" control={<Radio />} label="Kantor" />
                    {storeDetail && !isTextFieldActive && <div className="grid-wrapper">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="address" className="form-inputField" size="small" label="Address" required disabled
                                    defaultValue={storeDetail.address} InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="addressCity" className="form-inputField" size="small" label="City" required disabled
                                    defaultValue={storeDetail.city} InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="kode-pos" className="form-inputField" size="small" label="Kode Pos" required disabled
                                    defaultValue={storeDetail.kodePos} InputLabelProps={{
                                        shrink: true,
                                    }} />
                            </Grid>
                        </Grid>
                    </div>}
                    <FormControlLabel value="newAddress" control={<Radio />} label="New Address" />

                    {isTextFieldActive && <div className="grid-wrapper">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField id="address" className="form-inputField" size="small" label="Address" inputRef={returnAddressRef} required InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="addressCity" className="form-inputField" size="small" label="City" inputRef={returnAddressCityRef} required InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField id="kode-pos" className="form-inputField" size="small" label="Kode Pos" inputRef={returnAddressKodePosRef} required InputLabelProps={{
                                    shrink: true,
                                }} />
                            </Grid>
                        </Grid>
                    </div>}
                </RadioGroup>
            </FormControl>
            <div className="grid-wrapper">
                <p className="label-form">Return Date</p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField id="rent-date" className="form-inputField" size="small" label="Rent Date" inputRef={returnDateRef} type="date" InputLabelProps={{
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
        </div>
    )
}

export default ReturnFormDetail
