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
					<th>Description</th>
          <th>Available Workouts</th>
          <th>Edit / Delete</th>
        </tr>
        </thead>
        <tbody>
        {
          planCopy.splice(currentPageUpdatePlan*offsetUpdatePlan, offsetUpdatePlan).map((course, i) => {
            return (
              <tr key={i}>
                <td>{course.title}</td>
								<td>{course.description}</td>
                <td>
									<a
										data-toggle='tooltip'
										title={
											course.workouts.length > 0 ?
											course.workouts.map(wo => wo.title).toString() :
											'No workouts available.'
										}>
										{course.workouts.length}
									</a>
								</td>
                <td>
                  <a data-dismiss='modal' className="glyphicon glyphicon-pencil"
                    onClick={(e)=>{
                      course.workouts = course.workouts;
                      setupEditCourse(course, i);
                    }}>
                  </a>&nbsp; &nbsp;
                  <a className="glyphicon glyphicon-remove-circle"
										onClick={(e)=>{deleteCourse(course.id, i)}}
										>
  								</a>
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
