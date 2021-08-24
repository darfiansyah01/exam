import React, { useState } from 'react';
import './dashboard.css';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Avatar, TextField, MenuItem, Select, IconButton, Box, Collapse, Slide, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Dialog, DialogActions, DialogTitle, Button, DialogContent, DialogContentText } from '@material-ui/core';
import { useStore } from '../../context/StoreContext';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CurrencyFormat from 'react-currency-format';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import { Link } from 'react-router-dom';

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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false)
    const { deleteTransaction } = useStore()
    const [error, setError] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)

    const openDialog = () => {
        setOpenDialogDelete(true)
    }

    const closeDialog = () => {
        setOpenDialogDelete(false)
    }

    return (
        <>
            <StyledTableRow key={row.returnId}>
                <StyledTableCell component="th" scope="row">{row.returnId}</StyledTableCell>
                <StyledTableCell>{row.userName}</StyledTableCell>
                <StyledTableCell>{row.userAddress},{row.userAddressCity},{row.userAddressKodePos}</StyledTableCell>
                <StyledTableCell align="center">{row.userPhoneNumber}</StyledTableCell>
                <StyledTableCell align="center">{row.rentDate}</StyledTableCell>
                {row.statusReturn === "return" ?
                    <StyledTableCell style={{ color: "#4caf50", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CheckCircleOutlineIcon />
                            <Typography variant="subtitle2" style={{ marginLeft: "8px" }}>Return</Typography>
                        </div>
                    </StyledTableCell>
                    :
                    <StyledTableCell style={{ color: "#ff9800" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <LoopIcon />
                            <Typography variant="subtitle2" style={{ marginLeft: "8px" }}>On Rent</Typography>
                        </div>
                    </StyledTableCell>
                }
                <StyledTableCell align="center">
                    <div className="product-list-btn">
                        <p>Lihat Detail</p>
                        <IconButton style={{ width: "32px", height: "32px", marginLeft: "6px" }} onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                    <IconButton component="span" style={{ color: "#f44336" }} onClick={openDialog}>
                        <DeleteIcon />
                        <Typography variant="subtitle2">Hapus</Typography>
                    </IconButton>
                    <Link style={{ textDecoration: "none" }} to={{ pathname: `/dashboard/view-detailtransaction/${row.returnId}`, state: { data: row }, type: "returnlist" }}>
                        <IconButton component="span" style={{ color: "#ff9800" }}>
                            <EditIcon />
                            <Typography variant="subtitle2">Edit</Typography>
                        </IconButton>
                    </Link>
                </StyledTableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="subtitle1">Daftar Produk</Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nama</TableCell>
                                        <TableCell align="center">Harga</TableCell>
                                        <TableCell align="center">Jumlah</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.productLists.map((rows, key) => (
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row">
                                                {rows.title}
                                            </TableCell>
                                            <CurrencyFormat
                                                renderText={(value) => (
                                                    <StyledTableCell align="center" >{value}</StyledTableCell>
                                                )}
                                                displayType={"text"}
                                                value={rows.price}
                                                thousandSeparator={true}
                                                prefix={"Rp."}
                                            />
                                            <TableCell align="center">{rows.quantity}</TableCell>
                                            <CurrencyFormat
                                                renderText={(value) => (
                                                    <StyledTableCell align="right">{value}</StyledTableCell>
                                                )}
                                                displayType={"text"}
                                                value={rows.price * rows.quantity}
                                                thousandSeparator={true}
                                                prefix={"Rp."}
                                            />
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell rowSpan={3} />
                                        <TableCell colSpan={2}>Subtotal</TableCell>
                                        <CurrencyFormat
                                            renderText={(value) => (
                                                <StyledTableCell align="right">{value}</StyledTableCell>
                                            )}
                                            displayType={"text"}
                                            value={row.totalPrice}
                                            thousandSeparator={true}
                                            prefix={"Rp."}
                                        />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
                <Dialog
                    open={openDialogDelete}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={closeDialog}
                    aria-labelledby="alert-dialog-slide-title"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Apakah Anda Yakin ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Menghapus transaksi ini, juga akan mengapus semua detail penyewaan serta pengembalian yang terkait
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={async () => {
                            try {
                                setError("")
                                await deleteTransaction(row.paymentId, row.rentId, row.returnId)
                                setOpen(false)
                            } catch {
                                setError("Gagal Menghapus Product")
                            }
                        }} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </TableRow>
        </>
    )
}

function ListReturnTransaction() {

    const { userStoreTransaction } = useStore()

    return (
        <div className="admin-detail-transaction-section">
            <h2 className="title">Daftar Pegembalian Barang</h2>
            <div className="admin-detail-transaction-table">
                <div className="table-filter">
                    <div className="table-filter-search">
                        <FilterListIcon />
                        <label for="status-pembayaran">Status Pembayaran</label>
                        <Select
                            id="status-pembayaran"
                            variant="outlined"
                            value={10}
                            style={{ width: "100px", minWidth: "80px", height: "100%", fontSize: "12px" }}
                        >
                            <MenuItem value={10}>All</MenuItem>
                            <MenuItem value="berhasil">Berhasil</MenuItem>
                            <MenuItem value="proses">Proses</MenuItem>
                            <MenuItem value="gagal">Gagal</MenuItem>
                        </Select>
                        <label for="rentDate">Tanggal</label>
                        <TextField id="rentDate" type="date" variant="outlined" size="small" InputLabelProps={{ shrink: true, }} />
                        <label for="returnDate">to</label>
                        <TextField id="returnDate" type="date" variant="outlined" size="small" InputLabelProps={{ shrink: true, }} />
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
                            style={{ width: "80px", minWidth: "60px", height: "100%", fontSize: "12px" }}
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
                                <StyledTableCell>Kode</StyledTableCell>
                                <StyledTableCell>Nama Penyewa</StyledTableCell>
                                <StyledTableCell>Alamat</StyledTableCell>
                                <StyledTableCell align="center">No.Telp</StyledTableCell>
                                <StyledTableCell align="center">Tanggal Pengembalian</StyledTableCell>
                                <StyledTableCell align="center">Status Pengembalian</StyledTableCell>
                                <StyledTableCell align="center">Nama Barang</StyledTableCell>
                                <StyledTableCell align="center">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userStoreTransaction.map((row, key) => (
                                <Row key={key} row={row} />
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

export default ListReturnTransaction
