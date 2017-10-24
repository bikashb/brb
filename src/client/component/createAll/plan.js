import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ShowWorkout from '../showWorkout/showWorkout.js';
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
      selectedWorkout: []
    };
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
                <button className="btn btn-info"
                  onClick={(e)=>this.createPlan(e)}>
                  Create Plan
                </button>
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
          </div> :
          <h2 className="nocsv">Currently no workouts available please create workout !</h2>
        }
      </div>
    );
  }
}
