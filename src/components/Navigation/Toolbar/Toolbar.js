import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/Toggle';

const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <div className={classes.Navitems}>
            <DrawerToggle clicked={props.drawerToggle} />
        </div>
        <Logo height="80%" />
        <nav className={classes.Desktop}> <NavigationItems isAuthenticated={props.isAuth} /> </nav>
    </header>
);

export default toolbar;