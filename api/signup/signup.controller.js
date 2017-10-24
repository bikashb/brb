const  knex =  require('../../services/dbservice.js');
var controller = {};


controller.signup =  function(req,res){

  var user={};
    user.user_name=req.body.username;
    user.email=req.body.email;
    user.first_name=req.body.name;
    user.password=req.body.password;
    user.user_type=req.body.type.toUpperCase();

     knex('user_detail').insert(user).then(function(value){
         res.status(200).json({message:'success'});
       })
       .catch(function(err){
         console.log("====signup error ",err);
         res.status(500).send('unsuccessful/Email already Registered');
       });
};

exports = module.exports = controller;
