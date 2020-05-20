const presence = new Presence({
  clientId: "706956748329713685"
});
const browsingStamp = Math.floor(Date.now() / 1000);
var pathname, query1, query2, query3, query4, query5, query6, query7;
presence.on("iFrameData", (data) => {
  pathname = data.pathnameA;
  query1 = data.queryA;
  query2 = data.queryB;
  query3 = data.queryC;
  query4 = data.queryD;
  query5 = data.queryE;
  query6 = data.queryF;
  query7 = data.queryG;
});
presence.on("UpdateData", () => {
  if (!location.pathname.startsWith("/frames")) {
    pathname = window.location.pathname;
    query1 = document.querySelector("div.boardBanner>div.boardTitle");
    query2 = document.querySelector("div.boxbar>h2");
    query3 = document.querySelector("div.pagelist>div.pages");
    query4 = document.querySelector("div.pagelist>div.pages>strong");
    query5 = document.querySelector("table#postForm");
    query6 = document.querySelector("#togglePostFormLink");
    query7 = document.querySelector("div#quickReply");
    query1 = query1 ? query1.textContent : false;
    query2 = query2 ? query2.textContent : false;
    query3 = query3 ? query3.lastElementChild.textContent : false;
    query4 = query4 ? query4.textContent : false;
    query5 = query5 ? true : false;
    query6 = query6 ? query6.hasAttribute("style") : false;
    query7 = query7 ? true : false;
  }
  let title;
  var getTitle = function (): string {
    if (!query1) title = query2;
    else title = query1;
    if (query3) title += ` - ${query4}/${query3}`;
    return title;
  };
  const presenceData: PresenceData = {
    details: getTitle(),
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (pathname == "/") presenceData.details = "Home";
  else if (pathname && pathname.includes("/thread/")) {
    var ThreadId = pathname.split("/");
    presenceData.state = `Thread ${
      ThreadId[Number(ThreadId.indexOf("thread") + 1)]
    }`;
  }
  if (query6 || query7) {
    presenceData.smallImageKey = "writing";
    presenceData.smallImageText = "Replying/Posting";
  }
  presenceData.startTimestamp = browsingStamp;
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
