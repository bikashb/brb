const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.getAll =  function(req,res){
    user={};
    user.user_type="S";
     knex('user_detail').where(user).select('*').then(function(values){
       console.log(values);
        var userWithAge=values.map((data)=>{
          var birthdate = new Date(data.dob);
          var cur = new Date();
          var diff = cur-birthdate; // This is the difference in milliseconds
          var age = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365
          data.age=age;
        })
         res.status(201).send(values);
       })
       .catch(function(err){
         console.log(err);
         res.status(500).send('unsuccessful');
       });
};

controller.getUserDetails=function(req,res){
  knex('user_detail')
  .where({'user_name':req.params.user_name}).select('*').then(function(values) {
      console.log("====values====", values);
      if(values.length>0) {
          if(!req.session.user_name){
            req.session.user_name = req.body.username;
            // req.session.count =1;
            res.status(200).json({message:"success",user_detail:values[0]});
          }  else {
            res.status(401).json({message:"unauthorized"});
          }
      } else {
        res.status(401).json({message:"unauthorized"});
      }
   }).catch(function(err) {
       console.log("=====something went wrong ====", err);
       res.status(500).json({message:"unauthorized"});
       console.log(err);
   });
};

controller.getByExercise =  function(req, res) {
    userList=[];
    exercise={};
    exercise.exercise_id=req.params.id;
    console.log(req.params.id);
    knex('exercise_to_user').where(exercise).select('*').then(function(list){
      console.log(list);
      var userData=list.map((data)=>{
        user={};
        user.id=data.user_id;
         return knex('user_detail').where(user).select('*').then(function(user){
          console.log(user);
          if(user[0])
          userList.push(user[0]);
          })
          .catch(function(err){
            console.log(err);
          });
      })
      Promise.all(userData).then(function(results) {
          res.send(userList);
      });
    })
    .catch(function(err){
      console.log(err);
      res.status(500).send('unsuccessful');
    });
};

controller.userdetailsbyId=function(req, res) {
  knex('user_detail').where({user_name:req.params.id}).select('*').then(function(value) {
   res.status(200).json({data : value[0]});
  }).catch(function(err){
   res.status(204).json({message:"no content"});
  });
}

controller.updateprofile=function(req, res) {
  var details = {
      description: req.body.description,
      course_count : req.body.course_count,
      visible_to_student : req.body.visible_to_student,
      visible_to_instructor : req.body.visible_to_instructor,
      profile_img_url : req.body.image_url,

  }
  knex('user_detail').where({id:req.body.id}).update(details).then(function(val) {
    res.status(200).json({message:"successfully updated"});
  }).catch(function(err) {
    console.log(err);
    res.status(204).json({message:"no content"});
  });
}

controller.getByCourse = function(req, res) {
  let query = "select * from user_detail, course_to_user where course_to_user.course_id = " +
    req.params.id + " and user_detail.id = course_to_user.user_id";
  knex.raw(query).then(function(data) {
    res.status(200).json(data.rows);
  }).catch(function(err) {
    console.log("getByCourse Error: ", err);
    res.status(204).json({message: "error"});
  });
}

exports = module.exports = controller;
