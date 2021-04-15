import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/checkout';
// import Orders from './containers/Orders/Orders';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
// import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/logout/logout';
import {connect} from'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/checkout')
});
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
});
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/auth')
});


class App extends Component {

  componentDidMount(){
    this.props.onAutoSignup();
  }

  render(){
  // here we are guarding ours routes from being accessed(manually) by user if he is not authenticated but remeber we are loosing our functionality of redirecting to continueorder page if user directly make burger and click 'signup to continue' button.
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
          <Layout>
              {routes}
          </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
