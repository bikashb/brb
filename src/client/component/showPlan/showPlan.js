import React, { Component } from 'react';
import $ from 'jquery';
import APIs from '../template/constants.js';

import ShowStudentListMini from '../showStudentList/showStudentListMini.js';

class ShowPlan extends Component {
	constructor() {
		super();
		this.state = {
			selectedPlan: '',
			selectedPlanName:'',
			AllPlans:[],
			workoutInPlans:[],
			exerciseInWorkouts:[],
			AllStudents:[]
		};
	}

	componentWillMount(){
		this.setState({AllPlans:this.props.AllPlans,AllStudents:this.props.AllStudents})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({AllPlans: nextProps.AllPlans,AllStudents:nextProps.AllStudents})
	}
	planID=(planID, planName)=>{
		this.setState({selectedPlan:planID, selectedPlanName:planName})
	}
	render () {
		const{ AllPlans, workoutInPlans, AllStudents } = this.state;
		return (
			<div>
			{this.state.AllPlans.length?
				<div className="course_thumb_mas">
					<ul className="thumb_workouts">
					{
						AllPlans.map((plan, i)=>
							<li className="active" key={i} data-toggle="modal" data-target="#myPlan" onClick={()=>this.planID(plan.id, plan.title)}>
								<div className="plan_mas">
									<h1>{plan.avg_workout_duration} Days Course</h1>
									<p>{plan.description}</p>
								</div>
								<ul className="wrkDetails1">
									<li><span className="blue">Name of the Course :</span>{plan.title}</li>
									<li><span className="blue">No of Videos :</span>{plan.schedule.length}</li>
								</ul>

							</li>
						)
					}
					</ul>

					<div id="myPlan" className="modal fade" role="dialog">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close cls_btn" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
		        					</button>
									<h4 className="modal-title" id="myModalLabel">{this.state.selectedPlanName}</h4>
								</div>
								<div className="modal-body createCourse">
									<ShowStudentListMini plan={this.state.selectedPlan}
										AllStudents={this.state.AllStudents}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>:<h2 className="nocsv">Currently no courses available please create workout with exercise and then course !</h2>}
			</div>
		)
	}
}

export default ShowPlan;
