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
          <th>Edit / Delete</th>
           
        </tr></thead><tbody>
        {
          workoutCopy.splice(currentPageUpdateWorkout*offsetUpdateWorkout, offsetUpdateWorkout).map((workout, i) => {
            workout.exercises = workout.exercises.map(exercise => exercise.id);
            return (
              <tr key={i}>
                <td>{workout.title}</td>
                <td> <span className="exNam">[ Exercise 1 <span className="dura">-30 mins</span>, Exercise 2 <span className="dura">-30 mins</span>, Exercise 3 <span className="dura">-30 mins</span> ]</span>
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
