import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from './Container.jsx';


class App extends Component {
  
  render(){
    return(
      <MuiThemeProvider> 
        <Container/>
      </MuiThemeProvider>
    );
  }
}


export default App;
