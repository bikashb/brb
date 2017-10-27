import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ShowWorkout extends Component {
	constructor() {
		super();
		this.state = {
			days: []
		};
	}
	render () {
		const { workout } = this.props;
		return (
			<div>
				<div className="videoBtmTypo"> <span>Title :</span> {workout.title}</div>
				<div className="videoBtmTypo"> <span>Description :</span><p>{workout.description}</p></div>
				<div className="videoBtmTypo last1"> <span>Intensity :</span> {workout.intensity}</div>
				<div>
					&nbsp;&nbsp;
					<CheckboxGroup
					  style={this.props.style}
						value={this.state.days}
						onChange={(days) => {
							this.setState({days: days});
							this.props.setWorkoutDays(workout.id, days);
						}} >
						<Checkbox value={1} /> S &nbsp;
						<Checkbox value={2} /> M &nbsp;
						<Checkbox value={3} /> T &nbsp;
						<Checkbox value={4} /> W &nbsp;
						<Checkbox value={5} /> T &nbsp;
						<Checkbox value={6} /> F &nbsp;
						<Checkbox value={7} /> S &nbsp;
					</CheckboxGroup>
				</div>
			</div>
		)
	}
}

export default ShowWorkout;
