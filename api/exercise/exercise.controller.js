const  knex =  require('../../services/dbservice.js');
var controller =  {};

controller.createExercise =  function(req,res){

    var exerciseData={};
    exerciseData.description=req.body.description;
    exerciseData.duration=req.body.duration;
    exerciseData.type=req.body.type;
    exerciseData.streaming_uri=req.body.uri;
    exerciseData.title=req.body.title;
    exerciseData.intensity=req.body.intensity;
    exerciseData.user_id=req.body.id;
    exerciseData.date_created=new Date();


     knex('exercise').insert(exerciseData).then(function(value){
         res.status(201).json({message:'success'});
       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       });
};

controller.editExercise =  function(req,res){

    var exerciseData={};
    exerciseData=req.body;
    exerciseData.utc_last_updated=new Date();


     knex('exercise').where('id','=',req.body.id).update(exerciseData).then(function(value){
         res.status(201).json({message:'success'});
       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       });
};

controller.getExerciseById=function(req,res){
  knex('exercise').where({"user_id":req.params.id}).select('*').then(function(data){
    console.log(data);
    res.status(201).send(data);

  })
  .catch(function(err){
    console.log(err);
    res.status(500).send('no data');
  })

}

controller.fetchExercisesByWorkout=function(req,res){
      var exerciseList=[];
      knex('workout_to_exercise').where({'workout_id':req.params.id}).select('exercise_id').then(function(list){
        if(list.length>0){

          var exercises=list.map((data)=>{

            return knex('exercise').where({"id":data.exercise_id}).select('*').then(function(single){
              if(single[0])
              exerciseList.push(single[0]);
            })
            .catch(function(err){
              console.log(err);
              res.status(500).send('unsuccessful');
            })

          })
          Promise.all(exercises).then(function(results){
            res.status(200).json({list:exerciseList})
          })
        }
        else {
          res.status(500).json({message:'no data'});
        }
      })
      .catch(function(err){
        console.log(err);
        res.status(500).send('unsuccessful');
      })
}



exports =  module.exports =  controller;
