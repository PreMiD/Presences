const presence = new Presence({
  clientId: "830504223153717311"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "replit"
    },
    Path = document.location.pathname;

  if (Path == "/" || Path == "/~") {
    presenceData.details = "Viewing home page";
  } else if (Path.startsWith("/@")) {
    if (
      Path.replace("/@", "")
        .split("/")
        .filter((elm) => elm !== "").length === 1
    ) {
      const user = Path.replace("/@", "");
      presenceData.details = "Viewing a user's profile";
      presenceData.state = user;
    } else {
      const fileType: string = (
          document.querySelector(
            "#workspace-root > div > div.jsx-132086333.content > div.jsx-77352756.workspace-page-wrapper.desktop > div > div > div:nth-child(1) > header > div > div.jsx-2650114939.left > div > div > div.jsx-2652062152.workspace-header-info > div.jsx-2652062152.language-icon-container > img"
          ) as HTMLImageElement
        ).alt,
        projectName: string =
          Path.split("/").filter((elm) => elm !== "")[1] +
          `${
            window.location.hash ? ` - ${window.location.hash.substr(1)}` : ""
          }`;
      presenceData.details = `Editing ${fileType} repl`;
      presenceData.state = projectName;
      presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
  } else if (Path.startsWith("/notifications"))
    presenceData.details = `Viewing notifications`;
  else if (Path.startsWith("/languages")) {
    presenceData.details = "Browsing languages:";
    presenceData.state = "All languages";
  } else if (Path.startsWith("/new")) {
    const language: string = (
      document.querySelector("#languageSelector-input") as HTMLInputElement
    ).value;
    presenceData.details = "Creating new repl:";
    presenceData.state = `${language}`;
  } else if (Path.startsWith("/repls")) {
    const repls: HTMLDivElement = document.querySelector(
        "#__next > div > div > div.jsx-2888589246.content > div.jsx-1264267603.repl-content > div.jsx-4064465542 > div:nth-child(3)"
      ),
      length: number = repls
        ? repls.children.length - (Path === "/repls" ? 2 : 1)
        : 0;
    presenceData.details = `Viewing repls ${length ? `(Total ${length})` : ""}`;
    presenceData.state = `${
      Path == "/repls"
        ? "In the main page"
        : "In a folder : " + Path.replace("/repls/folder/", "")
    }`;
  } else if (Path.startsWith("/talk")) {
    presenceData.details = "Surfing feed";
    const postType: string = Path.replace("/talk/", "").split("/")[0],
      postElement: HTMLDivElement = document.querySelector(
        "#__next > div > div.jsx-132086333.content > div.jsx-2019133593 > div.jsx-2019133593.post-page-content > div.jsx-347352367 > div.jsx-347352367.board-post-detail-header > div.jsx-347352367.board-post-detail-title"
      );
    switch (Path.replace("/talk/", "")) {
      case "all":
        presenceData.state = "All posts";
        break;
      default:
        presenceData.state = `${postType
          .charAt(0)
          .toUpperCase()}${postType.substr(1)}${
          postElement ? ` : ${postElement.innerText}` : ""
        }`;
        break;
    }
  } else if (Path.startsWith("/templates"))
    presenceData.details = "Viewing replit templates";
  else presenceData.details = "Viewing unsupported page";
  presence.setActivity(presenceData);
});
