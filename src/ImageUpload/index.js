// imageUpload

import React, { useState, useEffect } from 'react';
import storage from '../Firebase/index';

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [display, setDisplay] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            setImage(image);
        }
    };

    useEffect(() => {
        var storageRef = storage.ref();
        var listRef = storageRef.child('images/');

        // Find all the prefixes and items.
        listRef
            .listAll()
            .then(function (res) {
                res.items.forEach(function (itemRef) {
                    console.log(itemRef.storage);
                    itemRef.getDownloadURL().then((url) => {
                        setDisplay((prevDisplay) => [...prevDisplay, url]);
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        console.log('url: ', url);
                        setDisplay((prevDisplay) => [...prevDisplay, url]);
                    });
            }
        );
    };

    return (
        <div className='center'>
            <br />
            <h2 className='green-text'>React Firebase Image Uploader</h2>
            <br />
            <br />
            <div className='row'>
                <progress value={progress} max='100' className='progress' />
            </div>
            <br />
            <br />
            <br />
            <div className='file-field input-field'>
                <div className='btn'>
                    <span>File</span>
                    <input type='file' onChange={handleChange} />
                </div>
                <div className='file-path-wrapper'>
                    <input className='file-path validate' type='text' />
                </div>
            </div>
            <button
                onClick={handleUpload}
                className='waves-effect waves-light btn'>
                Upload
            </button>
            <br />
            <br />
            <div
                style={{
                    width: `${progress}%`,
                    height: '20px',
                    background: 'blue',
                }}></div>
            <br />
            <br />
            {display.map((d, index) => {
                return (
                    <img
                        key={index}
                        src={d || 'https://dapp.dblog.org/img/default.jpg'}
                        alt='Uploaded Images'
                        height='300'
                        width='400'
                    />
                );
            })}
        </div>
    );
}

export default ImageUpload;
