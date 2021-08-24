import { TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Alert } from '@material-ui/lab'
import { Link, useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import './Auth.css'

const SignUp = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const phoneNumberRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError("Password do not match");
            setOpen(true)
        }

        try {
            if (emailRef.current.value === '' || passwordRef.current.value === '' || nameRef.current.value === '' || phoneNumberRef.current.value === '') {
                setError("Isi Form Dong!!!!")
                setOpen(true)
            } else {
                setError("")
                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, phoneNumberRef.current.value)
                setLoading(false);
                history.push("/login")
            }
        } catch {
            setError("Failed to create an account")
            setOpen(true)
        }

    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div className="container">
            <div className="container-wrap-form">
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{ backgroundColor: "#ffffff", textAlign: "center", marginBottom: "20px" }}>Sign Up</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="email" className="form-inputField" size="small" label="Email" inputRef={emailRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="name" className="form-inputField" size="small" label="Name" inputRef={nameRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="phone-number" className="form-inputField" size="small" label="Phone Number" inputRef={phoneNumberRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="password" className="form-inputField" size="small" label="Password" type="password" inputRef={passwordRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="passwordConfirm" className="form-inputField" size="small" label="Password Confirmation" type="password" inputRef={passwordConfirmRef} InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <button disabled={loading} onClick={handleSubmit} className="form-btn">Sign Up</button>
                        <span > Already have an account ? <Link className="auth-btn" to="/login">Log in</Link></span>
                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default SignUp
