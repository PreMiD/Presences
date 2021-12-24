const presence = new Presence({
    clientId: "923893773048619008"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    path = document.location.pathname;
  if (path.startsWith("/updates"))
    presenceData.details = "Browsing lastest updates";
  else if (path.startsWith("/featured"))
    presenceData.details = "Browsing featured mangas";
  else if (path.startsWith("/manga_list")) {
    if (path.indexOf("all") > -1) presenceData.details = "Browsing all mangas";
    else if (path.indexOf("hot") > -1)
      presenceData.details = "Browsing hottest mangas";
    else if (path.indexOf("updated") > -1)
      presenceData.details = "Browsing updated mangas";
  } else if (path.startsWith("/favorited"))
    presenceData.details = "Viewing favorited mangas";
  else if (path.startsWith("/titles")) {
    presenceData.details = `Viewing: ${document.title.substring(
      0,
      document.title.lastIndexOf("-") - 1
    )}`;
    presenceData.state = document.title.substring(
      document.title.lastIndexOf("-") + 1,
      document.title.lastIndexOf("|") - 1
    );
    presenceData.buttons = [{ label: "View series", url: document.URL }];
  } else if (path.startsWith("/viewer")) {
    presenceData.details = `Reading: ${
      document.querySelector<HTMLHeadingElement>(
        "#app > div:nth-child(2) > div.Viewer-module_wrapper_11OpA > div:nth-child(3) > div.Navigation-module_header_37C_9.Navigation-module_appear_30FBL > div.Navigation-module_detailContainer_1aDk8 > a > h1"
      ).textContent
    }`;
    presenceData.state = `Chapter ${
      document.querySelector<HTMLParagraphElement>(
        "#app > div:nth-child(2) > div.Viewer-module_wrapper_11OpA > div:nth-child(3) > div.Navigation-module_header_37C_9.Navigation-module_appear_30FBL > div.Navigation-module_detailContainer_1aDk8 > div > p"
      ).textContent
    }`;
    presenceData.buttons = [
      { label: "Read chapter", url: document.URL },
      {
        label: "View series",
        url: document.querySelector<HTMLAnchorElement>(
          "#app > div:nth-child(2) > div.Viewer-module_wrapper_11OpA > div:nth-child(3) > div.Navigation-module_header_37C_9.Navigation-module_appear_30FBL > div.Navigation-module_detailContainer_1aDk8 > a"
        ).href
      }
    ];
  } else presenceData.details = "Browsing";
  presence.setActivity(presenceData);
});
