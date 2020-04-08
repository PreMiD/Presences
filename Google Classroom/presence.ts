const presence = new Presence({
  clientId: "632293282847784973"
});
let presenceData: presenceData = {
  largeImageKey: "logo"
};
let startTimestamp: number;

presence.on("UpdateData", async () => {
  const path: string[] = document.location.pathname.split("/");
  path.shift();
  if (path[0] === "u") {
    path.splice(0, 2);
  }
  if (path[0] === "h") {
    presenceData.details = "Classes";
  } else if (path[0] === "calendar") {
    presenceData.details = "Calendar";
  } else if (path[0] === "a") {
    presenceData.details = "To-do";
  } else if (path[0] === "c") {
    if (!startTimestamp) startTimestamp = Date.now();
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.smallImageKey = "reading";
    presenceData.details = "In class:";
    presenceData.state = classroom;
    presenceData.startTimestamp = startTimestamp;
  } else if (path[0] === "s") {
    presenceData.details = "Classroom Settings";
  }
  presence.setActivity(presenceData);
  presenceData = {
    largeImageKey: "logo"
  };
});
