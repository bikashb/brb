const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.createCourse =  function(req,res){
    var courseData={};
    courseData.description=req.body.description;
    courseData.user_id=req.body.id;
    courseData.avg_workout_duration=req.body.duration;
    courseData.date_created=new Date();
    courseData.start_date=req.body.start;
    courseData.end_date=req.body.end;
    courseData.title=req.body.title;
    courseData.state=0;

     knex('course').insert(courseData).returning('id').then(function(value){

    if(req.body.list.length>0&&value.length>0){
      var finalList=req.body.list.map((data)=>{
        var obj={};
        obj.course_id=value[0];
        obj.workout_id=data.id;
        obj.workout_day=data.day;
        return obj;
      })
         knex.batchInsert('course_to_workout',finalList,req.body.list.length).then(function(values){
           res.status(201).json({message:'success'});
         })
         .catch(function(err){
           console.log(err);
           res.status(500).json({message:'unsuccessful'});
         });
      }
      else {
        res.status(500).json({message:'Empty List'});
      }
       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       });
};

controller.editCourse= function(req,res){
  var courseData={};
  courseData=req.body.course;
  courseData.utc_last_updated= new Date();

  knex('course').where("id",'=',req.body.course.id).update(courseData).then(function(value){

    if(req.body.list.length>0&&value==1){
      var finalList=req.body.list.map((data)=>{
        var obj={};
        obj.course_id=req.body.course.id;
        obj.workout_id=data.id;
        obj.workout_day=data.day;
        return obj;
      })
      knex('course_to_workout').where('course_id','=',req.body.course.id).del().then(function(value){

        knex.batchInsert('course_to_workout',finalList,req.body.list.length).then(function(value){
           console.log(value);
           res.status(201).json({message:'success'});
          })
          .catch(function(err){
            console.log(err);
            res.status(500).json({message:'unsuccessful'});
          });
      })
      .catch(function(err){
        console.log(err);
        res.status(500).json({message:'unsuccessful'});
      });
    } else {
      res.status(500).json({message:'workout List Empty'});
    }
  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({message:'unsuccessful'});
  });
}

controller.fetchCoursesById=function (req,res){

  var course=[];

  knex('course').where({"user_id":req.params.id}).select('*').then(function(data){
      var courseList=data.map(single=>{
      return knex('course_to_workout').where({"course_id":single.id}).select('*').then(function(lists){

          var filteredWorkouts=[];
          lists.map((e)=>{
              if(filteredWorkouts.indexOf(e.workout_id)==-1){
                filteredWorkouts.push(e.workout_id);
              }
          })
          single.workouts=[];
          var work=filteredWorkouts.map(workout=>{
            return knex('workout').where({"id":workout}).select('id','title','description').then(function(id){
              if(id[0])
              single.workouts.push(id[0]);
            })
            .catch(function(err){
              console.log(err);
              res.status(500).json({message:'unsuccessful'});
            })
          })
          return Promise.all(work).then(results=>{
            course.push(single);
          })

    })
    .catch(function(err){
      console.log(err);
      res.status(500).json({message:'unsuccessful'});
      })
    })
    Promise.all(courseList).then(function(result){
      res.send({"courses":course});
    })
  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({message:'unsuccessful'});
  })
};


controller.assign = function(req, res) {
    if(req.body.list.length>0) {
      knex.batchInsert('course_to_user',req.body.list,req.body.list.length)
     .returning('id')
     .then(function(ids) {
       res.status(201).json({message: "Students Assigned to Course"});
      })
     .catch(function(err) {
       console.log('error in assign students to Course: ', err);
       res.status(500).json({message: "failed"});
      });
    } else {
      res.status(500).json({message: "failed"});
    }
};


controller.fetchExercisesByCourse=function (req,res){
  var workouts=[];
  var exercises=[];
  var course=[];
  knex('course_to_workout').where({"course_id":req.params.id}).select('workout_id').then(function(lists){
          if(lists.length>0){
            var x=[];
            var data=[];
            lists.map((e)=>{
                if(x.indexOf(e.workout_id)==-1){
                  x.push(e.workout_id);
                  data.push(e);
                }
            })
            console.log(x);
            var workoutList=data.map((workoutId)=>{

                return knex('workout').where({'id':workoutId.workout_id}).select('*').then(function(workout){
                   if(workout[0])
                    workouts.push(workout[0]);
                })
                .catch(function(err){
                  console.log(err);
                  res.status(500).json({message:'unsuccessful'});
                })

            })

            var exerciseList=data.map((workoutId)=>{
              var unit=[];
                return knex('workout_to_exercise').where({'workout_id':workoutId.workout_id}).select('exercise_id').then(function(exercise){
                      var finalList=[];
                      if(exercise.length>0){

                         finalList=exercise.map((exerciseid)=>{

                            return knex('exercise').where({'id':exerciseid.exercise_id}).select('*').then(function(single){
                              if(single[0])
                              unit.push(single[0]);
                            })
                            .catch(function(err){
                              console.log(err);
                              res.status(500).json({message:'unsuccessful'});
                            })

                        })

                      }

                     return Promise.all(finalList).then(function(res){

                        var obj={};
                        obj[workoutId.workout_id]=unit;
                        console.log("+++++",obj);
                        exercises.push(obj);

                      })

                })
                .catch(function(err){
                  console.log(err);
                  res.status(500).json({message:'unsuccessful'});
                })

            })

          }
          else{
            res.status(500).json({message:'No Plan'});
          }

          Promise.all(workoutList).then(function(result){
              course.push({'workouts':workouts});
              if(workouts.length<=0){
                res.status(500).json({message:'No Workouts'});
              }
              Promise.all(exerciseList).then(function(result){
              course.push(exercises);
              res.status(200).send(course);
          })
          })


  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({message:'unsuccessful'});
  })
}


exports = module.exports = controller;
