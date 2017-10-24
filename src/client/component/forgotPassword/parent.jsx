import React, { Component } from 'react';
import './parent.css';
import Child from '../Child/child.jsx'

class Parent extends Component {
	constructor(props) {
	 super(props); 
	 this.state = {
	 	TypedText: String,
	 	render: false
	 				};  
	}
	handleClick(event){
		this.setState({render:true});
	}
	handleChange(event) {
		this.setState({TypedText: event.target.value});
		this.setState({render:false});
  	}
  render() {
    return (
		<div className="parent-container">
			<h1>Parent Component:</h1><br/>
			<input className="parent-text" type="text" placeholder="Type anything.." onChange={this.handleChange.bind(this)} />
			<h3>State: {this.state.TypedText}</h3>
			<button className="prop-send-button" onClick={this.handleClick.bind(this)}>
		      Send props to child
		    </button>
			{this.state.render ? <Child parentStateAsPropsForChild={this.state.TypedText}/> : <div></div>}
		</div>
    );
  }
}

export default Parent;
