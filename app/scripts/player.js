

var myPlayer = amp('azuremediaplayer', { /* Options */
        logo: { "enabled": false },
        techOrder: ["azureHtml5JS", "flashSS", "html5FairPlayHLS","silverlightSS", "html5"],
        "nativeControlsForTouch": false,
        autoplay: false,
        controls: true,
        width: "640",
        height: "400",
        poster: ""
    }, function() {
        console.log('Good to go!');

        this.addEventListener('ended', function() {
            console.log('Finished!');
        });
    }
);
 myPlayer.pause();

//  src = streamingURL+filename+'.ism'+'/Manifest'
 myPlayer.src([{
    src:  "http://mediaservicecheck.streaming.mediaservices.windows.net/63b0d8c4-f4fd-4229-9e06-34fa574af1a2/45c8ec41-6243-6b9b-bb0e-c7e05a8775a9.ism/Manifest",
    type: "application/vnd.ms-sstr+xml"
}]);

myPlayer.ready(function(){
    var myPlayer = this;
    myPlayer.play();
});
