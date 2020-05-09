var presence = new Presence({
  clientId: "640234287525920834"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var user: any;
var title: any;
var search: any;

var typeURL = new URL(document.location.href);
var typeResult = typeURL.searchParams.get("type");

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "pix"
  };

  if (document.location.hostname == "www.pixiv.net") {
    if (
      document.location.pathname == "/" ||
      document.location.pathname == "/en/"
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (
      document.querySelector(
        "#root > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > h1"
      ) !== null
    ) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(
        "#root > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div > h1"
      );
      presenceData.details = "Viewing user:";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/novel/")) {
      if (
        document.querySelector(
          "#root > div > div > div > main > section > div:nth-child(1) > div > div:nth-child(2) > h1"
        ) !== null
      ) {
        title = document.querySelector(
          "#root > div > div > div > main > section > div:nth-child(1) > div > div:nth-child(2) > h1"
        );
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing novel:";
        presenceData.state = title.innerText;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing for novels...";
      }
    } else if (document.location.pathname.includes("/artworks")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing artwork:";
      presenceData.state = document.querySelector(
        "#root > div:nth-child(2) > div > div > main > section > div > div > figcaption > div > div > h1"
      ).textContent;
    } else if (document.location.pathname.includes("/ranking")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector(
        "#wrapper > div.layout-body > div > h1 > a"
      ).textContent;
    } else if (document.location.pathname.includes("/history.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing History";
    } else if (document.location.pathname.includes("/bookmark")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing bookmarks";
    } else if (document.location.pathname.includes("/mypixiv_all.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing My pixiv";
    } else if (document.location.pathname.includes("/stacc")) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector("#stacc_center_title");
      presenceData.details = "Browsing Feed";
      presenceData.state = user.innerText;
    } else if (document.location.pathname.includes("/fanbox")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing fanbox";
    } else if (document.location.pathname.includes("/event/")) {
      if (
        document.querySelector("#contents > div.pane.full.group > h1") !== null
      ) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing event:";
        presenceData.state = document.querySelector(
          "#contents > div.pane.full.group > h1"
        ).textContent;
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing events...";
      }
    } else if (document.location.pathname.includes("/event_add")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ready to create an event";
    } else if (document.location.pathname.includes("/profile_event")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Manage event...";
    } else if (document.location.pathname.includes("/tag")) {
      title = document.querySelector(
        "#container > div.page > div.main-wrap > div.profile > section > header > h1"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing tag:";
      presenceData.state = title.innerText;
    } else if (document.location.pathname.includes("/search")) {
      search = document.querySelector(
        "#wrapper > div.layout-body > div > div.column-header > div > h1 > a"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = search.innerText;
      presenceData.smallImageKey = "search";
      //Account Settings
      //User settings
    } else if (document.location.pathname.includes("/setting_user.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "User settings";
      presenceData.state = "Basic settings";
    } else if (
      document.location.pathname.includes("/setting_social_login.php")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "User settings";
      presenceData.state = "Link other accounts to pixiv";
    } else if (document.location.pathname.includes("/setting_sns_post")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "User settings";
      presenceData.state = "Post on social media";
      //Profile settings
    } else if (document.location.pathname.includes("/setting_profile.php")) {
      presenceData.details = "Profile settings";
      presenceData.state = "Profile information";
    } else if (
      document.location.pathname.includes("/setting_profile_img.php")
    ) {
      presenceData.details = "Profile settings";
      presenceData.state = "Profile images";
    } else if (document.location.pathname.includes("/setting_workspace.php")) {
      presenceData.details = "Profile settings";
      presenceData.state = "Workspace";
    } else if (document.location.pathname.includes("/setting_design.php")) {
      presenceData.details = "Profile settings";
      presenceData.state = "Design";
      //Notification Settings
    } else if (document.location.pathname.includes("/setting_info.php")) {
      presenceData.details = "Notification Settings";
      //Auto Feed activity
    } else if (document.location.pathname.includes("/stacc/my/setting")) {
      presenceData.details = "Auto Feed activity";
      ///Mute setting
    } else if (document.location.pathname.includes("/setting_mute.php")) {
      presenceData.details = "Mute setting | Tags";
      if (typeResult == "user") presenceData.details = "Mute setting | User";
      //Premium
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Premium Registered Info";
      //Private message
    } else if (document.location.pathname.includes("/messages.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Private message";
      //Discovery
    } else if (document.location.pathname.includes("/discovery")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Recommended Works";
      if (document.location.pathname.includes("/users"))
        presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing Recommended Users";
      //Upload
    } else if (document.location.pathname.includes("/upload.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Submiting New Illustrations";
      if (typeResult == "manga") presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Submiting New Manga";
    } else if (document.location.pathname.includes("/ugoira_upload.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Submiting New Ugoira(Animations)";
    } else if (document.location.pathname.includes("/novel/upload.php")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Submit New Novel";
      //Managing Works
    } else if (document.location.pathname.includes("/manage")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Managing Artworks";
      //report
    } else if (document.location.pathname.includes("/report")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing report";
      presenceData.state = (document.querySelector(
        "#wrapper > div.layout-body > section.analytics-menu-unit > nav > span.label"
      ) as HTMLElement).innerText;
      //something
    } else if (document.location.pathname.includes("/group")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing group";
    } else if (document.location.pathname.includes("/idea")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing idea";
    } else if (document.location.pathname.includes("/howto")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Howto";
    }
  } else if (document.location.hostname == "sketch.pixiv.net") {
    presenceData.smallImageKey = "writing";
    if (
      document.location.pathname == "/" ||
      document.location.pathname.includes("/public")
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing sketch page";
    } else if (document.location.pathname.includes("/lives/")) {
      title = document.querySelector("#LiveSidebarLiveUser > div.name");
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing livestream";
      presenceData.state = "by user: " + title.innerText;
      presenceData.smallImageKey = "live";
    } else if (document.location.pathname.includes("/lives")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Browsing livestreams";
    } else if (document.location.pathname.includes("/popular")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing popular posts";
    } else if (document.location.pathname.includes("/following")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing following posts";
    } else if (document.location.pathname.includes("/@")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing user:";
      presenceData.state = document.querySelector(
        "#AppContent > div:nth-child(5) > div:nth-child(1) > div > div.UserHeaderBody > div > div.user > div.name"
      ).textContent;
    } else if (document.location.pathname.includes("/tags")) {
      search = document.querySelector(
        "#TagHeader > div > div.CarouselOverlay > div > div"
      );
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Sketch- Viewing tag:";
      presenceData.state = search.innerText;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
