import React from 'react';
import './App.css';
import {connect} from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import Transactions from './components/Transactions';
import AccountDetail from './components/AccountDetail';
import Events from './components/Events';



function App() {
  return (
    <div className="App">
      <Container>
        <h1>Blockchain Explorer</h1>
        <Row>
          <Col>
          <Search/>
          </Col>
        </Row>
        <Row>
          <Col>
          <AccountDetail />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
          <Events/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default connect()(App);
