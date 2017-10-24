import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ShowStudentList extends Component {
	constructor() {
		super();
		this.state = {
			AllStudents:[],
			selectedStudent:[]
		};
	}
	componentWillMount(){
		this.setState({AllStudents:this.props.AllStudents, selectedStudent:this.props.selectedStudent})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({AllStudents: nextProps.AllStudents, selectedStudent:nextProps.selectedStudent})
	}
	selectStudentChanged = (newStudent) =>{
		this.props.selectStudentChanged(newStudent);
	}
	render () {
		const { AllStudents } = this.state;
		return (
			<div>
			{this.state.AllStudents.length?
				<div id="testDiv1">
					<CheckboxGroup
				        name="students"
				        value={this.state.selectedStudent}
				        onChange={this.selectStudentChanged}
				    >
						{
							AllStudents.map((student, i)=>
								<blockquote className="blockquote odd border-left-red  mt-1" key={i}>
									<div className="media">
										<div className="media-left">
											<div className="rounded-circle">{student.first_name[0].toUpperCase()}</div>
										</div>
										<div className="media-body">
											{/*<Checkbox value={student} className="inputchk4wrkout" />*/}
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
			</div>
		)
	}
}

export default ShowStudentList;
