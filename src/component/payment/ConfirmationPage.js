import React, { useState } from 'react'
import { Alert } from '@material-ui/lab'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CurrencyFormat from 'react-currency-format'
import './Payment.css'
import { useFirestore } from '../../context/FirestoreContext';
import { Typography } from '@material-ui/core';
import { useStateValue } from '../../context/StateProvider';



function ConfirmationPage({ rentDetail, returnDetail, nextStep, backStep, rentProductDetail }) {

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { storeDetail, createRentDetail } = useFirestore();
    const returnDate = new Date(returnDetail.returnDate)
    const rentDate = new Date(rentDetail.rentDate)
    const [{ basket }, dispatch] = useStateValue();
    console.log(storeDetail)

    const date = Math.abs(returnDate - rentDate) / (1000 * 60 * 60 * 24)
    const total = rentProductDetail.reduce((amount, item) => (item.price * item.quantity) * date + amount, 0)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await createRentDetail(storeDetail.id, storeDetail.storeName, rentProductDetail, rentDetail, returnDetail, total)
            dispatch({
                type: "REMOVE_SPEK_BASKET",
                id: storeDetail.id,
            });
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false);
        nextStep()
    }

    return (
        <div className="rentform-container">
            {error && <Alert severity="error">{error}</Alert>}
            <>
                <CurrencyFormat
                    renderText={(value) => (
                        <List disablePadding>{rentProductDetail && rentProductDetail.map((product) => (
                            <ListItem key={product.id} style={{ padding: "0" }} >
                                <ListItemText primary={product.title} secondary={`Quantity: ${product.quantity}`} />
                                <Typography variant="body2">{product.price}</Typography>
                            </ListItem>
                        ))}
                            <ListItem style={{ padding: '20px 0' }}>
                                <ListItemText primary="Days" />
                                <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
                                    {date} days
                                </Typography>
                            </ListItem>
                            <ListItem style={{ padding: '20px 0' }}>
                                <ListItemText primary="Total" />
                                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                                    {value}
                                </Typography>
                            </ListItem>
                        </List>
                    )}
                    displayType={"text"}
                    value={total}
                    thousandSeparator={true}
                    prefix={"Rp."}
                />
            </>
            <div className="btn-wrapper">
                <button onClick={backStep} className="btn-payment" >Back</button>
                <button onClick={handleSubmit} className="btn-payment">Next</button>
            </div>
        </div>
    )
}

export default ConfirmationPage
