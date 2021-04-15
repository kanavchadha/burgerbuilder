import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }
    SidedrawerCloseHandler = ()=>{
        this.setState({
            showSidedrawer: false   
        })
    }

    SidedrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {showSidedrawer: !prevState.showSidedrawer};
        });
    }

    render(){
        return(
            <React.Fragment>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggle={this.SidedrawerToggleHandler}/>
                    <Sidedrawer isAuth={this.props.isAuthenticated} open={this.state.showSidedrawer} closed={this.SidedrawerCloseHandler} />
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);