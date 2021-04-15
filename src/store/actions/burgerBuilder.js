import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// action creators
export const addIngredient = (name)=>{
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredient = (name)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}

export const fetchIngdsFailed = ()=>{
    return{
        type: actionTypes.FETCH_INGDS_ERROR
    }
}

export const setIngredients = (ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = ()=>{
    return dispatch => {
        axios.get('https://react-burger-c1e56.firebaseio.com/ingredients.json').then(response=>{
            dispatch(setIngredients(response.data));
        }).catch(e=>{ 
            dispatch(fetchIngdsFailed());
        });
    }
}