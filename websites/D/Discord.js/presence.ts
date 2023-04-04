const presence = new Presence({
    clientId: "639659455126044672"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const data: PresenceData = {
      largeImageKey: "https://i.imgur.com/v4Qb6IT.png",
      startTimestamp: browsingStamp
    },
    route = document.location.hash.split("/");
  if (route.length === 1 || route[1] === "")
    data.details = "Browsing the main page...";
  else if (route[1] === "docs") {
    [, , data.smallImageKey] = route;
    data.smallImageText = `${route[2].replace(/^[a-z]/i, (c) =>
      c.toUpperCase()
    )} - ${Number(route[3][0]) ? `v${route[3]}` : `${route[3]}`}`;

    if (route[4].startsWith("search?q=")) {
      data.details = "Searching for:";
      data.state = route[4].slice(9);
    } else if (route[4] === "general") {
      data.details = "Viewing:";
      data.state =
        route[5] === "faq"
          ? route[5].toUpperCase()
          : `${route[5].replace(/^[a-z]/i, (c) => c.toUpperCase())}`;
    } else {
      data.details = `Looking for a${
        (route[5].split("?scrollTo=")[1] &&
          route[5].split("?scrollTo=")[1].startsWith("e-")) ||
        route[4] === "examples"
          ? "n"
          : ""
      } ${
        route[5].split("?scrollTo=")[1] &&
        route[5].split("?scrollTo=")[1].startsWith("e-")
          ? "event"
          : `${
              route[4].endsWith("s") && route[4] !== "class"
                ? route[4].substring(0, route[4].length - 1)
                : route[4].replace(/^[a-z]/i, (c) => c.toUpperCase())
            }`
      }`;
      data.state = `${route[5].split("?scrollTo=")[0]}${
        route[5].split("?scrollTo=")[1]
          ? `#${
              route[5].split("?scrollTo=")[1][1] === "-"
                ? route[5].split("?scrollTo=")[1].slice(2)
                : route[5].split("?scrollTo=")[1]
            }`
          : ""
      }`;
    }
  }

  presence.setActivity(data);
});
