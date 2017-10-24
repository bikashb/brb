const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.fetchPlansById=function (req,res){
  var workouts=[];
  var exercises=[];
  var plan=[];
  knex('plan').where({"id":req.params.id}).select('*').then(function(data){
          console.log(data);
          if(data.length>0){
            var workoutList=data[0].schedule.map((workoutId)=>{

                return knex('workout').where({'id':workoutId}).select('*').then(function(workout){
                   if(workout[0])
                    workouts.push(workout[0]);
                })
                .catch(function(err){
                  console.log(err);
                  res.status(500).json({message:'unsuccessful'});
                })

            })

            var exerciseList=data[0].schedule.map((workoutId)=>{
              var unit=[];
                return knex('workout_to_exercise').where({'workout_id':workoutId}).select('exercise_id').then(function(exercise){
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

                      // else{
                      //   var obj={};
                      //   obj[workoutId]=[];
                      //   console.log("======",obj);
                      //   exercises.push(obj);
                      // }

                     return Promise.all(finalList).then(function(res){

                        var obj={};
                        obj[workoutId]=unit;
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
              plan.push({'workouts':workouts});
              if(workouts.length<=0){
                res.status(500).json({message:'No Workouts'});
              }
              Promise.all(exerciseList).then(function(result){
              plan.push(exercises);
              res.status(200).send(plan);
          })
          })
          

  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({message:'unsuccessful'});
  })
}




exports = module.exports = controller;
