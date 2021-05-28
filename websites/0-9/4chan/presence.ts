const presence = new Presence({
    clientId: "706956748329713685"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  getTitle = (
    q1: string | boolean,
    q2: string | boolean,
    q3: string | boolean,
    q4: string | boolean
  ): string => {
    let title: string;
    if (!q1) title = q2 as string;
    else title = q1 as string;
    if (q3) title += ` - ${q4}/${q3}`;
    return title;
  };
let pathname: string,
  query1: string | boolean,
  query2: string | boolean,
  query3: string | boolean,
  query4: string | boolean,
  query6: string | boolean,
  query7: string | boolean;
presence.on(
  "iFrameData",
  (data: {
    pathnameA: string;
    queryA: string | boolean;
    queryB: string | boolean;
    queryC: string | boolean;
    queryD: string | boolean;
    queryF: string | boolean;
    queryG: string | boolean;
  }) => {
    pathname = data.pathnameA;
    query1 = data.queryA;
    query2 = data.queryB;
    query3 = data.queryC;
    query4 = data.queryD;
    query6 = data.queryF;
    query7 = data.queryG;
  }
);
presence.on("UpdateData", () => {
  if (!location.pathname.startsWith("/frames")) {
    ({ pathname } = window.location);
    query1 = document.querySelector("div.boardBanner>div.boardTitle")
      ? document.querySelector("div.boardBanner>div.boardTitle").textContent
      : false;
    query2 = document.querySelector("div.boxbar>h2")
      ? document.querySelector("div.boxbar>h2").textContent
      : false;
    query3 = document.querySelector("div.pagelist>div.pages")
      ? document.querySelector("div.pagelist>div.pages").lastElementChild
          .textContent
      : false;
    query4 = document.querySelector("div.pagelist>div.pages>strong")
      ? document.querySelector("div.pagelist>div.pages>strong").textContent
      : false;
    query6 = document.querySelector("#togglePostFormLink")
      ? document.querySelector("#togglePostFormLink").hasAttribute("style")
      : false;
    query7 = document.querySelector("div#quickReply") ? true : false;
  }
  const presenceData: PresenceData = {
    details: getTitle(query1, query2, query3, query4),
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (pathname === "/") presenceData.details = "Home";
  else if (pathname && pathname.includes("/thread/")) {
    const ThreadId = pathname.split("/");
    presenceData.state = `Thread ${
      ThreadId[Number(ThreadId.indexOf("thread") + 1)]
    }`;
  }
  if (query6 || query7) {
    presenceData.smallImageKey = "writing";
    presenceData.smallImageText = "Replying/Posting";
  }
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
