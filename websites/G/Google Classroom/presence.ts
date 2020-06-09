const presence = new Presence({
  clientId: "632293282847784973"
});
let presenceData: PresenceData = {
  largeImageKey: "logo"
};

presence.on("UpdateData", async () => {
  const path: string[] = document.location.pathname.split("/");
  path.shift();
  if (path[0] === "u") {
    path.splice(0, 2);
  }
  if (path[0] === "h") {
    presenceData.details = "Home Page";
    presenceData.startTimestamp = Date.now();
  } else if (path[0] === "calendar") {
    presenceData.details = "Viewing the calendar";
    presenceData.startTimestamp = Date.now();
  } else if (path[0] === "a") {
    presenceData.details = "Viewing to-do list";
    presenceData.startTimestamp = Date.now();
  } else if (path[0] === "c") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Viewing class:";
    presenceData.state = classroom;
    presenceData.startTimestamp = Date.now();
  } else if (path[0] === "w") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = "Viewing classworks of:";
    presenceData.state = classroom;
    presenceData.startTimestamp = Date.now();
  } else if (path[0] === "r") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = "Viewing members of:";
    presenceData.state = classroom;
    presenceData.startTimestamp = Date.now();
  } else if (path[0] === "s") {
    presenceData.details = "Settings";
    presenceData.startTimestamp = Date.now();
  }
  presence.setActivity(presenceData);
  presenceData = {
    largeImageKey: "logo"
  };
});
