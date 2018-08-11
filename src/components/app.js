import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
         {this.props.children}  {/*중첩된 Route 들이 this.props.children 으로 전달된다.*/}
      </div>
    );
  }
}
