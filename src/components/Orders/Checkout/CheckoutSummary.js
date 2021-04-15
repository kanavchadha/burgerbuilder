import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary=(props)=>{
    return (
        <div className={classes.Summary}>
            <h1>We Hope that you will enjoy this Burger</h1>
            <div className={classes.MyBurger}>
                <Burger ingredients={props.ingredients} />
            </div>

            <Button btnType="Danger" clicked={props.checkoutCanceled}>CANCEL</Button> 
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button> 
        </div>
    );
}

export default checkoutSummary;