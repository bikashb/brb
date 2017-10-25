import React, { Component } from 'react';
import axios from 'axios';
import APIs from '../template/constants.js';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ShowStudentListMini extends Component {
	constructor() {
		super();
		this.state = {
			AllStudents: [],
			selectedStudent: [],
			planID: null
		};
	}

	componentWillMount(){
		this.setState({AllStudents:this.props.AllStudents, planID:this.props.plan})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({AllStudents: nextProps.AllStudents, planID:nextProps.plan})
	}

	selectStudentChanged(newStudent) {
		this.setState({selectedStudent: newStudent});
	}

	assignStudentToPlan() {
		let array = this.state.selectedStudent.toString().replace(/,/g , "").trim().split(" ");
    let temp = [];
    for(let i=0; i<array.length; i+=2)
			temp.push({plan_id: array[i+1], 'user_id': array[i]});
		axios.post(APIs.AssignPlanToStudent, {list: temp})
	    .then((response) => {
	    	console.log(response)
	      if(response.status == 201) {
	      	alert(response.data.message)
	      	this.setState({selectedStudent:[]})
	      } else if(response.status == 500) {
	      	alert(response.data.message)
	      	this.setState({selectedStudent:[]})
	      }
		  });
	}

	selectStudents() {
		let array = this.state.selectedStudent.toString().replace(/,/g , "").trim().split(" ");
		let ids = [];
    for(let i=0; i<array.length; i+=2) ids.push(+array[i]);
		let students = this.state.AllStudents.filter((student) => ids.indexOf(student.id) >= 0);
		this.props.setSelectedStudents(students);
	}

	render () {
		const { AllStudents, planID, selectedStudent } = this.state;
		return (
			<div>
			{AllStudents.length?
				<div id="testDiv1" className="planAssignment">
					<CheckboxGroup
				        name="students"
				        value={this.state.selectedStudent}
				        onChange={this.selectStudentChanged.bind(this)}
				    >
						{
							AllStudents.map((student, i)=>
								<blockquote className="blockquote odd border-left-red  mt-1" key={i}>
									<div className="media">
										<div className="media-left">
											<div className="rounded-circle">{student.first_name[0].toUpperCase()}</div>
										</div>
										<div className="media-body">
											<Checkbox value={student.id+" "+planID+" "} className="inputchk4wrkout" />
											<h3 className="stu_name">{student.first_name}</h3>
											<ul>
												<li>Age :<span>{student.age}</span></li>
												{/*<li>Weight : <span>{student.current_weight}</span></li>*/}
											</ul>
										</div>
									</div>
								</blockquote>
							)
						}
					</CheckboxGroup>
				</div>:<h2 className="nocsv">Currently students list not available please upload the data file below !</h2>}

				{
					planID ?
					<button className="btn btn-info"
						onClick={this.assignStudentToPlan.bind(this)}
						disabled={selectedStudent.length == 0}
						data-dismiss="modal"
						>
						Assign to this course
					</button> :
					<button className="btn btn-info"
						onClick={this.selectStudents.bind(this)}
						disabled={selectedStudent.length == 0}
						data-dismiss="modal"
						>
						Select Students
					</button>
				}
			</div>
		)
	}
}

export default ShowStudentListMini;
