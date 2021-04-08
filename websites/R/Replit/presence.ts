const presence = new Presence({
  clientId: "684803357000335401"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "replit"
    },
    Path = document.location.pathname;

  if (Path.startsWith("/@")) {
    if (Path.replace("/@", "").split("/").length == 1) {
      presenceData.details = `Viewing a user's profile :`;
      presenceData.state = document.querySelector(
        "#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-1419166693.profile-header-container > div.jsx-1419166693.profile-header > div.jsx-1419166693.profile-header-content > div.jsx-1419166693.name-wrap > h1"
      ).textContent;
    } else {
      const type = (document.querySelector(
        "#page > div > div > div > div:nth-child(1) > div > div > div > div.jsx-268062591.sidebar-layout-ws-header > div > div.jsx-718404847.jsx-1272337756.info-wrapper > div > div > div.jsx-1561825049.workspace-header-description-container > img"
      ) as HTMLImageElement).alt;
      const name = document.querySelector(
        "#page > div > div > div > div:nth-child(1) > div > div > div > div.jsx-268062591.sidebar-layout-ws-header > div > div.jsx-718404847.jsx-1272337756.info-wrapper > div > div > div.jsx-1561825049.workspace-header-title > h1"
      ).textContent;
      presenceData.details = `Editing a ${type} project :`;
      presenceData.state = `${name}`;
    }
  } else if (Path.startsWith("/repls")) {
    const length = document.querySelector(
      "#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-1444742247 > div > div.jsx-3858180552.repls-dashboard-list > div.jsx-397300979.replsdashboard-list"
    ).children.length;
    presenceData.details = `Viewing repls (${length} total) :`;
    presenceData.state = `${
      Path == "/repls"
        ? "In the main page"
        : "In a folder : " + Path.replace("/repls/folder/", "")
    }   `;
  } else if (Path.startsWith("/talk")) {
    presenceData.details = `Viewing community posts :`;
    switch (Path.replace("/talk/", "")) {
      case "all":
        presenceData.state = `All posts`;
        break;
      default:
        presenceData.state = `${
          document.querySelector(
            "#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-330798097 > div.jsx-330798097.post-page-content > div.jsx-1910246347 > div.jsx-1910246347.board-post-detail-header > div.jsx-1910246347.board-post-detail-title"
          ) !== null
            ? document.querySelector(
                "#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-330798097 > div.jsx-330798097.post-page-content > div.jsx-1910246347 > div.jsx-1910246347.board-post-detail-header > div.jsx-1910246347.board-post-detail-title"
              ).textContent
            : `${Path.replace("/talk/", "").toUpperCase()} related posts`
        }`;
    }
  } else if (Path.startsWith("/notifications")) {
    presenceData.details = `Viewing notifications :`;
  } else if (Path.startsWith("/languages")) {
    presenceData.details = `Browsing languages :`;
    presenceData.state = `All languages`;
  } else if (Path.startsWith("/templates")) {
    presenceData.details = `Browsing templates :`;
    presenceData.state = `${
      document.querySelector(
        "#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-3938129460.page > div.jsx-3938129460.templates-container"
      ).children.length
    } total templates`;
  } else {
    presenceData.details = `Viewing the home page `;
  }
  presence.setActivity(presenceData);
});
