import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <div className={classes.Butns}>
            <button className={classes.Less} onClick={props.Removed} disabled={props.disable}>Less</button>
            <button className={classes.More} onClick={props.Added}>More</button>
        </div>
    </div>
);

export default buildControl;