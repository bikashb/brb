const  knex =  require('../../services/dbservice.js');

var controller = {};

controller.updatepassword=function(req,res){
  knex('user_detail').where('email','=',req.body.email).update({password:req.body.password}).then(function(val){
    console.log("Updated");
    res.status(200).json({message:"successfully updated"});
  })
  .catch(function(err){

    console.log(err);
  })
}

module.exports = controller;
