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
    authenticated: false
  };

  toggleModal = () => {
    this.setState((state,props)=>({
      modalActive: !state.modalActive,
    }));
  };

  render(){
    return (
      <BrowserRouter>
        <Container fluid className={classes.AppContainer}>
          {this.state.modalActive ? <AuthenticateModal hide={this.toggleModal}/> : null}
          <AppNavbar modalHandler={this.toggleModal}/>
          <Row className={classes.MainContent}>
            <Col xs={4} className={classes.MCColumn}>
              <UserLog />
            </Col>
            <Col xs={8} className={classes.MCColumn}>
              <Browser />
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
