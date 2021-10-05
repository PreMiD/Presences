const presence = new Presence({
    clientId: "656152542429839380"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname === "altdentifier.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Viewing a servers";
      if (document.location.pathname.includes("/dashboard/")) {
        presenceData.details = "Managing the settings of";
        const server = document
          .querySelector("#body > h1")
          .textContent.replace("Managing ", "");
        presenceData.state = `server: ${server}`;
      }
    } else if (document.location.pathname.includes("/blog")) {
      presenceData.details = "Reading a blog";
      presenceData.smallImageKey = "reading";
      if (document.location.pathname.includes("/blog/")) {
        presenceData.details = "Reading a blog article:";
        const title = document
          .querySelector("body > h1")
          .textContent.toUpperCase();
        presenceData.state = title;
        presenceData.smallImageKey = "reading";
      }
    } else if (document.location.pathname.includes("/faq")) {
      presenceData.details = "Reading a FAQ";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/commands")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Commands";
    } else if (document.location.pathname.includes("/status")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Status";
    } else if (document.location.pathname.includes("/about")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "About";
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Premium";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
