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
          <th>Description</th>
          <th>Available Exercises</th>
          <th>Edit / Delete</th>
        </tr></thead><tbody>
        {
          workoutCopy.splice(currentPageUpdateWorkout*offsetUpdateWorkout, offsetUpdateWorkout).map((workout, i) => {
            return (
              <tr key={i}>
                <td>{workout.title}</td>
                <td>{workout.description}</td>
                <td>
                  <a
                    data-toggle='tooltip'
                    title={
                      workout.exercises.length > 0 ?
                      workout.exercises.map(ex => ex.title).toString() :
                      'No exercises available.'
                    }>
                    {workout.exercises.length}
                  </a>
                </td>
                <td>
                  <a data-dismiss='modal' className="glyphicon glyphicon-pencil"
                    onClick={(e)=>{
                      setupEditWorkout(workout, i);
                    }}>

                  </a>&nbsp; &nbsp;

                  <a className="glyphicon glyphicon-remove-circle"
                    onClick={(e)=>{deleteWorkout(workout.id, i)}}>

  								</a>
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
