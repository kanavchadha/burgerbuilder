import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props)=>{
    let attachClasses = [classes.Sidedrawer,classes.Closed]
    if(props.open){
        attachClasses = [classes.Sidedrawer,classes.Open]
    }
    return (
        <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachClasses.join(' ')} onClick={props.closed}>
         <div className={classes.Logo}> <Logo />  </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav> 
        </div>
        </React.Fragment>
    )
}

export default sideDrawer;