const nodemailer = require('nodemailer');
const  knex =  require('../../services/dbservice.js');
const async = require('async');
const crypto = require('crypto');

var smtpTransport = require('nodemailer-smtp-transport');


var controller = {};

controller.validateemail=function(req,res)
{

  async.waterfall([
   function(done) {
     crypto.randomBytes(20, function(err, buf) {
       var token = buf.toString('hex');

       done(err, token);
     });
   },
   function(token, done) {
     var user ={};
          knex('user_detail').where({email:req.body.email}).select('*').then(function(values)
        {

            done(null,values[0].email,token);


            })


        .catch(function(err)
      {
        done(err);

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
        pass:"resoltz@123",
     }

   });
     var mailOptions = {
       to: user,
       from: 'resoltzdemo@gmail.com',
       subject: 'Confirmation Instructions',
       text: 'Thanks for signing up to Resoltz!.\n\n' +
         'To get started, click the link below to confirm your account.\n\n' +
         'http://' + req.headers.host + '/api/v1/confirmaccount/'+user+'\n\n'
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
