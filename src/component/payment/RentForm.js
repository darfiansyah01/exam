import React, { useEffect, useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import RentFormDetail from './RentFormDetail'
import ReturnFormDetail from './ReturnFormDetail';
import ConfirmationPage from './ConfirmationPage';
import { useStateValue } from '../../context/StateProvider'
import { useFirestore } from '../../context/FirestoreContext'
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Countdown from "react-countdown";
import { Link } from 'react-router-dom';
import './Payment.css'



function getSteps() {
    return ['Booking Form', 'Return Form', 'Confirmation'];
}

function RentForm() {

    const [{ basket }, dispatch] = useStateValue();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const [dataRent, setDataRent] = useState();
    const [dataReturn, setDataReturn] = useState();
    const { storeDetail, newTransaction } = useFirestore();

    const rentProductDetail = basket.filter((item) => item.storeId === storeDetail.id)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const rent = (rentData) => {
        setDataRent(rentData)
        handleNext();
    }

    const returns = (returnData) => {
        setDataReturn(returnData)
        handleNext();
    }


    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <RentFormDetail next={rent} />
            case 1:
                return <ReturnFormDetail nextReturn={returns} back={handleBack} />
            case 2:
                return <ConfirmationPage rentDetail={dataRent} rentProductDetail={rentProductDetail} returnDetail={dataReturn} backStep={handleBack} nextStep={handleNext} />
            default:
                return 'Unknown stepIndex';
        }
    }

    let Confirmation = ({ completed }) => {
        if (completed) {
            return (
                <div className="confirmation">
                    <CheckCircleOutlineIcon fontSize="large" />
                    <Typography variant="h5">Pemesanan Berhasil</Typography>
                    <br />
                    <Link to={{ pathname: `/paymentProof/${newTransaction.paymentId}`, state: { data: newTransaction } }}>
                        <button className="btn-payment">Bayar</button>
                    </Link>
                </div>

            )
        } else {
            return (
                <div className="confirmation">
                    <CircularProgress />
                </div>
            )
        }
    }

    return (
        <div className="container">
            <div className="booking-form_wrapper">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="rentform-container">
                    {activeStep === steps.length ? (
                        <Countdown date={Date.now() + 10000} renderer={Confirmation} />
                    ) : (
                        <div>
                            <Typography>{getStepContent(activeStep)}</Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RentForm
