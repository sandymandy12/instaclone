import React, { useState, useEffect } from 'react'
import './App.css';
import ImageUpload from './ImageUpload'
import Post from "./Post";
import { db, auth } from "./firebase";
import { Button, Modal, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InstagramEmbed from 'react-instagram-embed'


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {

  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignin, setOpenSignin] = useState('');
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])


  useEffect(() =>{
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {

        console.log(authUser);
        setUser(authUser);

      } else {
        //logged out
        setUser(null)
      }
    })
  },[user, username])

  const signup = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error=> alert(error.message));

    setOpen(false)
  }

  const signin = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error=> alert(error.message));

    setOpenSignin(false)
  }

  return (
    <div className="app">
        
      
      <Modal
      open={open}
      onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange= {(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange= {(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange= {(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={(e)=> signup(e)}>Sign Up</Button>
          </form>
          
        </div>
        
      </Modal>

      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}
        >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img 
                className="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange= {(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange= {(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange= {(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signin}>Sign In</Button>
          </form>
          
        </div>
        
      </Modal>

      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />

      {user? (
        <Button onClick={()=> auth.signOut()}>Log Out</Button>
        ): (
          <div className="app__loginContainer">
            <Button onClick={()=> setOpenSignin(true)}>Sign In</Button>
            <Button onClick={()=> setOpen(true)}>Sign Up</Button>
          </div>
        )
      }
      </div>

      <div className="app__posts">

        <div className="app__postsLeft">
          <Post caption="captinos for post" username="userame09" imageUrl="https://content.instructables.com/ORIG/F4O/5UYK/KOBH0058/F4O5UYKKOBH0058.jpg?auto=webp&crop=1.2%3A1&frame=1&width=306" />

          {
            posts.map(({id, post}) => (
              <Post postId={id} username={post.username} imageUrl={post.imageUrl} caption={post.caption}/>
            ))
          }
        </div>
          
        <div className='app__postsRight'>
          <InstagramEmbed
            url= 'https://www.instagram.com/p/B_1PY8tl4O4/'
            //clientAccessToken='123|456'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>  
      </div>   
      
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ) : (
        <h3>Login to upload</h3>
      )}

    </div>
  );
}

export default App;
