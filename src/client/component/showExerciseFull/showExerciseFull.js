import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import axios from 'axios';
import ShowStudentListMini from '../showStudentList/showStudentListMini.js';

class ShowFullExercise extends Component {
	constructor() {
		super();
		this.state = {
			AllVideos: [],
			SelectedStudentsUnderExercise: [],
			SelectedStudents: []
		};
	}

	componentWillMount(){
		this.setState({AllVideos:this.props.AllVideos, SelectedStudentsUnderExercise:this.props.SelectedStudentsUnderExercise})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({AllVideos: nextProps.AllVideos, SelectedStudentsUnderExercise:nextProps.SelectedStudentsUnderExercise})
	}

	selectStudentUnderExerciseChanged = (newData) => {
		this.props.selectStudentUnderExerciseChanged(newData);
	}

	setSelectedStudents(newData) {
		this.setState({SelectedStudents: newData});
	}

	render () {
		const { AllVideos, SelectedStudents, SelectedStudentsUnderExercise } = this.state;
		return (
			<div>
				<ul className="list-group pull-left testDive2scrol2" id="testDiv4">
					{
						AllVideos.map((video,i)=>
						<li className="list-group-item  videomainLi odd temp2" key={i} >
							<div className="indiviVideo">
								<div className="videoAlign1">
									<video  controls>
										<source src={video.streaming_uri} type="video/mp4"/>
									</video>
									<div className="inlineAssign">
										<h4 data-toggle="modal" data-target="#studentList">Assign Students</h4>
                    <div id="testDiv2" className="testDive2scrol">
                      <CheckboxGroup
								        name="selectedStudentsUnderExercise"
								        value={SelectedStudentsUnderExercise}
								        onChange={this.selectStudentUnderExerciseChanged}
									    >
                      	{
                        	SelectedStudents.map((student, j)=>
                              <div className="blockquote-footera text-xs-right" key={j}>
                                  <span className="btmVideoName">{student.first_name}  </span>
                                  <Checkbox value={student.id+" "+video.id+" "} className="inputchk4wrkout" />
                                  <span className="btmVideoyrs">{student.age} &nbsp;&nbsp;|&nbsp;&nbsp;
																		<a href="#">Other details ></a>
																	</span>
                              </div>
                           	)
                        }
                      </CheckboxGroup>
                    </div>
									</div>
								</div>
							</div>
							<div className="card wid_70Per">
								<div className="card-body">
									<div className="card-block">
										<h4 className="card-title">Video {i+1} [ <span>{video.title}</span> ]</h4><br/>
										<p className="card-text">
											{video.description}
										</p>
									</div>
									<ul className="list-group list-group-flush">
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-primary float-xs-right">{video.type}</span> Difficulty
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-info float-xs-right">medium</span> Average difficulty
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-warning float-xs-right">30 mins</span> Average video length
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-success float-xs-right">75%</span> Noise Friendly
										</li>
										<li className="list-group-item">
											<span className="tag tag-default tag-pill bg-danger float-xs-right">500 calories</span> Calories Required/day
										</li>
									</ul>
								</div>
							</div>
						</li>
					)}
				</ul>
				<div id="studentList" className="modal fade" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close cls_btn" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="myModalLabel">Student List</h4>
							</div>
							<div className="modal-body createCourse">
								<ShowStudentListMini
									AllStudents={this.props.AllStudents}
									setSelectedStudents={this.setSelectedStudents.bind(this)}/>
							</div>
						</div>
					</div>
				</div>
        </div>
		)
	}
}

export default ShowFullExercise;
