import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ShowWorkout from '../showWorkout/showWorkout.js';
import PlanList from './planList.js'
import APIs from '../template/constants.js';

export default class Plan extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'create',
      title: '',
      duration: '',
      description: '',
      intensity: '',
      selectedWorkout: [],
      currentCourse: {},
      currentIndex: -1
    };
  }

  setupEditCourse(course, index) {
    this.setState({
      mode: 'update',
      title: course.title,
      duration: course.duration,
      description: course.description,
      intensity: course.intensity,
      selectedWorkout: course.workouts
    });
  }

  updateCourse(e) {
    e.preventDefault();
    let { currentIndex, currentCourse } = this.state;
    currentCourse.title = this.state.title;
    currentCourse.duration= this.state.duration;
    currentCourse.description= this.state.description;
    currentCourse.intensity = this.state.intensity;
    this.props.editCourse(currentCourse, currentIndex);
    this.resetFields();
  }

  resetFields() {
    this.setState({
      mode: 'create',
      title: '',
      duration: '',
      description: '',
      intensity: '',
      selectedWorkout: [],
      currentCourse: {},
      currentIndex: -1
    });
  }

  /*Create Plan Starts*/
	selectWorkoutChanged = (newWorkout) => {
		this.setState({selectedWorkout: newWorkout});
	}

	createPlan = (e) => {
		e.preventDefault();
		let { description, duration, title, intensity, selectedWorkout } = this.state;
		if(duration==""||description==""||title==""||intensity==""||this.state.selectedWorkout.length==0) {
			alert("check all fields");
		} else {
			axios.post(APIs.CreatePlan,{
		      "description": description,
		      "id": localStorage.getItem("id"),
		      "duration": duration,
		      "title": title,
		      "intensity": intensity,
		      "workouts": selectedWorkout/*list:[1,2,3]*/
		    })
		    .then((response)=>{
		    	this.setState({selectedWorkout:[]})
		    	console.log(response.data);
		    	description="";
  				duration="";
  				title="";
				  intensity="";
		    	this.props.callAllPlans();
		    	alert("plan created");
		    });
		}
	}
	/*Create Plan Ends*/

  render() {
    return (
      <div  className="col-md-12 col-lg-12 col-xs-12 createCourse create-plan">
        {
          this.props.AllWorkouts.length ?
          <div>
            <div  className="col-md-5 col-lg-5 col-xs-12 createCourse create-plan">
              <div>
                <span>
                  <a onClick={(e) => this.resetFields()}
                    style={
                      this.state.mode === 'create' ?
                      {border: '2px solid blue', padding: '2px'} :
                      {}
                    }>
                    Create
                  </a>
                </span>
                <span>{' '}</span>
                <span>
                  <a data-target='#plansViewModal' data-toggle='modal'
                    style={
                      this.state.mode !== 'create' ?
                      {border: '2px solid blue', padding: '2px' } :
                      {}
                    }>
                    View/Update
                  </a>
                </span>
              </div>
              <form role="form" >
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Title" name="Title"
                    value={this.state.title} className="form-control"
                    onChange={(e)=>this.setState({title: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" placeholder="Duration (In days 1-30)" name="Duration"
                    value={this.state.duration} className="form-control"
                    onChange={(e)=>this.setState({duration: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="Description" name="Description"
                    value={this.state.description} className="form-control"
                    onChange={(e)=>this.setState({description: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Intensity</label>
                  <input type="text" placeholder="Intensity (1-10)" name="Intensity"
                    value={this.state.intensity} className="form-control"
                    onChange={(e)=>this.setState({intensity: e.target.value})} />
                </div>
                {
                  this.state.mode === 'create' ?
                  <button className="btn btn-info" type="submit"
                    onClick={(e)=>this.createCourse(e)}>
                    Create Course
                  </button> :
                  <button className="btn btn-info" type="submit"
                    onClick={(e)=>this.updateCourse(e)}>
                    Update Course
                  </button>
                }
              </form>
            </div>
            <ul className="wrkoutulli_1">
              <CheckboxGroup
                  name="workouts"
                  value={this.state.selectedWorkout}
                  onChange={this.selectWorkoutChanged}
                  >
                  {this.props.AllWorkouts.map((workout, i)  =>
                    <li key={i}>
                      <Checkbox value={workout.id} className="inputchk4wrkout" />
                      <ShowWorkout workout={workout} />
                    </li>
                  )}
              </CheckboxGroup>
            </ul>
            <div id="plansViewModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">All Courses</h4>
                  </div>
                  <div className="modal-body">
                    <PlanList AllPlans={this.props.AllPlans}
                      setupEditCourse={this.setupEditCourse.bind(this)}
                      deleteCourse={this.props.deleteCourse.bind(this)}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <h2 className="nocsv">Currently no workouts available please create workout !</h2>
        }
      </div>
    );
  }
}
