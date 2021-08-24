import React, { Fragment, useState } from 'react'
import useStorage from '../firebase/useStorage'
import { useFirestore } from '../../context/FirestoreContext';
import { Alert } from '@material-ui/lab'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';

function SaveImage({ imageUrl, folderName, paymentId }) {

    const { url } = useStorage(imageUrl, folderName)
    const { updatePaymentProof } = useFirestore();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const history = useHistory()
    console.log(url)

    async function handleClick() {
        try {
            if (url) {
                setError("")
                setLoading(true)
                await updatePaymentProof(url, paymentId.paymentId)
                history.push('/checkout')
            } else {
                setOpen(true)
            }
        } catch {
            setError("Pembayaran Gagal")
        }
        setLoading(false);
    }

    function handleClose() {
        setOpen(false)
    }

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>

    );

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <button className="custom-btn" onClick={handleClick}>Bayar</button>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Tunggu Sebentar..."
                action={action}
            />
        </div>
    )
}

export default SaveImage
