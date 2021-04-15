import React, {Component} from 'react';
import Modal from '../../components/UI/Model/Model';
import classes from './ErrorHandler.css';
// import axios from 'axios';

const withErrorHandler = (WrappedComponent,axios)=>{ // its a simple function not a component
    return class extends Component { // returning an anonymous class
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req =>{
                this.setState({
                    error: null
                })
                return req;
            })    
            this.resInterceptors = axios.interceptors.response.use(res => res ,error=>{
                this.setState({
                    error: error
                })
            })
        }

        componentWillUnmount(){ // removing interceptors for preventing memory leaks
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
    

        errorConfirmed = ()=>{
            this.setState({
                error: null
            })
        }

        render(){
            return (
                <React.Fragment> 
                    <Modal show={this.state.error} modalClosed={this.errorConfirmed}>
                            {/* <p>Something went to be wrong!!</p> */}
                            <p className={classes.Error}>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>

                {/* way to return the wrapped class */}
                    <WrappedComponent {...this.props} /> 
                </React.Fragment>
            );
        }
    }

}

export default withErrorHandler;