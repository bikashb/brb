import React, { Component } from 'react';
import axios from 'axios';
import APIs from '../template/constants.js';
import ReactScrollbar from 'react-scrollbar-js';
import $ from 'jquery';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			courses: [],
			students: [],
			selectedCourseID: 0,
			selectedStudentIndex: 0
		};
		this.getStudentsUnderCourse = this.getStudentsUnderCourse.bind(this);
	}

	componentWillMount(){
		if(this.props.AllPlans.length) {
			this.setState({courses: this.props.AllPlans, selectedCourseID: this.props.AllPlans[0].id});
			this.getStudentsUnderCourse(this.props.AllPlans[0].id);
		} else {
			console.log('no courses to display in the dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({courses: nextProps.AllPlans})
	}

	getStudentsUnderCourse(courseID) {
		axios.get(APIs.GetStudentsUnderCourse + courseID)
			.then((response) => {
				this.setState({students: response.data});
				console.log('selected course: ', this.state.courses[courseID]);
				console.log('students under course: ', response);
			});
	}

	render () {
		const { courses } = this.state;
		const myScrollbar_dash1 = { height: 500 };
		const myScrollbar = { height: 440 };
		return (
			<div>
				<div className="rgt_panel_heading" id="myDashboard">
					<h2>My Dashboard</h2>
				</div>
				<div className="col-xl-8 col-lg-12 myDash">
					<div className="col-md-8 col-lg-8">
					{
						courses.length ?
						<div className="card">
							<div className="card-header">
								<a className="heading-elements-toggle"><i className="icon-ellipsis font-medium-3"></i></a>
								<div className="heading-elements">
									<ul className="list-inline mb-0">
										<li><a data-action="reload"><i className="icon-reload"></i></a></li>
										<li><a data-action="expand"><i className="icon-expand2"></i></a></li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div className="table-responsive">
									<div className="dash_consolidate_mas">
										<a href="#" className="dash_consolidate">Ongoing Course List</a>
										<span>Quick view to Exercise details &amp;  Course assignment</span>
										<img src="images/preview.png" />
										<select value={this.state.selectedCourseID}
											onChange={(e) => {
												this.setState({selectedCourseID: e.target.value});
												this.getStudentsUnderCourse(e.target.value);
												console.log('selected course: ', e.target.value);
											}}
											>
											{
												courses.map((course, ci)=>
													<option key={ci} value={course.id}>{course.title}</option>
												)
											}
										</select>
									</div>
									{
										this.state.students.length ?
										<div className="dashTblScroll">
											<table className="table table-striped fnt13">
		                    <thead>
		                        <tr>
		                           <th width="25%">Student Name</th>
															 <th width="25%">Age</th>
															 <th width="25%">Other Details</th>
															 <th width="25%">Workout Status</th>
		                        </tr>
		                    </thead>
											</table>
											<table className="table table-striped fnt13">
												 <tbody>
													{this.state.students.map((student, si) =>
													<tr key={si}>
														<td width="25%" className="text-truncate">{student.first_name}</td>
														<td width="25%" className="text-truncate" >{student.age}</td>
														<td width="25%" className="text-truncate lstscroll" data-toggle="modal" data-target="#showPlan" >
															<a href="javascript:void(0)"
																onClick={(e)=>this.setState({selectedStudentIndex: si})}>Click to view</a>
														</td>
														<td width="25%" className="valign-middle">
															<div className="progress">
																<div className="progress-bar  progress-bar-success" role="progressbar"  style={{width: '20'}} aria-valuenow={'20'} aria-valuemin="0" aria-valuemax="100" title={'20'}>{'20'}</div>
															</div>
														</td>
													</tr>
													)}
												 </tbody>
											</table>
										</div> :
										<h2 className="nocsv">No students available</h2>
									}
								</div>
							</div>
						</div>:<h2 className="nocsv">Currently no courses available please create course !</h2>
					}
					</div>
					<div className="col-md-4 col-lg-4">
						<div className="card-body myDash1">
							<img src="images/dash_img1.png" alt="element 04" className="float-xs-left mt-3 img-fluid" width="284"/>
							<div className="card-block pt-3">
								<h4 className="card-title mt-3">toffee candy brownie</h4>
								<p className="card-text">Donut toffee candy brownie sDonut toffee candy brownie sDonut toffee candy brownie sDonut toffee candy brownie soufflé macaroon.</p>
								<button className="btn btn-info"
									onClick={(e)=>{
										this.props.show(e, '#coursesAndWorkoutsTab');
										$(document).ready(function() {
											['.studentsTab', '.creationTab',
											 '.plansTab', '.viewAssignedTab'].map((tab) => {
												if(tab == '.studentsTab') $(tab).addClass('active');
												else $(tab).removeClass('active');
											});
										});
									}}>
									Assign Courses & Workout Plan  &gt;
								</button>
							</div>
						</div>
					</div>
				</div>
				<div id="ourAwards">
					<div className="awards_cont">
						<h4><span>*** Awards</span> Lorem ipsum dolor sit amet</h4>
						<p>Lorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequaLorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequaLorem ipsum dolor sit amet, dignissim nibhLorem
							ipsum dolor sit amet.
						</p>
						<button className="btn btn-default center"> View All My Awards & recognition &gt; </button>
					</div>
				</div>
				<div id="showPlan" className="modal fade" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
							<button type="button" className="close cls_btn" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
        					</button>
								<h4 className="modal-title" id="myModalLabel">Student Details</h4>
							</div>
							<div className="modal-body createCourse">
								{
									this.state.students[0] ?
									<div>
										Name: {this.state.students[this.state.selectedStudentIndex].first_name}<br/>
										Age: {this.state.students[this.state.selectedStudentIndex].age}<br/>
										Workout Name: <h1>Sample Workout</h1>
										Exercise 1:
										<video  controls width="100%">
											<source src="https://mobilioblob.blob.core.windows.net/resoltz-demo/SampleVideo_360x240_1mb.mp4" type="video/mp4"/>
										</video>
										Exercise 2:
										<video  controls width="100%">
											<source src="https://mobilioblob.blob.core.windows.net/resoltz-demo/SampleVideo_360x240_1mb.mp4" type="video/mp4"/>
										</video>
									</div> :
									<div></div>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard;
