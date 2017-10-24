const knex =  require('./dbservice.js');

// knex.select('username', 'password').from('users')
//  .where('username','san@xyz.com').first().then(function(values){
//   console.log(values);
// }).catch(function(err){
//
//   console.log(err);
// });

knex('users').where({
  username: 'san@xyz.com',
  password:  '898268'
}).select('username').asCallback(function(err,values){

   console.log(values);
})
