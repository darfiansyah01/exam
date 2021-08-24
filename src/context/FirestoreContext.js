import React, { useContext, useState, useEffect } from 'react'
import { db } from '../component/firebase/config'
import { useAuth } from './AuthContext'

const FirestoreContext = React.createContext();

export function useFirestore() {
    return useContext(FirestoreContext);
}

export function FireStoreProvider({ children }) {

    const { currentUser, updateAddress } = useAuth();
    const [loading, setLoading] = useState();
    const createAd = new Date().getTime();
    const [productList, setProductList] = useState([]);
    const [storeList, setStoreList] = useState([]);
    const [storeDetail, setStoreDetail] = useState([]);
    const [newTransaction, setNewTransaction] = useState([]);

    function createRentDetail(storeId, storeName, productLists, rentDetail, returnDetail, total) {
        console.log(returnDetail)
        if (currentUser && storeId) {
            var data = db.collection("rentDetail").doc();
            data.set({
                id: data.id,
                storeId: storeId,
                storeName: storeName,
                userId: currentUser.uid,
                userName: rentDetail.name,
                userEmail: currentUser.email,
                userPhoneNumber: rentDetail.phoneNumber,
                userAddress: rentDetail.address,
                userAddressCity: rentDetail.city,
                userAddressKodePos: rentDetail.kodePos,
                statusRent: "Dipesan",
                rentDate: rentDetail.rentDate,
                createAd: createAd,
                productLists
            }).then(() => {
                var returnData = db.collection("returnDetail").doc();
                returnData.set({
                    id: returnData.id,
                    rentId: data.id,
                    storeId: storeId,
                    userId: currentUser.uid,
                    returnDate: returnDetail.returnDate,
                    returnAddressDetail: returnDetail.returnAddress,
                    returnAddressCity: returnDetail.returnAddressCity,
                    returnAddressKodePos: returnDetail.returnAddressKodePos,
                    statusReturn: "onrent",
                    createAd: createAd,
                    productLists
                }).then(() => {
                    var paymentData = db.collection("payment").doc();
                    paymentData.set({
                        kodePayment: paymentData.id,
                        userId: currentUser.uid,
                        storeId: storeId,
                        rentId: data.id,
                        returnId: returnData.id,
                        paymentProof: '',
                        status: "Processing",
                        totalPrice: total,
                        createAd: createAd,
                        productLists
                    })
                    createTransaksi(storeId, rentDetail, returnDetail, productLists, paymentData.id, returnData.id, data.id, total)
                })
            })
        }
    }

    function createTransaksi(storeId, rentDetail, returnDetail, productLists, paymentId, returnId, rentId, total) {
        if (currentUser && storeId) {
            db.collection("transaksi").doc(paymentId).set({
                storeId: storeId,
                rentId: rentId,
                returnId: returnId,
                paymentId: paymentId,
                userId: currentUser.uid,
                userName: rentDetail.name,
                userEmail: currentUser.email,
                userPhoneNumber: rentDetail.phoneNumber,
                userAddress: rentDetail.address,
                userAddressCity: rentDetail.city,
                userAddressKodePos: rentDetail.kodePos,
                statusRent: "Dipesan",
                statusReturn: "onrent",
                rentDate: rentDetail.rentDate,
                returnDate: returnDetail.returnDate,
                returnAddressDetail: returnDetail.returnAddress,
                returnAddressCity: returnDetail.returnAddressCity,
                returnAddressKodePos: returnDetail.returnAddressKodePos,
                paymentProof: '',
                statusPayment: "Processing",
                totalPrice: total,
                createAd: createAd,
                productLists
            })
            console.log(createAd)
            getTransaction(paymentId)
        }
    }

    function updatePaymentProof(url, paymentId) {
        console.log(url)
        console.log(paymentId)
        if (url) {
            db.collection("payment").doc(paymentId).update({
                paymentProof: url,
                status: "Berhasil"
            }).then(() => {
                db.collection("transaksi").where("paymentId", "==", paymentId).get().then(snapshot => {
                    if (snapshot.size > 0) {
                        snapshot.forEach(item => {
                            db.collection("transaksi").doc(item.id).update({
                                paymentProof: url,
                                statusPayment: "Berhasil"
                            })
                        })
                    }
                })
            })
        } else {
            db.collection("payment").doc(paymentId).update({
                status: "Gagal"
            }).then(() => {
                db.collection("transaksi").where("paymentId", "==", paymentId).get().then(snapshot => {
                    if (snapshot.size > 0) {
                        snapshot.forEach(item => {
                            db.collection("transaksi").doc(item.id).update({
                                statusPayment: "Gagal"
                            })
                        })
                    }
                })
            })
        }

    }

    function updateStatusTransaksi(paymentId, rentId, rentStatus, returnId, returnStatus) {
        db.collection("transaksi").doc(paymentId).update({
            statusRent: rentStatus,
            statusReturn: returnStatus,
        }).then(() => {
            if (rentStatus && rentId) {
                db.collection("rentDetail").where("id", "==", rentId).get().then(snapshot => {
                    if (snapshot.size > 0) {
                        snapshot.forEach(item => {
                            db.collection("rentDetail").doc(item.id).update({
                                statusRent: rentStatus,
                            })
                        })
                    }
                })
            }
            if (returnStatus && returnId) {
                db.collection("returnDetail").where("id", "==", returnId).get().then(snapshot => {
                    if (snapshot.size > 0) {
                        snapshot.forEach(item => {
                            db.collection("returnDetail").doc(item.id).update({
                                statusReturn: rentStatus,
                            })
                        })
                    }
                })
            }
        })
    }

    function updateAvatar(url, actionName) {
        db.collection(actionName).doc(currentUser.uid).update({
            avatarUrl: url
        })
    }

    function getTransaction(paymentId) {
        console.log(paymentId)
        if (paymentId) {
            setLoading(true)
            db.collection("transaksi").doc(paymentId).get().then((doc) => {
                const data = ({ ...doc.data() });
                setNewTransaction(data)
                setLoading(false)
            })
        }
    }

    function getSpessificStore(storeId) {
        if (storeId) {
            setLoading(true)
            db.collection("userStore").doc(storeId).get().then((doc) => {
                const data = ({ ...doc.data() });
                setStoreDetail(data)
                setLoading(false)
            })
        }

    }

    function getProduct() {
        setLoading(true)
        const fetchData = async () => {
            const data = await db.collection("product").get();
            setProductList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }
        fetchData();
    }

    function getStore() {
        setLoading(true)
        const fetchData = async () => {
            const data = await db.collection("userStore").get();
            setStoreList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }
        fetchData();
    }

    useEffect(() => {

        getProduct()
        getStore()

    }, [])

    const value = {
        createRentDetail,
        getSpessificStore,
        updatePaymentProof,
        updateAvatar,
        updateStatusTransaksi,
        productList,
        storeList,
        storeDetail,
        newTransaction,
    }

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    )
}
