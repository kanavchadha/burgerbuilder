import React, {Component} from  'react';
import classes from './Model.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){ // for preventing from unneccessarily rendering of this component.
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
    }
    componentWillUpdate(){
        console.log("[Modal] will update.");
    }

    render(){

        const modalClasses = [classes.Modal,this.props.show ? classes.ModalOpen : classes.ModalClosed];

        return(
            <React.Fragment>
                <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
            <div className={modalClasses.join(' ')} >
                {this.props.children}
            </div>
            </React.Fragment>
        );
    }
}

export default Modal;