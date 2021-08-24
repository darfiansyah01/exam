import React, { useRef, useState } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory, useLocation } from "react-router-dom";
import './Addproduct.css'
import { useStore } from '../../context/StoreContext';

function UpdateProduct() {

    const { updateProduct } = useStore();
    const { state } = useLocation();
    const productName = useRef();
    const productPrice = useRef();
    const productStok = useRef();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [open, setOpen] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            await updateProduct(state.data.id, productName.current.value, productPrice.current.value, productStok.current.value)
            setSuccess("Berhasil Mengubah Product!!!")
            setOpen(true)
        } catch {
            setError("Failed to create product")
        }


    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="container">
            <div className="form-updateproduct">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Product Name</Typography>
                        <TextField id="product-name" size="small" inputRef={productName} defaultValue={state.data.productName} required variant="outlined"
                            style={{ width: "100%", marginBottom: "20px" }} InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Product Price</Typography>
                        <TextField id="product-price" type="number" size="small" inputRef={productPrice} defaultValue={state.data.productPrice} required
                            style={{ width: "100%", marginBottom: "20px" }} variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Stok</Typography>
                        <TextField id="product-stok" type="number" size="small" inputRef={productStok} defaultValue={state.data.stok} required
                            style={{ width: "100%", marginBottom: "20px" }} variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="btn-test-wrapper">
                            <button className="btn-test" onClick={handleSubmit}>Save</button>
                            <button onClick={() => history.push('/dashboard/productlist')} className="btn-test">Cancel</button>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {success ? <Alert onClose={handleClose} severity="success">{success}</Alert> : <Alert onClose={handleClose} severity="error">{error}</Alert>}
            </Snackbar>
        </div>
    )
}

export default UpdateProduct
