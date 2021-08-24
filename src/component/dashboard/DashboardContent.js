import React, { useState } from 'react';
import './dashboard.css';
import DevicesIcon from '@material-ui/icons/Devices';
import Avatar from '@material-ui/core/Avatar';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectStorage } from '../firebase/config';
import { useFirestore } from '../../context/FirestoreContext';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Tables from './Tables';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DashboardContent() {

    const { userStoreData } = useAuth()
    const [fileUrl, setFileUrl] = useState(null)
    const [avatarImage, setAvatarImage] = useState()
    const [loading, setLoading] = useState(false)
    const [openImage, setOpenImage] = useState(false);
    const { updateAvatar } = useFirestore()

    const onChange = async (e) => {
        const image = e.target.files[0]
        setAvatarImage(image)
        console.log(avatarImage)
        setOpenImage(true)

    }

    const handleSubmitImage = async () => {
        setOpenImage(false)
        setLoading(true)
        const storageref = projectStorage.ref().child("userAvatarImage")
        const fileRef = storageref.child(avatarImage.name);
        await fileRef.put(avatarImage)
        setFileUrl(await fileRef.getDownloadURL())
        if (fileUrl) {
            await updateAvatar(fileUrl, "userStore")
            setLoading(false)
        }
    };

    const handleCloseImage = () => {
        setAvatarImage(null)
        setOpenImage(false);
    };

    function defaultBtnClick() {
        document.querySelector("#input-img-store").click()
    }

    return (
        <div className="admin-detail-transaction-section">
            {loading && <div className="progress-loading">
                <CircularProgress color="primary" size={68} style={{ marginTop: "20px" }} />
            </div>}
            <h2 className="title">Dashboard</h2>
            <div className="admin-detail-transaction">
                <div className="detail-transaction" style={{ backgroundColor: "#A1D1C5" }} >
                    <Avatar variant="square" style={{ borderRadius: "3px", backgroundColor: "#6D929B" }}>
                        <DevicesIcon />
                    </Avatar>
                    <div className="detail-transaction-text">
                        <p>Produk</p>
                        <h3>78</h3>
                    </div>
                    <Avatar style={{ width: "26px", height: "26px", backgroundColor: "#FFFFFF" }}>
                        <DoubleArrowIcon style={{ fontSize: "16px", color: "#A1D1C5" }} />
                    </Avatar>
                </div>
                <div className="detail-transaction" style={{ backgroundColor: "#E8D0A9" }} >
                    <Avatar variant="square" style={{ borderRadius: "3px", backgroundColor: "#6D929B" }}>
                        <DevicesIcon />
                    </Avatar>
                    <div className="detail-transaction-text">
                        <p>Produk</p>
                        <h3>78</h3>
                    </div>
                    <Avatar style={{ width: "26px", height: "26px", backgroundColor: "#FFFFFF" }}>
                        <DoubleArrowIcon style={{ fontSize: "16px", color: "#E8D0A9" }} />
                    </Avatar>
                </div>
                <div className="detail-transaction" style={{ backgroundColor: "#ACD1E9" }} >
                    <Avatar variant="square" style={{ borderRadius: "3px", backgroundColor: "#6D929B" }}>
                        <DevicesIcon />
                    </Avatar>
                    <div className="detail-transaction-text">
                        <p>Produk</p>
                        <h3>78</h3>
                    </div>
                    <Avatar style={{ width: "26px", height: "26px", backgroundColor: "#FFFFFF" }}>
                        <DoubleArrowIcon style={{ fontSize: "16px", color: "#ACD1E9" }} />
                    </Avatar>
                </div>
                <div className="detail-transaction" style={{ backgroundColor: "#E3A3A3" }} >
                    <Avatar variant="square" style={{ borderRadius: "3px", backgroundColor: "#6D929B" }}>
                        <DevicesIcon />
                    </Avatar>
                    <div className="detail-transaction-text">
                        <p>Produk</p>
                        <h3>78</h3>
                    </div>
                    <Avatar style={{ width: "26px", height: "26px", backgroundColor: "#FFFFFF" }}>
                        <DoubleArrowIcon style={{ fontSize: "16px", color: "#E3A3A3" }} />
                    </Avatar>
                </div>
            </div>
            <div className="admin-detail-transaction-user">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <div className="profile-image-store-grid">
                            {fileUrl ? <img src={fileUrl} alt="" /> : <img src={userStoreData.avatarUrl} alt="" />}
                            <button className="btn-profile" onClick={defaultBtnClick}>Pilih Foto</button>
                            <input type="file" id="input-img-store" onChange={onChange} />
                            <Typography variant="subtitle2" style={{ marginTop: "10px" }}>Besar file: maksimum 10.000.000
                                bytes (10 Megabytes). Ekstensi
                                file yang diperbolehkan: .JPG
                                .JPEG .PNG
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <div className="profile-detail-store-grid">
                            <Typography variant="h5" style={{ textAlign: "center", backgroundColor: "#ffffff", marginTop: "8px" }}>Biodata Diri</Typography>
                            <List>
                                <ListItem>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Nama Toko</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userStoreData.storeName}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>No.Telp</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userStoreData.phoneNumber}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Alamat</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userStoreData.address + ', ' + userStoreData.city + ', ' + userStoreData.kodePos}</Typography>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="profil-detail-row">
                                        <Typography variant="subtitle2" style={{ width: "150px" }}>Email</Typography>
                                        <p>:</p>
                                        <Typography variant="subtitle1">{userStoreData.email}</Typography>
                                    </div>
                                </ListItem>
                            </List>
                            <Link to="/setstore" style={{ textDecoration: "none", color: "#000000" }}>
                                <button className="btn-profile" >Update</button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="admin-detail-transaction-table">
                <Typography variant="h5" style={{ marginBottom: "12px" }}>Transaksi Terakhir</Typography>
                <div className="table-filter">
                    <div className="table-filter-search">
                        <FilterListIcon />
                        <label for="status-pembayaran">Status Pembayaran</label>
                        <Select
                            id="status-pembayaran"
                            variant="outlined"
                            value={10}
                            style={{ width: "140px", minWidth: "80px", height: "100%", fontSize: "12px" }}
                        >
                            <MenuItem value={10}>All</MenuItem>
                            <MenuItem value="berhasil">Berhasil</MenuItem>
                            <MenuItem value="proses">Proses</MenuItem>
                            <MenuItem value="gagal">Gagal</MenuItem>
                        </Select>
                        <label for="nama">Nama</label>
                        <TextField id="nama" variant="outlined" size="small" />
                        <Avatar variant="rounded" style={{ marginLeft: "20px", backgroundColor: "#DF9D9D", color: "#FFFFFF", cursor: "pointer" }}>
                            <SearchIcon />
                        </Avatar>
                    </div>
                    <div className="table-filter-search">
                        <label for="filter-table-row">Show</label>
                        <Select
                            id="filter-table-row"
                            variant="outlined"
                            value={10}
                            style={{ width: "100px", minWidth: "60px", height: "100%", fontSize: "12px" }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                        <label for="filter-table-row">entries</label>
                    </div>
                </div>
                <Tables />
                <div className="table-pagination">
                    <div className="table-pagination-text">
                        <p>Showing</p>
                        <strong>10</strong>
                        <p>out of</p>
                        <strong>20</strong>
                        <p>entires</p>
                    </div>
                    <Pagination count={10} variant="rounded" />
                </div>
            </div>
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
        </div>
    )
}

export default DashboardContent
