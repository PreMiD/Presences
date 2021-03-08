const presence = new Presence({
  clientId: "632293282847784973"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
    path: string[] = document.location.pathname.split("/"),
    privacy = await presence.getSetting("privacy");
  path.shift();
  if (path[0] === "u") {
    path.splice(0, 2);
  }
  if (path[0] === "h") {
    presenceData.details = "Home Page";
  } else if (path[0] === "calendar") {
    presenceData.details = "Viewing their calendar";
  } else if (path[0] === "a") {
    presenceData.details = "Viewing their to-do list";
  } else if (path[0] === "c") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
      }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    if (path[2] && path[2] === "a") {
      presenceData.details = privacy ? "Vieiwng an assignment" : "Viewing an assignment in";
    } else {
      presenceData.details = "Viewing a class";
    }
    presenceData.state = privacy ? null : classroom;
  } else if (path[0] === "w") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
      }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = privacy
      ? "Viewing their classwork"
      : "Viewing their classwork of:";
    presenceData.state = privacy ? null : classroom;
  } else if (path[0] === "r") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
      }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = privacy
      ? "Viewing class members"
      : "Viewing members of:";
    presenceData.state = privacy ? null : classroom;
  } else if (path[0] === "s") {
    presenceData.details = "Configuring settings";
  }
  presence.setActivity(presenceData);
});
