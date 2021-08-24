import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../component/firebase/config'
import { db, timestamp } from '../component/firebase/config'

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState();
    const [userData, setUserData] = useState();
    const [userStoreData, setUserStoreData] = useState();
    const createAd = timestamp();

    function signup(email, password, name, phoneNumber) {

        return auth.createUserWithEmailAndPassword(email, password).then(user => {
            var userTable = db.collection("users").doc(user.user.uid)
            userTable.set({
                id: userTable.id,
                name: name,
                email: email,
                createAd: createAd,
                phoneNumber: phoneNumber,
                address: '',
                jenisKelamin: '',
                bornDate: '',
                store: false,
                avatarUrl: '',
            }).then(() => {
                db.collection("userStore").doc(user.user.uid).set({
                    createAd: createAd,
                })
            })
        })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)

    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email, userId) {
        return currentUser.updateEmail(email).then(() => {
            db.collection("users").doc(userId).update({
                email: email
            })
        })
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function updateAddress(address, userId) {

        db.collection("users").doc(userId).update({
            address: address,
            store: true
        })
    }

    function updateProfile(name, address, bornDate, phoneNumber, jenisKelamin) {
        db.collection("users").doc(currentUser.uid).update({
            name: name,
            address: address,
            bornDate: bornDate,
            phoneNumber: phoneNumber,
            jenisKelamin: jenisKelamin
        })
    }

    function updateStoreActivate(userId) {
        if (currentUser.uid === userId) {
            db.collection("users").doc(userId).update({
                store: false
            })
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            db.collection("users").doc(user.uid).onSnapshot((doc) => {
                setUserData(doc.data())
            })
            db.collection("userStore").doc(user.uid).onSnapshot((docs) => {
                setUserStoreData(docs.data())
            })
            setLoading(false)
        })
        return unsubscribe

    }, [])

    const value = {
        currentUser,
        userData,
        userStoreData,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateAddress,
        updateProfile,
        updateStoreActivate,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
