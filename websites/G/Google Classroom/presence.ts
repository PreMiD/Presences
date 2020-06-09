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
  } else if (path[0] === "calendar") {
    presenceData.details = "Viewing the calendar";
  } else if (path[0] === "a") {
    presenceData.details = "Viewing to-do list";
  } else if (path[0] === "c") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    if (path[2] && path[2] === "a") {
      presenceData.details = "Viewing an assignment in:";
    } else {
      presenceData.details = "Viewing class:";
    }
    presenceData.state = classroom;
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
  } else if (path[0] === "s") {
    presenceData.details = "Configuring settings";
  }
  presence.setActivity(presenceData);
  presenceData = {
    largeImageKey: "logo"
  };
});
