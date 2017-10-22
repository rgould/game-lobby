import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Tables } from '../api/tables.js';

import Game from './Game.jsx';
import Table from './Table.jsx';

class App extends Component {

  handleSubmit = (event) => {
    event.preventDefault();

    const game = ReactDOM.findDOMNode(this.refs.gameInput).value.trim();
    const player1 = ReactDOM.findDOMNode(this.refs.player1Input).value.trim();
    const player2 = ReactDOM.findDOMNode(this.refs.player2Input).value.trim();

    const table_id = Tables.insert({
      game,
      players: [player1, player2],
      createdAt: new Date(),
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.gameInput).value = '';
    ReactDOM.findDOMNode(this.refs.player1Input).value = '';
    ReactDOM.findDOMNode(this.refs.player2Input).value = '';

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
        Games:
        <ul>
          {this.renderGames()}
        </ul>
        <hr/>
        Tables:
        <ul>
          {this.renderTables()}
        </ul>
        <form className="new-table" onSubmit={this.handleSubmit} >
          <select
            type="select"
            ref="gameInput">
            <option value="guerrilla-checkers">Guerrilla Checkers</option>
            <option value="infochess">InfoChess</option>
            <option value="asymmetric-warfare">Asymmetric Warfare</option>
          </select>
          <br/>
          Player1:
          <input
            type="text"
            ref="player1Input"
            defaultValue="gavorkian"
          />
          <br/>
          Player2:
          <input
            type="text"
            ref="player2Input"
            defaultValue="kefka"
          />
          <br/>
          <button type="submit">Create Game</button>
        </form>
      </div>
    );
  }
}

App.propTypes = {
  tables: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tables: Tables.find({}).fetch(),
  };
}, App);
