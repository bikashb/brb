import React, { Component } from 'react';

export default class WorkoutList extends Component {
  componentWillMount() {
    console.log('all workouts: ', this.props.AllWorkouts)
  }
	render () {
    const { AllWorkouts, 
            workoutCopy, 
            currentPageUpdateWorkout, 
            offsetUpdateWorkout, 
            searchTextUpdateWorkout, 
            setupEditWorkout,
            deleteWorkout } = this.props;
		return (
      AllWorkouts.length > 0 ?
      <table className="table table-striped"><thead>
        <tr>
          <th>Title</th>
          <th>Available Exercises</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr></thead><tbody>
        {
          workoutCopy.splice(currentPageUpdateWorkout*offsetUpdateWorkout, offsetUpdateWorkout).map((workout, i) => {
            workout.exercises = workout.exercises.map(exercise => exercise.id);
            return (
              <tr key={i}>
                <td>{workout.title}</td>
                <td>5</td>
                <td>
                  <button data-dismiss='modal'
                    onClick={(e)=>{
                      setupEditWorkout(workout, i);
                    }}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e)=>{deleteWorkout(workout.id, i)}}>
  									Delete
  								</button>
                </td>
              </tr>
            )
          })
        }</tbody>
      </table> :
      <div>No Workouts Available</div>
		);
	}
}
