import React, { useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddproductImage from './AddproductImage';
import AddProductDetail from './AddProductDetail';
import { useAuth } from '../../context/AuthContext'
import { CircularProgress, Divider } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import './Addproduct.css'


function getSteps() {
    return ['Add image', 'Product Details'];
}

const Addproduct = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [imageFile, setImageFile] = useState(null);
    const { userStoreData } = useAuth();
    const steps = getSteps();


    let Confirmation = () => userStoreData ? (
        <>
            <div className="confirmation">
                <CheckCircleOutlineIcon fontSize="large" />
                <Typography variant="h5" fontSize="large">Product Berhasil Ditambahkan</Typography>
                <Divider />
                <br />
                <Link to="/dashboard/productlist"><button className="btn-payment">Back to Home</button></Link>
            </div>
        </>
    ) : (
        <>
            <div className="confirmation">
                <CircularProgress />
            </div>
        </>
    )

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const next = (dataFile) => {
        setImageFile(dataFile);
        handleNext();
    }

    const Form = () => (
        activeStep === 0
            ? <AddproductImage next={next} />
            : <AddProductDetail imageUrl={imageFile} nextStep={handleNext} backStep={handleBack} folderName={"productImage"} />
    )

    return (
        <div className="container">
            <div className="addproduct-form_wrapper">
                <Typography variant="h6" style={{ textAlign: "center" }}>Create your Product</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : <Form />}
            </div>
        </div>
    )
}

export default Addproduct
