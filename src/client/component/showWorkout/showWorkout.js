import React, { Component } from 'react';
import axios from 'axios';

class ShowWorkout extends Component {
	constructor() {
		super();
		this.state = {

		};
	}
	render () {
		const { workout } = this.props;
		return (
			<div>
				<div className="videoBtmTypo"> <span>Title :</span> {workout.title}</div>
				<div className="videoBtmTypo"> <span>Description :</span><p>{workout.description}</p></div>
				<div className="videoBtmTypo last1"> <span>Intesity :</span> {workout.intesity}</div>
			</div>
		)
	}
}

export default ShowWorkout;

