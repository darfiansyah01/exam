import React, { useRef, useState } from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useAuth } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import './User.css'

function ChangePassEmail() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match");
        }

        const promise = [];
        setError("")
        setLoading(false)

        if (emailRef.current.value !== currentUser.email) {
            promise.push(updateEmail(emailRef.current.value, currentUser.uid))
        }
        if (passwordRef.current.value) {
            promise.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promise).then(() => {
            history.push("/")
        }).catch(() => {
            setError("Failed to update account")
            setOpen(true)
        }).finally(() => {
            setLoading(false)
        })

    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div className="container">
            <div className="container-wrap-form">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h5" style={{ backgroundColor: "#ffffff", textAlign: "center", marginBottom: "30px" }}>Change Password / Email</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="formField">
                            <Typography variant="subtitle1" style={{ marginBottom: "12px" }}>Email</Typography>
                            <TextField id="email" className="form-inputField" size="small" label="Email" inputRef={emailRef} defaultValue={currentUser.email} required variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="formField">
                            <Typography variant="subtitle1" style={{ marginBottom: "12px" }}>Password</Typography>
                            <TextField id="password" className="form-inputField" size="small" label="Password" type="password" inputRef={passwordRef} placeholder="Leave a blank to keep same" required variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="formField">
                            <Typography variant="subtitle1" style={{ marginBottom: "12px" }}>Password Confirmation</Typography>
                            <TextField id="passwordConfirm" className="form-inputField" size="small" label="Password Confirmation" type="password" placeholder="Leave a blank to keep same" inputRef={passwordConfirmRef} variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <button disabled={loading} onClick={handleSubmit} className="btn-update">Submit</button>
                    </Grid>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                        <Alert onClose={handleClose} severity="success">
                            {error}
                        </Alert>
                    </Snackbar>
                </Grid>
            </div >
        </div>
    )
}

export default ChangePassEmail
