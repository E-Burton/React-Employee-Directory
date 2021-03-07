import React from "react";
// import logo from './logo.svg';
import './App.css';
import TableData from './components/TableData.js';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <TableData />
        </Container>
      </header>
    </div>
  );
}

export default App;
