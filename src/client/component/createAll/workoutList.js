import React, { Component } from 'react';

export default class WorkoutList extends Component {
  componentWillMount() {
    console.log('all workouts: ', this.props.AllWorkouts)
  }
	render () {
		return (
      this.props.AllWorkouts.length > 0 ?
      <table className="table table-striped"><thead>
        <tr>
          <th>Title</th>
          <th>Available Exercises</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr></thead><tbody>
        {
          this.props.AllWorkouts.map((workout, i) => {
            return (
              <tr key={i}>
                <td>{workout.title}</td>
                <td>5</td>
                <td>
                  <button data-dismiss='modal'
                    onClick={(e)=>{
                      workout.exercises = ['1', '47'];
                      this.props.setupEditWorkout(workout, i);
                    }}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e)=>{this.props.deleteWorkout(i)}}>
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
