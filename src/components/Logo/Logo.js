import React from 'react';
import burgerLogo from '../../assests/images/original.png';
import classes from './logo.css'

const logo = (props)=>(
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="logo"></img>
    </div>
);

export default logo;
