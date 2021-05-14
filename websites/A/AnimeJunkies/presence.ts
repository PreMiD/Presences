const presence = new Presence({clientId: "842745567930089482"});

var last_path = ""
var time_stamp: number = Date.now();

presence.on("UpdateData", async () => {
    var presence_data = {details: "", state: "", smallImageKey: "", smallImageText: ""};
    if(last_path != window.location.pathname) {

      last_path = window.location.pathname;
      time_stamp = Date.now();

    }
    if(window.location.pathname == "/") {

      presence_data.details = "Erkundet Startseite"

    }else if(window.location.pathname.startsWith("/community/")) {

      var path_name = window.location.pathname;
      if(path_name == "/community/") {
        presence_data.details = "Erkundet alle Foren";
      }else if(path_name.startsWith("/community/forum/")) {
        let titles = document.getElementsByClassName("main-title-forum");
        if(titles.length != 0) {
          var title = titles[0].textContent;
          presence_data.details = "Erkundet Forum"
          presence_data.state = "» " + title;
        }
      }

    }else {

      var x = document.getElementsByClassName("entry-title");
      
      if(x.length != 0 && document.getElementsByClassName("author-box-header").length != 0) {
        
        let b = x[0];
        presence_data.details = "Schaut einen Beitrag an";
        presence_data.state = b.textContent;

      }else {

        presence_data.details = "";
        presence_data.state = "";

      }

    }

    const presenceData: PresenceData = {
      largeImageKey: "logo", 
      smallImageKey:
      presence_data.smallImageKey, 
      smallImageText:  presence_data.smallImageText, 
      details: presence_data.details, 
      state: presence_data.state, 
      startTimestamp: time_stamp
    }
  
    if (presenceData.details == null) {
      //This will fire if you do not set presence details
      presence.setTrayTitle(); //Clears the tray title for mac users
      presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
    } else {
      //This will fire if you set presence details
      presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
    }
});