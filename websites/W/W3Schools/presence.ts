const presence = new Presence({
    clientId: "630239297521319953"
  }),
  capitalize = (text: string): string => {
    const texts = text.replace(/[[{(_)}\]]/g, " ").split(" ");
    return texts
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");
  },
  whitelist = ["HTML", "CSS", "SQL", "PHP", "W3.CSS", "JQUERY", "XML"];

let elapsed: number, oldUrl: string;

presence.on("UpdateData", () => {
  let details = undefined,
    state = undefined;

  if (window.location.href !== oldUrl) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  const language = document.querySelector(".w3-bar-item.w3-button.active"),
    lesson = document.querySelector("#main > h1"),
    exercise = document.querySelector("#completedExercisesNo");

  if (language) {
    details = "Learning " + capitalize(language.textContent.toLowerCase());
    if (whitelist.some((lang) => lang === language.textContent))
      details = "Learning " + language.textContent;
  }

  if (lesson) {
    state = lesson.textContent;
  }

  if (exercise) {
    details = `${capitalize(window.location.pathname.split("/")[1])} Exercise`;
    state = exercise.textContent.match("[0-9](.*)[0-9]")[0];
  }

  const data: PresenceData = {
    details: details,
    state: state,
    largeImageKey: "w3schools",
    startTimestamp: elapsed
  };

  presence.setActivity(data);
});
