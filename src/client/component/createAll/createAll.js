import React, { Component } from 'react';
import Exercise from './exercise.js';
import Plan from './plan.js';
import Workout from './workout.js';

export default class CreateAll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab: 'create-exercise',
			AllWorkouts: [],
			AllExercises: []
		};
		this.getCurrentTab = this.getCurrentTab.bind(this);
	}

	componentWillMount() {
		this.setState({
			AllExercises: this.props.AllExercises,
			AllWorkouts: this.props.AllWorkouts
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			AllExercises: nextProps.AllExercises,
			AllWorkouts: nextProps.AllWorkouts
		});
	}

	getCurrentTab() {
		const { currentTab, AllExercises, AllWorkouts } = this.state;
		switch(currentTab) {
			case 'create-exercise':
				return (
					<Exercise
						AllExercises={AllExercises}
						callAllExercises={this.props.callAllExercises} />
				);
			case 'create-plan':
				return (
					<Plan AllWorkouts={AllWorkouts}
						callAllPlans={this.props.callAllPlans} />
				);
			case 'create-workout':
				return (
					<Workout AllExercises={AllExercises}
						callAllWorkouts={this.props.callAllWorkouts} />
				);
			default:
				return (
					<Exercise
						AllExercises={AllExercises}
						callAllExercises={this.props.callAllExercises} />
				);
		}
	}

	render () {
		return (
			<div>
				<div className="col-md-8 col-lg-12">
	        <h4 className="createItems1">
						<input type="radio" name="create-show"
							checked={this.state.currentTab === 'create-exercise'}
							onChange={(e) => this.setState({currentTab: 'create-exercise'})} />
						 Exercise
					</h4>&nbsp;&nbsp;
	        <h4 className="createItems1">
						<input type="radio" name="create-show"
							checked={this.state.currentTab === 'create-workout'}
							onChange={(e) => this.setState({currentTab: 'create-workout'})} />
							Workout
					</h4>&nbsp;&nbsp;
	        <h4 className="createItems1">
						<input type="radio" name="create-show"
							checked={this.state.currentTab === 'create-plan'}
							onChange={(e) => this.setState({currentTab: 'create-plan'})} />
						  Plan
					</h4>&nbsp;
      	</div>
				{this.getCurrentTab()}
		    <div className="col-md-6 col-lg-6 col-xs-12 rgt_frm_img1">
					<img src="images/create_exercise_img.png" />
					<div className="beaches-banner-content">
						<h4>Do you love Exercise?</h4>
						<p>
							Whedamet, consectetur adipiscing elit. Duis pharetra varius quam sit amet experience in the Caribbean for over 15 years!.
						</p>
					</div>
				</div>
			</div>
		)
	}
}
