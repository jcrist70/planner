import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// FB
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/fb';
// APIS
import { dbCreateUser, dbCheckRegistrationAuthorization } from '../apis/user.api';
// REDUX
import { setContext, setPage } from '../redux/app.slice';


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

    // ATTEMPT TO REGISTER NEW USER USING EMAIL & PASWORD
    const handleRegister = async (e) => {
      console.log("!! ATTEMPT TO REGISTER NEW USER USING EMAIL & PASWORD !!")
      let authorized = null;
      try {
        authorized = await dbCheckRegistrationAuthorization(email);
        authorized = authorized.data;
        console.log('!! authorized:', authorized)
      } catch (err) {
        console.log('dbCheckRegistrationAuthorization fail:', err);
      }
      // If user exists in the authorizedUsers collection, add to FB and create a User entry in the DB
      if (authorized && (authorized.email.toLowerCase() === email.toLowerCase())) {  
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (res) => {
            // const idTokenResult = await res.user.getIdTokenResult();
            res.user.name = authorized.name;
            console.log('----> createUserWithEmailAndPassword res.user:', res.user);
            if (res.user.accessToken) {
              // CREATE DB USER
              await dbCreateUser(res.user.accessToken, email, res.user,)
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
              // switch to login
              dispatch(setContext('login'));
            }
          });
      } else {
        // IF USER NOT AUTHORIZED
        console.log(`This user ${email} is not authorized.`)
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