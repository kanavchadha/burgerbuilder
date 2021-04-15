import React from 'react';
import classes from './Order.css'
import {FaRupeeSign} from "react-icons/fa";
import {IconContext} from 'react-icons';

const order = (props)=>{
    const ingredients = [];

    for(let ingd in props.ingredients){
        ingredients.push({name: ingd,amount: props.ingredients[ingd]});
    }

    const ingd = ingredients.map( ig => {
        return <span className={classes.Ingds} key={ig.name}> {ig.name} : {ig.amount} </span>
    })

    return(
        <div className={classes.Order}>
            <p> <span style={{fontWeight: 'bold',color: 'darkRed',fontSize: '1.4em'}}> Ingredients: </span> 
                <span style={{wordWrap: 'break-word'}}>{ ingd }</span> 
            </p>
            <p> <span style={{fontWeight: 'bold',color: 'darkGreen',fontSize: '1.35em'}}>Price</span>:
             <span className={classes.Price}> {props.price}
             <IconContext.Provider value={{ style: { verticalAlign: 'middle', color: 'white' } }}>
             <FaRupeeSign /> </IconContext.Provider>
             </span>
            
             </p>
    
        </div>
    )

};

export default order;