import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from './component/landingpage/Navbar';
import { useAuth } from './context/AuthContext'


export default function PrivateRoutes({ component: Component, ...rest }) {
    const { currentUser, userData } = useAuth();
    console.log(userData.store)

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ?
                    <>
                        <Navbar />
                        <Component {...props} />
                    </>
                    :
                    <Redirect to="/login" />
            }}
        />
    )
}