import React, { useEffect, useState } from 'react';
import './dashboard.css';
import logo from '../picture/logo.png';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DevicesIcon from '@material-ui/icons/Devices';
import ArchiveIcon from '@material-ui/icons/Archive';
import EventIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { Link } from 'react-router-dom';



function Sidebar() {

    function sidebarToggle() {
        let sidebar = document.querySelector(".sidebar")
        sidebar.classList.toggle("active")
    }

    useEffect(() => {

        let arrow = document.querySelectorAll(".arrow");
        console.log(arrow)
        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
                console.log(arrowParent)
                arrowParent.classList.toggle("showMenu");
            });
        }

        let activated = document.querySelectorAll("li");
        for (var j = 0; j < activated.length; j++) {
            activated[j].addEventListener("click", (e) => {
                e.target.classList.toggle("activated")
            });
        }
    }, [])

    return (
        <div className="sidebar">
            <img src={logo} alt="" />
            <DehazeIcon style={{ fontSize: 28 }} className="toggle-btn" onClick={sidebarToggle} />
            <ul className="nav-lists">
                <li>
                    <div className="nav-link">
                        <DashboardIcon />
                        <p className="nav-link-title">Dashboard</p>
                    </div>
                </li>
                <li>
                    <div className="nav-link">
                        <DevicesIcon />
                        <p className="nav-link-title">Produk</p>
                    </div>
                </li>
                <li>
                    <div className="nav-link">
                        <DevicesIcon />
                        <p className="nav-link-title">Transaksi</p>
                        <ArrowDropDownIcon className="arrow" />
                    </div>
                    <ul className="sub-menu">
                        <Link to="/dashboard/rentlist">
                            <li><p>Penyewaan</p></li>
                        </Link>
                        <li><p>Pengembalian</p></li>
                    </ul>
                </li>
                <li>
                    <div className="nav-link">
                        <DevicesIcon />
                        <p className="nav-link-title">Sewa</p>
                        <ArrowDropDownIcon className="arrow" />
                    </div>
                    <ul className="sub-menu">
                        <li><p>Penyewaan</p></li>
                        <li><p>Pengembalian</p></li>
                    </ul>
                </li>
                <li>
                    <div className="nav-link">
                        <ArchiveIcon />
                        <p className="nav-link-title">Laporan</p>
                        <ArrowDropDownIcon className="arrow" />
                    </div>
                    <ul className="sub-menu">
                        <li><p>Penyewaan</p></li>
                        <li><p>Pengembalian</p></li>
                    </ul>
                </li>
                <li>
                    <div className="nav-link">
                        <EventIcon />
                        <p className="nav-link-title">Kalender</p>
                    </div>
                </li>
                <li>
                    <div className="nav-link">
                        <SettingsIcon />
                        <p className="nav-link-title">Pengaturan</p>
                    </div>
                </li>
                <li>
                    <div className="nav-link">
                        <GroupIcon />
                        <p className="nav-link-title">Admin</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
