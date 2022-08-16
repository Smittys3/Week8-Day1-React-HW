import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <>
        <br/>
          {this.props.name} <br/>
          {this.props.age}
      </>
    )
  }
}
