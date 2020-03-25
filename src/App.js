import React from 'react';
import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppNavbar from './components/AppNavbar/AppNavbar';
import UserLog from './components/UserLog/UserLog';
import Browser from './containers/Browser/Browser';
import AuthenticateModal from './containers/AuthenticateModal/AuthenticateModal';
import { BrowserRouter } from 'react-router-dom';

import {Container, Row, Col} from 'react-bootstrap';
class App extends React.Component {

  state = {
    modalActive: false,
    authenticated: false,
    mobileView: "browser"
  };

  toggleModal = () => {
    this.setState((state,props)=>({
      modalActive: !state.modalActive,
    }));
  };

  changeMobileView = (newView) => {
    this.setState({mobileView: newView});
  }

  addVisibility = (view) => {
    let settings = [""];
    if(this.state.mobileView !== view)
      settings.push("d-none");
    settings.push("d-md-block");
    return settings.join(" ");
  }

  render(){
    return (
      <BrowserRouter>
        <Container fluid className={classes.AppContainer}>
          {this.state.modalActive ? <AuthenticateModal hide={this.toggleModal}/> : null}
          <AppNavbar modalHandler={this.toggleModal}/>
          <Row className={classes.MainContent}>
            <Col xs={12} md={4} className={classes.MCColumn + this.addVisibility("log")}>
              <UserLog />
            </Col>
            <Col xs={12} md={8} className={classes.MCColumn + this.addVisibility("browser")}>
              <Browser update={!this.state.modalActive}/>
            </Col>
            <button id="tester" onClick={()=>this.changeMobileView(this.state.mobileView==="log"?"browser":"log")}></button>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
