import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { useAuth } from '../../context/AuthContext'

const useFirestore = (collection) => {

    const [userProfile, setuserProfile] = useState()
    const { currentUser } = useAuth()


    useEffect(() => {
        const userId = currentUser.uid
        if (userId) {
            db.collection(collection).doc(userId).get().then(snapshot => {
                const item = snapshot.data();
                setuserProfile(item)
            })
        }
    }, [collection])
    return { userProfile }
}

export default useFirestore;