import React, { Component } from 'react';
import './App.css';
import SearchForm from './Components/SearchForm';

class App extends Component {

  render() {
    return (
        <div className="global__container">
            <div className="appBar">Trips app</div>
            <SearchForm />
        </div>
    );
  }
}

export default App;
