import React from 'react';
import classes from './Navitem.css';
import {NavLink} from 'react-router-dom';

const navItem = (props)=>(
    <li className={classes.Navitem}>
        <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}> {props.children} </NavLink>
    </li>
);



export default navItem;