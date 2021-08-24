import React, { useRef, useState } from 'react'
import { TextField } from '@material-ui/core'
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import './Auth.css'

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            if (emailRef.current.value === '' || passwordRef.current.value === '') {
                setError("Isi Form Dong!!!!")
                setOpen(true)
            } else {
                await login(emailRef.current.value, passwordRef.current.value)
                history.push("/")
            }

        } catch {
            setError("Failed to Sign In")
            setOpen(true)
        }
        setLoading(false);
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div className="container">
            <div className="container-wrap-form">
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{ backgroundColor: "#ffffff", textAlign: "center", marginBottom: "20px" }}>Log In</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="email" className="form-inputField" size="small" label="Email" inputRef={emailRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="password" className="form-inputField" size="small" label="Password" type="password" inputRef={passwordRef} required InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12}>
                        <button disabled={loading} onClick={handleSubmit} className="form-btn">Login</button>
                        <span > Don't have an account? <Link className="auth-btn" to="/signup">Sign Up</Link></span>
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

export default Login
