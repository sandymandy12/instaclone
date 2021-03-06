import React, { useState, useEffect } from 'react'
import { db, storage } from './firebase'
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
       const uploadTask = storage.ref(`images/${image.name}`).put(image);
       uploadTask.on(
           "state_change",
           (snapshot) => {
               const progress = Math.round(
                   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               )
               setProgress(progress);
           }, 
           (error) => {
               console.log(error);
               alert(error.message);
           },
           () => {
               storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    db.collections("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp,
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
           }
       )
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
