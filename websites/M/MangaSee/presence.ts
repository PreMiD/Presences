const presence = new Presence({
  clientId: "836662139926216724"
}),
  browsingStamp = Math.floor(Date.now() / 1000);

  presence.on("UpdateData", async () => {
  const entries = await presence.getSetting("entries"),
        buttons = await presence.getSetting("buttons"),
        v2icons = await presence.getSetting("v2icons"),
        data: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
    pathname = document.location.pathname;
    if (pathname === "/"){
      data.details = "Viewing the Homepage";
    }
    else if(pathname == "/search/" && window.location.search.substr(0,1) == "?"){
      const urlParams = new URLSearchParams(document.location.search),
      search = urlParams.get('name');
      data.details = "Searching: ";
      data.state = search;
      data.smallImageKey = v2icons ? "search" : "search-v2";
    }
    else if(pathname == "/directory/" || pathname == "/search/")
        data.details = "Browsing all manga";
    else if(pathname == "/discussion/")
        data.details = "Viewing discussion page";
    else if(pathname.endsWith("post.php")){
      const title = document.querySelector(".BoxBody > h1").textContent,
            author = document.querySelector(".Description > span").textContent,
            link = window.location.href;
      data.details = "Discussion: " + title;
      data.state = "by " + author;
      data.buttons = [{label: "View discussion", url: link}];
    }
    else if(pathname.endsWith("/subscription.php")){
      data.details = "Viewing subscriptions";
      if(entries){
        const number = document.querySelector(".BoxHeader > span").textContent.replace("(", "").replace(")","");
        data.state = number + " entries";
      }
    }
    else if(pathname.endsWith("/bookmark.php")){
      data.details = "Viewing bookmark";
      if(entries){
        const number = document.querySelector(".BoxHeader > span").textContent.replace("(", "").replace(")","");
        data.state = number + " entries";
      }
    }
    else if(pathname.endsWith("/settings.php")){
      data.details = "Viewing settings";
    }
    else if(pathname.startsWith("/manga/")){
      const title = document.querySelector(".list-group-item > h1").textContent;
      data.details = "Viewing manga:";
      data.state = title;
      data.smallImageKey = v2icons ? "view" : "view-v2";
      if(buttons){
        const link = window.location.href;
        data.buttons = [{label: "View manga", url: link}];
      }
    }
    else if(pathname.startsWith("/read-online/")){
      const title = document.querySelector(".col-lg-4 > a").textContent.replace(new RegExp("\\\t","g"),'').replace(new RegExp("\\\n","g"),''),
            chapter = document.querySelector('button[data-target="#ChapterModal"]').textContent.replace(new RegExp("\\\t","g"),'').replace(new RegExp("\\\n","g"),''),
            page = document.querySelector('button[data-target="#PageModal"]').textContent.replace(new RegExp("\\\t","g"),'').replace(new RegExp("\\\n","g"),'');
      data.details = title;
      data.state = "📖 Ch. " + chapter.split(" ")[1] + " 📄 " + page.split(" ")[1];
      data.smallImageKey = v2icons ? "read" : "read-v2";
      if(buttons){
        const link = window.location.href;
        data.buttons = [{label: "View manga", url: link}];
      }
    }
    presence.setActivity(data);
  });
