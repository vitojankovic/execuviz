import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwtEncode from 'jwt-encode';
import '../App.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, addUser } from '../../FirebaseConfig';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../assets/bamination.json';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const secret = 'r320590ugdfsioth2498542'; // Your JWT secret

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const token = jwtEncode({ userid: userId, email: email }, secret);
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const signUp = async () => {
    try {
      if (!validateEmail(email)) {
        console.error('Invalid email format');
        return;
      }
  
      const userUID = await addUser(username, email, password);
  
      if (userUID) {
        const token = jwtEncode({ email: email, userid: userUID }, secret);
        localStorage.setItem('token', token);
        alert('Check your emails!');
        navigate('/dashboard');
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) { 
      console.error('Error during sign up:', error);
    }
  };
  

  return (
    <div className="login-container-view">
      <form className="form">
        {isLogin ? (
          <Typography className="title" variant="h2">Login</Typography>
        ) : (
          <Typography className="title" variant="h2">Register</Typography>
        )}
        {!isLogin && (
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              style: {
                color: 'white',
              },
              classes: {
                input: 'login-input',
              },
            }}
            InputLabelProps={{
              style: {
                color: 'white',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          />
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: {
              color: 'white',
            },
            classes: {
              input: 'login-input',
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              color: 'white',
            },
            classes: {
              input: 'login-input',
            },
          }}
          InputLabelProps={{
            style: {
              color: 'white',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        {isLogin ? (
          <Button
            className="main-btn"
            variant="contained"
            fullWidth
            color="primary"
            type="button"
            onClick={signIn}
          >
            Log in
          </Button>
        ) : (
          <Button
            className="main-btn"
            variant="contained"
            color="primary"
            fullWidth
            type="button"
            onClick={signUp}
          >
            Register
          </Button>
        )}
        <Typography variant="body1" className="don-text">
          {isLogin ? "Don't have an account yet? " : 'Already have an account? '}
          <span
            className="log-reg-c"
            onClick={handleToggleMode}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </Typography>

        <Divider className="divider-or"></Divider>
        <Typography style={{ paddingBottom: '20px' }}>Or Login With: </Typography>
        
      <div className="col">
        <FacebookIcon className="fb btn">
          <i className="fa fa-facebook fa-fw"></i> Login with Facebook
        </FacebookIcon>
        <TwitterIcon href="#" className="twitter btn">
          <i className="fa fa-twitter fa-fw"></i> Login with Twitter
        </TwitterIcon>
        <GoogleIcon href="#" className="google btn">
          <i className="fa fa-google fa-fw"></i> Login with Google+
        </GoogleIcon>
      </div>
      </form>
      <Divider className="divider" />
      <div className="right">
        <Lottie
        className="animation"
        animationData={animationData}
        loop={true}
        autoplay={true}
        />
        <Typography className="title" variant="h2">
          Welcome To ExecuViz!
        </Typography>
        <Typography className="title text" variant="body1">
          "In the business world, everyone is paid in two coins: cash and experience. Take the experience first; the cash will come later."
        </Typography>
      </div>
    </div>
  );
}
