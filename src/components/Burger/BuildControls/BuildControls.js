import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js';
import {FaRupeeSign} from "react-icons/fa";
import {IconContext} from 'react-icons';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat',  type: 'meat'}
];

const buildControls = (props) => (  // shortcut for return statement
    <div className={classes.BuildControls}>
        <p className={classes.Price}> Current Price: <em>{props.price} <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
             <FaRupeeSign /> </IconContext.Provider></em> </p>
        { controls.map(ctrl => (
        <BuildControl key={ctrl.label} label={ctrl.label}
          Added={()=> props.ingredientAdded(ctrl.type) } 
          Removed={()=> props.ingredientRemoved(ctrl.type) } 
          disable={props.disable[ctrl.type]} />
        ) ) }

        <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered} >{props.isAuth ? 'Order Now' : 'Signup To Order' }</button>
    </div>
)

export default buildControls;