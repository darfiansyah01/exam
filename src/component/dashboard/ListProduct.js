import React, { useState } from 'react';
import './dashboard.css';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar, TextField, MenuItem, Select, IconButton, Slide, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useStore } from '../../context/StoreContext';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: "#CBCBCB",
        padding: "10px 6px",
        fontSize: 14,
    },
    body: {
        fontSize: 12,
        padding: 6,
    },
}))(TableCell);


const StyledTableRow = withStyles(() => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
}))(TableRow);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ListProduct() {

    const { userStoreProduct, deleteProduct } = useStore()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const history = useHistory()

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false)
    }

    return (
        <div className="admin-detail-transaction-section">
            <h2 className="title">Daftar Produk</h2>
            <button className="btn-dashboard" onClick={() => (history.push("/addproduct"))}>
                <AddIcon />
                <p>Tambah Produk</p>
            </button>
            <div className="admin-detail-transaction-table">
                <div className="table-filter">
                    <div className="table-filter-search">
                        <FilterListIcon />
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
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" width="50px">No</StyledTableCell>
                                <StyledTableCell>Nama Barang</StyledTableCell>
                                <StyledTableCell align="center">Harga</StyledTableCell>
                                <StyledTableCell align="center">Stok</StyledTableCell>
                                <StyledTableCell align="center" width="200px" >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userStoreProduct && userStoreProduct.map((product, key) => (
                                <StyledTableRow>
                                    <StyledTableCell align="center">{key + 1}</StyledTableCell>
                                    <StyledTableCell >{product.productName}</StyledTableCell>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <StyledTableCell align="center" >{value}</StyledTableCell>
                                        )}
                                        displayType={"text"}
                                        value={product.productPrice}
                                        thousandSeparator={true}
                                        prefix={"Rp."}
                                    />
                                    <StyledTableCell align="center">{product.stok}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton component="span" style={{ color: "#f44336" }} onClick={openDialog}>
                                            <DeleteIcon />
                                            <Typography variant="subtitle2">Hapus</Typography>
                                        </IconButton>
                                        <Link style={{ textDecoration: "none" }} to={{ pathname: `/dashboard/view-product/${product.id}`, state: { data: product } }}>
                                            <IconButton component="span" style={{ color: "#ff9800" }}>
                                                <EditIcon />
                                                <Typography variant="subtitle2">Edit</Typography>
                                            </IconButton>
                                        </Link>
                                    </StyledTableCell>
                                    <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={closeDialog}
                                        aria-labelledby="alert-dialog-slide-title"
                                    >
                                        <DialogTitle id="alert-dialog-slide-title">{"Apakah Anda Yakin ?"}</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={closeDialog} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={async () => {
                                                try {
                                                    setError("")
                                                    await deleteProduct(product.id)
                                                    setOpen(false)
                                                } catch {
                                                    setError("Gagal Menghapus Product")
                                                }
                                            }} color="primary">
                                                Ok
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>
                </>
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
        </div>
    )
}

export default ListProduct
