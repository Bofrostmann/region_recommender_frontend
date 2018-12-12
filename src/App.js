import React, { Component } from 'react';
import './normalize.css'
import { BrowserRouter } from 'react-router-dom';
import AreaLayout from "./component/AreaLayout";
import CONSTANTS from "./CONSTANTS"


class App extends Component {
  render() {
    return (
        <BrowserRouter basename={CONSTANTS.BASENAME}>
            <AreaLayout />
        </BrowserRouter>
    );
  }
}

export default App;