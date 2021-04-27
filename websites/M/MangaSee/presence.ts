const presence = new Presence({
  clientId: "836662139926216724"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
    pathname = document.location.pathname;
    if (pathname === "/"){
      data.details = "Viewing the Homepage";
    }
    else if(pathname == "/directory/")
        data.details = "Browsing all manga";
    else if(pathname == "/search/" && window.location.search.substr(0,5) == "?sort"){
        const query = document.location.search,
              urlParams = new URLSearchParams(query),
              search = urlParams.get('name');
        data.details = "Searching: ";
        data.state = search;
        data.smallImageKey = "search";
    }
    else if(pathname == "/discussion/")
        data.details = "Viewing discussion";
    
    presence.setActivity(data);
  });