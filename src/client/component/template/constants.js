// const url = '';
const url = 'http://localhost:3002';

module.exports = {
	Signup: url + '/api/v1/signup',
	Signin: url + '/api/v1/signin',
	ForgotPassword: url + '/api/v1/forgetpassword',
	CSVUpload: url + '/api/v1/fileupload/uploadandregister',
	ValidateEmail: url + '/api/v1/validateemail',
	UpdateProfile: url + '/api/v1/userdetails/updateprofile',
	UpdatePassword: url + '/api/v1/updatepassword',
	GetProfile: url + '/api/v1/userdetails/profiledetails/',
	GetAllStudents: url + '/api/v1/userdetails',
	GetAllExercise: url + '/api/v1/exercise/',
	GetAllPlans: url + '/api/v1/course/',
	GetAllWorkout: url + '/api/v1/workout/',
	GetAllDetailsOfPlan: url + '/api/v1/course/exercise/',
	GetStudentUnderExercise: url + '/api/v1/userdetails/exercise/',
	AssignStudentsToCourse: url + '/api/v1/course/assign',
	UploadVideo: url + '/api/v1/video/upload',
	CreateExercise: url + '/api/v1/exercise/create',
	CreateWorkout: url + '/api/v1/workout/create',
	CreatePlan: url + '/api/v1/course/create',
	GetExercisesUnderWorkout: url + '/api/v1/exercise/workout/',
	GetWorkoutsUnderPlan: url + '/api/v1/workout/course',
	GetStudentsUnderCourse: url + '/api/v1/userdetails/course/',
	DeleteExercise: url + '/api/v1/exercise/delete/',
	DeleteWorkout: url + '/api/v1/workout/delete/',
	DeleteCourse: url + '/api/v1/course/delete/',
	UpdateExercise: url + '/api/v1/exercise/update',
	UpdateWorkout: url + '/api/v1/workout/update',
	UpdateCourse: url + '/api/v1/course/update'
}
