import React from 'react';
import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={classes.Spinner} style={props.style?props.style:null}>
    </div>
);

export default spinner;