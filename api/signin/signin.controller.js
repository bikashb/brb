const  knex =  require('../../services/dbservice.js');

var controller = {};

//controller to  handel login request
controller.signin = function(req,res){
        console.log("request body==== ",req.body);

        knex('user_detail')
         .where({'user_name':req.body.username,'password':req.body.password}).select('*').then(function(values){
              console.log("====values====",values);
               if(values.length>0){

                      if(!req.session.user_name){
                           req.session.user_name = req.body.username;
                          // req.session.count =1;
                           user={};
                           user.user_name=values[0].user_name;
                           user.id=values[0].id;
                           user.user_type=values[0].user_type;
                            res.status(200).json({message:"success",user:values[0]});
                    }
                     else if(req.session.user_name){
                          // req.session.count = req.session.count+1;
                              res.status(200).json({message:"success", user:values[0]});
                   }

            }

          else {
                  res.status(401).json({message:"unauthorized"});
               }

         }).catch(function(err){
               console.log("=====something went wrong ====",err);
               res.status(500).json({message:"unauthorized"});
               console.log(err);
        });
};

// this controller handle request redirection from facebook

controller.fbCallback =   function(req,res){

        console.log("fb user ", req.user);
        res.redirect('/success.html');
};

controller.googleCallback =   function(req,res){

        console.log("google user ", req.user);
        res.redirect('/success.html');
};

// Error handler for facebook login

controller.errorHandler  = function(req,res){

     res.status(401).json({message:"unauthorized"});
}

exports = module.exports = controller;
