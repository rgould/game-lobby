import React, { Component, PropTypes } from 'react';

export default class Table extends Component {
  render() {
    return (
      <li>{this.props.table._id}: {this.props.table.text}</li>
    );
  }
}

Table.propTypes = {
  text: PropTypes.object.isRequired,
};
