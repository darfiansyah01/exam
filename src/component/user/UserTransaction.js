import React, { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useAuth } from '../../context/AuthContext';
import { IconButton, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function UserTransaction() {


    const { userTransaction } = useAuth()
    const [color, setColor] = useState()

    return (
        <>
            <TableContainer component={Paper}>
                <Table className="container-table" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Rent Date</TableCell>
                            <TableCell align="center">Return Date</TableCell>
                            <TableCell align="center">Return Address</TableCell>
                            <TableCell align="center">Status Payment</TableCell>
                            <TableCell align="right">Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userTransaction && userTransaction.map((data, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {data.userName}
                                </TableCell>
                                <TableCell align="center">{data.rentDate}</TableCell>
                                <TableCell align="center">{data.returnDate}</TableCell>
                                <TableCell align="center">{data.userAddress + "," + data.userAddressCity + "," + data.userAddressKodePos}</TableCell>
                                {data.statusPayment === "Berhasil" ?
                                    <TableCell align="center" style={{ color: "#4caf50", textAlign: "center" }}>
                                        <CheckCircleOutlineIcon /><Typography variant="subtitle2">{data.statusPayment}</Typography>
                                    </TableCell>
                                    : data.statusPayment === "Processing" ?
                                        <TableCell align="center" style={{ color: "#ff9800" }}>
                                            <LoopIcon /><Typography variant="subtitle2">{data.statusPayment}</Typography>
                                        </TableCell>
                                        : <TableCell align="center" style={{ color: "#f44336" }}>
                                            <HighlightOffIcon /><Typography variant="subtitle2">{data.statusPayment}</Typography>
                                        </TableCell>}
                                <TableCell align="right">
                                    <Link to={{ pathname: `/view-userTransaction/${data.paymentId}`, state: { data: data } }}>
                                        <IconButton component="span" color="primary">
                                            <MoreHoriz />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default UserTransaction
