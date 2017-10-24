const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.subscribe =  function(req, res) {
    if(req.body.list.length>0) {
      knex.batchInsert('exercise_to_user', req.body.list,req.body.list.length)
     .returning('id')
     .then(function(ids) {
       res.status(201).json({message: "Students Assigned Successfully"});
     })
     .catch(function(err) {
       console.log(err);
       res.status(500).json({message: "failed"});
     });
    } else {
       res.status(500).json({message: "failed"});
    }
};

exports = module.exports = controller;
