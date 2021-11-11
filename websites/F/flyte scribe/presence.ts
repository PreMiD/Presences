const presence = new Presence({
    clientId: "707632555612045413"
  }),
  startBrowse = Date.now();
let presenceData: PresenceData = {
  startTimestamp: startBrowse,
  largeImageKey: "logo"
};

presence.on("UpdateData", async () => {
  let blogCheck = false;

  if (document.location.pathname === "/")
    presenceData.details = "Viewing the homepage";
  else if (document.location.pathname === "/about/")
    presenceData.details = "Looking at the blog info";
  else if (document.location.pathname === "/flyte/")
    presenceData.details = "Getting to know edo/flyte";
  else {
    blogCheck = true;
    presence.setActivity(
      (presenceData = {
        details: "Looking at a Blog Post",
        state: document.querySelector("h1.post-title").innerHTML,
        startTimestamp: startBrowse,
        largeImageKey: "logo"
      })
    );
  }

  if (!blogCheck) presence.setActivity(presenceData);
});
