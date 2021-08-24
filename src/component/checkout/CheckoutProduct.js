import React, { useState } from 'react'
import './Checkout.css'
import { useStateValue } from '../../context/StateProvider';
import { Grid, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

function CheckoutProduct({ item }) {

    const [{ basket }, dispatch] = useStateValue();
    const [disabled, setDisabled] = useState(false)

    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            id: item.id,
        });
    }

    const increaseQuantity = () => {
        setDisabled(false)
        if (item.quantity >= item.stok) {
            setDisabled(true)
        } else {
            dispatch({
                type: "INCREASE_QUANTITY",
                id: item.id,
                quantity: item.quantity
            })
        }
    }

    const decreaseQuantity = () => {
        dispatch({
            type: "DECREASE_QUANTITY",
            id: item.id,
            quantity: item.quantity
        })
        setDisabled(false)
    }

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <div className="checkout-product-wrapper">
                    <div className="checkout-product-wrapper-image">
                        <img alt="" src={item.image} />
                    </div>
                    <div className="checkoutProduct__info">
                        <Typography variant='button' style={{ marginBottom: "12px" }}>{item.title}</Typography>
                        <Typography style={{ marginBottom: "12px", fontSize: "12px" }}>{item.seller}</Typography>
                        <Rating name="read-only" value={item.rate} readOnly />
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={2}>
                <div className="increaseProduct_contain">
                    <button className="increaseProduct_btn" disabled={disabled} onClick={increaseQuantity}>+</button>
                    <p>{item.quantity}</p>
                    <button className="increaseProduct_btn" onClick={decreaseQuantity}>-</button>
                </div>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Typography variant='subtitle2' style={{ textAlign: "center" }}>{"Rp." + item.price}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <button onClick={removeFromBasket}>Remove From Cart</button>
            </Grid>
            <hr className="line" />
        </Grid>
    )
}

export default CheckoutProduct
