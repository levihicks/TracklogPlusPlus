import React, {Component} from 'react';

import Backdrop from '../../components/UI/Backdrop/Backdrop';

import classes from './AuthenticateModal.module.css';

import {Row} from 'react-bootstrap';

import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import ErrorIcon from '../../assets/icons/error.svg';

class AuthenticateModal extends Component {
    state = {
        loggingIn: true,
        emailInput: "",
        passwordInput: "",
        passwordVerifyInput: ""
    };

    componentDidUpdate() {
        if(this.props.token)
            this.props.hide();
    }
    
    setLoggingIn = (newState) => {
        if(newState !== this.state.loggingIn)
            this.setState((state, props)=>({
                loggingIn: !state.loggingIn,
            }));
    }

    setEmailInput = (event) => {
        this.setState({emailInput: event.target.value});
    };
 
    setPasswordInput = (event) => {
        this.setState({passwordInput: event.target.value});
    };

    setPasswordVerifyInput = (event) => {
        this.setState({passwordVerifyInput: event.target.value});
    };

    authenticateUser = () => {
        // this.props.onAuthenticate("lv.hicks@gmail.com", 
        //     "randgiga", 
        //     true);
        this.props.onAuthenticate(this.state.emailInput,
            this.state.passwordInput,
            this.state.loggingIn);
    }

    render() {
        //if(this.props.token)
        //    this.props.hide();
        let modalContent = <Spinner />;
        if(!this.props.loading){
            modalContent = (
                <React.Fragment>
                    <Row className={[classes.AuthenticateRows,
                        classes.AuthenticationHeaders].join(" ")}>
                    <div className={this.state.loggingIn ? classes.CurrentView : null}
                        onClick={()=>this.setLoggingIn(true)}>Login</div>
                    <div className={this.state.loggingIn ? null : classes.CurrentView}
                        onClick={()=>this.setLoggingIn(false)}>Create Account</div>
                    </Row>
                    <Row className={classes.AuthenticateRows}>
                        <input className={classes.AuthenticationInput} 
                        placeholder="E-mail" 
                        value={this.state.emailInput}
                        onChange={(event)=>{this.setEmailInput(event)}}/>
                    </Row>
                    <Row className={classes.AuthenticateRows}>
                        <input type="password" 
                        className={classes.AuthenticationInput} 
                        placeholder="Password" 
                        value={this.state.passwordInput}
                        onChange={(event)=>{this.setPasswordInput(event)}}/>
                    </Row>
                    {!this.state.loggingIn ?
                    (
                        <Row className={classes.AuthenticateRows}>
                            <input type="password" 
                                className={classes.AuthenticationInput} 
                                placeholder="Re-Enter Password" 
                                value={this.state.passwordVerifyInput}
                                onChange={(event)=>{this.setPasswordVerifyInput(event)}}/>
                        </Row>
                    )
                    : null
                    }
                    <Row className={classes.AuthenticateRows}>
                        <button className={classes.CompleteButton}
                            onClick={this.authenticateUser}>
                            {this.state.loggingIn? "Login" : "Create Account"}
                        </button>
                    </Row>
                    { this.props.error ?
                    <div className={classes.AuthError}>
                        <img src={ErrorIcon} 
                            alt=""
                            className={classes.ErrorIcon}s />
                        {this.props.error.message}
                    </div>
                    : null
                    }
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <Backdrop clicked={this.props.hide}/>
                <div className={classes.AuthenticateModal}>
                    {modalContent}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.idToken
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (email, pass, loggingIn) => dispatch(actions.auth(email, pass, loggingIn))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateModal);