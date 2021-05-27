const presence = new Presence({
    clientId: "839924185278840853"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const elapsed = await presence.getSetting("elapsed"),
    timeleft = await presence.getSetting("timeleft"),
    privacy = await presence.getSetting("privacy"),
    buttons = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };

  if (document.location.pathname.includes("/bs-viewer/")) {
    if (document.querySelector("#songname").textContent === "") {
      presenceData.details = "Selecting Beatmap";
    } else {
      presenceData.details =
        document.querySelector("#songname").textContent +
        " " +
        document.querySelector("#songsubname").textContent;
      presenceData.state =
        (
          document.getElementById("difficultyselect") as HTMLSelectElement
        ).value.replace("Plus", "+") +
        " (" +
        (
          document.getElementById("difficultyselect") as HTMLSelectElement
        ).selectedOptions.item(0).textContent +
        ")";
      presenceData.buttons = [
        {
          label: "View Page",
          url: document.location.href
        }
      ];
      if (document.location.href === "https://skystudioapps.com/bs-viewer/")
        delete presenceData.buttons;
    }
    switch (document.querySelector("#play-button").getAttribute("class")) {
      case "fas fa-pause":
        presenceData.smallImageKey = "playing";
        presenceData.endTimestamp =
          Date.now() +
          (parseInt(
            document
              .querySelector("#stats")
              .firstChild.textContent.split(":")[1]
          ) *
            60 +
            parseInt(
              document
                .querySelector("#stats")
                .firstChild.textContent.split(":")[2]
            )) *
            1000 -
          (parseInt(document.querySelector("#time").textContent.split(":")[0]) *
            60 +
            parseInt(
              document.querySelector("#time").textContent.split(":")[1]
            )) *
            1000;
        presenceData.smallImageText = "Playing";
        break;
      case "fas fa-play":
        presenceData.smallImageKey = "paused";
        presenceData.smallImageText = "Paused";
        break;
    }
  } else if (document.location.pathname.includes("/mapping-tools/")) {
    presenceData.details = "Mapping Tool";
    presenceData.state = document.querySelector(".selected-tab").textContent;
    if (
      (
        document.querySelector(
          "input#file-input.file-input"
        ) as HTMLInputElement
      ).value !== "" &&
      !privacy
    )
      presenceData.state =
        document.querySelector(".selected-tab").textContent +
        " (" +
        (
          document.querySelector(
            "input#file-input.file-input"
          ) as HTMLInputElement
        ).value.replace("C:\\fakepath\\", "") +
        ")";
  } else if (document.location.pathname.includes("/"))
    presenceData.details = "Viewing Homepage";

  if (!elapsed) delete presenceData.startTimestamp;

  if (!timeleft && presenceData.endTimestamp) delete presenceData.endTimestamp;

  if (!buttons && presenceData.buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
