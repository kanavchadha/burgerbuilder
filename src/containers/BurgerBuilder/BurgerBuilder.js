import React ,{Component} from 'react';
import {connect} from 'react-redux';
import Header from '../../components/UI/Header/header';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import classes from './BurgerBuilder.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

export class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }
    state = {
        // ingredients: null,
        // totalPrice: 15,
        // loading: false,
        // error: false
        ordered: false,
    }

//================================= Old Code =========================================
    // addIngredients = (type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updateCount;
    //     const priceAddition = INGREDIENTS_PRICES[type];
    //     const newPrice =  this.state.totalPrice + priceAddition;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredients = (type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount<=0){
    //         return;
    //     }
    //     const updateCount = oldCount - 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updateCount;
    //     const priceReduction = INGREDIENTS_PRICES[type];
    //     const newPrice =  this.state.totalPrice - priceReduction;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })

    //     this.updatePurchaseState(updatedIngredients);
    // }
//================================= end of Old Code ======================================
   
    componentDidMount(){
        // console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingd){
        // const ingd = { ...this.state.ingredients};
        const sum = Object.keys(ingd).map(igkey=>{
            return ingd[igkey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum > 0;
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ordered: true});
        } else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }
    purchaseCancelHandler = () =>{
        this.setState({ordered: false});
    }

    purchaseContinueHandler = () =>{
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.props.totalPrice);
        // const queryString = queryParams.join('&'); // joining all elements of queryParams with & sign
        
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        }); // now without query params
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }

        let orderSummary = null;
        
        let burger  = !this.props.error ? <Spinner /> : <p>Page can't be loaded</p>
        if(this.props.ings){
         burger = (
            <React.Fragment>
                <Burger ingredients={this.props.ings} />
    
                <BuildControls ingredientAdded={this.props.onIgredientsAdded}
                    ingredientRemoved={this.props.onIngredientsRemoved}
                    disable={disabledInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuthenticated} />
            </React.Fragment>
        );
        orderSummary = <OrderSummary ingredients={this.props.ings}
                            purchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            TotalPrice={this.props.totalPrice} />;
    }

        return(
            <React.Fragment>
                <Modal show={this.state.ordered} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                
                <Header />

                <div className={classes.Burger}>
                    {burger}
                </div> 
                
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }   
}

const mapDispatchToProps = dispatch => {
    return {
        onIgredientsAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setRedirectPath(path)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));