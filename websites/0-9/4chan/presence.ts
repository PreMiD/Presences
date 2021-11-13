const presence = new Presence({
    clientId: "706956748329713685"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let pathname: string,
  query1: HTMLElement | string | Element | boolean,
  query2: HTMLElement | string | Element | boolean,
  query3: HTMLElement | string | Element | boolean,
  query4: HTMLElement | string | Element | boolean,
  query5: HTMLElement | string | Element | boolean,
  query6: HTMLElement | string | Element | boolean,
  query7: HTMLElement | string | Element | boolean;
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
    ({ pathname } = window.location);
    query1 = document.querySelector("div.boardBanner>div.boardTitle");
    query2 = document.querySelector("div.boxbar>h2");
    query3 = document.querySelector("div.pagelist>div.pages");
    query4 = document.querySelector("div.pagelist>div.pages>strong");
    query5 = document.querySelector("table#postForm") as HTMLElement;
    query6 = document.querySelector("#togglePostFormLink");
    query7 = document.querySelector("div#quickReply") as HTMLElement;
    query1 = query1 ? query1.textContent : (false as boolean);
    query2 = query2 ? query2.textContent : (false as boolean);
    query3 = query3 ? query3.lastElementChild.textContent : false;
    query4 = query4 ? query4.textContent : false;
    query5 = query5 ? true : false;
    query6 = query6 ? query6.hasAttribute("style") : false;
    query7 = query7 ? true : false;
  }
  let title;
  const getTitle = function () {
      if (!query1) title = query2;
      else title = query1;
      if (query3) title += ` - ${query4}/${query3}`;
      return title as string;
    },
    presenceData: PresenceData = {
      details: getTitle(),
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
  presenceData.startTimestamp = browsingStamp;
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
