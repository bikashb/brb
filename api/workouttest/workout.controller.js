const  knex =  require('../../services/dbservice.js');
var controller = {};


controller.createworkout =  function(req,res) {

   var workout = {};
   workout.duration = req.body.duration;
   workout.intensity = req.body.intensity;
  


};
