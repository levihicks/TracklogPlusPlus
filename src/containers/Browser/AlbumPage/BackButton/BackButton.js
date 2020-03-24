import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './BackButton.module.css';
import BackIcon from '../../../../assets/icons/back_arrow.svg';
import BackIconHover from '../../../../assets/icons/back_arrow_hover.svg';

class BackButton extends Component {

    state = {
        hovering: false
    }

    render() {
        return (
            <Link className={classes.BackButton}
                onMouseOver={()=>{this.setState({hovering: true});}}
                onMouseOut={()=>{this.setState({hovering: false});}}
                to="/">
                <img alt="Back Arrow" 
                    src={this.state.hovering ? BackIconHover : BackIcon} 
                    className={classes.BackIcon} />
                Back
            </Link>
        );
    }
}

export default BackButton;