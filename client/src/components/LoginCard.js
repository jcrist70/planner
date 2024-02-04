import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// FB
import { signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';
import { auth, googleAuthProvider } from '../config/fb';
// APIS
import { loginUser } from '../apis/user.api';


const LoginCard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const isValidEmailAddress = () => {
        return !!email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/    // eslint-disable-line
        ); // eslint-disable-line
      };

    const handleLogin = () => {
        console.log('handleLogin')
        try {
            signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                console.log('----> FB LOGIN');
                let user = userCredential.user;
                const idTokenResult = await user.getIdTokenResult();
                user.idToken = idTokenResult.token;
                console.log('----> user, user.email:', user.email, user)
                const dbUser = await loginUser(idTokenResult.token, user.email, JSON.stringify(user));
                console.log("------------> dbUser:", dbUser.data)
                if (Object.keys(dbUser.data).includes("error")) {
                  if (dbUser.data.error === "User not found") {
                    // User is in FB but NOT in DB
                    return null;
                  }
                } else {
                    if (user.emailVerified === true || dbUser.emailVerified === true) {
                        console.log('!! USER IS VERIFIED !!')
                        //   try {
                        //     await reloadSession().then(async (res) => {
                        //       user = res.data;
                        //       if (res.data.error) {
                        //         // console.log('\n\nLOGIN RELOAD SESSON ERROR:', res.data.error, '\n\n');
                        //         return null;
                        //       } else {
                                
                        //       }
                        //     });
                        //   } catch (err) {
                        //     return null;
                        //   }
                        navigate('/summary');
                    }
                }
              })
              .catch(async (err) => {
                // auth/configuration-not-found
                console.log(err)
                return null;
              });
          } catch (err) {
            console.log(err)
            return null;
          }
    }

    return (
        <div className='login-page-card'>
            <div className='login-title'>Planner</div>
            <div className='login-blurb'>Login to Your Account</div>
            <input className='login-text-input' type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className='login-text-input' type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='login-button-input' disabled={!isValidEmailAddress() || password.length < 8} onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginCard;