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
						editExercise={(exercise, index)=>this.props.editItem('exercise', exercise, index)}
						deleteExercise={(id, index)=>this.props.deleteItem('exercise', id, index)}
						callAllExercises={this.props.callAllExercises} />
				);
			case 'create-plan':
				return (
					<Plan AllWorkouts={AllWorkouts}
						AllPlans={AllPlans}
						editCourse={(course, index)=>this.props.editItem('course', course, index)}
						deleteCourse={(id, index)=>this.props.deleteItem('course', id, index)}
						callAllPlans={this.props.callAllPlans} />
				);
			case 'create-workout':
				return (
					<Workout AllExercises={AllExercises}
						AllWorkouts={AllWorkouts}
						editWorkout={(course, index)=>this.props.editItem('workout', course, index)}
						deleteWorkout={(id, index)=>this.props.deleteItem('workout', id, index)}
						callAllWorkouts={this.props.callAllWorkouts} />
				);
			default:
				return (
					<Exercise
						AllExercises={AllExercises}
						editExercise={this.props.editExercise}
						deleteExercise={(id, index)=>this.props.deleteItem('exercise', id, index)}
						callAllExercises={this.props.callAllExercises} />
				);
		}
	}

	render () {
		return (
			<div>
				<div className="col-md-8 col-lg-12">
			      <h4 className={this.state.currentTab === 'create-exercise' ? "createItems1" : "createItems1 greyTxt"}
			        	onClick={(e) => this.setState({currentTab: 'create-exercise'})}>
						&nbsp; Exercise
						</h4>
				    <h4 className={this.state.currentTab === 'create-workout' ? "createItems1" : "createItems1 greyTxt"}
				        	onClick={(e) => this.setState({currentTab: 'create-workout'})}>
							&nbsp; Workout
						</h4>
			      <h4 className={this.state.currentTab === 'create-plan' ? "createItems1" : "createItems1 greyTxt"}
			        	onClick={(e) => this.setState({currentTab: 'create-plan'})}>
						&nbsp; Course
						</h4>
		      </div>
				{this.getCurrentTab()}
			</div>
		)
	}
}
