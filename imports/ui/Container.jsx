import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Tables } from '../api/tables.js';

import Game from './Game.jsx';
import Table from './Table.jsx';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class Container extends Component {

  state = {
    selectedGame: "guerrilla-checkers",
    player1: "",
    player2: ""
  };

  handleSelectGameChange = (event, index, value) => this.setState({selectedGame: value});
  
  handlePlayer1Change = (event) => {
    this.setState({
      player1: event.target.value,
    });
  };

  handlePlayer2Change = (event) => {
    this.setState({
      player2: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const game = this.state.selectedGame
    const { player1 } = this.state
    const { player2 } = this.state

    const table_id = Tables.insert({
      game,
      players: [player1, player2],
      createdAt: new Date(),
    });

    // Clear form
    // ReactDOM.findDOMNode(this.refs.gameInput).value = '';
    // ReactDOM.findDOMNode(this.refs.player1Input).value = '';
    // ReactDOM.findDOMNode(this.refs.player2Input).value = '';

    Meteor.call('initializeTable', table_id)
  }

  getGames() {
    return [
      { _id: 1, name: 'Guerrilla Checkers' },
      { _id: 2, name: 'InfoChess' },
      { _id: 3, name: 'Asymmetric Warfare' },
    ];
  }

  renderGames() {
    return this.getGames().map((game) => (
      <Game key={game._id} game={game} />
    ));
  }

  renderTables() {
    var retval = this.props.tables.map((table) => (
      <Table key={table._id} _id={table._id} game={table.game} players={table.players} remote_game_id={table.remote_game_id} />
    ));
    return retval
  }

  render() {
    return (
        <div className="container">
          <header>
            <h1>Game List</h1>
          </header>

          <LoginButtons />
          
          Tables:
          <ul>
            {this.renderTables()}
          </ul>
          <form id="new-table-form">

            <SelectField
              floatingLabelText="Select a game"
              value={this.state.selectedGame}
              onChange={this.handleSelectGameChange}
            >
              <MenuItem value={"guerrilla-checkers"} primaryText="Guerrilla Checkers" />
              <MenuItem value={"infochess"} primaryText="InfoChess" />
              <MenuItem value={"asymmetric-warfare"} primaryText="Asymmetric Warfare" />
            </SelectField>
            <br/>

            <TextField
              id="player-1-controlled"
              value={this.state.player1}
              floatingLabelText="Player 1 - Username"
              onChange={this.handlePlayer1Change}/>

            <br/>

            <TextField
              id="player-2-controlled"
              value={this.state.player2}
              floatingLabelText="Player 2 - Username"
              onChange={this.handlePlayer2Change} />
          

            <br/>
            <RaisedButton label="Create New Game" primary={true} onClick={this.handleSubmit} />
          </form>
        </div>
    );
  }
}

Container.propTypes = {
  tables: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tables: Tables.find({}).fetch(),
  };
}, Container);