var presence = new Presence({
  clientId: "607587875122446359",
  mediaKeys: false
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

var browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

  var profileName : any, profileNickname : any;

  var repositoryAuthor : any, repositoryName : any, repositoryLocation : any, repositoryLocation2 : any;


  profileName = document.querySelector('.vcard-names .p-name');
  profileNickname = document.querySelector('.vcard-names .p-nickname');

  repositoryAuthor = document.querySelector('.author a');
  repositoryName = document.querySelector('.public strong a');
  repositoryLocation = document.querySelectorAll('.breadcrumb.mb-2');
  repositoryLocation2 = document.querySelectorAll('#blob-path');

  if(profileName) {

    var profileTabs = "/" + profileNickname.innerText + "?tab=";
    var profileURL = new URL(document.location.href);
    var profileCurrentTab = profileURL.searchParams.get("tab");

  }

  var search = "/search?q=";
  var searchURL = new URL(document.location.href);
  var searchResult = searchURL.searchParams.get("q");


  let presenceData: presenceData = {
    details: "In construction",
    state: "-",
    largeImageKey: "lg"
  };


  if(document.location.pathname == "/" || !document.location.pathname) {


      presenceData.state = "Home";

      presenceData.startTimestamp = browsingStamp;

      delete presenceData.details;


  } else if(document.location.pathname.startsWith("/settings")) {


      presenceData.state = "Settings";

      delete presenceData.details;


  } else if(document.location.pathname.startsWith("/explore") || document.location.pathname.startsWith("/discover")) {


      presenceData.state = "Browsing repositories...";

      presenceData.startTimestamp = browsingStamp;

      delete presenceData.details;

      
  } else if(document.location.pathname.startsWith("/marketplace")) {


      presenceData.state = "Browsing marketplace...";

      presenceData.startTimestamp = browsingStamp;

      delete presenceData.details;


  } else if(document.location.pathname.startsWith("/pulls")) {


    presenceData.state = "Browsing pull requests...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname == "/notifications") {


    presenceData.state = "Browsing notifications...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/notifications/subscriptions")) {


    presenceData.state = "Browsing subscriptions...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/watching")) {


    presenceData.state = "Browsing interested repositories...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname == "/new") {


    presenceData.state = "Creating a new repository...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/new/import")) {


    presenceData.state = "Importing a repository...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/new/project")) {


    presenceData.state = "Creating a new project...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/organizations/new")) {


    presenceData.state = "Creating a new organization...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/topics")) {


    presenceData.state = "Browsing topics...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname == "/trending") {


    presenceData.state = "Browsing trending repositories...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/trending/developers")) {


    presenceData.state = "Browsing trending developers...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/collections")) {


    presenceData.state = "Browsing collections...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  } else if(document.location.pathname.startsWith("/events")) {


    presenceData.state = "Browsing events...";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;


  }
  
  
  
  else if(document.location.pathname.indexOf(search)) {

    presenceData.details = "Searching for: ";

    presenceData.state = searchResult;

    presenceData.startTimestamp = browsingStamp;


  }


  if(repositoryAuthor && repositoryName) {



    if(repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname == ("/" + repositoryAuthor.innerText + "/" + repositoryName.innerText)) {


        presenceData.details = "Browsing a repository...";

        presenceData.state = repositoryAuthor.innerText + " / "  + repositoryName.innerText;

        presenceData.startTimestamp = browsingStamp;


    } else if(repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/tree/") && repositoryLocation.length > 0) {


        var repLoc : any; 

        repositoryLocation.forEach(item => {

          repLoc = item.innerText;
    
        });

        presenceData.details = "Browsing " + repositoryAuthor.innerText + "/"  + repositoryName.innerText;

        presenceData.state = repLoc;

        presenceData.startTimestamp = browsingStamp;


    } else if(repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/blob/") && repositoryLocation2.length > 0) {


        var repLoc2 : any; 

        repositoryLocation2.forEach(item => {

          repLoc2 = item.innerText;
    
        });

        presenceData.details = "Looking at a file from " + repositoryAuthor.innerText + "/"  + repositoryName.innerText;

        presenceData.state = repLoc2;

        presenceData.startTimestamp = browsingStamp;


    } else if(repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/issues")) {


        presenceData.details = "Browsing issues from:";

        presenceData.state = repositoryAuthor.innerText + " / "  + repositoryName.innerText;

        presenceData.startTimestamp = browsingStamp;


    } else if(repositoryAuthor.innerText.length > 0 && repositoryName.innerText.length > 0 && document.location.pathname.includes("/pulls")) {


      presenceData.details = "Browsing pull requests from:";

      presenceData.state = repositoryAuthor.innerText + " / "  + repositoryName.innerText;

      presenceData.startTimestamp = browsingStamp;


    }
    
} else if(!repositoryAuthor && !repositoryName && document.location.pathname.includes("/issues")) {


    presenceData.details = "Browsing issues...";

    presenceData.startTimestamp = browsingStamp;


}

  if(profileName && profileNickname) {

    if(!document.location.pathname.indexOf(profileTabs)) {

      presenceData.details = "Browsing a profile...";

      presenceData.state = profileName.innerText + " | " + profileNickname.innerText;

      presenceData.startTimestamp = browsingStamp;

    } else if(document.location.pathname.indexOf(profileTabs)) {

        presenceData.details = "Browsing " + profileCurrentTab + " from:";

        presenceData.state = profileName.innerText + " | " + profileNickname.innerText;

        presenceData.startTimestamp = browsingStamp;   
        
        if(profileCurrentTab == null) {

          presenceData.details = "Browsing a profile...";

          presenceData.state = profileName.innerText + " | " + profileNickname.innerText;
    
          presenceData.startTimestamp = browsingStamp;

        }

    }

  }


  presence.setActivity(presenceData);

});


/**
* Get Timestamps
* @param {Number} videoTime Current video time seconds
* @param {Number} videoDuration Video duration seconds
*/
function getTimestamps(videoTime: number, videoDuration: number) {
var startTime = Date.now();
var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
return [Math.floor(startTime / 1000), endTime];
}