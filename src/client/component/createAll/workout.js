import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import WorkoutList from './workoutList.js';
import APIs from '../template/constants.js';

export default class Workout extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'create',
      title: '',
      description: '',
      intensity: '',
      selectedExercise: [],
      currentWorkout: {},
      currentIndex: -1
    };
    this.resetFields = this.resetFields.bind(this);
  }

  setupEditWorkout(workout, index) {
    this.setState({
      mode: 'update',
      title: workout.title,
      description: workout.description,
      intensity: workout.intensity,
      selectedExercise: workout.exercises
    });
  }

  updateWorkout(e) {
    e.preventDefault();
    let { currentIndex, currentWorkout } = this.state;
    currentWorkout.title = this.state.title;
    currentWorkout.description= this.state.description;
    currentWorkout.intensity = this.state.intensity;
    this.props.editWorkout(currentWorkout, currentIndex);
    this.resetFields();
  }

  resetFields() {
    this.setState({
      mode: 'create',
      title: '',
      description: '',
      intensity: '',
      selectedExercise: [],
      currentWorkout: {},
      currentIndex: -1
    });
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
    let { selectedExercise } = this.state;
    return (
      <div className="col-md-12 col-lg-12 col-xs-12 createCourse create-workout">
        {
          this.props.AllExercises.length ?
          <div>
            <div className="col-md-5 col-lg-5 col-xs-12 createCourse create-workout">
              <div className="create_up_btnMas">
                <span>
                  <a onClick={(e) => this.resetFields()}
                    className={
                      this.state.mode === 'create' ?
                      'createExerBtn' : ''
                    }>
                    Create
                  </a>
                </span>
                <span>{' '}</span>
                <span>
                  <a data-target='#workoutsViewModal' data-toggle='modal'
                    className={
                      this.state.mode !== 'create' ?
                      'createExerBtn' : ''
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
                {
                  this.state.mode === 'create' ?
                  <button className="btn btn-info" type="submit"
                    onClick={(e)=>this.createWorkout(e)}>
                    Create Workout
                  </button> :
                  <button className="btn btn-info" type="submit"
                    onClick={(e)=>this.updateWorkout(e)}>
                    Update Workout
                  </button>
                }
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
                        <div>
                  				<div className="video_mas1">
                  					<video  controls>
                  						<source src={exercise.streaming_uri} type="video/mp4"/>
                  					</video>
                  				</div>
                  				<div className="videoBtmTypo">
                            <span>Title :</span> {exercise.title}
                          </div>
                  				<div className="videoBtmTypo">
                            <span>Description :</span><p>{exercise.description}</p>
                          </div>
                  				<div className="videoBtmTypo last1">
                            <span>Type :</span> {exercise.type}
                          </div>
                  			</div>
                      </li>
                    )
                  }
              </CheckboxGroup>
            </ul>
            <div id="workoutsViewModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">All Workouts</h4>
                  </div>
                  <div className="modal-body">
                    <WorkoutList AllWorkouts={this.props.AllWorkouts}
                      setupEditWorkout={this.setupEditWorkout.bind(this)}
                      deleteWorkout={this.props.deleteWorkout}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <h2 className="nocsv">Currently no exercises available please create exercise !</h2>
        }
      </div>
    );
  }
}
