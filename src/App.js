// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import CsvUpload from './components/CsvUpload';
import StudentTable from './components/StudentTable';
import './App.css';

function App() {
  return (
    <Container>
      <Row>
        <Col>
        <div class = "app-header" >
        <h1 class="mt-3 text-center  text-white rounded-md italic">Dashboard</h1>
        </div>
          <CsvUpload />
          <StudentTable />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

