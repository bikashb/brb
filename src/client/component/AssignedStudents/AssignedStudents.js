import React, { Component } from 'react';
import axios from 'axios';
import ReactScrollbar from 'react-scrollbar-js';
import APIs from '../template/constants.js'
import ReactPaginate from 'react-paginate';

export default class AssignedStudents extends Component {
	constructor() {
		super();
		this.state = {
			students: [],
			selectedCourseID: -1,
			offsetAssignedStudents: 3,
			currentPageAssignedStudents: 0,
			searchTextAssignedStudents: ''

		};
		this.getStudentsUnderCourse = this.getStudentsUnderCourse.bind(this);
	}

	getStudentsUnderCourse(id) {
		let { selectedCourseID } = this.state;
		if(selectedCourseID !== id) {
			this.setState({selectedCourseID: id});
			let { courses } = this.props;
			axios.get(APIs.GetStudentsUnderCourse + id)
		    .then((response) => {
					this.setState({students: response.data});
		      console.log('students under course: ', response);
		    });
		} else {
			this.setState({selectedCourseID: -1});
		}
	}

	render () {
		const { students, offsetAssignedStudents, currentPageAssignedStudents, searchTextAssignedStudents } = this.state;
		const { courses } = this.props;
		const myScrollbar = {height: 440};

		let CourseCopy = searchTextAssignedStudents.length ?
			courses.filter(course =>
				course.title.toLowerCase()
				.startsWith(searchTextAssignedStudents.toLowerCase())) :
			[...courses];


		return (
			<div>
        {
					courses.length ?
            <div>
							<div>
                 
                <div className="naivga1a">
					<form>
							<input type="text" placeholder="name" value={searchTextAssignedStudents}
								onChange={(e)=>this.setState({searchTextAssignedStudents: e.target.value})} />
							<a className="glyphicon glyphicon-remove-circle"
								onClick={(e)=> {
									e.preventDefault();
									this.setState({searchTextAssignedStudents: ''});
								}}>
								 
							</a>
						</form>
				</div>
            	</div>
							<div className="panel-group" id="accordion">
	            	{
	            		CourseCopy.splice(currentPageAssignedStudents*offsetAssignedStudents, offsetAssignedStudents).map((course, i)=>
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
            	<div className="naivga1">
					<ReactPaginate
					 previousLabel={'previous'}
					 nextLabel={'next'}
					 breakLabel={<a>...</a>}
					 breakClassName={'break-me'}
					 pageCount={(CourseCopy.length/offsetAssignedStudents)+1}
					 pageRangeDisplayed={5}
					 onPageChange={(page)=>this.setState({currentPageAssignedStudents: page.selected})}
					 containerClassName={'pagination'}
					 subContainerClassName={'pages pagination'}
					 activeClassName={'active'} />
				</div>
            </div> :
						<h2 className="nocsv">Currently no courses available. Please create a course.</h2>
					}
			</div>
		);
	}
}
