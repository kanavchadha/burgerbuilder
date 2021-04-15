import React, {Component} from 'react'
import CheckoutSummary from '../../components/Orders/Checkout/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    // state={
    //     ingredients: {},
    //     price: null
    // }

    // componentWillMount(){
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingds = {}
    //     let price=0;
    //     for(let param of query.entries()) {
    //         if(param[0]==='price'){
    //             price = param[1];
    //         } else{
    //             ingds[param[0]] = +param[1]; // here we prepend '+' sign for converting a string into number 
    //         }
    //     }
    //     this.setState({ingredients: ingds,price: price});
    // }
    
    checkoutCanceled = ()=>{
        this.props.history.goBack();
    }
    checkoutContinue = ()=>{
        this.props.history.push('/checkout/contact-data');
    }

    render(){
        
        let summary = <Redirect to="/" />
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = <div>
                        {purchaseRedirect}
                        <CheckoutSummary ingredients={this.props.ings} 
                        checkoutCanceled={this.checkoutCanceled}
                        checkoutContinue={this.checkoutContinue}/>
                        <Route path={this.props.match.path + '/contact-data' } component={ContactData} />
                      </div>
        }
        return(
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);