import React from 'react'
import './Home.css'
import ProductCard from './ProductCard'
import { useFirestore } from '../../context/FirestoreContext';

function ProductContain() {


    const { productList } = useFirestore()

    return (
        <div className="container-home">
            <div className="filter-wrapper">
                <div className="search-option">
                    <input type="text" placeholder="Searching..." />
                    <button type="submit" className="btn-search">Search</button>
                </div>
                <hr className="spacing-line" />
                <div className="sort-option">
                    <label for="filters">Sort By :</label>
                    <select id="filters" name="filters" className="filter-style">
                        <option value="newest">Newest</option>
                        <option value="Popular">Popular</option>
                        <option value="best">Best</option>
                    </select>
                </div>
            </div>
            <div className="container-wrap-home">
                {productList && productList.map((product, key) => (
                    <ProductCard
                        product={product} key={key} category="kamera" rate={4}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductContain
