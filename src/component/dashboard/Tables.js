import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Avatar, Box, Collapse, IconButton, Typography } from '@material-ui/core';
import { useStore } from '../../context/StoreContext';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CurrencyFormat from 'react-currency-format';

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


function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false)

    return (
        <>
            <StyledTableRow key={row.paymmentId}>
                <StyledTableCell component="th" scope="row">{row.paymentId}</StyledTableCell>
                <StyledTableCell>{row.userName}</StyledTableCell>
                <StyledTableCell>{row.userAddress}, {row.userAddressCity}</StyledTableCell>
                <StyledTableCell>
                    {row.statusRent === "Pick Up" ?
                        <Avatar variant="rounded" style={{ padding: "0 16px", backgroundColor: "#ECB128", color: "FFFFFF", margin: "auto" }}>
                            <Typography variant="subtitle2">Pickup</Typography>
                        </Avatar>
                        : row.statusRent === "Dipesan" ?
                            <Avatar variant="rounded" style={{ padding: "0 16px", backgroundColor: "#67C780", color: "FFFFFF", margin: "auto" }}>
                                <Typography variant="subtitle2">Dipesan</Typography>
                            </Avatar>
                            :
                            <Avatar variant="rounded" style={{ padding: "0 16px", backgroundColor: "#00A9DE", color: "FFFFFF", margin: "auto" }}>
                                <Typography variant="subtitle2">Disewa</Typography>
                            </Avatar>
                    }

                </StyledTableCell>
                <StyledTableCell align="center">{row.rentDate} s/d {row.returnDate}</StyledTableCell>
                <StyledTableCell>
                    <div className="product-list-btn">
                        <p>Lihat Detail</p>
                        <IconButton style={{ width: "32px", height: "32px", marginLeft: "6px" }} onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </div>
                </StyledTableCell>
                {row.statusPayment === "Berhasil" ?
                    <StyledTableCell align="center" style={{ color: "#4caf50", textAlign: "center" }}>
                        <CheckCircleOutlineIcon /><Typography variant="subtitle2">{row.statusPayment}</Typography>
                    </StyledTableCell>
                    : row.statusPayment === "Processing" ?
                        <StyledTableCell align="center" style={{ color: "#ff9800" }}>
                            <LoopIcon /><Typography variant="subtitle2">{row.statusPayment}</Typography>
                        </StyledTableCell>
                        : <StyledTableCell align="center" style={{ color: "#f44336" }}>
                            <HighlightOffIcon /><Typography variant="subtitle2">{row.statusPayment}</Typography>
                        </StyledTableCell>}
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
                                        <TableCell align="center" >Harga</TableCell>
                                        <TableCell align="center">Jumlah</TableCell>
                                        <TableCell align="right">Total Bayar</TableCell>
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
            </TableRow>
        </>
    )
}


function Tables() {

    const { userStoreTransaction } = useStore()

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell >Kode</StyledTableCell>
                        <StyledTableCell>Nama</StyledTableCell>
                        <StyledTableCell>Alamat</StyledTableCell>
                        <StyledTableCell align="center">Status Penyewaan</StyledTableCell>
                        <StyledTableCell align="center" width="120px">Tanggal</StyledTableCell>
                        <StyledTableCell align="center">Nama Barang</StyledTableCell>
                        <StyledTableCell align="center">Status Pembayaran</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userStoreTransaction.map((row, key) => (
                        <Row key={key} row={row} no={key + 1} />
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Tables
