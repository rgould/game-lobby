import React, { Component, PropTypes } from 'react';

export default class Game extends Component {
  render() {
    return (
      <li>{this.props.game._id}: {this.props.game.name}</li>
    );
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
};
