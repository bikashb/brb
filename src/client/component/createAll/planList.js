import React, { Component } from 'react';

export default class PlanList extends Component {
	render () {
    const{AllPlans, 
          deleteCourse, 
          setupEditCourse, 
          searchTextUpdatePlan, 
          offsetUpdatePlan, 
          currentPageUpdatePlan, 
          planCopy } = this.props;

		return (
      AllPlans.length > 0 ?
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
          planCopy.splice(currentPageUpdatePlan*offsetUpdatePlan, offsetUpdatePlan).map((course, i) => {
            return (
              <tr key={i}>
                <td>{course.title}</td>
                <td>{course.workouts.length}</td>
                <td>
                  <button data-dismiss='modal'
                    onClick={(e)=>{
                      course.workouts = course.schedule;
                      setupEditCourse(course, i);
                    }}>
                    Edit
                  </button>
                </td>
                <td>
                  <button
										onClick={(e)=>{deleteCourse(course.id, i)}}
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
