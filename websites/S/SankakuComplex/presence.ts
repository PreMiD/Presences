const presence = new Presence({
    clientId: "956989323910201384",
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement, search: HTMLElement;
presence.on("UpdateData", async () => {
  const urlParams = new URLSearchParams(window.location.search),
    presenceData: PresenceData = {
      largeImageKey: "lg-sk",
      startTimestamp: browsingTimestamp,
    };
  if (document.location.pathname.includes("chan.sankakucomplex.com")) {
    presenceData.details = "Viewing the homepage...";
  } else if (document.location.pathname.includes("/show")) {
    presenceData.details = "Viewing a Post...";
    presenceData.state = `Post ${
      document.location.pathname.split("/show/")[1]
    }`;
  } else if (urlParams.get("tags")) {
    presenceData.details = "Searching tags...";
    presenceData.state = urlParams.get("tags").replace(" ", ", ");
  }
  presence.setActivity(presenceData);
});
