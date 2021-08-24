import React, { useRef, useState } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import './User.css'
import { useAuth } from '../../context/AuthContext'
import { db } from '../firebase/config'
import { useHistory } from 'react-router'
import { useFirestore } from '../../context/FirestoreContext'

function UpdateProfile() {

    const nameRef = useRef()
    const phoneNumberRef = useRef()
    const addressRef = useRef()
    const bornDateRef = useRef()
    const jenisKelaminRef = useRef()
    const { userData, updateProfile } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory();

    async function handleSubmit() {

        setError("")
        if (userData) {
            try {
                await updateProfile(nameRef.current.value, addressRef.current.value, bornDateRef.current.value, phoneNumberRef.current.value, jenisKelaminRef.current.value,)
                history.push("/profile")
            } catch {
                setError("Failed to Update Data")
            }
        }
    }

    return (
        <div className="container">
            <div className="container-wrap">
                <h2 className="form-title">Update Profile</h2>
                {error && <Alert severity="error">{error}</Alert>}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Name</Typography>
                        <TextField id="name" className="form-inputField" size="small" inputRef={nameRef} defaultValue={userData.name} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Jenis Kelamin</Typography>
                        <TextField id="jenis-kelamin" className="form-inputField" size="small" defaultValue={userData.jenisKelamin} inputRef={jenisKelaminRef} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Phone Number</Typography>
                        <TextField id="phone-number" className="form-inputField" size="small" inputRef={phoneNumberRef} defaultValue={userData.phoneNumber} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Address</Typography>
                        <TextField id="address" className="form-inputField" size="small" inputRef={addressRef} defaultValue={userData.address} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Tanggal Lahir</Typography>
                        <TextField id="born-date" className="form-inputField" size="small" type="date" defaultValue={userData.bornDate} inputRef={bornDateRef} variant="outlined" InputLabelProps={{
                            shrink: true,
                        }} />
                        <button onClick={handleSubmit} className="btn-update">Update</button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default UpdateProfile
