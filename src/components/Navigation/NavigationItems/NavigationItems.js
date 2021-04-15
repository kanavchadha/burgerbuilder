import React from 'react';
import classes from './NavigationItems.css';
import Navitem from './NavItem/Navitem';

const navigationItems = (props)=>(
    <ul className={classes.NavigationItems}>
        <Navitem link="/" exact> Burger Builder </Navitem>
        { props.isAuthenticated ?  <Navitem link="/orders"> Orders </Navitem> : null}
        { !props.isAuthenticated ? <Navitem link="/auth"> Signup </Navitem> :
            <Navitem link="/logout"> Logout </Navitem>
        }
    </ul>
);

export default navigationItems;