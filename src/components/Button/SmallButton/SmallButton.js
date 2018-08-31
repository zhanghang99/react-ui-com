import React,{ Component } from 'react';

export default class SmallButton extends Component{
  render(){
    return (
      <div>
        <button style={{color:this.props.color}}>知乎</button>
      </div>
    )
  }
} 