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
			AllExercises: [],
			AllPlans: []
		};
		this.getCurrentTab = this.getCurrentTab.bind(this);
	}

	componentWillMount() {
		this.setState({
			AllExercises: this.props.AllExercises,
			AllWorkouts: this.props.AllWorkouts,
			AllPlans: this.props.AllPlans
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			AllExercises: nextProps.AllExercises,
			AllWorkouts: nextProps.AllWorkouts,
			AllPlans: nextProps.AllPlans
		});
	}

	getCurrentTab() {
		const { currentTab, AllExercises, AllWorkouts, AllPlans } = this.state;
		switch(currentTab) {
			case 'create-exercise':
				return (
					<Exercise
						AllExercises={AllExercises}
						editExercise={this.props.editExercise}
						deleteExercise={this.props.deleteExercise}
						callAllExercises={this.props.callAllExercises} />
				);
			case 'create-plan':
				return (
					<Plan AllWorkouts={AllWorkouts}
						AllPlans={AllPlans}
						editCourse={this.props.editCourse}
						deleteCourse={this.props.deleteCourse}
						callAllPlans={this.props.callAllPlans} />
				);
			case 'create-workout':
				return (
					<Workout AllExercises={AllExercises}
						AllWorkouts={AllWorkouts}
						editWorkout={this.props.editWorkout}
						deleteWorkout={this.props.deleteWorkout}
						callAllWorkouts={this.props.callAllWorkouts} />
				);
			default:
				return (
					<Exercise
						AllExercises={AllExercises}
						editExercise={this.props.editExercise}
						deleteExercise={this.props.deleteExercise}
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
						  Course
					</h4>&nbsp;
      	</div>
				{this.getCurrentTab()}
			</div>
		)
	}
}
