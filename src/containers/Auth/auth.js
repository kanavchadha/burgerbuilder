import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/spinner';
import classes from './auth.css';
import {checkValidity} from '../../shared/validations';
import {Redirect} from 'react-router-dom';
import * as authActions from '../../store/actions/index';
import {connect} from 'react-redux';

class Auth extends Component {

    state={
        authData: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email-id'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            }
        },
        formIsValid: false,
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.redirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event,id)=>{
        const updateForm = {...this.state.authData};
        const updatedElement = {...updateForm[id]};
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedElement.valid = checkValidity(updatedElement.value,updatedElement.validation);
        updateForm[id] = updatedElement;

        let formIsValid = true;
        for(let key in updateForm){
            formIsValid = updateForm[key].valid && formIsValid;
        }

        this.setState({authData: updateForm,formIsValid: formIsValid});
    }

    authHandler = (e)=>{
        e.preventDefault();
        // console.log(this.state.authData.email,this.state.authData.password);
        this.props.onAuth(this.state.authData.email.value,this.state.authData.password.value,this.state.isSignup);
    }

    switchSighnupMode = ()=>{
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render(){
        const formElements = [];
        for(let key in this.state.authData)
        {
            formElements.push({
                id: key,
                config: this.state.authData[key]
            })
        }
        let form =  formElements.map(element => (
                            <Input inputtype={element.config.elementType}
                                   elementConfig={element.config.elementConfig}
                                   value={element.config.value}
                                   key={element.id} 
                                   label={element.id}
                                   changed={(event)=>this.inputChangedHandler(event,element.id)}
                                   isValid={element.config.valid}
                                   touch={element.config.touched} />    
                        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errMsg = null;
        if(this.props.error){
            errMsg = <span> {this.props.error.message} </span>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.redirectPath} />
        }
        
        return(
            <div className={classes.Data}>
                {authRedirect}
                <h1 style={{fontWeight: 'bold',color: 'steelblue'}}> {!this.state.isSignup ? 'Signin' : 'Signup'} </h1>
                <form onSubmit={this.authHandler} className={classes.Form}>
                    {form}
                    <Button btnType="Auth" disabled={!this.state.formIsValid}>{!this.state.isSignup ? 'Signin' : 'Signup'}</Button>
                </form>

                { this.props.error ? <p style={{color: 'white',padding:'8px 20px',borderRadius:'40px' ,background:'red'}}> <span style={{fontWeight:'bold'}}>Error</span> : {errMsg} </p> : null}

                <span style={{fontWeight: 'bold'}}> {this.state.isSignup ? 'Already have an account? ' : `Don't have account yet? `} </span>
                <Button clicked={this.switchSighnupMode} btnType="Danger"> {this.state.isSignup ? 'Signin' : 'Signup'} </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        redirectPath: state.auth.redirectPath,
        buildingBurger: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignup) => dispatch(authActions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(authActions.setRedirectPath('/'))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Auth); 