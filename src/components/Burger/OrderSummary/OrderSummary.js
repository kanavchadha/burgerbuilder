import React from 'react';
import classes from './Ordersummary.css'
import Button from '../../UI/Button/Button';

const orderSummary = (props)=>{

    const ingredientsSummary = Object.keys(props.ingredients).map(igkey=>{
    return <li key={igkey} className={classes.items}> <span style={{textTransform: 'capitalize'}}>{igkey}</span> : 
     {props.ingredients[igkey]}</li>
    }); 

    return (
        <React.Fragment>
            <h3 className={classes.YOrder}>Your Order</h3>
            <p className={classes.Delecious}> <em>A Delicious Burger with The Following Ingredients: </em></p>
            <div>
            <ul>
                {ingredientsSummary}
            </ul>
            </div>
    <p><strong>Total Price : {props.TotalPrice}</strong></p>
            <p>Continue to Checkout...</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>Continue</Button>
            </React.Fragment>
    )
}

export default orderSummary;