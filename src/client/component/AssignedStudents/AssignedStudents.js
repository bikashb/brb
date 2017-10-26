import React, { Component } from 'react';
import axios from 'axios';
import ReactScrollbar from 'react-scrollbar-js';
import APIs from '../template/constants.js'

export default class AssignedStudents extends Component {
	constructor() {
		super();
		this.state = {
			students: [],
			selectedCourseID: -1
		};
		this.getStudentsUnderCourse = this.getStudentsUnderCourse.bind(this);
	}

	componentWillMount() {
		console.log('co: ', this.props.courses);
	}

	getStudentsUnderCourse(id) {
		let { selectedCourseID } = this.state;
		if(selectedCourseID !== id) {
			this.setState({selectedCourseID: id});
			let { courses } = this.props;
			axios.get(APIs.GetStudentsUnderPlan + id)
		    .then((response) => {
					// this.setState({students: response.data});
		      console.log('students under course: ', response);
		    });
		} else {
			this.setState({selectedCourseID: -1});
		}
	}

	render () {
		const { students } = this.state;
		const { courses } = this.props;
		const myScrollbar = {height: 440};
		return (
			<div>
        {
					courses.length ?
            <div>
							<div>
                <ul className="legends4Tbl">
                    <li><span className="lNew"></span>New</li>
                    <li><span className="lCompleted"></span>Completed</li>
                    <li><span className="lAlmost"></span>Almost</li>
                    <li><span className="lImprove"></span>Need to Improve</li>
                    <li><span className="lGood"></span>Good</li>
                </ul>
            	</div>
							<div className="panel-group" id="accordion">
	            	{
	            		courses.map((course, i)=>
		                <div className="panel panel-default" key={i}>
		                  <div className="panel-heading">
		                    <h4 className="panel-title">
		                      <a data-toggle="collapse"
														data-parent="#accordion"
														href={"#collapse"+i}
														onClick={() =>
															this.getStudentsUnderCourse(course.id)}>
															{course.title}
													</a>
		                    </h4>
		                  </div>
		                  <div id={"collapse"+i} className="panel-collapse collapse">
												{
													students.length ?
													<div className="panel-body">
			                      <table className="table headr">
			                        <thead>
			                          <tr>
			                            <th width="20%">Name</th>
			                            <th width="15%">Age</th>
			                            <th width="20%">Weight</th>
			                            <th width="25%">Email</th>
			                            <th width="20%">Status</th>
			                          </tr>
			                        </thead>
			                      </table>
			                      <ReactScrollbar style={myScrollbar}>
			                        <div id="testDiv55" >
			                        	{
																	students.map((student, j) =>
			                              <table className="table" key={j}>
			                                <tbody>
			                                  <tr className="success">
			                                    <td width="20%">{student.first_name}</td>
			                                    <td width="15%">{student.age}</td>
			                                    <td width="20%">{student.current_weight}</td>
			                                    <td width="25%">{student.email}</td>
			                                    <td width="20%"><a>View Details</a></td>
			                                  </tr>
			                                </tbody>
			                              </table>
																	)
																}
			                        </div>
			                      </ReactScrollbar>
			                    </div> :
													<div className="panel-body">
														<h2 className="nocsv">
															No students available.
														</h2>
													</div>
												}
		                  </div>
		                </div>
	                )
	            	}
            	</div>
            </div> :
						<h2 className="nocsv">Currently no courses available. Please create a course.</h2>
					}
			</div>
		);
	}
}
