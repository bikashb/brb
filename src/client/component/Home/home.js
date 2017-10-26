import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

/* custom components */
import Sidebar from '../sidebar/sidebar.js';
import CourseAndWorkoutTab from '../courseAndWorkoutTab/courseAndWorkoutTab.js'
import ShowPlan from '../showPlan/showPlan.js';
import Dashboard from '../dashboard/dashboard.js';
import ShowStudentList from '../showStudentList/showStudentList.js';
import AssignedStudents from '../AssignedStudents/AssignedStudents';
import CreateALL from '../createAll/createAll.js';
import Footer from '../footer/footer.js';
import InstructorProfile from '../InstructorProfile/instructorprofile.js';
import APIs from '../template/constants.js';
import GroupMessage from '../GroupMessage/groupmessage.js';

class  Home extends Component {
  constructor() {
    super();
    this.state = {
      checkStateSelectExercise: false,
      instructor: [],
      asignTask: {inst: '', task: ''},
      instrTask: [],
      exercises: [],
      allStudents: [],
      selectedStudent: [],
      selectedStudentsVideo: [],
      courses: [],
      workouts: [],
      exerciseInPlans: [],
      showView: false,
      createWorkoutExercise: [],
      instructorDetails: {
        imagePath: 'images/profile_img.jpg',
        description: 'Your description goes here'
      }
    };
  }

  show = (e, value)=>{
    console.log(e, value)
    this.setState({showView: true});
      $(document).ready(function() {
        if($(value).offset()) {
          $('html, body').animate({
            scrollTop: $(value).offset().top},
          500);
        }
      });
  }

  updateInstructorDetails(instructor) {
    console.log('updating instructorDetails in home: ', instructor);
    this.setState({instructorDetails: instructor});
  }

  componentWillMount() {
    if(localStorage.getItem('username') === null)/*Check user*/ {
      this.props.history.push('/');
    }
    this.getStudentDetails();/*Get list of students*/
    this.getAllExercise();
    this.getAllPlans();
    this.getAllWorkouts();
  }

  getStudentDetails=()=>{
    axios.post(APIs.GetAllStudents)/*Get list of students*/
    .then((response)=>{
      this.setState({allStudents:response.data});
      console.log(this.state.allStudents);
    });
  }

  getAllExercise=()=>{
    axios.get(APIs.GetAllExercise+localStorage.getItem('id'))/*Get list of videos specific to instructor*/
    .then((response)=>{
      this.setState({exercises:response.data});
      console.log(this.state.exercises);
    });
  }

  getAllPlans=()=>{
     axios.get(APIs.GetAllPlans+localStorage.getItem('id'))/*Get All the plans specific to instructor*/
    .then((response)=>{
      this.setState({courses:response.data.plans});
    });
  }

  getAllWorkouts=()=>{
    axios.get(APIs.GetAllWorkout+localStorage.getItem('id'))/*Get All the plans specific to instructor*/
    .then((response)=>{
      this.setState({workouts: response.data.workouts});
    });
  }

  deleteItem(type, id, index) {
    console.log('inside delete item: ', type, id, index);
    switch(type) {
      case 'exercise':
        axios.delete(APIs.DeleteExercise + id)
        .then((response) => {
          console.log('delete exercise response: ', response);
          let { exercises } = this.state;
          exercises.splice(index, 1);
          this.setState({exercises: exercises});
        });
        break;
      case 'workout':
        axios.delete(APIs.DeleteWorkout + id)
        .then((response) => {
          console.log('delete workout response: ', response);
          let { workouts } = this.state;
          workouts.splice(index, 1);
          this.setState({workouts: workouts});
        });
        break;
      case 'course':
        axios.delete(APIs.DeleteCourse + id)
        .then((response) => {
          console.log('delete course response: ', response);
          let { courses } = this.state;
          courses.splice(index, 1);
          this.setState({courses: courses});
        });
        break;
      default:
        console.log('invalid deletion request');
        break;
    }
  }

  updateItem(type, item, index) {
    console.log('inside update item: ', type, item, index);
    switch(type) {
      case 'exercise':
        let exercise = item;
        axios.put(APIs.UpdateExercise, exercise)
        .then((response) => {
          console.log('update exercise response: ', response);
          let { exercises } = this.state;
          exercises.splice(index, 1, exercise);
          this.setState({exercises: exercises});
        });
        break;
      case 'workout':
        let workout = item;
        axios.put(APIs.UpdateWorkout, workout)
        .then((response) => {
          console.log('update workout response: ', response);
          let { workouts } = this.state;
          workouts.splice(index, 1, workout);
          this.setState({workouts: workouts});
        });
        break;
      case 'course':
        let course = item;
        let { courses } = this.state;
        courses.splice(index, 1, course);
        this.setState({courses: courses});
        break;
      default:
        console.log('invalid updation request');
        break;
    }
  }

  logout = ()=>/*Log out*/ {
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    this.props.history.push('/');
  }

  userUnderExercise = (exercise)=>/*Get Student Details Under particular Exercise*/
  {
    axios.get(APIs.GetStudentUnderExercise+exercise)
    .then((response)=>{
      console.log(response.data);
      this.setState({studentUnderExercise:response.data});
      console.log(this.state.studentUnderExercise);
    });
  }

  selectStudentChanged = (newStudent) =>{
    this.setState({selectedStudent:newStudent})
  }

  csvFile = (e) =>{
    console.log('csv uploading...');
    e.preventDefault();
    var fileSelect = document.getElementById('myCsvfile');
    console.log(fileSelect.files.length)
    if(fileSelect.files.length) {
      var files = fileSelect.files;
      var formData = new FormData();
      var file = files[0];
      formData.append('myCsvfile', file, file.name);
      console.log('File: ', file);
      axios.post(APIs.CSVUpload,formData)
      .then((response)=>{
        console.log(response.status);
        if (response.status === 201) {
          alert("file upload successful");
          this.getStudentDetails();
        }
        if (response.status === 500){
          alert('response error')
        }
      });
    } else {
      alert("select any .csv file")
    }
  }

  checkboxChangeVideo=(e,value)=>{
    console.log(e.target.value,value)
    var array=this.state.selectedStudentsVideo;
    var obj = {
    'user_id':JSON.parse(e.target.value).user,
    'exercise_id':value.id
    };
    array.push(obj);
    this.setState({selectedStudentsVideo:array})
    console.log(this.state.selectedStudentsVideo);
  }

  render() {
    return (
        <div>
           <header className="navbar clearfix cus_Hgt" id="header">
        <div className="container-fluid cus_Hgt">
            <div className="navbar-brand">
                <a href="index.html">
                  <img src="images/resoltz-bright-log-text.png" alt=":: ReoltZ ::" className="img-responsive" />
                </a>
                <div id="sidebar-collapse" className="sidebar-collapse btn">
                    <i className="fa fa-bars" data-icon1="fa fa-bars" data-icon2="fa fa-bars"></i>
                </div>
            </div>
            <ul className="nav navbar-nav usrTop pull-right ">
              <li className="dropdown user" id="header-user">
                <a className="dropdown-toggle" data-toggle="dropdown">
                  <span className="username">{localStorage.getItem("username")}  </span>
                  <i className="fa fa-angle-down"></i>
                </a>
                <ul className="dropdown-menu">
                  <li><a data-toggle="modal" data-target="#myProfileModal"><i className="fa fa-user"></i> My Profile</a></li>
                  <li><a href="/" onClick={this.logout}><i className="fa fa-power-off"></i> Log Out</a></li>
                </ul>
              </li>
            </ul>
        </div>
    </header>
    <section id="page" className="container-fluid">
        <Sidebar show={this.show}/>
        <div id="main-content">
           <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 dash_img"><img src="images/dash_pic.png" alt="ResoltZ" />
                  <div className="dash_img_txt">
                    <h1>Lorem ipsum dol</h1>
                    <h2>Lorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequa</h2>
                    <ul>
                      <li>pretium</li>
                      <li>arcu</li>
                      <li>massa</li>
                    </ul>
                  </div>
                </div>
            </div>
             <div className="row profilBlk" id="myProfile">
                <div className="col-md-3">
                    <div className="profil_align">
                        <div className="userTitle">
                            <h2>{localStorage.getItem("username")}</h2>
                            <h3>Instructor</h3>
                        </div>
                        <div className="list-group">
                            <img className="img-responsive"
                              alt="Profile Picture"
                              src={this.state.instructorDetails.imagePath} />
                            <div className="list-group-item profile-details">
                                <p><i className="fa fa-circle text-green"></i> Online</p>
                                <p>{this.state.instructorDetails.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" col-md-9">
                  <Dashboard show={this.show} AllPlans={this.state.courses}/>
                </div>
                {this.state.showView?
                    <div className="col-md-12" id="course-block">
                      <CourseAndWorkoutTab />
                            <div className="tab-content">
                                <div className="tab-pane studentsTab" id="b">
                                  <ShowStudentList AllStudents={this.state.allStudents} />
                                  <div className="csv_mas">
                                    <form className="csvClass">
                                      <label>Upload CSV File</label>
                                      <input id="myCsvfile" name="myCsvfile"
                                        encType="multipart/form-data"  type="file"/>
                                      <button className="btn btn-info" onClick={this.csvFile}>Upload CSV File</button>
                                    </form>
                                    <span>Lorem ipsum dolor sit amet, dignissim nibh, accumsan et vulputate consequat, a ultrices lectus. Pharetra odio, per mattis erat sed dolor, velit potenti, sit vestibulum orci volutpat sollicitudin curabitur nam, vivamus dolor.  </span>
                                  </div>
                                </div>
                                <div className="tab-pane viewAssignedTab" id="c">
                                  <AssignedStudents
                                    courses={this.state.courses}
                                    show={this.show}
                                  />
                                </div>
                                <div className="tab-pane plansTab" id="d">
                                  <ShowPlan
                                      AllPlans={this.state.courses}
                                      AllStudents={this.state.allStudents}
                                  />
                                </div>
                                <div className="tab-pane creationTab" id="e">
                                  <CreateALL
                                    AllExercises={this.state.exercises}
                                    AllWorkouts={this.state.workouts}
                                    AllPlans={this.state.courses}
                                    callAllExercises={this.getAllExercise}
                                    callAllWorkouts={this.getAllWorkouts}
                                    callAllPlans={this.getAllPlans}
                                    editItem={this.updateItem.bind(this)}
                                    deleteItem={this.deleteItem.bind(this)}
                                  />
                                </div>
                            </div>
                        </div>:null}
            </div>
        </div>
    </section>
    <Footer />
    <InstructorProfile updateInstructorDetails={this.updateInstructorDetails.bind(this)} />
    <GroupMessage />
    </div>
    );
  }
}

export default Home;
