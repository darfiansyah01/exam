import React, { useState } from 'react'
import './Addproduct.css'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { useHistory } from 'react-router-dom';

const AddproductImage = ({ next }) => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false)
    const history = useHistory()

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

    const handleError = () => {
        setError("Masukkan Gambar terlebih Dahulu")
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    function defaultBtnClick() {
        document.querySelector("#default-btn").click()
    }

    return (
        <div className="addproduct-image">
            <div className="addproduct-wrapper-image">
                {file ? <img src={URL.createObjectURL(file)} alt="" /> :
                    <div className="addproduct-content">
                        <CloudUploadIcon className="icon" />
                        <div className="text">No file Choosen</div>
                    </div>
                }
            </div>
            <input type="file" id="default-btn" onChange={ChangeHandler} hidden />
            <button className="btn-addProduct" id="custom-btn" onClick={defaultBtnClick}>Choose A file</button>
            <div className="btn-test-wrapper">
                <button className="btn-test" onClick={() => history.push('/dashboard')}>Back</button>
                {file ?
                    <button className="btn-test" onClick={(data) => next({ ...data, file })}>Next</button>
                    :
                    <button className="btn-test" onClick={handleError}>Next</button>
                }
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                {error && <Alert onClose={handleClose} severity="error">{error}</Alert>}
            </Snackbar>
        </div>
    )
}

export default AddproductImage
