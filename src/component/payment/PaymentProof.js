import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from "react-router-dom";
import './Payment.css'
import Typography from '@material-ui/core/Typography';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SaveImage from './SaveImage';
import { useFirestore } from '../../context/FirestoreContext';

function PaymentProof() {

    const { state } = useLocation();
    const { updatePaymentProof } = useFirestore();
    const [file, setFile] = useState(null);
    const [timeHours, setTimeHours] = useState("00")
    const [timeMinutes, setTimeMinutes] = useState("00")
    const [timeSeconds, setTimeSeconds] = useState("00")
    const [error, setError] = useState(null);
    let interval = useRef()

    const startTimer = () => {
        const dates = new Date(state.data.createAd + 7200000)

        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = dates - now;
            const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(distance % (1000 * 60) / 1000)

            if (distance < 0) {
                clearInterval(interval.current)
                updatePaymentProof(null, state.data.paymentId)
            } else {
                setTimeHours(hours > 9 ? hours : '0' + hours)
                setTimeMinutes(minutes > 9 ? minutes : '0' + minutes)
                setTimeSeconds(seconds > 9 ? seconds : '0' + seconds)
            }

        }, 1000)
    }

    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const ChangeHandler = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file');
        }
    }


    return (
        <div className="container">
            <div className="booking-form_wrapper">
                <div className="countdown">
                    <Typography variant="h6" style={{ textAlign: "center" }}>Bayar Sebelum</Typography>
                    <div className="countdown-timer">
                        <div className="timer-wrapper">
                            <Typography variant="subtitle1" >{timeHours}</Typography>
                            <Typography variant="subtitle2">Hours</Typography>
                        </div>
                        <div className="timer-wrapper">
                            <Typography variant="subtitle1">{timeMinutes}</Typography>
                            <Typography variant="subtitle2">Minutes</Typography>
                        </div>
                        <div className="timer-wrapper">
                            <Typography variant="subtitle1">{timeSeconds}</Typography>
                            <Typography variant="subtitle2">Seconds</Typography>
                        </div>
                    </div>
                </div>

                <div className="image-upload">
                    {file ? <img src={URL.createObjectURL(file)} alt="" /> :
                        <div className="btn-upload">
                            <input type="file" id="file" onChange={ChangeHandler}></input>
                            < AddPhotoAlternateIcon style={{ fontSize: "50px" }} />
                            <label for="file">Add Image</label>
                        </div>}
                </div>
                {file && <SaveImage imageUrl={file} folderName={"paymentProof"} paymentId={state.data} />}
            </div>
        </div>
    )
}

export default PaymentProof
