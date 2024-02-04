import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// FB
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/fb';
// APIS
import { dbCreateUser, dbCheckRegistrationAuthorization } from '../apis/user.api';


const RegisterCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

    }, [])
    
    const isValidEmailAddress = () => {
        return !!email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/    // eslint-disable-line
        ); // eslint-disable-line
      };

    const handleRegister = async (e) => {
      let authorized = null;
      try {
        // authorized = await dbCheckRegistrationAuthorization(email);
        authorized = {
          email: 'jcrist70@gmail.com'
        }
      } catch (err) {
        // console.log('\n\n REQUEST TO DB QUEUED USERS FAILED:', err, '\n\n');
      }
      // If user exists in the authorizedUsers collection, add to FB and create a User entry in the DB
      if (authorized && (authorized.email.toLowerCase() === email.toLowerCase())) {  
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (res) => {
            const idTokenResult = await res.user.getIdTokenResult();
            res.user.name = authorized.name;
            console.log('----> createUserWithEmailAndPassword res.user:', res.user);
            if (idTokenResult) {
              // CREATE DB USER
              await dbCreateUser(idTokenResult, res.user.email, res.user,)
              .then((dbResponse) => {
                console.log('----> createUser dbResponse.data:', dbResponse.data);
                navigate('/');
              })
              .catch((err) => {
              });
            }
            setEmail('');
            setPassword('');
          })
          .catch((err) => {
            console.log("----x createUserWithEmailAndPassword error:", typeof err, Object.keys(err), err.code, err.name, err);
            if (err.code === "auth/email-already-in-use") {
            }
          });
      } else {
        // IF USER NOT IN QUEUE
      }
    };

    return (
        <div className='login-page-card'>
            <div className='login-title'>Planner</div>
            <div className='login-blurb'>Register for an Account</div>
            <input className='login-text-input' type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className='login-text-input' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='login-button-input' disabled={!isValidEmailAddress() || password.length < 8} onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterCard;