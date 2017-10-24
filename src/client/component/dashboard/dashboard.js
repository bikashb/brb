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
			selectedPlan:""
		};
	}
	componentWillMount(){
		this.setState({AllPlans:this.props.AllPlans})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({AllPlans: nextProps.AllPlans})
	}
	getAllDetailsUnderPlan=(plan)=>{
		this.setState({selectedPlan: plan.title});
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
										<a href="#" className="dash_consolidate disable1"><input type="radio" disabled /> Exercise</a>
										<a href="#" className="dash_consolidate"><input type="radio" checked  /> Plan</a>
										<span>Quick view to the  Individual  Exercise assignment &amp;  Plan assignment</span>
										<img src="images/preview.png" />
									</div>
									<table className="table table-striped">
                                        <thead>
                                            <tr>
                                               <th width="25%">Plan Name</th>
												<th width="35%">Start & End Date</th>
												<th width="10%">Duration</th>
												<th width="30%">Other Details</th>
                                            </tr>
                                        </thead>
                                    </table>
                                     <div className="dashTblScroll">
									<table className="table table-striped">

										 <tbody>
											{AllPlans.map((plans)=>
											<tr>
												<td width="25%" className="text-truncate">{plans.title}</td>
												<td width="35%" className="text-truncate" >
													<span>10 Oct 2017 - 9 Nov 2017</span>
												</td>
												<td width="10%" className="valign-middle">
													<span>30</span>
												</td>
												<td width="30%" className="text-truncate lstscroll" data-toggle="modal" data-target="#showPlan" ><a href="javascript:void(0)" onClick={()=>this.getAllDetailsUnderPlan(plans)}>Click to view</a></td>
											</tr>
											)}
										 </tbody>

									</table> </div>
								</div>
							</div>
						</div>:<h2 className="nocsv">Currently no plans available please create plan !</h2>}
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
							</div>
							<div className="modal-body createCourse">
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
