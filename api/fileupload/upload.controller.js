var multer = require('multer');
var controller = {};
var fileParser = require('./fileparser');
const  knex =  require('../../services/dbservice.js');
var  batchInsert =  function(req,res,rows){
            if(rows.length>0) {
                        knex.batchInsert('user_detail',rows,rows.length)
                       .returning('id')
                       .then(function(ids) {
                       res.status(201).json({message:"registration done successfully"});
                  })
                  .catch(function(err) {
                    console.log(err);
                    res.status(502).json({message:"failed"});
                  });
            }
            else {
              res.status(501).json({message:" insufficient failed"});
            }

}

var storage	=	multer.diskStorage({
                destination: function (req, file, callback) {
                callback(null, './storage');
               },
                filename: function (req, file, callback) {
	              callback(null, file.originalname);
               }
            });

var upload = multer({ storage : storage}).single('myCsvfile');


// controller.uploadFile =   function(req,res) {
//
//      upload(req,res,function(err){
//         if(err){
//           console.log(err);
//           res.end("erroe while uploading file");
//         }
//        else {
//           console.log(req.file)
//           res.end("uploded");
//          }
//      });
// };

controller.registerFromfile =  function(req,res){
  upload(req,res,function(err){

     if(err){
             console.log(err);
             console.log("Test");
             res.status(505).json({message:"erroe while uploading file"});
         }

     else {
      //console.log(req.file);

            fileParser(req.file.filename,req,res,batchInsert);


      }
  });

};



  exports = module.exports = controller;
