const presence = new Presence({
    clientId: "864573021762224129"
  }),
  startTimestamp = Math.floor(Date.now() / 1e3),
  whitespaceRegex = /^\s*|\n/gm;

presence.on("UpdateData", () => {
  const { pathname } = window.location,
    [, pathCheck, mainPath, namespace] = pathname.split("/"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp
    };

  function mainWikiPathDetails(namespace: string) {
    if (namespace === "Main") {
      const titleText = document
        .querySelector(".entry-title")
        .textContent.replace(whitespaceRegex, "");
      presenceData.details = "Viewing a TV Trope";
      presenceData.state = titleText;
    } else {
      const titleElement = document.querySelector(".entry-title"),
        namespaceText =
          namespace === "Main"
            ? null
            : titleElement
              .querySelector("strong")
              .textContent.replace(/ \/ $/, ""),
        pageText = titleElement.childNodes[2].textContent.replace(
          whitespaceRegex,
          ""
        );
      presenceData.details = "Viewing a page";
      presenceData.state = `${namespaceText} / ${pageText}`;
    }
  }

  if (pathCheck === "pmwiki") {
    switch (mainPath) {
      case "pmwiki.php": {
        mainWikiPathDetails(namespace);
        break;
      }
      case "profile.php": {
        presenceData.details = "Viewing User Profile";
        break;
      }
      case "topics.php": {
        presenceData.details = "Browsing the Forum Homepage";
        break;
      }
      case "conversations.php": {
        const categoryText = document
          .querySelector(".entry-title")
          .childNodes[2].textContent.replace(whitespaceRegex, "");
        presenceData.details = "Browsing Forum Category";
        presenceData.state = categoryText;
        break;
      }
      case "posts.php": {
        const titleText = document
          .querySelector(".entry-title")
          .textContent.replace(whitespaceRegex, "");
        presenceData.details = "Browsing Forum Post";
        presenceData.state = titleText;
        break;
      }
      case "wysiwyg_source_editor.php": {
        const { search } = window.location,
          searchParams = new URLSearchParams(search),
          groupName = searchParams.get("groupname"),
          title = searchParams.get("title");
        presenceData.details = "Editing TV Trope Page";
        presenceData.state = `${groupName} / ${title}`;
        break;
      }
      case "createconversation.php": {
        presenceData.details = "Creating a Forum Post";
        break;
      }
      default: {
        presenceData.details = "Browsing TV Tropes";
        presenceData.state = document.title;
      }
    }
  } else if (pathCheck) mainWikiPathDetails(pathCheck);
  else presenceData.details = "Browsing TV Tropes Homepage";
  if (presenceData.details) presence.setActivity(presenceData);
});
