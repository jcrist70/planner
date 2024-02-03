import React, { useState } from 'react';

const Navbar = () => {
    const [ page, setPage ] = useState('');

    return (
        <div className='nav-bar-container'>
            <div className='nav-bar-sec-rt'>
                <div className='nav-bar-link'>
                NAV BTN
                </div>
                <div className='nav-bar-link'>
                NAV BTN !@#$%
                </div>
            </div>
            <div className='nav-bar-sec-lft'>
                <div className='nav-bar-link'>
                NAV BTN !@#$%
                </div>
                <div className='nav-bar-link'>
                NAV BTN
                </div>
            </div>
        </div>
    );
};

export default Navbar;