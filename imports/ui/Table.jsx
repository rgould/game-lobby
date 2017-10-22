import React, { Component, PropTypes } from 'react';

export default class Table extends Component {
  render() {
    return (
      <li>{this.props._id}: {this.props.game} ({this.props.players}) (Remote ID: {this.props.remote_game_id})</li>
    );
  }
}

Table.propTypes = {
  game: PropTypes.oneOf(['guerrilla-checkers', 'infochess', 'asymmetric-warfare']).isRequired,
  players: PropTypes.array.isRequired,
};
