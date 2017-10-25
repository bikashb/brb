const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.createPlan =  function(req,res){
    var planData={};
    planData.description=req.body.description;
    planData.user_id=req.body.id;
    planData.avg_workout_duration=req.body.duration;
    planData.date_created=new Date();
    planData.schedule=req.body.workouts;
    planData.title=req.body.title;
    planData.state=0;

     knex('plan').insert(planData).then(function(value){
         res.status(201).json({message:'success'});
       })
       .catch(function(err){
         console.log(err);
         res.status(500).json({message:'unsuccessful'});
       });
};

controller.fetchPlansById=function (req,res){
  knex('plan').where({"user_id":req.params.id}).select('*').then(function(data){
    console.log(data);
    res.status(200).json({"plans":data});
  })
  .catch(function(err){
    console.log(err);
    res.status(500).json({message:'unsuccessful'});
  })
};

controller.assignStudents = function(req, res) {
    if(req.body.list.length>0) {
      knex.batchInsert('plan_to_user',req.body.list,req.body.list.length)
     .returning('id')
     .then(function(ids) {
       res.status(201).json({message: "Students Assigned to Plan"});
      })
     .catch(function(err) {
       console.log('error in assign students to plan: ', err);
       res.status(500).json({message: "failed"});
      });
    } else {
      res.status(500).json({message: "failed"});
    }
};

controller.deleteplan = function(req, res) {
  knex('course')
  .where({id: req.params.id})
  .del().then(function(value) {
    knex('course_to_workout')
    .where({course_id: req.params.id})
    .del().then(function(value) {
      knex('course_to_user')
      .where({course_id:req.params.id})
      .del().then(function(value) {
        res.json({message: 'success'});
      })
    })
  })
}

exports = module.exports = controller;
