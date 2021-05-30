const presence = new Presence({
    clientId: "765876503161733140"
  }),
  websiteLoadTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "zoom_logo"
  };
  if (document.location.pathname == "/") {
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("signin")) {
    presenceData.details = "Singing in";
  } else if (document.location.pathname.includes("signup")) {
    presenceData.details = "Creating an account";
  } else if (document.location.pathname.includes("profile")) {
    presenceData.details = "Viewing their profile";
  } else if (document.location.pathname.includes("webinar")) {
    presenceData.details = "Viewing webinars";
  } else if (document.location.pathname.includes("recording")) {
    presenceData.details = "Viewing recordings";
  } else if (document.location.pathname.includes("settings")) {
    presenceData.details = "Editing their settings";
  } else if (document.location.pathname.includes("meeting/schedule")) {
    presenceData.details = "Scheduling a meeting";
  } else if (document.location.pathname.includes("meetings")) {
    presenceData.details = "Viewing meetings page";
  } else if (document.location.pathname.includes("meeting")) {
    presenceData.details = "Viewing their meetings";
  } else if (document.location.pathname.includes("join")) {
    presenceData.details = "Joining a meeting";
  } else if (document.location.pathname.startsWith("/s/")) {
    presenceData.details = "Joining a meeting";
  } else if (document.location.pathname.startsWith("/wc/")) {
    if (
      document.querySelector("#prompt > h4") &&
      document.querySelector("#prompt > h4").textContent ==
        "You are already in another meeting"
    ) {
      presenceData.details = "Joining a meeting";
    } else if (
      document.querySelector(".leave-wrap > h4") &&
      document
        .querySelector(".leave-wrap > h4")
        .textContent.includes("Thank you for attending the meeting")
    ) {
      presenceData.details = "Leaving an meeting";
    } else {
      if (videoEnabled()) {
        presenceData.details = "In video meeting";
        presenceData.smallImageKey = "vcall";
      } else {
        presenceData.details = "In meeting";
        presenceData.smallImageKey = "call";
      }
      if (memberCount()) {
        presenceData.state = `${memberCount()} user${
          memberCount() > 1 ? "s" : ""
        } in room`;
      }
      presenceData.startTimestamp = websiteLoadTimestamp;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

function videoEnabled() {
  return (
    document.querySelector(".send-video-container > button") &&
    document
      .querySelector(".send-video-container > button")
      .getAttribute("aria-label") &&
    document
      .querySelector(".send-video-container > button")
      .getAttribute("aria-label") != "start sending my video"
  );
}

function memberCount() {
  const counter = document.querySelector(
    ".footer-button__participants-icon > .footer-button__number-counter > span"
  );
  const res = typeof counter === "undefined" ? null : Number(counter.innerHTML);
  return res;
}
