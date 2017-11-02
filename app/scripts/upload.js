
$("#upload").click(function(e){
  e.preventDefault();
 var file = document.getElementById('fileinput').files[0];

 console.log("=====filesize====",file.size);
  // console.log("=====upload-===");
        var video  = {};
        video.filename = guid() + '.' + file.name.split('.').pop();
        video.title   = "xyz";
        video.description="abc";
        $.ajax({url: "/upload",method:'post',data:video,dataType: "json",success: function(response){
          console.log("sasURL",response);
          uploadfile(response,file,video);
        }});
    });

    var guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

var uploadfile = function(response,file,video){
  var rawAssetId = response.rawAssetId;
  var sasURL = response.sasURL;
  var path1 = sasURL.split('?')
  console.log(path1);
  var sasKey = path1[1];
  var path2 = path1[0].split('/');
  var blobStorageUri = 'https://' + path2[2];

  console.log("blob storge uri",blobStorageUri);

  var containerName = path2[3];
  console.log("containerName",containerName);
  var blobService = AzureStorage.createBlobServiceWithSas(blobStorageUri, sasKey).withFilter(new AzureStorage.ExponentialRetryPolicyFilter());
  if (!blobService)
       {
       console.log("======blob service error=====");
       }
  var customBlockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
  //var fileStream = new FileStream(file);
  blobService.singleBlobPutThresholdInBytes = customBlockSize;
  var finishedOrError = false;

  var speedSummary = blobService.createBlockBlobFromBrowserFile(containerName,video.filename, file, {blockSize : customBlockSize}, function(error, result, response) {
      finishedOrError = true;
      if (error) {
          console.log("====finished on Error=====",error);
      } else {
          // Upload successfully
          console.log("=====encode ==== request");
    $.ajax({url: "/encode",type:'post',data:{id:rawAssetId,size:file.size},dataType: "json",success: function(response){
            console.log("jobid",response);
          }});
      }
  });

  refreshProgress();

  function refreshProgress() {
      setTimeout(function() {
          if (!finishedOrError) {
              var process = speedSummary.getCompletePercent();
              console.log("=====process===",process);
              refreshProgress();
          }
      }, 200);
  }

 }
