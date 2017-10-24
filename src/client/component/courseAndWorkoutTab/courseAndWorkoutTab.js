import React, { Component } from 'react';

class CourseAndWorkoutTab extends Component {
	constructor() {
		super();
		this.state = {

		};
	}
	render () {
		return (
			<div id="coursesAndWorkoutsTab">
				<div className="rgt_panel_heading">
					<h2>Courses &amp; Workouts</h2>
				</div>
				<div className="tabs-left">
					<ul className="nav nav-tabs">
						<li className="creationTab">
							<a href="#e" data-toggle="tab" className="create_tab">
								<span>Create/View</span>
							</a>
						</li>
						<li className="studentsTab">
							<a href="#b" data-toggle="tab" className="student_tab">
								<span>Students</span>
							</a>
						</li>
						<li className="plansTab">
							<a href="#d" data-toggle="tab" className="plan_tab">
								<span>Assign Plan</span>
							</a>
						</li>
						<li className="viewAssignedTab">
							<a href="#c" data-toggle="tab" className="assigned_tab">
								<span>Assigned Students</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default CourseAndWorkoutTab;
