import { useState, useEffect } from 'react';
import { projectStorage } from './config';

const useStorage = (file, folderName) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageref = projectStorage.ref().child(folderName).child(file.name);

        storageref.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageref.getDownloadURL();
            setUrl(url);
        })
    }, [file]);

    return { progress, error, url };
}

export default useStorage;