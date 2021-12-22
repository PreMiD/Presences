const presence = new Presence({
    clientId: "786770326234464256"
  }),
  stamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      startTimestamp: stamp
    },
    paths = document.location.pathname.split("/");

  if (!paths[2]) {
    data.largeImageKey = "homepage";
    data.details = "Looking at the main page...";
  } else if (!paths[3]) {
    data.largeImageKey = "homepage";
    data.details = "Looking at Web Technologies";
  } else {
    switch (paths[4]) {
      case "JavaScript": {
        data.largeImageKey = "javascript";

        if (paths[5]) {
          paths.splice(0, 5);
          data.details = `JavaScript: Looking at ${paths[0]}`;
          if (paths[1]) {
            paths.splice(0, 1);
            data.state = `Topic: ${paths.join(", ")}`;
          }
        } else data.details = "Looking at JavaScript Technologie";

        break;
      }
      case "HTML": {
        data.largeImageKey = "html";

        if (paths[5]) {
          paths.splice(0, 5);
          data.details = `HTML: Looking at ${paths[0]}`;
          if (paths[1]) {
            paths.splice(0, 1);
            data.state = `Topic: ${paths.join(", ")}`;
          }
        } else data.details = "Looking at HTML Technologie";

        break;
      }
      case "CSS": {
        data.largeImageKey = "css";

        if (paths[5]) {
          paths.splice(0, 5);
          data.details = `CSS: Looking at ${paths[0]}`;
          if (paths[1]) {
            paths.splice(0, 1);
            data.state = `Topic: ${paths.join(", ")}`;
          }
        } else data.details = "Looking at CSS Technologie";

        break;
      }
      case "MathML": {
        data.largeImageKey = "mathml";

        if (paths[5]) {
          paths.splice(0, 5);
          data.details = `MathML: Looking at ${paths[0]}`;
          if (paths[1]) {
            paths.splice(0, 1);
            data.state = `Topic: ${paths.join(", ")}`;
          }
        } else data.details = "Looking at MathML Technologie";

        break;
      }
      case "WebExtensions": {
        data.largeImageKey = "extension";

        if (paths[4]) {
          paths.splice(0, 5);
          data.details = `Web Extensions: Looking at ${paths[0]}`;
          if (paths[1]) {
            paths.splice(0, 1);
            data.state = `Topic: ${paths.join(", ")}`;
          }
        } else data.details = "Looking at Web Extensions Technologies";

        break;
      }
      default: {
        data.largeImageKey = "homepage";

        const [, , , , tech] = paths;

        if (paths[5]) {
          paths.splice(0, 5);
          data.details = `${tech}: Looking at ${paths[0]}`;
          if (paths[1]) {
            paths.splice(0, 1);
            data.state = `Topic: ${paths.join(", ")}`;
          }
        } else data.details = `Looking at ${tech}`;

        break;
      }
    }
  }

  presence.setActivity(data);
});
