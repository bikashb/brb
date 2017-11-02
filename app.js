var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var knex = require('./dbservice');

var config = require('./config');
var api = require('./amsapi');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'app')));


var init = function () {
  async.waterfall([
    function (cb) {
      api.getAccessToken(cb);
    },
    function (cb) {
      api.getRedirectURL(cb);
    },
    function (cb) {
      api.getMediaProcessors(cb);
    }
  ], function (err) {
    console.log(err);
  });
}
init();
setInterval(function () {
  init();
}, 21599*1000);


app.post('/upload', function (req, res) {
  var filename = req.body.filename || "a.mp";
  var title = req.body.title || "title";
  var description = req.body.description || "description";
  console.log("filename===",filename);
  async.waterfall([
    function (cb) {
      api.createAsset({"Name": filename}, cb);
    },
    function (assetId, cb) {
      api.createAssetFile({
        "IsEncrypted":"false",
        "IsPrimary":"false",
        "MimeType":"video/mp4",
        "Name":filename,
        "ParentAssetId":assetId,
      }, assetId, cb);
    },
    function (assetId, cb) {
      api.createPolicy({
        "Name": "UploadPolicy",
        "DurationInMinutes" : "100",
        "Permissions" : 2
      }, assetId, cb);
    },
    function (assetId, policyId, cb) {
      api.createLocator(assetId, policyId, 1, cb);
    },
  ], function (err, assetId, policyId, locatorId, sasURL) {
     res.json({'rawAssetId': assetId, 'sasURL': sasURL});

    return knex('asset').insert({'rawassetid':assetId,'filename':filename,'title':'','description':''}).then(function(values){
      {
        console.log(values);
      }
    })

  });
});

var mes = [
  'H264 Multiple Bitrate 1080p Audio 5.1',
  'H264 Multiple Bitrate 1080p',
  'H264 Multiple Bitrate 16x9 for iOS',
  'H264 Multiple Bitrate 16x9 SD Audio 5.1',
  'H264 Multiple Bitrate 16x9 SD',
  'H264 Multiple Bitrate 4K Audio 5.1',
  'H264 Multiple Bitrate 4K',
  'H264 Multiple Bitrate 4x3 for iOS',
  'H264 Multiple Bitrate 4x3 SD Audio 5.1',
  'H264 Multiple Bitrate 4x3 SD',
  'H264 Multiple Bitrate 720p Audio 5.1',
  'H264 Multiple Bitrate 720p',
  'H264 Single Bitrate 1080p Audio 5.1',
  'H264 Single Bitrate 1080p',
  'H264 Single Bitrate 4K Audio 5.1',
  'H264 Single Bitrate 4K',
  'H264 Single Bitrate 4x3 SD Audio 5.1',
  'H264 Single Bitrate 4x3 SD',
  'H264 Single Bitrate 16x9 SD Audio 5.1',
  'H264 Single Bitrate 16x9 SD',
  'H264 Single Bitrate 720p Audio 5.1',
  'H264 Single Bitrate 720p for Android',
  'H264 Single Bitrate 720p',
  'H264 Single Bitrate High Quality SD',
  'H264 Single Bitrate Low Quality SD',
];

app.post('/encode', function (req, res) {
  var assetId = req.body.id;
  var size = req.body.size;
  async.waterfall([
    function (cb) {
      api.updateAssetFile(
          api.pendingRequests[assetId]['assetFileId'],
          {"ContentFileSize":size.toString()}, cb);
    },
    function (cb) {
      api.deleteLocator(api.pendingRequests[assetId]['locatorId'], cb);
    },
    function (cb) {
      api.deletePolicy(api.pendingRequests[assetId]['policyId'], cb);
    },
    function (cb) {
      api.createJob(assetId, mes[24], cb);
    },
  ], function (err, jobId) {
    res.json({'encodeJobId': jobId});
    //return video.update({'rawAssetId': assetId}, {'encodeJobId': jobId});
    knex('asset').where({'rawassetid':assetId}).update({'encodejobid':jobId,'encodestatus':1}).then(function(values)
   {
     console.log(values);
   })
  });
});

/* encodeStatus
{
 0: 'Queued',
 1: 'Scheduled',
 2: 'Processing',
 3: 'Finished',
 4: 'Error',
 5: 'Canceled',
 6: 'Canceling',
 };*/

setInterval(function () {

  console.log("=====checking encode status======");
  knex('asset').where({'encodestatus':1}).select(['encodejobid','rawassetid']).then(function(jobs)
{
  jobs.forEach(function(obj) {
      console.log("===obj===",obj);
    api.getEncodeStatus(obj.encodejobid, function (err, encodeStatus) {
      if(encodeStatus == 3){

        console.log("===encoded===");
        async.waterfall([
          function (cb) {
            api.getOutputAsset(obj.encodejobid, cb);
          },
          function (assetId, cb) {
            api.createPolicy({
              "Name": "DownloadPolicy",
              "DurationInMinutes" : "43200",
              "Permissions" : 1
            }, assetId, cb);
          },
          function (assetId, policyId, cb) {
            api.createLocator(assetId, policyId, 2, cb);
          },
        ], function (err, assetId, policyId, locatorId, streamingURL) {
            if(err){
              console.log("===error===",err);
              return err;
            }
            else {
          console.log("======streamingURL======",streamingURL);
          console.log("======assetId",assetId);
           return knex('asset').where({'rawassetid':obj.rawassetid}).update({'assetid':assetId,'encodejobid':obj.encodejobid,'streamingurl':streamingURL,'encodestatus':3}).then(function(values){
           console.log(values);
           })
         }
        });
      }
    });
  });
})
}, 50*1000);

module.exports = app;
