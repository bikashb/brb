import React, { Component } from 'react';

export default class PlanList extends Component {
	render () {
		return (
      this.props.AllPlans.length > 0 ?
      <table className="table table-striped">
       <thead>
        <tr>
          <th>Title</th>
          <th>Available Workouts</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.AllPlans.map((course, i) => {
            return (
              <tr key={i}>
                <td>{course.title}</td>
                <td>5</td>
                <td>
                  <button data-dismiss='modal'
                    onClick={(e)=>{
                      course.workouts = ['2', '29'];
                      this.props.setupEditCourse(course, i);
                    }}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
										onClick={(e)=>{this.props.deleteCourse(course.id, i)}}
										>
  									Delete
  								</button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table> :
      <div>No Plans Available</div>
		);
	}
}
