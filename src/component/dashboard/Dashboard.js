import React from 'react';
import './dashboard.css';
import Sidebar from './Sidebar';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Dashboard({ component: Component, ...rest }) {

    const { userStoreTransaction, userStorePayment, userStoreRent, userStoreReturn } = useStore()
    const { currentUser, userData } = useAuth();

    return (
        <Route  {...rest}
            render={props => {
                return currentUser ?
                    <>
                        <div className="container-dashboard">
                            <Sidebar />
                            <div className="content-wrapper">
                                <div className="admin-navbar">
                                    <NotificationsNoneIcon style={{ marginRight: "16px", fontSize: "32px" }} />
                                    <Link to="/profile">
                                        <Avatar />
                                    </Link>
                                </div>
                                <Component {...props} />
                            </div>
                        </div>
                    </>
                    :
                    <Redirect to="/login" />
            }}
        />

    )
}

export default Dashboard
