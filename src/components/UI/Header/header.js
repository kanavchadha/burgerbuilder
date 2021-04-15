import React from 'react';
import classes from './header.css';

const header = ()=>(
    <div className={classes.header}>
        {/* <div className={classes.container}> */}
            <h1>Happy Burger </h1>
            <h3>Order Your Burger Now!</h3>
            <button className={classes.OrderNow} onClick={() => {window.scrollTo(0,document.body.scrollHeight)}}>Order Now!</button>
        {/* </div> */}
    </div>
);

export default header;