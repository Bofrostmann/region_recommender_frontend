import React, { Component } from 'react';
import './normalize.css'
import { BrowserRouter } from 'react-router-dom';
import AreaLayout from "./component/AreaLayout";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <AreaLayout />
        </BrowserRouter>
    );
  }
}

export default App;