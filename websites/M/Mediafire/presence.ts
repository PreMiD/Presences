const presence = new Presence({
    clientId: "811965557184135179"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let search: HTMLInputElement, title: Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    page = window.location.pathname,
    host = document.location.hostname;

  presenceData.startTimestamp = browsingStamp;
  if (host == "www.mediafire.com") {
    if (page == "/") {
      presenceData.details = "Viewing the homepage";
    }
    if (page.includes("/file/")) {
      title = document.querySelector("div.dl-btn-label");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
    if (page == "/software/mobile/" || page == "/software/mobile") {
      presenceData.details = "Viewing:";
      presenceData.state = "Mediafire Mobile Apps";
    }
    if (page == "/about" || page == "/about/") {
      title = document.querySelector("#titlebar > div > h1");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    } else if (page.includes("/about/contact_us")) {
      title = document.querySelector("#content > h2");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    } else if (page.includes("/about/jobs")) {
      title = document.querySelector("#jobs_pics_section > div.opener > h2");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
    if (page == "/advertising" || page == "/advertising/") {
      title = document.querySelector("#content > h2");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    } else if (page.includes("/advertising/")) {
      title = document.querySelector("#content > h2");
      if (!title) {
        title = document.querySelector("#adInquiryWrap > h2");
        presenceData.details = "Viewing:";
        presenceData.state = title.textContent;
      } else {
        presenceData.details = "Viewing:";
        presenceData.state = title.textContent;
      }
    }
    if (page == "/press" || page == "/press/") {
      title = document.querySelector("#content > h2.h2.mb-4");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    } else if (page.includes("/press/inquiries")) {
      title = document.querySelector("#content > h2");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
    if (page.includes("/policies/")) {
      title = document.querySelector("#content > div > div > h1 > strong");
      if (!title) {
        title = document.querySelector("#content > h2");
        presenceData.details = "Viewing:";
        presenceData.state = title.textContent;
      } else {
        presenceData.details = "Viewing:";
        presenceData.state = title.textContent;
      }
    }
    if (page.includes("/policy_violation/")) {
      title = document.querySelector("#content > h2:nth-child(1)");
      if (!title) {
        title = document.querySelector("#content > div > h2");
        presenceData.details = "Viewing:";
        presenceData.state = title.textContent;
      } else {
        presenceData.details = "Viewing:";
        presenceData.state = title.textContent;
      }
    }
    if (page.includes("/subscriptions")) {
      title = document.querySelector("#content > h2");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
    if (page.includes("/credits/")) {
      title = document.querySelector("#content > h2");
      presenceData.details = "Viewing:";
      presenceData.state = title.textContent;
    }
    if (page.includes("/help/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "Help";
    }
    if (page.includes("/login/")) {
      presenceData.details = "Logging in";
    }
    if (page.includes("/upgrade/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "Upgrade Plans";
    }
  }
  if (host == "app.mediafire.com") {
    if (page.includes("/myfiles")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Files";
    } else if (page.includes("/recent")) {
      presenceData.details = "Viewing:";
      presenceData.state = "My Recent Files";
    } else if (page.includes("/following")) {
      presenceData.details = "Viewing:";
      presenceData.state = "Files Shared With Me";
    } else if (page.includes("/trash")) {
      presenceData.details = "Viewing:";
      presenceData.state = "The Trashcan";
    } else {
      presenceData.details = "Viewing:";
      presenceData.state = "My Files";
    }
  }
  if (host == "mediafire.zendesk.com") {
    if (page.includes("/articles/")) {
      title = document.querySelector("body > main > article > header > h1");
      presenceData.details = "Viewing Help Article About:";
      presenceData.state = title.textContent;
    } else {
      search = document.querySelector("#query");
      if (search.value != "") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Helpdesk searching for:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "searching";
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Checking out the helpdesk";
      }
    }
  }
  if (host == "blog.mediafire.com") {
    if (page == "/") {
      title = document.querySelector("#fl-post-3434 > header > h2 > a");
      presenceData.details = "Viewing Blog Post About:";
      presenceData.state = title.textContent;
    } else {
      presenceData.details = "Viewing:";
      presenceData.state = "Oops- We don't know this location.";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
