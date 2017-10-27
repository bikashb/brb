const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.fetchWorkoutsById=function(req,res){

  //  knex('workout').where({"instructor_id":req.params.id}).select('*').then(function(data){
  //    console.log(data);
  //    res.status(200).json({"workouts":data});
  //  })
  //  .catch(function(err){
  //    console.log(err);
  //    res.status(500).json({message:'unsuccessful'});
  //  })

  var exercises = [];
   knex('workout').where({"instructor_id":req.params.id}).select('*').then(function(data){
    var allexercises=data.map(function(workout)
   {
     return knex('workout_to_exercise').where({"workout_id":workout.id}).select('exercise_id').then(
       function(exercise)
       {
         workout.exercises=[];

         var exer=exercise.map(exerciseId=>{

           return knex('exercise').where({"id":exerciseId.exercise_id}).select('id','title','streaming_uri','description').then(
             function(exercisedata)
             {
               if(exercisedata[0])
               workout.exercises.push(exercisedata[0]);

            })
            .catch(function(err){
              console.log(err);
              res.status(500).json({message:'unsuccessful'});
            })

         })
         return Promise.all(exer).then(results=>{
           exercises.push(workout);
         })

       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       })
   })
   Promise.all(allexercises).then(results=>{
     res.send(exercises);
   })
  })
   .catch(function(err){
     console.log(err);
     res.status(500).json({message:'unsuccessful'});
   })

}

controller.fetchWorkoutsByCourse=function(req,res){
  var workoutList=[];
    knex('course_to_workout').where({"course_id":req.params.id}).select('*').then(function(list){

      if(list.length>0){
        var data=[];
        list.map((e)=>{
            if(data.indexOf(e.workout_id)==-1){
              data.push(e.workout_id);
            }
        })
        var wList=data.map((workoutId)=>{
          return knex('workout').where({"id":workoutId}).select('*').then(function(workoutData){
              if(workoutData[0])
              workoutList.push(workoutData[0]);

          })
          .catch(function(err){
            console.log(err);
            res.status(500).json({message:'unsuccessful'});
          })
        })
        Promise.all(wList).then(function(result){
            res.status(200).send({'workouts':workoutList});
        })
      }
      else {
        res.status(500).json({message:'No Workouts'});
      }
    })
    .catch(function(err){
      console.log(err);
      res.status(500).json({message:'unsuccessful'});
    })
}

controller.createWorkout =  function(req,res){

    var workoutData={};
    workoutData.description=req.body.description;
    workoutData.duration=req.body.duration;
    workoutData.instructor_id=req.body.id;
    workoutData.title=req.body.title;
    workoutData.intensity=req.body.intensity;
    workoutData.date_created=new Date();


     knex('workout').insert(workoutData).returning('id').then(function(value){

        if(req.body.list.length>0&&value.length>0){
          var finalList=req.body.list.map((data)=>{
            var obj={};
            obj.workout_id=value[0];
            obj.exercise_id=data;
            return obj;
          })
          knex.batchInsert('workout_to_exercise',finalList,req.body.list.length).then(function(value){
             console.log(value);
             res.status(201).json({message:'success'});
            })
            .catch(function(err){
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

controller.editWorkout =  function(req,res){

    var workoutData={};
    workoutData=req.body.workout;
    delete workoutData.exercises;
    console.log(workoutData);
    workoutData.utc_last_updated=new Date();


     knex('workout').where('id','=',req.body.workout.id).update(workoutData).then(function(value) {
        if(req.body.list.length>0&&value==1){
          var finalList=req.body.list.map((data)=>{
            var obj={};
            obj.workout_id=req.body.workout.id;
            obj.exercise_id=data;
            return obj;
          })
          knex('workout_to_exercise').where('workout_id','=',req.body.workout.id).del().then(function(value){
            console.log(value);
            knex.batchInsert('workout_to_exercise',finalList,req.body.list.length).then(function(value){
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
          res.status(500).json({message:'Exercise List Empty'});
        }
       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       });
};

controller.deleteworkout = function(req, res) {
  knex('workout')
  .where({id:req.params.id})
  .del().then(function(value) {
    knex('workout_to_exercise')
    .where({workout_id: req.params.id})
    .del().then(function(value) {
      knex('course_to_workout')
      .where({workout_id: req.params.id})
      .del().then(function(value) {
        res.json({message: 'success'});
      })
    })
  })
}

exports = module.exports = controller;
