const presence = new Presence({
  clientId: "758864138897850368"
});
//compile with npm install && npx tsc -w
let author: any, title: any;
var startTimeStamp = Math.round(Date.now());
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "flickr_logo",
      startTimestamp: startTimeStamp,
      smallImageKey: "flickr_logo",
      smallImageText: "Viewing Images or videos on Flickr",
  };
  if (document.location.hostname == "www.flickr.com") {
      if (document.location.pathname == "/" || document.location.pathname == "/new/") {
          presenceData.details = "Viewing home page";
      } else if (document.location.pathname.includes("/photos/")) {
          title = document.querySelector("title");
          title = title.innerText;
          title = title.split("|");
          author = title[1];
          title = title[0];
          presenceData.details = "Viewing" + title;
          presenceData.state = "From: " + author;
      } else if (document.location.pathname == "/about"){
        presenceData.details = "Viewing what Flickr is about";
      } else if (document.location.pathname == "/jobs"){
        presenceData.details = "Viewing job oppurtunities at flickr";
      } else if (document.location.pathname == "/services/developer"){
        presenceData.details = "Viewing the Flickr Developer Guide";
      } else if (document.location.pathname == "/help/guidelines"){
        presenceData.details = "Viewing the Flickr Guidelines";
      }
  }
  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  }else {
      presence.setActivity(presenceData);
  }
});
