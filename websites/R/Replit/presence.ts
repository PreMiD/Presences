const presence = new Presence({
  clientId: "830504223153717311"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "replit"
    },
    path = document.location.pathname;

  if (path === "/" || path === "/~") presenceData.details = "Viewing home page";
  else if (path.startsWith("/@")) {
    if (
      path
        .replace("/@", "")
        .split("/")
        .filter(elm => elm !== "").length === 1
    ) {
      presenceData.details = "Viewing a user's profile";
      presenceData.state = path.replace("/@", "");
    } else {
      presenceData.details = `Editing ${
        document.querySelector<HTMLImageElement>(
          "#workspace-root > div > div.jsx-132086333.content > div.jsx-77352756.workspace-page-wrapper.desktop > div > div > div:nth-child(1) > header > div > div.jsx-2650114939.left > div > div > div.jsx-2652062152.workspace-header-info > div.jsx-2652062152.language-icon-container > img"
        ).alt
      } repl`;
      presenceData.state = `${path.split("/").filter(elm => elm !== "")[1]}${
        window.location.hash ? ` - ${window.location.hash.substr(1)}` : ""
      }`;
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
  } else if (path.startsWith("/notifications"))
    presenceData.details = "Viewing notifications";
  else if (path.startsWith("/languages")) {
    presenceData.details = "Browsing languages:";
    presenceData.state = "All languages";
  } else if (path.startsWith("/new")) {
    presenceData.details = "Creating new repl:";
    presenceData.state = `${
      document.querySelector<HTMLInputElement>("#languageSelector-input").value
    }`;
  } else if (path.startsWith("/repls")) {
    const repls = document.querySelector<HTMLDivElement>(
        "#__next > div > div > div.jsx-2888589246.content > div.jsx-1264267603.repl-content > div.jsx-4064465542 > div:nth-child(3)"
      ),
      length = repls ? repls.children.length - (path === "/repls" ? 2 : 1) : 0;
    presenceData.details = `Viewing repls ${length ? `(Total ${length})` : ""}`;
    presenceData.state = `${
      path === "/repls"
        ? "In the main page"
        : `In a folder : ${path.replace("/repls/folder/", "")}`
    }`;
  } else if (path.startsWith("/talk")) {
    presenceData.details = "Surfing feed";
    const [postType] = path.replace("/talk/", "").split("/"),
      postElement: HTMLDivElement = document.querySelector(
        "#__next > div > div.jsx-132086333.content > div.jsx-2019133593 > div.jsx-2019133593.post-page-content > div.jsx-347352367 > div.jsx-347352367.board-post-detail-header > div.jsx-347352367.board-post-detail-title"
      );
    switch (path.replace("/talk/", "")) {
      case "all":
        presenceData.state = "All posts";
        break;
      default:
        presenceData.state = `${postType
          .charAt(0)
          .toUpperCase()}${postType.substr(1)}${
          postElement ? ` : ${postElement.textContent}` : ""
        }`;
        break;
    }
  } else if (path.startsWith("/templates"))
    presenceData.details = "Viewing replit templates";
  else presenceData.details = "Viewing unsupported page";
  presence.setActivity(presenceData);
});
