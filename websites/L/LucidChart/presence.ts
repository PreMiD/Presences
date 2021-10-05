const presence = new Presence({
  clientId: "650633388784615424"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: new Date().getTime()
    },
    path = document.location.pathname;

  if (path === "/pages" || path === "/pages/") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Home Page";
  } else if (path === "/pages/enterprise") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Enterprise plans";
  } else if (path.startsWith("/pages/solutions/")) {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Solutions";
  } else if (path === "/pages/results") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Impact of LucidChart";
  } else if (path === "/pages/integrations") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "LucidChart Integrations";
  } else if (path === "/pages/case-studies") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Viewing Case Studies";
  } else if (path === "/pages/resource-center") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Resource Center";
  } else if (path === "/blog" || path === "/blog/") {
    presenceData.details = "Browsing LucidChart Blogs";
    presenceData.state = "Viewing all blogs";
  } else if (path.startsWith("/blog/")) {
    const title = document
      .getElementsByClassName("main-article")[0]
      .getElementsByTagName("h1")[0].innerText;
    presenceData.details = "Reading a LucidChart Blog";
    presenceData.state = title;
  } else if (path === "/pages/tour") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Viewing examples";
  } else if (path.startsWith("/users/registerLevel")) {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Viewing plans";
  } else if (path === "/users/login") {
    presenceData.details = "Browsing LucidChart";
    presenceData.state = "Logging in...";
  } else if (path === "/documents") {
    presenceData.details = "Editing a document";
    presenceData.state = "Viewing documents";
  } else if (path.startsWith("/documents/edit/")) {
    const title = document.title.replace(": Lucidchart", "");
    presenceData.details = "Editing a document";
    presenceData.state = title;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
