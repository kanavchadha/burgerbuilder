import  * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const puchaseBurgerStart = ()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token)=>{
    return dispatch => {
        dispatch(puchaseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData).then((response)=>{
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));            
        }).catch((err)=>{
            dispatch(purchaseBurgerFail(err));
        }); // for firebase
    }
}

export const purchaseInit = ()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const fetchOrdersSuccess = (orders)=>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }    
}

export const fetchOrdersFailed = (error)=>{
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
        
    }    
}

export const fetchOrdersStart = ()=>{
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token,userId)=>{
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryparams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; // filtering data in firebase by using 'orderBy' property understand by firebase that we want to filter or search the data by 'key' store in it and which will equals to 'equalTo's value   (simply doing authrization)
        axios.get('/orders.json'+queryparams).then( res => {
        const fetchedOrders = [];
        for(let key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id: key 
            });
        }
            dispatch(fetchOrdersSuccess(fetchedOrders));
            // this.setState({loading: false, orders: fetchOrders});
        }).catch( err => {
            dispatch(fetchOrdersFailed(err));
            // this.setState({loading: false});
        });
    }
}