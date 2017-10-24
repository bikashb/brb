import React, { Component } from 'react';
import axios from 'axios';
import ReactScrollbar from 'react-scrollbar-js';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import APIs from '../template/constants.js'

class ShowAssignedStudent extends Component {
	constructor() {
		super();
		this.state = {
			AllExercise:[],
			studentUnderExercise:[]
		};
	}
	componentWillMount(){
		this.setState({AllExercise:this.props.AllExercise})
	}
	userUnderExercise= (exercise)=>
	{
		axios.get(APIs.GetStudentUnderExercise+exercise)
	    .then((response)=>{
	      console.log(response.data);
	      this.setState({studentUnderExercise:response.data});
	      console.log(this.state.studentUnderExercise);
	    });
	}
	render () {
		const { AllExercise, studentUnderExercise } = this.state;
		const myScrollbar = {height: 440 };
		return (
			<div>
            {this.state.AllExercise.length?
                <div>
                    <div className="ex_plan_link_mas">
                        <a href="javascript:void(0);" className="ex_plan_link">Students under Exercise &gt;</a>
                        <a href="javascript:void(0);" onClick={(e)=>{this.props.show(e, '#myDashboard')}} className="ex_plan_link">Students under Plan &gt;</a>
                    </div>
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
                	AllExercise.map((video, i)=>
                        <div className="panel panel-default" key={i}>
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a data-toggle="collapse" data-parent="#accordion" href={"#collapse"+i} onClick={() => this.userUnderExercise(video.id)}>{video.title}</a>
                                </h4>
                            </div>
                            <div id={"collapse"+i} className="panel-collapse collapse">
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
                                    {studentUnderExercise.map((student, j)=>
                                        <table className="table" key={j}>
                                            <tbody>
                                                <tr className="success">
                                                    <td width="20%">{student.first_name}</td>
                                                    <td width="15%">{student.age}</td>
                                                    <td width="20%">{student.current_weight}</td>
                                                    <td width="25%">{student.email}</td>
                                                    <td width="20%"><a href="#">View details</a></td>
                                                </tr>
                                            </tbody>
                                        </table>)}
                                    </div>
                                    </ReactScrollbar>
                                </div>

                            </div>
                        </div>
                    )
                }
                </div>
                </div>:<h2 className="nocsv">Currently no exercises available please create exercise !</h2>}			
			</div>
		)
	}
}

export default ShowAssignedStudent;

