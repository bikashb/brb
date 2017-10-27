import React, { Component } from 'react';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ShowWorkout from '../showWorkout/showWorkout.js';
import PlanList from './planList.js'
import APIs from '../template/constants.js';
import sweetalert from 'sweetalert';
import ReactPaginate from 'react-paginate';

export default class Plan extends Component {
  constructor() {
    super();
    this.state = {
      mode: 'create',
      title: '', titleError: '',
      description: '', descriptionError: '',
      startDate: {}, endDate: {},
      selectedWorkout: [],
      workouts: [],
      currentCourse: {},
      currentIndex: -1,
      currentPageUpdatePlan:0,
      offsetUpdatePlan:4,
      searchTextUpdatePlan:'',
      currentPageCreatePlan:0,
      offsetCreatePlan:3,
      searchTextCreatePlan:''
    };
    this.resetFields = this.resetFields.bind(this);
    this.validationSuccess = this.validationSuccess.bind(this);
  }

  componentWillMount() {
      console.log('course list mounted: ', this.props.AllPlans);
  }

  setWorkoutDays(id, days) {
    days.sort();
    let { workouts } = this.state;
    let workoutFound = workouts.some((workout) => {
        if(workout.id === id) workout.day = days.toString();
        return workout.id === id;
    });
    if(!workoutFound) {
      let workout = {};
      workout.id = id;
      workout.day = days.toString();
      workouts.push(workout);
      this.setState({workouts: workouts});
    } else {
      this.setState({workouts: workouts});
    }
    console.log('workouts: ',  workouts);
  }

  setupEditCourse(course, index) {
    this.setState({
      mode: 'update',
      currentCourse: course,
      currentIndex: index,
      title: course.title,
      description: course.description,
      startDate: course.start_date,
      endDate: course.end_date,
      selectedWorkout: course.workouts
    });
  }

  updateCourse(e) {
    e.preventDefault();
    let { currentIndex, currentCourse } = this.state;
    currentCourse.title = this.state.title;
    currentCourse.description= this.state.description;
    currentCourse.workouts = this.state.selectedWorkout.map(id => ({id: id, day: '2'}));
    this.props.editCourse(currentCourse, currentIndex);
    this.resetFields();
  }

  resetFields() {
    this.setState({
      mode: 'create',
      title: '', titleError: '',
      description: '', descriptionError: '',
      startDate: {}, endDate: {},
      selectedWorkout: [],
      workouts: [],
      currentCourse: {},
      currentIndex: -1
    });
  }

  validationSuccess() {
    let { title, description } = this.state;
    if (title === '') {
      this.setState({titleError: 'Please enter Title'});
      return false;
    }
    if(description === '') {
      this.setState({descriptionError: 'Please enter Description'});
      return false;
    }
    return true;
  }

  /*Create Plan Starts*/
	selectWorkoutChanged = (newWorkout) => {
		this.setState({selectedWorkout: newWorkout});
	}

	createCourse = (e) => {
		e.preventDefault();
		let { workouts, description, startDate, endDate, title, selectedWorkout } = this.state;
		if(this.validationSuccess() && this.state.selectedWorkout.length !== 0) {
			axios.post(APIs.CreatePlan,{
		      "description": description,
		      "id": localStorage.getItem("id"),
		      "title": title,
          "start_date": startDate,
          "end_date": endDate,
          "duration": 4,
		      "list": workouts/*list:[{id: 14, day: 1}, {id: 21, day: 2}]*/
		    })
		    .then((response)=>{
          console.log('create course response: ', response);
          sweetalert('New course created.', 'success');
          this.resetFields();
		    	this.props.callAllPlans();
		    });
		}
	}
	/*Create Plan Ends*/

  render() {
    const { currentPageUpdatePlan, 
            offsetUpdatePlan, 
            searchTextUpdatePlan,
            currentPageCreatePlan,
            offsetCreatePlan,
            searchTextCreatePlan, 
            selectedWorkout
          } = this.state;

    /*plan update pagination*/
    let planCopy = searchTextUpdatePlan.length ?
      this.props.AllPlans.filter(plan =>
        plan.title.toLowerCase()
        .startsWith(searchTextUpdatePlan.toLowerCase())) :
      [...this.props.AllPlans];

/*plan update pagination*/
    let workoutCopy = searchTextCreatePlan.length ?
      this.props.AllWorkouts.filter(workout =>
        workout.title.toLowerCase()
        .startsWith(searchTextCreatePlan.toLowerCase())) :
      [...this.props.AllWorkouts];

    return (
      <div  className="col-md-12 col-lg-12 col-xs-12 createCourse create-plan">
        {
          this.props.AllWorkouts.length ?
          <div>
            <div  className="col-md-5 col-lg-5 col-xs-12 createCourse create-plan">
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
                  <a data-target='#plansViewModal' data-toggle='modal'
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
                    onChange={(e)=>this.setState({title: e.target.value, titleError: ''})}
                  />
                  <span style={{color:'red'}}>{this.state.titleError}</span>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input type="text" placeholder="Description" name="Description"
                    value={this.state.description} className="form-control"
                    onChange={(e)=>this.setState({description: e.target.value, descriptionError: ''})} />
                  <span style={{color:'red'}}>{this.state.descriptionError}</span>
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" name="Start Date"
                    value={this.state.startDate} className="form-control"
                    onChange={(e) => {
                      this.setState({startDate: e.target.value})
                      console.log('startDate: ', e.target.value);
                    }} />
                  <span style={{color:'red'}}>{this.state.startDateError}</span>
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" name="End Date"
                    value={this.state.endDate} className="form-control"
                    onChange={(e) => {
                      this.setState({endDate: e.target.value})
                      console.log('endDate: ', e.target.value);
                    }} />
                  <span style={{color:'red'}}>{this.state.endDateError}</span>
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
              <div className="naivga1a">
                <form>
                  <input type="text" className="searchTxt_pop_align" placeholder="name" value={searchTextCreatePlan}
                    onChange={(e)=>this.setState({searchTextCreatePlan: e.target.value})} />
                  <a className="glyphicon glyphicon-remove-circle"
                    onClick={(e)=> {
                      e.preventDefault();
                      this.setState({searchTextCreatePlan: ''});
                    }}>
                     
                  </a>
                </form>
              </div>
            </div>
            <ul className="wrkoutulli_1">
              <CheckboxGroup
                  name="workouts"
                  value={this.state.selectedWorkout}
                  onChange={this.selectWorkoutChanged}
                  >
                  {workoutCopy.splice(currentPageCreatePlan*offsetCreatePlan, offsetCreatePlan).map((workout, i)  =>
                    <li key={i}>
                      <Checkbox value={workout.id} className="inputchk4wrkout" />
                      <ShowWorkout style={{
                          display: 'block',
                          backgroundColor: 'teal'
                        }}
                        workout={workout} 
                        setWorkoutDays={this.setWorkoutDays.bind(this)} />
                    </li>
                  )}
              </CheckboxGroup>
            </ul>
            <div className="naivga1">
              <ReactPaginate
               previousLabel={'previous'}
               nextLabel={'next'}
               breakLabel={<a>...</a>}
               breakClassName={'break-me'}
               pageCount={(workoutCopy.length/offsetCreatePlan)+1}
               pageRangeDisplayed={5}
               onPageChange={(page)=>this.setState({currentPageCreatePlan: page.selected})}
               containerClassName={'pagination'}
               subContainerClassName={'pages pagination'}
               activeClassName={'active'} />
            </div>
            <div id="plansViewModal" className="modal fade" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">All Courses</h4>
                    <div>
                      <div className="naivga1">
                        <ReactPaginate
                         previousLabel={'previous'}
                         nextLabel={'next'}
                         breakLabel={<a>...</a>}
                         breakClassName={'break-me'}
                         pageCount={planCopy.length/offsetUpdatePlan}
                         pageRangeDisplayed={5}
                         onPageChange={(page)=>this.setState({currentPageUpdatePlan: page.selected})}
                         containerClassName={'pagination'}
                         subContainerClassName={'pages pagination'}
                         activeClassName={'active'} />
                      </div>
                      <div className="naivga1a">
                        <form>
                          <input type="text" className="searchTxt_pop_align" placeholder="name" value={searchTextUpdatePlan}
                            onChange={(e)=>this.setState({searchTextUpdatePlan: e.target.value})} />
                          <a className="glyphicon glyphicon-remove-circle"
                            onClick={(e)=> {
                              e.preventDefault();
                              this.setState({searchTextUpdatePlan: ''});
                            }}>
                             
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <PlanList AllPlans={this.props.AllPlans}
                      setupEditCourse={this.setupEditCourse.bind(this)}
                      deleteCourse={this.props.deleteCourse.bind(this)}
                      currentPageUpdatePlan={currentPageUpdatePlan}
                      offsetUpdatePlan={offsetUpdatePlan} 
                      searchTextUpdatePlan={searchTextUpdatePlan}
                      planCopy={planCopy}
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
