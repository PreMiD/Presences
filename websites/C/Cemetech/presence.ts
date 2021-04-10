const presence = new Presence({
  clientId: "829371771702345759" 
}), browsingStamp = Math.floor(Date.now() / 1000);
let title: any; // not sure what to do here, but let and any works for now...

presence.on("UpdateData", async () => {
  
  const presenceData: PresenceData = {
    largeImageKey:
      "icon"
  }; 

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
    presenceData.state = "";
  } else if (document.location.pathname == "/projects/tisaxclient.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Chatting in SAX";
    presenceData.state = "";
  } else if (document.location.pathname == "/forum/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Forum Index";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/forum/viewtopic")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Topic:";
    title = document.querySelector(
      "#page_content_parent > div.mainheadmiddle.roundedtop > a"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/forum/viewforum")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Forum:";
    title = document.querySelector(
      "#page_content_parent > div.mainheadmiddle.roundedtop > a"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname == "/sc/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Using SourceCoder3";
    title = document.querySelector(
      "#prog_name"
    );
    presenceData.state = "Editing: " + title.value;
  } else if (document.location.pathname == "/projects/jstified/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Using jsTIfied";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/search.php")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching for:";
    title = document.querySelector(
      "#navsearchform > input.navsearchinput"
    );
    presenceData.state = title.value;
  } else if (document.location.pathname == "/downloads/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Archive Index";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/downloads/browse")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Archives";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/downloads/files")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing File:";
    title = document.querySelector(
      "#page_content_parent > div > div.mainheadmiddle.roundedtop > span"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/downloads/users")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing User Archive of:";
    presenceData.state = document.location.pathname.substring("/downloads/users/".length);
  } else if (document.location.pathname.includes("/forum/profile")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Profile:";
    title = document.querySelector(
      "#page_content_parent > div.mainbody > div > div.profile_cols > div.profile_brief > span:nth-child(2)"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname == "/forum/memberlist.php") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Member List";
    presenceData.state = "";
  } else if (document.location.pathname == "/resources/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Resources";
    presenceData.state = "";
  } else if (document.location.pathname == "/play/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing!";
    presenceData.state = "";
  } else if (document.location.pathname == "/play/mcmap/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing MC Dynmap";
    presenceData.state = "";
  } else if (document.location.pathname == "/about/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing About Page";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/forum/privmsg")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Messages";
    presenceData.state = "";
  } else if (document.location.pathname == "/tools/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Tools";
    presenceData.state = "how did i get here?";
  } else if (document.location.pathname.includes("/tools/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Tools";
    title = document.querySelector(
      "#page_content_parent > div.mainheadmiddle.roundedtop"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/forum/viewonline")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Who's Online";
    presenceData.state = "";
  } else if (document.location.pathname == "/news/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing News Index";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/news/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing News";
    title = document.querySelector(
      "#page_content_parent > div.mainheadmiddle"
    );
    presenceData.state = title.innerText;
  } else if (document.location.pathname.includes("/forum/posting")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Posting";
    title = document.querySelector(
      "#page_content_parent > form > div.mainbody > div > table > tbody > tr:nth-child(2) > td.row2 > span > input"
    );
    presenceData.state = title.value;
  } else if (document.location.pathname.includes("/forum/faq")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading FAQ";
    presenceData.state = "";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});