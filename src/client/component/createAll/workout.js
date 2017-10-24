import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ShowExercise from '../showExercise/showExercise.js';
import APIs from '../template/constants.js';

export default class Workout extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'create',
      title: '',
      description: '',
      intensity: '',
      selectedExercise: []
    };
  }

  /*Create Workout Starts*/
  selectExerciseChanged = (newExercise) => {
    this.setState({selectedExercise: newExercise});
  }

  createWorkout = (e) => {
    let { title, intensity, description, selectedExercise } = this.state;
    e.preventDefault();
    if(description==""||title==""||intensity==""||this.state.selectedExercise.length==0) {
      alert("check all fields");
    } else {
      axios.post(APIs.CreateWorkout, {
          "description": description,
          "id": localStorage.getItem("id"),
          "duration": 5,
		      "title": title,
		      "intensity": intensity,
		      "list": selectedExercise/*list:[1,2,3]*/
        })
        .then((response) => {
          this.setState({selectedExercise: []})
          console.log(response.data);
          description="";
          title="";
          intensity="";
          this.props.callAllWorkouts();
          alert("workout created")
        });
    }
  }
  /*Create Workout Ends*/

  render() {
    return (
      <div className="col-md-12 col-lg-12 col-xs-12 createCourse create-workout">
        {
          this.props.AllExercises.length ?
          <div>
            <div className="col-md-5 col-lg-5 col-xs-12 createCourse create-workout">
              <form role="form" >
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" placeholder="Title" name="Title"
                    value={this.state.title} className="form-control"
                    onChange={(e)=>this.setState({title: e.target.value})} />
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
                  onClick={(e)=>this.createWorkout(e)}>
                  Create Workout
                </button>
              </form>
            </div>
            <ul className="wrkoutulli">
              <CheckboxGroup
                  name="exercises"
                  value={this.state.selectedExercise}
                  onChange={this.selectExerciseChanged}
                  >
                  {
                    this.props.AllExercises.map((exercise, i) =>
                      <li key={i}>
                        <Checkbox value={exercise.id} className="inputchk4wrkout" />
                        <ShowExercise exercise={exercise}/>
                      </li>
                    )
                  }
              </CheckboxGroup>
            </ul>
          </div> :
          <h2 className="nocsv">Currently no exercises available please create exercise !</h2>
        }
      </div>
    );
  }
}
