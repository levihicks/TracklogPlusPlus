import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
// import { compose } from "recompose";

import classes from "./AppNavbar.module.css";

import AccountButton from "./AccountButton/AccountButton";
import HamburgerItem from "./HamburgerItem/HamburgerItem";
import * as actionCreators from "../../store/actions";
// import { withAuthConsumer } from "../../session";

import Logo from "../../assets/images/logo.svg";
import HamburgerIcon from "../../assets/icons/hamburger.svg";
import ProfileIcon from "../../assets/icons/profile.svg";

class AppNavbar extends Component {
  state = {
    menuDisplayed: false,
    showProfileInfo: false,
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      menuDisplayed: !prevState.menuDisplayed,
    }));
  };

  itemClicked = (newView) => {
    this.props.viewChange(newView);
    this.toggleMenu();
  };

  render() {
    return (
      <Row
        className={classes.AppNavbar}
        style={this.state.menuDisplayed ? { height: "100vh" } : null}
      >
        <Col
          className={[classes.NavbarMain, "my-xs-0 my-md-auto"].join(" ")}
          md={{ offset: 1, span: 3 }}
        >
          <img
            onClick={this.toggleMenu}
            className={["d-md-none", classes.HamburgerIcon].join(" ")}
            alt=""
            src={HamburgerIcon}
            height="40"
          />
          <img alt="" src={Logo} className={classes.Logo} height="40" />
        </Col>
        <Col
          className={[
            classes.HamburgerMenu,
            classes.DesktopNavItems,
            "my-xs-0 my-md-auto",
          ].join(" ")}
          md={{ offset: 5, span: 2 }}
        >
          <HamburgerItem
            content="My Log"
            style={!this.state.menuDisplayed && { display: "none" }}
            clicked={() => this.itemClicked("log")}
          />
          <HamburgerItem
            content="Browse"
            style={!this.state.menuDisplayed && { display: "none" }}
            clicked={() => this.itemClicked("browser")}
          />

          {this.props.user ? (
            <>
              <HamburgerItem
                content="[Logout]"
                style={!this.state.menuDisplayed && { display: "none" }}
              />
              <img
                src={ProfileIcon}
                alt=""
                className={classes.ProfileIcon}
                onClick={() =>
                  this.setState((prevState) => ({
                    showProfileInfo: !prevState.showProfileInfo,
                  }))
                }
              />
            </>
          ) : (
            <AccountButton clicked={this.props.modalHandler} />
          )}
          {this.state.showProfileInfo && (
            <div className={classes.ProfileInfo}>
              <div
                className={classes.LogoutButton}
                onClick={() => {
                  this.props.onLogout();
                  this.setState({ showProfileInfo: false });
                }}
              >
                [Logout]
              </div>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
