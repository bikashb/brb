import React, { Component } from 'react';
import WorkoutItem from './WorkoutItem';

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
          <th>Description</th>
          <th>Available Exercises</th>
          <th>Edit / Delete</th>
        </tr></thead><tbody>
        {
          workoutCopy.splice(currentPageUpdateWorkout*offsetUpdateWorkout, offsetUpdateWorkout).map((workout, i) => {
            return (
              <WorkoutItem key={i}
                workout={workout} index={i}
                deleteWorkout={deleteWorkout}
                setupEditWorkout={setupEditWorkout} />
            )
          })
        }</tbody>
      </table> :
      <div>No Workouts Available</div>
		);
	}
}
