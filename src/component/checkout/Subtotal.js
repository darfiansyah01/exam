import React, { useState } from 'react'
import './Checkout.css'
import { getBasketTotal } from '../../reducer'
import { useStateValue } from '../../context/StateProvider'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router'
import { useFirestore } from '../../context/FirestoreContext'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';

function Subtotal() {

    const [{ basket }, dispatch] = useStateValue();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { getSpessificStore } = useFirestore()
    const history = useHistory()

    const storeDetail = basket.find((x) => x.storeId === basket[0].storeId)
    console.log(storeDetail)

    async function handleSubmit() {
        try {
            setError("")
            setLoading(true)
            console.log(storeDetail.storeId)
            await getSpessificStore(storeDetail.storeId)
        } catch {
            setError("Failed to Sign In")
        }

        setLoading(false);
        history.push('/rentform')

    }

    return (
        <div className="subtotal">
            <Typography variant="subtitle1">Order Summary</Typography>
            <hr className="line" />
            <List>
                <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <ListItem style={{ padding: "0", margin: "10px 0" }} >
                                <ListItemText primary={"Items " + basket?.length} />
                                <Typography variant="body2">{value}</Typography>
                            </ListItem>
                            <ListItem style={{ padding: "0", margin: "10px 0" }} >
                                <ListItemText primary="Total" />
                                <Typography variant="body2">{value}</Typography>
                            </ListItem>
                            <hr className="line" />
                            <small className="subtotal__gift">
                                <input type="checkbox" /> This order contains a gift
                            </small>
                        </>
                    )}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp."}
                />

            </List>
            <button className="btn-subtotal" onClick={handleSubmit}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal