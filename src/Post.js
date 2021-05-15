import React, { useState, useEffect } from 'react'
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import { Input } from '@material-ui/core';

function Post({postId, username, imageUrl, caption}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")

    useEffect(() => {
        let unsubscribe;
        if (postId){
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .onSnapshot((snapshot)=> {
                    setComments(snapshot.docs.map(doc=> doc.data()))
                })
        }
    },[postId])

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                 className="post__avatar"
                 src="/path/to/"
                 alt={username}
                />

                <h3>{username}</h3>
            </div>
            
            
            <img className="post__image" alt="" src={imageUrl}/>
            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <form>
                <Input 
                    className="post__input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </form>

        </div>
    )
}

export default Post