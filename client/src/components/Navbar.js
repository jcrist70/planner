import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { setContext, setPage } from '../redux/app.slice';
import { resetUser } from '../redux/user.slice';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedIn } = useSelector((state) => state.user, shallowEqual);

    const handleClickLogo = () => {
        dispatch(setContext('home'));
        dispatch(setPage('home'));
        navigate('/');
    }
    const handleClickLogin = () => {
        dispatch(setContext('login'));
        dispatch(setPage('home'));
        navigate('/');
    }
    const handleClickLogout = async () => {
        console.log('!! handleClickLogout !!')
        await dispatch(resetUser());
        dispatch(setContext('login'));
        dispatch(setPage('home'));
        navigate('/');    
    }
    const handleClickRegister = () => {
        dispatch(setContext('register'));
        dispatch(setPage('home'));
        navigate('/');
    }
    return (
        <div className='nav-bar-container'>
            <div className='nav-bar-sec-rt'>
                <div className='nav-bar-link' onClick={handleClickLogo}>
                LOGO
                </div>
            </div>
            <div className='nav-bar-sec-center'>
                {loggedIn && <div className='nav-bar-link' onClick={() => navigate('/planner')}>
                Planner
                </div>}
                {loggedIn && <div className='nav-bar-link' onClick={() => navigate('/credits')}>
                Credits
                </div>}
                {loggedIn && <div className='nav-bar-link' onClick={() => navigate('/debts')}>
                Debits
                </div>}
                {loggedIn && <div className='nav-bar-link' onClick={() => navigate('/summary')}>
                Summary
                </div>}
            </div>
            <div className='nav-bar-sec-lft'>
                {!loggedIn && <div className='nav-bar-link' onClick={handleClickLogin}>
                Login
                </div>}
                {loggedIn && <div className='nav-bar-link' onClick={handleClickLogout}>
                Logout
                </div>}
                {!loggedIn && <div className='nav-bar-link' onClick={handleClickRegister}>
                Register
                </div>}
            </div>
        </div>
    );
};

export default Navbar;