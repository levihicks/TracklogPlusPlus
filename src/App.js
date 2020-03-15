import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppNavbar from './components/AppNavbar/AppNavbar';
import {Container} from 'react-bootstrap';
class App extends React.Component {

  state = {
    hello: "world"
  };

  render(){
    return (
      <Container fluid>
        <AppNavbar />
      </Container>
    );
  }
}

export default App;
