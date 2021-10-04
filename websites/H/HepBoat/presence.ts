const presence = new Presence({
  clientId: "634299110782140416"
});
let pageTitle;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "hepboat"
  };

  if (document.location.pathname.startsWith("/guilds/")) {
    pageTitle = document.querySelector(".panel-heading").textContent;
    if (pageTitle.startsWith(" Guild Weekly Message Throughput"))
      pageTitle = "Guild Stats";
    else if (pageTitle.startsWith(" Guild Banner")) pageTitle = "Guild Info";

    const guildName = document.querySelector(
      "#side-menu > li.active-guild.active > a > div"
    );

    data.details = pageTitle;
    if (guildName) data.state = guildName.getAttribute("data-original-title");

    data.startTimestamp = Date.now();

    presence.setActivity(data);
  } else {
    data.details = "Dashboard";
    data.startTimestamp = Date.now();

    presence.setActivity(data);
  }
});
