import React from 'react';
import classes from './Input.css'

const input = (props)=>{
    let inputElement = null,errorMsg=null;
    let formStyle = [classes.InputElement];
    if(!props.isValid && props.touch){
        formStyle.push(classes.Invalid);
        errorMsg = 'Please Enter a valid value!'
    }
    switch(props.inputtype) {
        case ('input'):
            inputElement = <input className={formStyle.join(' ')}
                            {...props.elementConfig}
                            onChange={props.changed}
                            value={props.value} />
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement}
                            {...props.elementConfig}
                            onChange={props.changed}
                             value={props.value}/>
            break;
        case ('select'):
            inputElement = <select className={classes.InputElement}
                                 {...props.elementConfig} value={props.value}
                                 onChange={props.changed} >
                                {props.elementConfig.options.map(opt => (
                                    <option key={opt.value} value={opt.value}> {opt.displayValue}  </option>
                                ))}
                            </select>
            break;
        default:
            inputElement = <input className={classes.InputElement}
                            {...props.elementConfig}
                            onChange={props.changed}
                            value={props.value}/>;
    }
    return( <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <div className={classes.Err}>{errorMsg} </div>
            </div>
    );

};

export default input;