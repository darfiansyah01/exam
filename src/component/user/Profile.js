import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './User.css'
import { useAuth } from '../../context/AuthContext'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { projectStorage } from '../firebase/config';
import { useFirestore } from '../../context/FirestoreContext';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserTransaction from './UserTransaction';
import { useStore } from '../../context/StoreContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {

    const { userData, updateStoreActivate } = useAuth();
    const [open, setOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState(null)
    const [openImage, setOpenImage] = useState(false);
    const [avatarImage, setAvatarImage] = useState()
    const [loading, setLoading] = useState(false)
    const { updateAvatar, } = useFirestore()
    const { getStoreData } = useStore()
    const history = useHistory()

    const onChange = async (e) => {
        setLoading(true)
        const avatarImage = e.target.files[0]
        setAvatarImage(avatarImage)
        setOpenImage(true)
    }

    const handleSubmitImage = async () => {
        setOpenImage(false)
        const storageref = projectStorage.ref().child("userAvatarImage")
        const fileRef = storageref.child(avatarImage.name);
        await fileRef.put(avatarImage)
        setFileUrl(await fileRef.getDownloadURL())
        if (fileUrl) {
            await updateAvatar(fileUrl, "users")
            setLoading(false)
        }
    };

    async function storeDeactive() {
        try {
            setLoading(true)
            await updateStoreActivate(userData.id)
        } catch {
            setLoading(true)
        }
        setLoading(false)
    }

    const handleCloseImage = () => {
        setOpenImage(false);
    };

    function handleOpenDialog() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleSubmit() {
        history.push('/setstore')
    }

    function defaultBtnClick() {
        document.querySelector("#input-img-profile").click()
    }

    async function toDashboard() {
        console.log(userData.store)
        if (userData.store === true) {
            try {
                setLoading(true)
                await getStoreData(userData.id)
                history.push('/dashboard/')
            } catch {
                setLoading(true)
            }
            setLoading(false)
        }
    }

    return (

        <div className="container">
            {loading && <div className="progress-wrapper">
                <CircularProgress color="primary" size={68} style={{ marginTop: "20px" }} />
            </div>}
            <div className="container-wrap">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <div className="profile-image-grid">
                            {fileUrl ? <img src={fileUrl} alt="" /> : <img src={userData.avatarUrl} alt="" />}
                            <button className="btn-profile" onClick={defaultBtnClick}>Pilih Foto</button>
                            <input type="file" onChange={onChange} id="input-img-profile" />
                            <Typography variant="subtitle2" >Besar file: maksimum 10 Megabytes. Ekstensi file yang diperbolehkan: .JPG
                                .JPEG .PNG
                            </Typography>
                            <Link to="/changepassemail" style={{ textDecoration: "none", color: "#000000" }}>
                                <button className="btn-profile">Change Password/Email</button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <div className="profile-detail-grid">
                            <Typography variant="h5" style={{ textAlign: "center", backgroundColor: "#ffffff", marginTop: "8px" }}>Biodata Diri</Typography>

                            <List>
                                <ListItem style={{ padding: '10px' }}>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Nama</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userData.name}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem style={{ padding: '10px' }}>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Tanggal Lahir</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userData.bornDate}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem style={{ padding: '10px' }}>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Jenis Kelamin</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userData.jenisKelamin}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem style={{ padding: '10px' }}>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Email</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userData.email}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem style={{ padding: '10px' }}>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>No.Telp</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userData.phoneNumber}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem style={{ padding: '10px', marginBottom: "8px" }}>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Alamat</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userData.address}</Typography>
                                    </div>
                                </ListItem>
                            </List>
                            <Link to="/updateprofile" style={{ textDecoration: "none", color: "#000000" }}>
                                <button className="btn-profile">Update Profile</button>
                            </Link>
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div className="profile-footer">
                            {userData.store ?
                                <>
                                    <button onClick={toDashboard} className="btn-profile">Store</button>
                                    <button onClick={storeDeactive} className="btn-profile">Close Store</button>
                                </>
                                :
                                <button onClick={handleOpenDialog} className="btn-profile">Set Your Store</button>
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <UserTransaction />
                    </Grid>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                    >
                        <DialogTitle id="alert-dialog-title">{"Apakah anda yakin ingin membuat store?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleSubmit} color="primary" autoFocus>Ok</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openImage}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseImage}
                        aria-labelledby="alert-dialog-slide-title"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Save Image ?"}</DialogTitle>
                        <DialogActions>
                            <Button onClick={handleCloseImage} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmitImage} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>

            </div>
        </div>
    )
}

export default Profile
