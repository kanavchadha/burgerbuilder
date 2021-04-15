import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './contactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import Spinner from '../../../components/UI/Spinner/spinner';
// import {withRouter} from 'react-router-dom';
import {checkValidity} from '../../../shared/validations';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/index';

class ContactData extends Component{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Good Name *'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street Name *'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code *'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false,
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State *'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email-id *'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            DeliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'Fastest', displayValue: 'Fastest'},
                            {value: 'Commercial', displayValue: 'Commercial'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: true,
                value: 'Fastest',
                touched: false,   
            },
        },
        formIsValid: false
    }

    orderHandler = (e)=>{
        e.preventDefault();
        const formData = {};
        for(let el in this.state.orderForm){
            formData[el] = this.state.orderForm[el].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contactData: formData,
            userId: this.props.userId
        } 
        this.props.onOrderBurger(order,this.props.token);
    }

    inputChangedHandler = (event,id)=>{
        const updateForm = {...this.state.orderForm};
        const updatedElement = {...updateForm[id]};
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = checkValidity(updatedElement.value,updatedElement.validation);
        updateForm[id] = updatedElement;

        let formIsValid = true;
        for(let key in updateForm){
            formIsValid = updateForm[key].valid && formIsValid;
        }

        this.setState({orderForm: updateForm,formIsValid: formIsValid});
    }

    render(){
        const formElements = [];
        for(let key in this.state.orderForm)
        {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form;
        if(this.props.loading){
            form = <Spinner />
        } else{
            form =  <form onSubmit={this.orderHandler} className={classes.Form}>
                        {formElements.map(element => (
                            <Input inputtype={element.config.elementType}
                                   elementConfig={element.config.elementConfig}
                                   value={element.config.value}
                                   key={element.id} 
                                   label={element.id}
                                   changed={(event)=>this.inputChangedHandler(event,element.id)}
                                   isValid={element.config.valid}
                                   touch={element.config.touched} />    
                        ))}
                        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                    </form>
        }

        return(
            <div className={classes.Data}>
                <h2>Enter Your Contact Data</h2>
                    {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        error: state.order.error,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger: (data,token) => dispatch(actionTypes.purchaseBurger(data,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));