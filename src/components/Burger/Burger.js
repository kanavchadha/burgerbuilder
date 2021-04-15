import React from 'react';
import BurgerIngredients from './BurgerIngredients/Burgeringredients'
import classes from './Burger.css'

const burger = (props)=>{
    let transformedIngredients = Object.keys(props.ingredients).map((igKey)=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{ // returns an array and we map that array.
            return <BurgerIngredients key={igKey + i} type={igKey} />
        }) 
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]); 

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <div className={classes.MyBurger}> Your Burger</div>
            <BurgerIngredients type="bread-top" />
                {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}

export default burger ;