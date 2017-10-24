
const readline = require('readline');
const fs = require('fs');

module.exports =  function(filename,req,res,cb)  {
  var rows =  [];
  var FirstRow = {};
  var lr       =  readline.createInterface({
                    input: fs.createReadStream('./storage/'+filename)
                   });
                  var i=0;

                  lr.on('line',function (line,cb) {
                    var row =  {};
                    var L  = line.split(',');

                   if(i==0)   {

                     FirstRow.key_1   = L[0];
                     FirstRow.key_2   = L[1];
                     FirstRow.key_3   = L[2] ;
                     FirstRow.key_4   = L[3];
                     FirstRow.key_5   = L[4];
                     FirstRow.key_6   = L[5];
                     FirstRow.key_7   = L[6];
                     FirstRow.key_8   = L[7];
                     FirstRow.key_9   = L[8];
                     FirstRow.key_10  = L[9];
                     FirstRow.key_11  = L[10];
                     FirstRow.key_12  = L[11];
                       i++;
                    }
                    else {

                      L  = line.split(',');
                      row.user_name = L[0];
                      row.authentication_provider_id = L[1];
                      row.password =        L[2];
                      row.first_name=       L[3];
                      row.last_name=        L[4];
                      row.short_name =      L[5];
                      row.email =           L[6];
                      row.status=           L[7];
                      row.cel_phone =       L[8];
                      row.age             = L[9];
                      row.current_weight =  L[10];
                      row.user_type   =     L[11];
                      rows.push(row);
                    //  console.log(rows);
                      }
                });
                 lr.on('error', function (err) {
                    console.log(err);
                    lr.close();
                 });

                 lr.on('close', function () {
                  console.log("End");
                  console.log(rows);
                   cb(req,res,rows);
              });

};
