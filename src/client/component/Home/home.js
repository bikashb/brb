import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import validator from 'validator';
import axios from 'axios';
import ReactScrollbar from 'react-scrollbar-js';
import $ from 'jquery';
/* custom components */
import Sidebar from '../sidebar/sidebar.js';
import CourseAndWorkoutTab from '../courseAndWorkoutTab/courseAndWorkoutTab.js'
import ShowPlan from '../showPlan/showPlan.js';
import Dashboard from '../dashboard/dashboard.js';
import ShowStudentList from '../showStudentList/showStudentList.js';
import ShowAssignedStudent from '../showAssignedStudent/showAssignedStudent';
import CreateALL from '../createAll/createAll.js';
import Footer from '../footer/footer.js';
import InstructorProfile from '../InstructorProfile/instructorprofile.js';
import APIs from '../template/constants.js';
import GroupMessage from '../GroupMessage/groupmessage.js';

class  Home extends Component {
  constructor() {
    super();
    this.state = {
      checkStateSelectExercise:false,
      instructor :[],
      asignTask: {inst:'', task:''},
      instrTask:[],
      allVideos: [],
      allStudents:[],
      selectedStudent:[],
      selectedStudentsVideo:[],
      SelectedStudentsUnderExercise:[],
      listOfplans: [],
      listOfWorkouts:[],
      exerciseInPlans:[],
      showView:false,
      createWorkoutExercise:[],
      instructorDetails: {
        imagePath: 'images/profile_img.jpg',
        description: 'Your description goes here'
      }
    };
  }

  show=(e, value)=>{
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

  componentWillMount = () =>{
    console.log(APIs)
    if(localStorage.getItem('username')=== null)/*Check user*/
    {
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
      this.setState({allVideos:response.data});
      console.log(this.state.allVideos);
    });
  }

  getAllPlans=()=>{
     axios.get(APIs.GetAllPlans+localStorage.getItem('id'))/*Get All the plans specific to instructor*/
    .then((response)=>{
      this.setState({listOfplans:response.data.plans});
    });
  }

  getAllWorkouts=()=>{
    axios.get(APIs.GetAllWorkout+localStorage.getItem('id'))/*Get All the plans specific to instructor*/
    .then((response)=>{
      this.setState({listOfWorkouts: response.data.workouts});
    });
  }

  deleteExercise(exerciseID, index) {
    axios.delete(APIs.DeleteExercise + exerciseID)
    .then((response) => {
      console.log('delete exercise response: ', response);
      let { allVideos } = this.state;
      allVideos.splice(index, 1);
      this.setState({
        allVideos: allVideos
      });
    });
  }

  editExercise(exercise, index) {
    let { allVideos } = this.state;
    allVideos.splice(index, 1, exercise);
    this.setState({
      allVideos: allVideos
    });
  }

  deleteWorkout(workoutID, index) {
    axios.delete(APIs.DeleteWorkout + workoutID)
    .then((response) => {
      console.log('delete workout response: ', response);
      let { listOfWorkouts } = this.state;
      listOfWorkouts.splice(index, 1);
      this.setState({
        listOfWorkouts: listOfWorkouts
      });
    });
  }

  editWorkout(workout, index) {
    let { listOfWorkouts } = this.state;
    listOfWorkouts.splice(index, 1, workout);
    this.setState({
      listOfWorkouts: listOfWorkouts
    });
  }

  deleteCourse(courseID, index) {
    axios.delete(APIs.DeleteCourse + courseID)
    .then((response) => {
      console.log('delete course response: ', response);
      let { listOfplans } = this.state;
      listOfplans.splice(index, 1);
      this.setState({
        listOfplans: listOfplans
      });
    });
  }

  editCourse(course, index) {
    let { listOfplans } = this.state;
    listOfplans.splice(index, 1, course);
    this.setState({
      listOfplans: listOfplans
    });
  }

  logout = ()=>/*Log out*/
  {
    localStorage.removeItem("username")
    localStorage.removeItem("id")
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

  selectStudentUnderExerciseChanged = (newData) =>{
    console.log(newData)
    this.setState({SelectedStudentsUnderExercise:newData})
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
        if (response.status == 201) {
          alert("file upload successful");
          this.getStudentDetails();
        }
        if (response.status == 500){
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

  AssignStudents(){
    let array = this.state.SelectedStudentsUnderExercise.toString().replace(/,/g , "").trim().split(" ");
    if(array.length>1) {
      let temp = [];
      for(let i=0; i<array.length; i+=2)
        temp.push({'user_id': array[i], exercise_id: array[i+1]});
      axios.post(APIs.AssignExerciseToStudent, {list:temp})
      .then((response) => {
          console.log(response)
          if(response.status == 201) {
              alert(response.data.message);
              this.setState({SelectedStudentsUnderExercise:[],selectedStudent:[]})
          }
      });
    } else {
        alert('Select Some students');
    }
  }

  render() {
    const myScrollbar = {
      height: 500
    };
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
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
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

                            <img alt="" className="img-responsive" src={this.state.instructorDetails.imagePath} alt="JenniF"   />

                            <div className="list-group-item profile-details">
                                <p><i className="fa fa-circle text-green"></i> Online</p>
                                <p>{this.state.instructorDetails.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" col-md-9">
                  <Dashboard show={this.show} AllPlans={this.state.listOfplans}/>
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
                                  <ShowAssignedStudent
                                    AllExercise={this.state.allVideos}
                                    show={this.show}
                                  />
                                </div>
                                <div className="tab-pane plansTab" id="d">
                                  <ShowPlan
                                      AllPlans={this.state.listOfplans}
                                      AllStudents={this.state.allStudents}
                                  />
                                </div>
                                <div className="tab-pane creationTab" id="e">
                                  <CreateALL
                                    AllExercises={this.state.allVideos}
                                    AllWorkouts={this.state.listOfWorkouts}
                                    AllPlans={this.state.listOfplans}
                                    callAllExercises={this.getAllExercise}
                                    callAllWorkouts={this.getAllWorkouts}
                                    callAllPlans={this.getAllPlans}
                                    deleteExercise={this.deleteExercise.bind(this)}
                                    editExercise={this.editExercise.bind(this)}
                                    deleteWorkout={this.deleteWorkout.bind(this)}
                                    editWorkout={this.editWorkout.bind(this)}
                                    deleteCourse={this.deleteCourse.bind(this)}
                                    editCourse={this.editCourse.bind(this)}
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
