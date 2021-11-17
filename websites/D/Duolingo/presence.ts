const presence = new Presence({
    clientId: "909577563234508910"
  }),
  FLAG_ICONS = [
    "ar",
    "ca",
    "cs",
    "cy",
    "da",
    "de",
    "dn",
    "el",
    "en",
    "eo",
    "es",
    "fr",
    "ga",
    "gn",
    "he",
    "hi",
    "hu",
    "hv",
    "hw",
    "id",
    "it",
    "ja",
    "kl",
    "ko",
    "nb",
    "nv",
    "pl",
    "pt",
    "ro",
    "ru",
    "sv",
    "sw",
    "tr",
    "uk",
    "vi",
    "zs"
  ],
  INFO_PAGES = [
    "approach",
    "contact",
    "efficacy",
    "guidelines",
    "info",
    "mobile",
    "privacy",
    "team",
    "terms"
  ],
  API_ENDPOINTS = [
    "2017-06-30",
    "api",
    "friendships",
    "login",
    "switch_language",
    "users",
    "vocabulary"
  ],
  presenceData: PresenceData = {
    largeImageKey: "icon",
    startTimestamp: Math.floor(Date.now() / 1000)
  },
  language = {
    imageKey: null as string,
    name: null as string
  };

function updateLanguage() {
  const state = JSON.parse(window.localStorage.getItem("duo.state")),
    courseId = state?.user?.currentCourseId;
  if (!courseId) return;

  const course = state.courses?.[courseId];
  if (!course) return;

  const languageId = course.learningLanguage;
  if (FLAG_ICONS.includes(languageId)) language.imageKey = `flag_${languageId}`;
  else if (languageId) language.imageKey = "flag_unknown";
  else language.imageKey = null;
  language.name = course.title ?? null;
}
updateLanguage();
setInterval(updateLanguage, 1000);

function checkBasicPages(path: string[]): boolean {
  if (path.length === 0) {
    if (
      new URL(document.location.href).searchParams.get("isLoggingIn") === "true"
    ) {
      presenceData.details = "Logging in";
      return true;
    }
    presenceData.details = "Viewing the home page";
    return true;
  }
  if (INFO_PAGES.includes(path[0])) {
    presenceData.details = `Viewing the ${path[0]} page`;
    return true;
  }
  if (path[0] === "courses") {
    presenceData.details = "Viewing available courses";
    return true;
  }
  if (path[0] === "abc") {
    presenceData.details = "Looking into Duolingo ABC";
    return true;
  }
  if (path[0] === "plus") {
    presenceData.details = "Looking into Duolingo Plus";
    return true;
  }
  if (path[0] === "dictionary") {
    presenceData.details = "Looking up a word";
    if (path.length >= 3) presenceData.state = `${path[1]}: ${path[2]}`;
    return true;
  }
  if (path[0] === "profile") {
    if (path.length < 2) return true;
    presenceData.details = "Viewing a profile";
    [, presenceData.state] = path;
    if (path.length >= 3) {
      presenceData.details += " section";
      presenceData.state += `'s ${path[2]}`;
    }
    return true;
  }
  if (path[0] === "friend-updates") {
    presenceData.details = "Viewing friend updates";
    return true;
  }
  if (path[0] === "user-search") {
    presenceData.details = "Searching for a user";
    return true;
  }
  if (path[0] === "settings") {
    presenceData.details = "Adjusting settings";
    if (path.length >= 2) {
      let [, page] = path;
      page = page.charAt(0).toUpperCase() + page.slice(1);
      presenceData.state = `Section: ${page}`;
    }
    return true;
  }
  if (document.title.startsWith("Error")) {
    presenceData.details = "Watching Duo cry :(";
    presenceData.state = document.title;
    return true;
  }
  if (API_ENDPOINTS.includes(path[0])) {
    presenceData.details = "Viewing an API response";
    presenceData.state = `Endpoint: /${path[0]}`;
    return true;
  }

  return false;
}

function checkLearningPages(path: string[]): boolean {
  function set(details: string) {
    presenceData.details = details;
    presenceData.state = `Learning ${language.name}`;
    return true;
  }

  if (path[0] === "learn") {
    // Update the language in case the user just logged in
    updateLanguage();
    return set("Choosing something to learn");
  }
  if (path[0] === "practice") return set("Practicing everything learned");
  if (path[0] === "skill") {
    if (path.length < 3) return;

    const lesson = path[2]
      .replace(/([a-z]+)([A-Z]|-\d)/g, "$1 $2")
      .replace(/-(\d)/g, "$1");
    if (path.length >= 4) {
      if (path[3] === "tips") return set(`Reading tips for ${lesson}`);
      if (path[3] === "practice") return set(`Practicing ${lesson}`);
      if (path[3] === "test") return set(`Testing out of ${lesson}`);
    }
    return set(`In a lesson: ${lesson}`);
  }
  if (path[0] === "shop") return set("In the shop");
  if (path[0] === "words") return set("Viewing all learned words");
  if (path[0] === "stories") {
    if (path.length < 2) return set("Choosing a story to read");

    const selector = `body > ${"div > ".repeat(11)} .phrase`,
      phrases = document.querySelectorAll(selector);
    if (phrases.length !== 0) {
      const storyName = Array.from(phrases)
        .map((p) => p.textContent)
        .join(" ");
      return set(`Reading ${storyName}`);
    }
    return set("Reading a story");
  }
  if (path[0] === "mistakes-review") return set("Reviewing past mistakes");
  if (path[0] === "checkpoint") {
    if (path.length < 4) return;

    const checkpoint = parseInt(path[2], 10) + 1;
    if (path[3] === "practice")
      return set(`Practicing Checkpoint ${checkpoint}`);
    if (path[3] === "bigtest")
      return set(`Taking the Checkpoint ${checkpoint} test`);
    return;
  }

  return false;
}

function checkStartingPages(path: string[]): boolean {
  function set(state: string) {
    presenceData.details = "Getting started";
    presenceData.state = state;
    return true;
  }

  if (path[0] === "register") return set("Choosing a language");
  if (path[0] === "welcome") return set("Answering some questions");
  if (path[0] === "placement") return set("Taking the placement test");

  return false;
}

function determineText(path: string[]) {
  if (checkBasicPages(path)) return;
  if (checkLearningPages(path)) return;
  if (checkStartingPages(path)) return;
}

presence.on("UpdateData", async () => {
  if (!language.imageKey || !language.name) {
    delete presenceData.smallImageKey;
    delete presenceData.smallImageText;
  } else {
    presenceData.smallImageKey = language.imageKey;
    presenceData.smallImageText = `Learning ${language.name}`;
  }
  delete presenceData.details;
  delete presenceData.state;

  let path = decodeURI(window.location.pathname).split("/");
  path = path.filter((p) => p !== "");

  determineText(path);
  presence.setActivity(presenceData);
});
