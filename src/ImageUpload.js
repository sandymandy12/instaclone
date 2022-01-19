import React, { useState, useEffect } from 'react'
import { Button } from '@material-ui/core';
import firebase from 'firebase'
import "./ImageUpload.css"


function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
//    const [image,setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
       
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress}/> 
            <input type="text" placeholder='Cap or nah...' onChange={setCaption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}

export default ImageUpload
