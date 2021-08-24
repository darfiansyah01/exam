import React from 'react'
import './Home.css'
import { useStateValue } from '../../context/StateProvider'
import CurrencyFormat from 'react-currency-format'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

function ProductCard({ product, category, rate }) {

    const [{ basket }, dispatch] = useStateValue();

    const addCart = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                seller: product.storeName,
                storeId: product.storeId,
                id: product.id,
                title: product.productName,
                price: product.productPrice,
                rate: rate,
                stok: product.stok,
                image: product.imageUrl,
                category: category,
            }
        })
    }

    return (
        <Card className="product-card">
            <CardActionArea>
                <div className="item-tag-wrap">
                    <p>Popular</p>
                </div>
                <CardContent style={{ textAlign: "center", padding: "0" }}>
                    <div className="image-wrapper-card">
                        <img src={product.imageUrl} alt="" className="image-product" />
                    </div>
                    <p className="product-title">{product.productName}</p>
                    <p className="product-store-name">{product.storeName}</p>
                    <CurrencyFormat
                        renderText={(value) => (
                            <p className="product-price">{value} / hari</p>
                        )}
                        displayType={"text"}
                        value={product.productPrice}
                        thousandSeparator={true}
                        prefix={"Rp."}
                    />
                </CardContent>
            </CardActionArea>
            <button className="productCard-btn" onClick={addCart}>Add to Cart</button>
        </Card>
    )
}

export default ProductCard
