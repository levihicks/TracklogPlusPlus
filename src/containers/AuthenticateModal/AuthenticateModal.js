import React, {Component} from 'react';

import Backdrop from '../../components/UI/Backdrop/Backdrop';

import classes from './AuthenticateModal.module.css';

import {Row} from 'react-bootstrap';

class AuthenticateModal extends Component {
    state = {
        loggingIn: true
    };
    
    setLoggingIn = (newState) => {
        if(newState !== this.state.loggingIn)
            this.setState((state, props)=>({
                loggingIn: !state.loggingIn,
            }));
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop clicked={this.props.hide}/>
                <div className={classes.AuthenticateModal}>
                    <Row className={[classes.AuthenticateRows,
                                    classes.AuthenticationHeaders].join(" ")}>
                        <div className={this.state.loggingIn ? classes.CurrentView : null}
                            onClick={()=>this.setLoggingIn(true)}>Login</div>
                        <div className={this.state.loggingIn ? null : classes.CurrentView}
                            onClick={()=>this.setLoggingIn(false)}>Create Account</div>
                    </Row>
                    <Row className={classes.AuthenticateRows}>
                        <input className={classes.AuthenticationInput} placeholder="E-mail" />
                    </Row>
                    <Row className={classes.AuthenticateRows}>
                        <input type="password" className={classes.AuthenticationInput} placeholder="Password" />
                    </Row>
                    {!this.state.loggingIn ?
                        (
                            <Row className={classes.AuthenticateRows}>
                                <input type="password" className={classes.AuthenticationInput} placeholder="Re-Enter Password" />
                            </Row>
                        )
                        : null
                    }
                    <Row className={classes.AuthenticateRows}>
                        <button className={classes.CompleteButton}>
                            {this.state.loggingIn? "Login" : "Create Account"}
                        </button>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default AuthenticateModal;