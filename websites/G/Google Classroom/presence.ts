const presence = new Presence({
    clientId: "632293282847784973"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

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
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

let strings: Awaited<ReturnType<typeof getStrings>> = null,
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    path = document.location.pathname.split("/"),
    [newLang, privacy] = await Promise.all([
      presence.getSetting<string>("lang").catch(() => "en"),
      presence.getSetting<boolean>("privacy")
    ]);

  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = await getStrings();
  }

  path.shift();
  if (path[0] === "u") path.splice(0, 2);

  if (path[0] === "h") presenceData.details = strings.home;
  else if (path[0] === "calendar") presenceData.details = strings.calendar;
  else if (path[0] === "a") presenceData.details = strings.todo;
  else if (path[0] === "c") {
    const classroom = document.querySelector('span[class="YVvGBb dDKhVc"]')
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    if (path[2] && path[2] === "a") {
      presenceData.details = privacy
        ? strings.assignmentPrivate
        : strings.assignment;
    } else presenceData.details = strings.class;

    if (!privacy) presenceData.state = classroom;
  } else if (path[0] === "w") {
    const classroom = document.querySelector('span[class="YVvGBb dDKhVc"]')
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = privacy
      ? strings.classworkPrivate
      : strings.classwork;
    if (!privacy) presenceData.state = classroom;
  } else if (path[0] === "r") {
    const classroom = document.querySelector('span[class="YVvGBb dDKhVc"]')
      ? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
          document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
        }`
      : document.querySelector('span[id="UGb2Qe"]').textContent;
    presenceData.details = privacy
      ? strings.classmembersPrivate
      : strings.classmembers;

    if (!privacy) presenceData.state = classroom;
  } else if (path[0] === "s") presenceData.details = strings.settings;

  presence.setActivity(presenceData);
});
