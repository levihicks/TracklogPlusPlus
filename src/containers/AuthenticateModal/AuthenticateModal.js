import React, { Component } from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import { compose } from "recompose";

import classes from "./AuthenticateModal.module.css";

import { withAuthConsumer } from "../../session";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

import ErrorIcon from "../../assets/icons/error.svg";

class AuthenticateModal extends Component {
  state = {
    loggingIn: true,
    emailInput: "",
    passwordInput: "",
    passwordVerifyInput: "",
  };

  componentDidUpdate() {
    if (this.props.authState) this.props.hide();
  }

  setLoggingIn = (newState) => {
    if (newState !== this.state.loggingIn)
      this.setState((state) => {
        return {
          loggingIn: !state.loggingIn,
        };
      });
  };

  setEmailInput = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  setPasswordInput = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  setPasswordVerifyInput = (event) => {
    this.setState({ passwordVerifyInput: event.target.value });
  };

  authenticateUser = (event) => {
    event.preventDefault();
    this.props.onAuthenticate(
      this.state.emailInput,
      this.state.passwordInput,
      this.state.loggingIn
    );
  };

  render() {
    let modalContent = <Spinner />;
    if (!this.props.loading) {
      modalContent = (
        <React.Fragment>
          <form
            className={classes.AuthenticateForm}
            onSubmit={this.authenticateUser}
          >
            <Row
              className={[
                classes.AuthenticateRows,
                classes.AuthenticationHeaders,
              ].join(" ")}
            >
              <div
                className={this.state.loggingIn && classes.CurrentView}
                onClick={() => this.setLoggingIn(true)}
              >
                Login
              </div>
              <div
                className={!this.state.loggingIn && classes.CurrentView}
                onClick={() => this.setLoggingIn(false)}
              >
                Create Account
              </div>
            </Row>
            <Row className={classes.AuthenticateRows}>
              <input
                className={classes.AuthenticationInput}
                placeholder="E-mail"
                value={this.state.emailInput}
                onChange={(event) => {
                  this.setEmailInput(event);
                }}
              />
            </Row>
            <Row className={classes.AuthenticateRows}>
              <input
                type="password"
                className={classes.AuthenticationInput}
                placeholder="Password"
                value={this.state.passwordInput}
                onChange={(event) => {
                  this.setPasswordInput(event);
                }}
              />
            </Row>
            {!this.state.loggingIn && (
              <Row className={classes.AuthenticateRows}>
                <input
                  type="password"
                  className={classes.AuthenticationInput}
                  placeholder="Re-Enter Password"
                  value={this.state.passwordVerifyInput}
                  onChange={(event) => {
                    this.setPasswordVerifyInput(event);
                  }}
                />
              </Row>
            )}
            <Row className={classes.AuthenticateRows}>
              <input
                type="submit"
                className={classes.CompleteButton}
                value={this.state.loggingIn ? "Login" : "Create Account"}
              />
            </Row>
          </form>
          {this.props.error && (
            <div className={classes.AuthError}>
              <img src={ErrorIcon} alt="" className={classes.ErrorIcon} />
              {this.props.error.message}
            </div>
          )}
        </React.Fragment>
      );
    }
    return (
      <>
        <Backdrop clicked={this.props.hide} />
        <div className={classes.AuthenticateModal}>{modalContent}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, pass, loggingIn) =>
      dispatch(actions.auth(email, pass, loggingIn)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compose(withAuthConsumer)(AuthenticateModal));
