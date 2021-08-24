import React, { useRef, useState } from 'react'
import { Grid, TextField, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Snackbar from '@material-ui/core/Snackbar';
import { useAuth } from '../../context/AuthContext'
import useStorage from '../firebase/useStorage'
import './Addproduct.css'
import { useStore } from '../../context/StoreContext';

const AddProductDetail = ({ imageUrl, nextStep, backStep, folderName }) => {


    const { url } = useStorage(imageUrl.file, folderName);
    const { userStoreData, currentUser } = useAuth();
    const { createProduct } = useStore();
    const productName = useRef();
    const productPrice = useRef();
    const productDesc = useRef();
    const productStok = useRef();
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(productDesc.current.value)

        if (productName.current.value === '' || productName.current.price === '' || productName.current.stok === '') {
            setError("Masukkan Detail Product Terlebih Dahulu")
            setOpen(true)
        } else {
            try {
                setError("")
                await createProduct(currentUser.uid, userStoreData.storeName, productName.current.value, productPrice.current.value, url, productDesc.current.value, productStok.current.value,)
            } catch {
                setError("Failed to create product")
            }
            nextStep();
        }

    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="addproduct-detail">
            <div className="form-addproduct">
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Product Name</Typography>
                        <TextField id="product-name" size="small" inputRef={productName} required variant="outlined"
                            style={{ width: "100%", marginBottom: "20px" }} InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Product Price</Typography>
                        <TextField id="product-price" type="number" size="small" inputRef={productPrice} required
                            style={{ width: "100%", marginBottom: "20px" }} variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Stok</Typography>
                        <TextField id="product-stok" type="number" size="small" inputRef={productStok} required
                            style={{ width: "100%", marginBottom: "20px" }} variant="outlined" InputLabelProps={{
                                shrink: true,
                            }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ marginBottom: "6px" }} >Description</Typography>
                        <TextareaAutosize rowsMin={6} variant="outlined" style={{ width: "100%", marginBottom: "20px" }}
                            ref={productDesc} />
                    </Grid>
                </Grid>
            </div>
            <div className="btn-test-wrapper">
                <button className="btn-test" onClick={backStep}>Back</button>
                <button className="btn-test" onClick={handleSubmit}>Create Product</button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {error && <Alert onClose={handleClose} severity="error">{error}</Alert>}
            </Snackbar>
        </div>
    )
}

export default AddProductDetail

/*

Select
<TextField
                id="tag"
                select
                size="small"
                inputRef={productTag}
                className="form-addproduct"
                style={{ width: "100%", marginBottom: "20px" }}
                variant="outlined"
                SelectProps={{
                    native: true,
                }}
            >
                {tags.map((option) => (
                    <option key={option.key} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </TextField>
*/