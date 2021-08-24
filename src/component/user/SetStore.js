import React, { useRef, useState } from 'react'
import { TextField } from '@material-ui/core'
import { useAuth } from '../../context/AuthContext'
import { useStore } from '../../context/StoreContext'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

function UserStore() {

    const emailRef = useRef();
    const addressRef = useRef();
    const storeNameRef = useRef();
    const addressCityRef = useRef();
    const addressKodePosRef = useRef();
    const phoneNumberRef = useRef();
    const { currentUser, userStoreData } = useAuth();
    const { createStore } = useStore();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await createStore(currentUser.uid, storeNameRef.current.value, emailRef.current.value, addressRef.current.value, phoneNumberRef.current.value,
                addressCityRef.current.value, addressKodePosRef.current.value)
            history.push('/profile')
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false);
    }

    return (
        <div className="container">
            <div className="container-wrap-form">
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{ backgroundColor: "#ffffff", textAlign: "center", marginBottom: "20px" }}>Set Your Store</Typography>
                    </Grid>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Grid item xs={12}>
                        <TextField id="name" className="form-inputField" size="small" label="Store Name" inputRef={storeNameRef} required defaultValue={userStoreData.storeName} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="email" className="form-inputField" size="small" label="Email" inputRef={emailRef} required defaultValue={userStoreData.email} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="phone-number" className="form-inputField" size="small" label="Phone Number" inputRef={phoneNumberRef} required defaultValue={userStoreData.phoneNumber} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="address" className="form-inputField" size="small" label="Address" inputRef={addressRef} required defaultValue={userStoreData.address} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="addressCity" className="form-inputField" size="small" label="City" inputRef={addressCityRef} required defaultValue={userStoreData.city} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="addressKodePos" className="form-inputField" size="small" label="Kode Pos" inputRef={addressKodePosRef} required defaultValue={userStoreData.kodePos} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <button disabled={loading} onClick={handleSubmit} className="form-btn">Create</button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default UserStore
