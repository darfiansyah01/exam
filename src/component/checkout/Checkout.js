import React from 'react'
import './Checkout.css'
import CheckoutProduct from '../checkout/CheckoutProduct'
import Subtotal from '../checkout/Subtotal'
import { useStateValue } from '../../context/StateProvider'
import { Grid, Typography } from '@material-ui/core'

function Checkout() {

    const [{ basket }] = useStateValue();

    return (
        <div className="container">
            <div className="checkout-wrapper">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={8}>
                        <div className="checkout-product">
                            <Typography variant="h6">Shopping Cart</Typography>
                            <hr className="line" />
                            <Grid container>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="subtitle1">Product Details</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="subtitle1" style={{ textAlign: "center" }}>Quantity</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="subtitle1" style={{ textAlign: "center" }}>Price</Typography>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Typography variant="subtitle1" style={{ textAlign: "center" }}>Action</Typography>
                                </Grid>
                            </Grid>
                            <hr className="line" />
                            {basket.map((item, key) => (
                                <CheckoutProduct item={item} key={key}
                                />
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Subtotal />
                    </Grid>
                </Grid>
            </div>



        </div>
    )
}

export default Checkout
