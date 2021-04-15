import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICES = {
    salad: 5,
    cheese: 20,
    meat: 150,
    bacon: 50
} 

const initialSate={
    ingredients: null,
    totalPrice: 15,
    error: false,
    building: false
};

const reducer = (state=initialSate,action)=>{
    
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1 // special syntax to override the property of the object by the returning object.
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1 // special syntax to override the property of the object by the returning object.
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
        
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:{
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 15,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGDS_ERROR:
            return{
                ...state,
                error: true,
            }
        default:
            return state;
    }
}

export default reducer;