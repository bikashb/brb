import React, { Component } from 'react';
import axios from 'axios';
import APIs from '../template/constants.js';
import ReactScrollbar from 'react-scrollbar-js';
import $ from 'jquery';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			AllPlans:[],
			AllWorkouts:[],
			AllExercises:[],
			selectedPlan:"",
			students: [],
			selectedPlanID: '-1'
		};
		this.getStudentsUnderCourse = this.getStudentsUnderCourse.bind(this);
	}
	componentWillMount(){
		this.setState({AllPlans:this.props.AllPlans})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({AllPlans: nextProps.AllPlans})
	}

	getStudentsUnderCourse() {
		let self = this;
		$(document).ready(function() {
			if($('#studentsDashboard').hasClass('hidden')) {
				$('#studentsDashboard').removeClass('hidden');
				axios.get(APIs.GetStudentsUnderCourse + self.state.selectedPlanID)
			    .then((response) => {
						self.setState({students: response.data});
			      console.log('students under course: ', response);
			    });
			} else {
				$('#studentsDashboard').addClass('hidden');
			}
		});
	}

	getAllDetailsUnderPlan=(plan)=>{
		this.setState({selectedPlan: plan.title});
		this.setState({selectedPlanID: plan.id});
		axios.get(APIs.GetAllDetailsOfPlan+plan.id)
	    .then((response)=>{
	      if (response.status == 500) {
	        alert(response.message);
	      }
	      if(response.status == 200) {
	      	let workouts  = [];
	      	response.data[0].workouts.map((workout, windex) => {
	      		let exercises = [];
	      		workouts.push({title: workout.title});
	      		response.data[1].map((workoutID, index) => {
	      			if(Object.keys(workoutID)[0] == workout.id) {
	      				exercises.push(workoutID[Object.keys(workoutID)[0]].map((exercise, eindex) => {
	      					return {
	      						name: exercise.title,
	      						video: exercise.streaming_uri
	      					}
	      				}));
	      			}
	      		});
	      		workouts[windex].exercises = exercises;
	      	});
	      	this.setState({AllWorkouts: workouts}, ()=>{console.log('workouts -- ', workouts)});
	      }
	    });
	}

	showNoOfStudents(planID){
		axios.post(APIs.GetStudentsUnderPlan+planID)/*Get list of students*/
	    .then((response)=>{
	      console.log(response.date);
	    });

	}
	render () {
		const { AllPlans, AllExercises, AllWorkouts } = this.state;
		const myScrollbar_dash1 = {
          height: 500
        };
		const myScrollbar = {height: 440};
		return (
			<div>
				<div className="rgt_panel_heading" id="myDashboard">
					<h2>My Dashboard</h2>
				</div>
				<div className="col-xl-8 col-lg-12 myDash">
					<div className="col-md-8 col-lg-8">
					{AllPlans.length?
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
									</div>
									<table className="table table-striped fnt13">
                                        <thead>
                                            <tr>
                                               <th width="25%">Course Name</th>
												<th width="25%">Start & End Date</th>
												<th width="15%">Duration</th>
												<th width="20%">Other Details</th>
												<th width="15%">Status</th>
                                            </tr>
                                        </thead>
                                    </table>
                                     <div className="dashTblScroll">
									<table className="table table-striped fnt13">

										 <tbody>
											{AllPlans.map((plans, pi)=>
											<tr key={pi}>
												<td width="25%" className="text-truncate">{plans.title}</td>
												<td width="25%" className="text-truncate" >
													<span className="stDate">10 Oct 17</span> <span className="enDate"> - 9 Nov 17</span>
												</td>
												<td width="15%" className="valign-middle">
													<span>30</span>
												</td>
												<td width="20%" className="text-truncate lstscroll" data-toggle="modal" data-target="#showPlan" ><a href="javascript:void(0)" onClick={()=>this.getAllDetailsUnderPlan(plans)}>Click to view</a></td>
												<td width="15%" className="valign-middle">
													<div className="progress">
														<div className="progress-bar  progress-bar-success" role="progressbar"  style={{width:plans.avg_workout_duration.toString()}} aria-valuenow={plans.avg_workout_duration.toString()} aria-valuemin="0" aria-valuemax="100" title={plans.avg_workout_duration.toString()}>{plans.avg_workout_duration.toString()}</div>
													</div>
												</td>
											</tr>
											)}
										 </tbody>
									</table> </div>
								</div>
							</div>
						</div>:<h2 className="nocsv">Currently no courses available please create course !</h2>}
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
								<h4 className="modal-title" id="myModalLabel">{this.state.selectedPlan}</h4>
								<a onClick={this.getStudentsUnderCourse}>Student List</a>
							</div>
							<div className="modal-body createCourse">
							<div id='studentsDashboard' className='hidden'>
								<table className="table headr">
									<thead>
										<tr>
											<th width="20%">Name</th>
											<th width="15%">Age</th>
											<th width="20%">Weight</th>
											<th width="25%">Email</th>
											<th width="20">Workout Progress</th>
										</tr>
									</thead>
								</table>
								<ReactScrollbar style={myScrollbar}>
									<div id="testDiv55" >
										{
											this.state.students.map((student, j) =>
												<table className="table" key={j}>
													<tbody>
														<tr className="success">
															<td width="20%">{student.first_name}</td>
															<td width="15%">{student.age}</td>
															<td width="20%">{student.current_weight}</td>
															<td width="25%">{student.email}</td>
															<td width="20%">
																<div className="progress">
																	<div className="progress-bar  progress-bar-success" role="progressbar"  style={{width: '20'}} aria-valuenow='20' aria-valuemin="0" aria-valuemax="100" title='20'>20</div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											)
										}
									</div>
								</ReactScrollbar>
							</div>
							<div className="planAssignment">
								{AllWorkouts.map((workout)=>
									(<div>
										<h1>Workout Title : <span className="blue_txt1">{workout.title}</span></h1>

										{workout.exercises[0].length?
											workout.exercises[0].map(exercise=>(
												<div>
													<div>Exercise Name:  <span className="blue_txt1">{exercise.name}</span></div>
													<video  controls width="100%">
														<source src={exercise.video} type="video/mp4"/>
													</video>
												</div>
											)):<div className="red_txt1">No exercises available </div>
										}
									</div>)
								)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Dashboard;
