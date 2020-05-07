var presence = new Presence({
    clientId: "707632555612045413"
  }),
  presenceData: presenceData = {
    largeImageKey: "logo"
  },
  customData = false;

presence.on("UpdateData", async () => {
  customData = false;

  if (document.location.pathname == "/") {
    presenceData.details = "Viewing the homepage";
  } else if (document.location.pathname == "/about/") {
    presenceData.details = "Learning about the blog";
  } else if (document.location.pathname == "/flyte/") {
    presenceData.details = "Getting to know edo/flyte";
  } else {
    var blogTitle = document.querySelector("h1.post-title");
    var blogData = presenceData = {
      details: "Looking at a Blog Post",
      state: blogTitle.innerHTML,
      largeImageKey: "logo"
    };
    presence.setActivity(blogData);
  }
  if (!customData) {
    presence.setActivity(presenceData);
  }
});
