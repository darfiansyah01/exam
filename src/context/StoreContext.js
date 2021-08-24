import React, { useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../component/firebase/config'

const StoreContext = React.createContext();

export function useStore() {
    return useContext(StoreContext);
}

export function StoreProvider({ children }) {

    const { userData, updateAddress } = useAuth();
    const [userStoreTransaction, setUserStoreTransaction] = useState([])
    const [userStorePayment, setUserStorePayment] = useState([])
    const [userStoreRent, setUserStoreRent] = useState([])
    const [userStoreReturn, setUserStoreReturn] = useState([])
    const [userStoreProduct, setUserStoreProduct] = useState([])
    const createAd = new Date().getTime();


    function createStore(id, storeName, email, address, phoneNumber, city, kodepos) {

        if (userData.id === id) {
            db.collection("userStore").doc(id).set({
                id: id,
                storeName: storeName,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                kodePos: kodepos,
                createAd: createAd,
                avatarUrl: '',
            })
            updateAddress(address, id);
        }
    }

    function createProduct(storeId, storeName, productName, productPrice, imageUrl, desc, stok) {

        if (userData.id === storeId) {
            var product = db.collection("product").doc();
            product.set({
                id: product.id,
                storeId: storeId,
                storeName: storeName,
                productName: productName,
                productPrice: productPrice,
                imageUrl: imageUrl,
                desc: desc,
                stok: stok,
                createAd: createAd
            })
        }
    }

    function updateProduct(productId, productName, productPrice, stok) {
        console.log(productId)
        console.log(productName)
        console.log(productPrice)
        console.log(stok)
        if (productId) {
            db.collection("product").doc(productId).update({
                productName: productName,
                productPrice: productPrice,
                stok: stok,
                createAd: createAd
            })
        }
    }

    function deleteProduct(productId) {
        if (productId) {
            db.collection("product").doc(productId).delete();
        }
    }

    function deleteTransaction(paymentId, rentId, returnId) {
        db.collection("transaksi").doc(paymentId).delete().then(() => {
            db.collection("payment").doc(paymentId).delete().then(() => {
                db.collection("rentDetail").doc(rentId).delete().then(() => {
                    db.collection("returnDetail").doc(returnId).delete()
                })
            })
        })
    }

    function getStoreData(id) {
        getUserStoreTransaction(id)
        getUserStoreRent(id)
        getUserStoreReturn(id)
        getUserStorePayment(id)
        getUserStoreProduct(id)
    }

    function getUserStoreTransaction(id) {
        db.collection("transaksi").where("storeId", "==", id).onSnapshot((querySnapshot) => {
            const dataTransaction = []
            querySnapshot.forEach((doc) => {
                dataTransaction.push(doc.data())
            })
            setUserStoreTransaction(dataTransaction)
        })
    }

    function getUserStorePayment(id) {
        db.collection("payment").where("storeId", "==", id).onSnapshot((querySnapshot) => {
            const dataPayment = []
            querySnapshot.forEach((doc) => {
                dataPayment.push(doc.data())
            })
            setUserStorePayment(dataPayment)
        })
    }

    function getUserStoreRent(id) {
        db.collection("rentDetail").where("storeId", "==", id).onSnapshot((querySnapshot) => {
            const dataRent = []
            querySnapshot.forEach((doc) => {
                dataRent.push(doc.data())
            })
            setUserStoreRent(dataRent)
        })
    }

    function getUserStoreReturn(id) {
        db.collection("returnDetail").where("storeId", "==", id).onSnapshot((querySnapshot) => {
            const dataReturn = []
            querySnapshot.forEach((doc) => {
                dataReturn.push(doc.data())
            })
            setUserStoreReturn(dataReturn)
        })
    }

    function getUserStoreProduct(id) {
        db.collection("product").where("storeId", "==", id).onSnapshot((querySnapshot) => {
            const dataProduct = []
            querySnapshot.forEach((doc) => {
                dataProduct.push(doc.data())
            })
            setUserStoreProduct(dataProduct)
            console.log(userStoreProduct)
        })
    }

    useEffect(() => {
    }, [])

    const value = {
        createStore,
        createProduct,
        updateProduct,
        deleteProduct,
        deleteTransaction,
        getUserStoreTransaction,
        getUserStoreProduct,
        getUserStoreRent,
        getUserStoreReturn,
        getUserStorePayment,
        getStoreData,
        userStoreTransaction,
        userStorePayment,
        userStoreRent,
        userStoreReturn,
        userStoreProduct,
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
}
