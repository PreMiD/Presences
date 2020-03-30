var presence = new Presence({
  clientId: "620283648171835392",
});

const boards = {
  toradora: "Toradora!",
  kiminonawa: "Kimi no Na wa. / Your Name.",
};

presence.on("UpdateData", () => {
  var presenceData: presenceData = {
    largeImageKey: "lg-imgb",
  };
  var path = document.location.pathname.split("/");
  var board = "N/A";
  if (path[1] && boards[path[1]]) {
    board = boards[path[1]];
  }
  if (document.location.pathname == "/") {
    presenceData = {
      details: "Board: " + board,
      state: "Viewing the frontpage",
      largeImageKey: "lg-imgb",
    };
    presence.setActivity(presenceData);
  } else if (boards[path[1]]) {
    if (path[2] == "post") {
      if (path[3] == "list" && path.length == 4) {
        presenceData = {
          details: "Board: " + board,
          state: "Viewing Posts List...",
          largeImageKey: "lg-imgb",
        };
        presence.setActivity(presenceData);
      } else if (path[3] == "list" && path.length > 4) {
        presenceData = {
          details: "Board: " + board,
          state:
            "Searching: " + path[4].replace("%20", ", ").replace("%21", "!"),
          largeImageKey: "lg-imgb",
        };
        presence.setActivity(presenceData);
      } else if (path[3] == "view") {
        presenceData = {
          details: "Board: " + board,
          state: "Viewing a Post... (" + path[4] + ")",
          largeImageKey: "lg-imgb",
        };
        presence.setActivity(presenceData);
      } else {
        presenceData = {
          details: "Board: " + board,
          largeImageKey: "lg-imgb",
        };
        presence.setActivity(presenceData);
      }
    } else {
      presenceData = {
        details: "Board: " + board,
        largeImageKey: "lg-imgb",
      };
      presence.setActivity(presenceData);
    }
  } else {
    presenceData = {
      details: "Board: " + board,
      largeImageKey: "lg-imgb",
    };
    presence.setActivity(presenceData);
  }
});
