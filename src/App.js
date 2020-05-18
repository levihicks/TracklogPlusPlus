import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { compose } from "redux";

import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavbar from "./components/AppNavbar/AppNavbar";
import UserLog from "./components/UserLog/UserLog";
import Browser from "./containers/Browser/Browser";
import AuthenticateModal from "./containers/AuthenticateModal/AuthenticateModal";
import { withAuthProvider } from "./session";

class App extends React.Component {
  state = {
    modalActive: false,
    authenticated: false,
    mobileView: "browser", // state of whether log or browser is visible
  };

  toggleModal = () => {
    this.setState((state) => ({
      modalActive: !state.modalActive,
    }));
  };

  changeMobileView = (newView) => {
    this.setState({ mobileView: newView });
  };

  addVisibility = (view) => {
    let settings = [""];
    if (this.state.mobileView !== view) settings.push("d-none");
    settings.push("d-md-block");
    return settings.join(" ");
  };

  render() {
    let content = (
      <BrowserRouter>
        {this.state.modalActive && (
          <AuthenticateModal hide={this.toggleModal} />
        )}
        <AppNavbar
          modalHandler={this.toggleModal}
          viewChange={this.changeMobileView}
        />
        <Row className={classes.MainContent}>
          <Col
            xs={12}
            md={4}
            className={classes.MCColumn + this.addVisibility("log")}
          >
            <UserLog />
          </Col>
          <Col
            xs={12}
            md={8}
            className={classes.MCColumn + this.addVisibility("browser")}
          >
            <Browser update={!this.state.modalActive} />
          </Col>
        </Row>
      </BrowserRouter>
    );
    return content;
  }
}

export default compose(withAuthProvider)(App);
