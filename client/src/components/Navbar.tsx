import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { setContext, setPage } from '../redux/app.slice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickLogo = () => {
        dispatch(setPage('summary'));
        navigate('/summary');
    }
    const handleClickLogin = () => {
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
            <div className='nav-bar-sec-lft'>
                <div className='nav-bar-link' onClick={handleClickLogin}>
                LOGIN
                </div>
                <div className='nav-bar-link' onClick={handleClickRegister}>
                REGISTER
                </div>
            </div>
        </div>
    );
};

export default Navbar;