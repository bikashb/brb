const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.fetchWorkoutsById=function(req,res){

   knex('workout').where({"instructor_id":req.params.id}).select('*').then(function(data){
     console.log(data);
     res.status(200).json({"workouts":data});
   })
   .catch(function(err){
     console.log(err);
     res.status(500).json({message:'unsuccessful'});
   })

}

controller.fetchWorkoutsByPlan=function(req,res){
  var workoutList=[];
  if(req.body.schedule.length>0){
    var workouts=req.body.schedule.map((data)=>{
          return knex('workout').where({"id":data}).select('*').then(function(workoutData){
            if(workoutData[0])
          workoutList.push(workoutData[0]);
        })
        .catch(function(err){
          console.log(err);
          res.status(500).json({message:'unsuccessful'});
        })
    });
    Promise.all(workouts).then(function(results) {
         res.status(200).json({"list":workoutList});
     });
  }
  else {
    res.status(500).json({message:'no data'});
  }

}

controller.createWorkout =  function(req,res){

    var workoutData={};
    workoutData.description=req.body.description;
    workoutData.duration=req.body.duration;
    workoutData.instructor_id=req.body.id;
    workoutData.title=req.body.title;
    workoutData.intesity=req.body.intensity;
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
    console.log(workoutData);
    workoutData.utc_last_updated=new Date();


     knex('workout').where('id','=',req.body.workout.id).update(workoutData).then(function(value){

        if(req.body.list.length>0&&value==1){
          var finalList=req.body.list.map((data)=>{
            var obj={};
            obj.workout_id=req.body.workout.id;
            obj.exercise_id=data;
            return obj;
          })
          knex('workout_to_exercise').where('workout_id','=',req.body.workout.id).del().then(function(value){
            console.log(value);
          })
          .catch(function(err){
            console.log(err);
            res.status(500).json({message:'unsuccessful'});
          });
          knex.batchInsert('workout_to_exercise',finalList,req.body.list.length).then(function(value){
             console.log(value);
             res.status(201).json({message:'success'});
            })
            .catch(function(err){
              console.log(err);
              res.status(500).json({message:'unsuccessful'});
            });
        }
        else {
          res.status(500).json({message:'Exercise List Empty'});
        }
       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       });
};

exports = module.exports = controller;
