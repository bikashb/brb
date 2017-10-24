const  knex =  require('../../services/dbservice.js');
var controller = {};

controller.confirmaccount = function(req,res){
  knex('user_detail').where({'email':req.params.user}).select('confirmed').then(function(values)
{
    if(values[0].confirmed!=1)
    {
      knex('user_detail')
      .where({'email':req.params.user})
      .update({
        confirmed: 1,
      }).then(function(values)
    {
          //res.json({message:"registered successfully"});
          res.status(200).json({message:"successfully registered"});
    })
      .catch(function(err)
      {
        console.log(err);
      })
    }
    else {
      res.json({message:"already registerd"});
    }
})

};



module.exports = controller;
