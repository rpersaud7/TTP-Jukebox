//for use with api, use ajax to obtain information, load into a display (maybe a p tag)
//and format as needed. Take in a string, check against database and pull in things

var Player;//will be initialized, made so that the rest of the script can
//interact with it

//class for Jukebox
function Jukebox(){

  //function for playing songs, accepts the song name
  var audiothing = $('#audio');
  var song = "music/" + $("#link").val();
  audiothing[0].src= song;
  audiothing[0].type= "audio/mp3";

  this.playsong = function() {
    if(song !== ("music/" + $("#link").val())){
      song = $("#link").val();   //included music because separate folder in local directory
      //console.log(song);
      audiothing[0].src= song;
      audiothing[0].type= "audio/mp3";
    }
    //console.log(audiothing.src);
    audiothing[0].play();
    //console.log(audiothing[0]);

    document.getElementById("cbutton").className="pauseb";
    //console.log($("#cbutton"));
    document.getElementById("cbutton").innerHTML="Pause";
    //console.log($("#cbutton"));
  };

  //pauses
  this.pausesong = function() {
    audiothing[0].pause();
    document.getElementById("cbutton").className="playb";
    //console.log($("#cbutton"));
    document.getElementById("cbutton").innerHTML="Play";
    //console.log($("#cbutton"));
  };

  //resets the src to reset the current song and resets play/pause button
  this.stopsong = function() {
    audiothing[0].pause();
    audiothing[0].src = "";
    audiothing[0].src = song;
    document.getElementById("cbutton").className="playb";
    //console.log($("#cbutton"));
    document.getElementById("cbutton").innerHTML="Play";
    //console.log($("#cbutton"));
  };

  this.searchTracks = function () {
    //f5b9e626769d4f4bb79335b186bc445e
    var query = document.getElementById('ssearch').value;
    $.ajax({
      url: 'https://api.spotify.com/v1/search/f5b9e626769d4f4bb79335b186bc445e',
      data: {
        q: query,
        type: 'track'
      },
      success: function (response) {
        var json = $.parseJSON(response);
        var id = json.tracks.items[0].id;
        console.log(id);
        playTrack(id);
      }
    });
  };

  this.playTrack = function(trackid){
    $.ajax({
      url: 'https://api.spotify.com/v1/tracks/trackid/f5b9e626769d4f4bb79335b186bc445e',
      data: {
        type: 'track'
      },
      success: function (response) {
        var json1 = $.parseJSON(response);
        music = json1.tracks.items[0].preview_url;
        console.log(music);
        audiothing.src = music;
        audiothing.play();
      }
    });
  }
}

  function buttoncontrol(){
    if(document.getElementById('cbutton').className === "playb"){
      Player.playsong();
    }
    else{
      Player.pausesong();
    }
  }

  //when page is done loading, initializes the player, default song already loaded into textbox
  $(document).ready(function(){
    Player = new Jukebox();
  });

  function dropDownShow() {
    document.getElementById("dropdown").classList.toggle("show");
  }
