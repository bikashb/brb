import React, { Component } from 'react';
import ExerciseTab from './Exercise/ExerciseTab';
import CourseTab from './Course/CourseTab';
import WorkoutTab from './Workout/WorkoutTab';

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
					<ExerciseTab
						AllExercises={AllExercises}
						editExercise={(exercise, index)=>this.props.editItem('exercise', exercise, index)}
						deleteExercise={(id, index)=>this.props.deleteItem('exercise', id, index)}
						callAllExercises={this.props.callAllExercises} />
				);
			case 'create-plan':
				return (
					<CourseTab AllWorkouts={AllWorkouts}
						AllPlans={AllPlans}
						editCourse={(course, index)=>this.props.editItem('course', course, index)}
						deleteCourse={(id, index)=>this.props.deleteItem('course', id, index)}
						callAllPlans={this.props.callAllPlans} />
				);
			case 'create-workout':
				return (
					<WorkoutTab AllExercises={AllExercises}
						AllWorkouts={AllWorkouts}
						editWorkout={(workout, index)=>this.props.editItem('workout', workout, index)}
						deleteWorkout={(id, index)=>this.props.deleteItem('workout', id, index)}
						callAllWorkouts={this.props.callAllWorkouts} />
				);
			default:
				return (
					<ExerciseTab
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
