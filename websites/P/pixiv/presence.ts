const presence = new Presence({
  clientId: "640234287525920834"
});

let browsingStamp = Math.floor(Date.now() / 1000),
  lastPath: string;

const typeURL = new URL(document.location.href),
  typeResult = typeURL.searchParams.get("type");

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "pix"
    },
    curPath = document.location.pathname;
  if (lastPath !== curPath) {
    browsingStamp = Math.floor(Date.now() / 1000);
    lastPath = curPath;
  }

  if (document.location.hostname.includes("www.pixiv.net")) {
    if (curPath.includes("/users")) {
      presenceData.details = "Viewing user:";
      presenceData.state = document.querySelector(
        "#root > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > h1"
      ).innerHTML;
    } else if (curPath.includes("/tags")) {
      presenceData.details = "Viewing tags:";
      presenceData.state = `${
        document.querySelector(
          "#root > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(2) > div > div > span"
        ).textContent
      }`;
    } else if (curPath.includes("/search_user.php")) {
      presenceData.details = "Searching for user:";
      presenceData.state = typeURL.searchParams.get("nick");
      presenceData.smallImageKey = "search";
    } else if (curPath.includes("/dashboard")) {
      if (curPath.includes("/works")) {
        presenceData.details = `Managing ${
          curPath.includes("/series") ? "Series" : "Artworks"
        }`;
      } else if (curPath.includes("/report/artworks"))
        presenceData.details = "Viewing access analytics";
      else if (curPath.includes("report/ranking"))
        presenceData.details = "Viewing ranking report";
      else presenceData.details = "Viewing dashboard";
    } else if (curPath.includes("/stacc")) {
      presenceData.details = "Browsing Feed";
      presenceData.state = document.querySelector<HTMLElement>(
        "#stacc_center_title"
      ).innerText;
    } else if (curPath.includes("/fanbox"))
      presenceData.details = "Viewing fanbox";
    else if (curPath.includes("/event")) {
      const title = document.querySelector(
        "#contents > div.pane.full.group > h1"
      );
      if (title !== null) {
        presenceData.details = "Viewing event:";
        presenceData.state = title.textContent;
      } else presenceData.details = "Browsing events...";
    } else if (curPath.includes("/ranking")) {
      presenceData.details = "Viewing ranking:";
      presenceData.state = document.querySelector(".current").innerHTML;
    } else if (curPath.includes("/history.php"))
      presenceData.details = "Browsing History";
    else if (curPath.includes("/bookmark"))
      presenceData.details = "Viewing bookmarks";
    else if (curPath.includes("/mypixiv_all.php"))
      presenceData.details = "Browsing My pixiv";
    else if (curPath.includes("/group"))
      presenceData.details = "Browsing group";
    else if (curPath.includes("/idea")) presenceData.details = "Browsing idea";
    else if (curPath.includes("/howto"))
      presenceData.details = "Browsing Howto";
    else if (curPath.includes("/event_add"))
      presenceData.details = "Ready to create an event";
    else if (curPath.includes("/profile_event"))
      presenceData.details = "Manage event...";
    else if (curPath.includes("/setting_user.php")) {
      presenceData.details = "User settings";
      presenceData.state = "Basic settings";
    } else if (
      curPath.includes("/setting_social_login.php") ||
      curPath.includes("/linked_services")
    ) {
      presenceData.details = "User settings";
      presenceData.state = "Link other accounts to pixiv";
    } else if (curPath.includes("/setting_sns_post")) {
      presenceData.details = "User settings";
      presenceData.state = "Post on social media";
    } else if (curPath.includes("/setting_profile.php")) {
      presenceData.details = "Profile settings";
      presenceData.state = "Profile information";
    } else if (curPath.includes("/setting_profile_img.php")) {
      presenceData.details = "Profile settings";
      presenceData.state = "Profile images";
    } else if (curPath.includes("/setting_workspace.php")) {
      presenceData.details = "Profile settings";
      presenceData.state = "Workspace";
    } else if (curPath.includes("/setting_info.php"))
      presenceData.details = "Notification Settings";
    else if (curPath.includes("/stacc/my/setting"))
      presenceData.details = "Auto Feed activity";
    else if (curPath.includes("/setting_mute.php")) {
      presenceData.details = "Mute setting | Tags";
      if (typeResult === "user") presenceData.details = "Mute setting | User";
    } else if (curPath.includes("/premium"))
      presenceData.details = "Viewing Premium Registered Info";
    else if (curPath.includes("/messages.php"))
      presenceData.details = "Browsing Private message";
    else if (curPath.includes("/discovery")) {
      presenceData.details = "Viewing Recommended Works";
      if (curPath.includes("/users"))
        presenceData.details = "Viewing Recommended Users";
    } else if (curPath.includes("/upload.php")) {
      presenceData.details = `Submiting New ${
        typeResult === "manga"
          ? "Manga"
          : curPath.includes("novel")
          ? "Novel"
          : "Illustrations"
      }`;
    } else if (curPath.includes("/ugoira_upload.php"))
      presenceData.details = "Submiting New Ugoira(Animations)";
    else if (curPath.includes("/manage"))
      presenceData.details = "Managing Artworks";
    else if (curPath.includes("/artworks")) {
      presenceData.details = "Viewing artwork:";
      presenceData.smallImageKey = "search";
      presenceData.state = `${
        document.querySelector(
          "#root > div:nth-child(2) > div:nth-child(2) > div > div > main > section > div > div > figcaption > div > div > h1"
        ).textContent
      } (${
        document.querySelector(
          "#root > div:nth-child(2) > div:nth-child(2) > div > div > aside > section > h2 > div > div > a"
        ).textContent
      })`;
    } else if (curPath.includes("/novel/")) {
      const title = document.querySelector(
          "#root > div > div:nth-child(2) > div > div > main > section > div > div:nth-child(2) > div:nth-child(2)"
        ),
        author = document.querySelector(
          "#root > div > div:nth-child(2) > div > div > aside > section > h2 > div > div > a"
        );
      presenceData.details =
        title !== null ? "Viewing novel:" : "Browsing for novels...";
      if (title !== null)
        presenceData.state = `${title.textContent} (${author.textContent})`;
    } else if (curPath.startsWith("/") || curPath.startsWith("/en/"))
      presenceData.details = "Viewing home page";

    //end
  } else if (document.location.hostname === "sketch.pixiv.net") {
    presenceData.smallImageKey = "writing";
    if (curPath === "/" || curPath.includes("/public"))
      presenceData.details = "Viewing sketch page";
    else if (curPath.includes("/lives/")) {
      const title = document.querySelector<HTMLElement>(
        "#LiveSidebarLiveUser > div.name"
      );
      presenceData.details = "Sketch- Viewing livestream";
      presenceData.state = `by user: ${title.innerText}`;
      presenceData.smallImageKey = "live";
    } else if (curPath.includes("/lives"))
      presenceData.details = "Sketch- Browsing livestreams";
    else if (curPath.includes("/popular"))
      presenceData.details = "Sketch- Viewing popular posts";
    else if (curPath.includes("/following"))
      presenceData.details = "Sketch- Viewing following posts";
    else if (curPath.includes("/@")) {
      presenceData.details = "Sketch- Viewing user:";
      presenceData.state = document.querySelector(
        "#AppContent > div:nth-child(5) > div:nth-child(1) > div > div.UserHeaderBody > div > div.user > div.name"
      ).textContent;
    } else if (curPath.includes("/tags")) {
      presenceData.details = "Sketch- Viewing tag:";
      presenceData.state = document.querySelector<HTMLElement>(
        "#TagHeader > div > div.CarouselOverlay > div > div"
      ).innerText;
    }
  }

  presenceData.startTimestamp = browsingStamp;
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
    return;
  }
  presence.setActivity(presenceData);
});
