const presence = new Presence({
    clientId: "707632555612045413"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing the homepage";
  else if (document.location.pathname === "/about/")
    presenceData.details = "Looking at the blog info";
  else if (document.location.pathname === "/flyte/")
    presenceData.details = "Getting to know edo/flyte";
  else {
    presenceData.details = "Looking at a blog post";
    presenceData.state = document.querySelector("h1.post-title").textContent;
  }

  presence.setActivity(presenceData);
});
