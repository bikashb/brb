import React, { Component } from 'react';
import CourseItem from './CourseItem';

export default class CourseList extends Component {
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
              <CourseItem key={i}
								course={course} index={i}
								deleteCourse={deleteCourse}
								setupEditCourse={setupEditCourse} />
            )
          })
        }
        </tbody>
      </table> :
      <div>No Plans Available</div>
		);
	}
}
