const presence = new Presence({
    clientId: "802379096122196050" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });

/*

function myOutsideHeavyLiftingFunction(){
    //Grab and process all your data here

    // element grabs //
    // api calls //
    // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/

presence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
    var upperText="";
    var lowerText="";
    if (document.getElementsByClassName("fas fa-stop")[0]!=undefined){
      upperText="Listening to a sequence";
      lowerText="Title: "+(<HTMLInputElement>document.getElementById("title")).value;
    } else if (document.location.pathname=="/"){
      upperText="Writing a new sequence";
      lowerText="Title: "+(<HTMLInputElement>document.getElementById("title")).value;
    } else if (document.location.pathname=="/sequences"){
      upperText="Browsing sequences";
      if (document.getElementsByTagName("input")[3].value!=""){
        lowerText="Searching: "+(<HTMLInputElement>document.getElementsByTagName("input")[3]).value;
      }
    } else if (document.location.pathname=="/memberlist"){
      upperText="Viewing members";
      if (document.getElementsByTagName("input")[2].value!=""){
        lowerText="Searching: "+(<HTMLInputElement>document.getElementsByTagName("input")[2]).value;
      }
    } else if (document.location.pathname.startsWith("/members/")){
      upperText="Viewing member:";
      lowerText=(<HTMLElement>document.getElementsByClassName('profile_header')[0]).innerText;
    } else if (document.location.pathname.startsWith("/import")){
      upperText="Importing MIDI file";
    } else if (document.location.pathname.startsWith("/forum/showthread")){
      upperText="Viewing Forum Thread:";
      var threadtitle = (<HTMLElement>document.getElementsByClassName("thead")[0]).innerText;
      if (threadtitle.includes("Thread Modes")){
        lowerText=threadtitle.substr(13);
      } else {
        lowerText=threadtitle;
      }
    } else if (document.location.pathname.startsWith("/forum/announcements")){
      upperText="Viewing Forum Announcement:";
      lowerText=(<HTMLElement>document.getElementsByClassName("thead")[0]).innerText;
    } else if (document.location.pathname.startsWith("/forum/forumdisplay")){
      upperText="Viewing Forum Category:";
      lowerText=(<HTMLElement>document.getElementsByClassName("pull-left navbar-header")[0]).innerText;
    } else if (document.location.pathname.startsWith("/forum/memberlist")){
      upperText="Viewing Forum Members";
    } else if (document.location.pathname.startsWith("/forum")){
      upperText="Viewing Forum";
    } else if (!isNaN(parseInt(document.location.pathname.substr(1)))){
      if (document.getElementsByClassName("active tooltipstered")[0]==undefined){
        upperText="Viewing a sequence";
      } else {
        upperText="Editing a sequence";
      }
      var str = (<HTMLElement>document.getElementsByClassName("text")[1]).innerHTML.trim();
      lowerText="Title: "+str.substring(0, str.indexOf('by <a'));
    }

    if (document.getElementById("chatbox")!=null){
      upperText="Viewing Chat"
    }
    
  const presenceData: PresenceData = {
    largeImageKey:"online_sequencer_icon",
    smallImageKey:"",
    smallImageText: "", //The text which is displayed when hovering over the small image
    details: upperText, //The upper section of the presence text
    state: lowerText, //The lower section of the presence text
    startTimestamp: Math.round((new Date()).getTime() / 1000), //The unix epoch timestamp for when to start counting from
    //endTimestamp: 0 //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});