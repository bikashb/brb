import React, { Component } from 'react';
import axios from 'axios';

class ShowWorkout extends Component {
	constructor() {
		super();
		this.state = {
			day: 1
		};
	}
	render () {
		const { workout } = this.props;
		return (
			<div>
				<div className="videoBtmTypo"> <span>Title :</span> {workout.title}</div>
				<div className="videoBtmTypo"> <span>Description :</span><p>{workout.description}</p></div>
				<div className="videoBtmTypo last1"> <span>Intesity :</span> {workout.intesity}</div>
				<div>
					&nbsp;
					<input type="radio" value={1}
						checked={this.state.day == 1}
						onChange={(e)=>this.setState({day: e.target.value})} /> Mon &nbsp;
					<input type="radio" value={2}
						checked={this.state.day == 2}
						onChange={(e)=>this.setState({day: e.target.value})} /> Tue &nbsp;
					<input type="radio" value={3}
						checked={this.state.day == 3}
						onChange={(e)=>this.setState({day: e.target.value})} /> Wed &nbsp;
					<input type="radio" value={4}
						checked={this.state.day == 4}
						onChange={(e)=>this.setState({day: e.target.value})} /> Thu &nbsp;
					<input type="radio" value={5}
						checked={this.state.day == 5}
						onChange={(e)=>this.setState({day: e.target.value})} /> Fri &nbsp;
					<input type="radio" value={6}
						checked={this.state.day == 6}
						onChange={(e)=>this.setState({day: e.target.value})} /> Sat &nbsp;
					<input type="radio" value={7}
						checked={this.state.day == 7}
						onChange={(e)=>this.setState({day: e.target.value})} /> Sun &nbsp;
				</div>
			</div>
		)
	}
}

export default ShowWorkout;
