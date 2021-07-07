const presence = new Presence({
    clientId: "632293282847784973"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

async function getStrings() {
  return presence.getStrings(
    {
      home: "general.viewHome",
      calendar: "google classroom.calendar",
      todo: "google classroom.todo",
      assignmentPrivate: "google classroom.assignmentPrivate",
      assignment: "google classroom.assignment",
      class: "google classroom.class",
      classworkPrivate: "google classroom.classworkPrivate",
      classwork: "google classroom.classwork",
      classmembersPrivate: "google classroom.classmembersPrivate",
      classmembers: "google classroom.classmembers",
      settings: "google classroom.settings"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    path: string[] = document.location.pathname.split("/"),
    privacy = await presence.getSetting("privacy"),
    newLang = await presence.getSetting("lang").catch(() => "en");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  path.shift();
  if (path[0] === "u") {
    path.splice(0, 2);
  }
  if (path[0] === "h") {
    presenceData.details = (await strings).home;
  } else if (path[0] === "calendar") {
    presenceData.details = (await strings).calendar;
  } else if (path[0] === "a") {
    presenceData.details = (await strings).todo;
  } else if (path[0] === "c") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    if (path[2] && path[2] === "a") {
      presenceData.details = privacy
        ? (await strings).assignmentPrivate
        : (await strings).assignment;
    } else {
      presenceData.details = (await strings).class;
    }
    if (!privacy) presenceData.state = classroom;
  } else if (path[0] === "w") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = privacy
      ? (await strings).classworkPrivate
      : (await strings).classwork;
    if (!privacy) presenceData.state = classroom;
  } else if (path[0] === "r") {
    const classroom: string = document.querySelector(
      'span[class="YVvGBb dDKhVc"]'
    )
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = privacy
      ? (await strings).classmembersPrivate
      : (await strings).classmembers;

    if (!privacy) presenceData.state = classroom;
  } else if (path[0] === "s") {
    presenceData.details = (await strings).settings;
  }
  presence.setActivity(presenceData);
});
