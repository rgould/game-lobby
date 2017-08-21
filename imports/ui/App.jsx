import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import { Tables } from '../api/tables.js';

import Game from './Game.jsx';
import Table from './Table.jsx';

class App extends Component {

  handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tables.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
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
      <Table key={table._id} table={table} />
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
        <ul>
          {this.renderGames()}
        </ul>
        <hr/>
        <ul>
          {this.renderTables()}
        </ul>
        <form className="new-table" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="go fuck yourself :D"
          />
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
