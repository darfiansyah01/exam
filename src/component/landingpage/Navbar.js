import React, { useState } from 'react'
import './Home.css'
import { cartListItem } from '../../reducer'
import logo from '../picture/logo.png'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider'
import { useAuth } from '../../context/AuthContext'
import { Avatar } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Badge from '@material-ui/core/Badge';



function Navbar() {

    const [{ basket }, dispatch] = useStateValue();
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    async function handleSubmit() {

        try {
            await logout();
            dispatch({
                type: "RESET_BASKET"
            })
            history.push("/login")
        } catch {
        }
    }

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                <Link to="/">
                    <img src={logo} className="logo" alt="" />
                </Link>
                <ul className="nav-link">
                    <Link to="/" style={{ textDecoration: "none", color: "#FFFFFF" }}>
                        <li className="nav-list">Beranda</li>
                    </Link>
                    <li className="nav-list">Produk</li>
                    <li className="nav-list">Kategori</li>
                    <li className="nav-list">Tentang Kami</li>
                </ul>
                <div className="nav-option">
                    {currentUser ?
                        <div className="nav-option-user">
                            <Link to="/profile" style={{ textDecoration: "none" }}>
                                <Avatar className="avatar" alt="" src="" />
                            </Link>
                            <p>Muhammad Darfiansyah</p>
                            <button className="navbar-btn" onClick={handleOpen}>Logout</button>
                        </div>
                        :
                        <Link to="/login">
                            <button className="navbar-btn">log In</button>
                        </Link>
                    }
                    <Link to="/checkout" style={{ color: "#FFFFFF" }}>
                        <div className="nav-option-headerBasket">
                            <Badge badgeContent={cartListItem(basket)} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </div>
                    </Link>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Apakah anda yakin ingin keluar?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSubmit} color="primary" autoFocus>Ok</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Navbar
