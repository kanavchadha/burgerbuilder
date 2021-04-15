import React, {Component} from 'react';
import Order from '../../components/Orders/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/spinner';
import * as actionOrders from '../../store/actions/index';

class Orders extends Component{
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render(){
        let orders;
        if(this.props.loading){
            orders = <Spinner />;
        } else{
            orders = this.props.orders.map(order => (
                        <Order key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price} />
                        ));
        }

        return(
            <div style={{marginTop: '80px'}}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchtoProps = dispatch => {
    return{
        onFetchOrders: (token,userId) => dispatch(actionOrders.fetchOrders(token,userId))
    }
}


export default  connect(mapStateToProps,mapDispatchtoProps)(ErrorHandler(Orders,axios));