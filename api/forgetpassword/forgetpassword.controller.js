const nodemailer = require('nodemailer');
const  knex =  require('../../services/dbservice.js');
const async = require('async');
const crypto = require('crypto');

var smtpTransport = require('nodemailer-smtp-transport');


var controller = {};



controller.resetpasswordEmail=function(req,res){
  knex('user_detail').where({'passwordresettoken':req.params.token}).select('*').then(function(values){
      console.log(values[0]);
      console.log(Date.now());
    if(values[0].passwordresettokenexpires<Date.now()){
        res.status(400).json({message:"Link expired"});
  }
  else {
 
   res.redirect('/#/passwordreset')

  }
  })
  .catch(function(err)
  {
    console.log(err);
  })
};

// controller.updatepassword=function(req,res){
//   knex('Users').where('Email','=',req.body.email).update({Password:req.body.password}).then(function(val){
//     console.log("Updated");
//   })
//   .catch(function(err){
//     done(err);
//     console.log(err);
//   })
// }

controller.forgetpassword=function(req,res)
{

  async.waterfall([
   function(done) {
     crypto.randomBytes(20, function(err, buf) {
       var token = buf.toString('hex');
       console.log(token);
       done(err, token);
     });
   },
   function(token, done) {
     var user ={};
     console.log("haaha")
     console.log(req.body);
          knex('user_detail').where({email:req.body.email}).select('*').then(function(values)
        {
            console.log(req.body);
            console.log(values[0]);

              knex('user_detail').where('email','=',req.body.email).update({passwordresettoken:token,passwordresettokenexpires:Date.now()+3600000}).then(function(val)

            {

                done(null,values[0].email,token);
            })
              .catch(function(err)
              {
                done(err);
            console.log(err);
          })

            })

        .catch(function(err)
      {

        console.log(err);
      })
    },
   function( user, token,done) {
     
     var transport = nodemailer.createTransport({
    service: 'Gmail',
    tls :
    {
        rejectUnauthorized : false,
    },
    auth:{

        user:"resoltzdemo@gmail.com",
        pass:"resoltz@123"

        //api_key: "AIzaSyArIqYSASShl1dGwLXfhQ7fsovd8q3_87g"
     }
   });
     var mailOptions = {
       to: user,
       from: 'resoltzdemo@gmail.com',
       subject: 'resoltz Password Reset',
       text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
         'http://' + req.headers.host + '/api/v1/forgetpassword/reset/' + token + '\n\n' +
         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
     };
     transport.sendMail(mailOptions, function(err,success) {
       if(err){
         console.log(err);
       }
       else
       res.send('An e-mail has been sent to ' + user + ' with further instructions.');
       done(err, 'done');
     });
   }
 ], function(err) {
   if (err) console.log(err+" "+"hari");;
   //res.redirect('/forgot');
 });

}


module.exports = controller;
