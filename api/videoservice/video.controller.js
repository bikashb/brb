var azure = require('azure-storage');
var fs = require('fs');
const  knex =  require('../../services/dbservice.js');
var multer = require('multer');
var controller={};


controller.uploadFile=function(req,res){

  var storage = multer.diskStorage({
          destination: function (req, file, callback) {
          callback(null, './storage');
         },
          filename: function (req, file, callback) {
          callback(null, file.originalname);
         }
      });

var upload = multer({ storage : storage}).single('myfile');


upload(req,res,function(err){

  if(err){
    console.log(err);
    res.status(500).json({"message":"Upload Failure"});
  }
 else {
    console.log(req.file.filename);
   //console.log(req.file)
   var readStream = fs.createReadStream('./storage/'+req.file.filename);
   var blobSvc = azure.createBlobService("mobilioblob","QrZ1H/f6U7WM5wyAX7q9B7D76iDamOXuWgxeGmwhyK8rwOe8YDbjtsRdEiN4X8iM9W4Nt9mXQnawWd2W197GkQ==");
   console.log("Connected");
   var container="resoltz-demo";
   blobSvc.createContainerIfNotExists(container,{publicAccessLevel:'blob'}, function(error, result, response){
       if(!error){

         readStream.pipe(blobSvc.createWriteStreamToBlockBlob(container, req.file.filename , function (error, result, response) {
               if(!error) {
                   // file uploaded
                   console.log("done");
                   var streamingUrl="https://mobilioblob.blob.core.windows.net/"+container+"/"+req.file.filename;
                   res.status(201).json({"url":streamingUrl});
               }
               else {
                 console.log(error);
                 res.status(500).json({"message":"Upload Failure"});
               }
           }));
       }
       else{
         console.log(error);
         res.status(500).json({"message":"Upload Failure"});
       }
   });
   }
});
}

controller.getAll=function(req,res){
  knex('exercise').where({"user_id":req.body.user}).select('*').then(function(data){
    console.log(data);
    res.status(201).send(data);

  })
  .catch(function(err){
    console.log(err);
    res.status(500).send('no data');
  })
/*
knex('workout').where({'instructor_id':req.body.user}).select('id').then(function(workout){
  console.log(workout);
  if(workout.length>0)
  {
    knex('workout_to_exercise').where({'workout_id':workout[0].id}).select('*').then(function(exercises){
      console.log(exercises);
      if(exercises.length>0)
      {
        var videos=[];
        var exerciseData=exercises.map((data)=>{

          return knex('exercise').where({"id":data.exercise_id}).select('*').then(function(values){
          console.log(values);
            videos.push(values[0]);
          })
          .catch(function(err){
            console.log(err);
            res.status(500).send('unsuccessful');
          });

        })
        Promise.all(exerciseData).then(function(results) {
            res.status(201).send(videos);
        });
      }
      else{
        res.status(500).send('no data');
      }

    })
    .catch(function(err){
      console.log(err);
    })
  }
  else {
      res.status(500).send('No data');
  }

})
.catch(function(err){
  console.log(err);
})
*/
}

module.exports=controller;
