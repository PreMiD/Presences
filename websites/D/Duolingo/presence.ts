const presence = new Presence({
    clientId: "909577563234508910"
}),
    FLAG_ICONS = [
        "ar", "ca", "cs", "cy", "da", "de", "dn", "el",
        "en", "eo", "es", "fr", "ga", "gn", "he", "hi",
        "hu", "hv", "hw", "id", "it", "ja", "kl", "ko",
        "nb", "nv", "pl", "pt", "ro", "ru", "sv", "sw",
        "tr", "uk", "vi", "zs"
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
    language = { imageKey: "icon", name: "nothing (yet!)" };

function updateLanguage() {
    const state = JSON.parse(window.localStorage.getItem("duo.state")),
        courseId = state?.user?.currentCourseId;
    if (!courseId)
        return;

    const course = state.courses?.[courseId];
    if (!course)
        return;

    const languageId = course.learningLanguage;
    if (FLAG_ICONS.includes(languageId))
        language.imageKey = `flag_${languageId}`;
    else if (languageId)
        language.imageKey = "flag_unknown";
    else
        language.imageKey = "icon";
    language.name = course.title ?? "nothing (yet!)";
}
updateLanguage();
setInterval(updateLanguage, 1000);

function checkBasicPages(path: string[]) {
    if (path.length === 0) {
        const url = new URL(document.location.href);
        if (url.searchParams.get("isLoggingIn") === "true") {
            presenceData.details = "Logging in";
            return;
        }
        presenceData.details = "Viewing the home page";
        return;
    }
    if (INFO_PAGES.includes(path[0])) {
        presenceData.details = `Viewing the ${path[0]} page`;
        return;
    }
    if (path[0] === "courses") {
        presenceData.details = "Viewing available courses";
        return;
    }
    if (path[0] === "abc") {
        presenceData.details = "Looking into Duolingo ABC";
        return;
    }
    if (path[0] === "plus") {
        presenceData.details = "Looking into Duolingo Plus";
        return;
    }
    if (path[0] === "dictionary") {
        presenceData.details = "Looking up a word";
        if (path.length >= 3)
            presenceData.state = `${path[1]}: ${path[2]}`;
        return;
    }
    if (path[0] === "profile") {
        if (path.length < 2)
            return;
        presenceData.details = "Viewing a profile";
        [, presenceData.state] = path;
        if (path.length >= 3) {
            presenceData.details += " section";
            presenceData.state += `'s ${path[2]}`;
        }
        return;
    }
    if (path[0] === "friend-updates") {
        presenceData.details = "Viewing friend updates";
        return;
    }
    if (path[0] === "user-search") {
        presenceData.details = "Searching for a user";
        return;
    }
    if (path[0] === "settings") {
        presenceData.details = "Adjusting settings";
        if (path.length >= 2) {
            let [, page] = path;
            page = page.charAt(0).toUpperCase() + page.slice(1);
            presenceData.state = `Section: ${page}`;

        }
        return;
    }
    if (document.title.startsWith("Error")) {
        presenceData.details = "Watching Duo cry :(";
        presenceData.state = document.title;
        return;
    }
    if (API_ENDPOINTS.includes(path[0])) {
        presenceData.details = "Viewing an API response";
        presenceData.state = `Endpoint: /${path[0]}`;
        return;
    }
}

function checkLearningPages(path: string[]) {
    function set(details: string) {
        presenceData.details = details;
        presenceData.state = `Learning ${language.name}`;
    }

    if (path[0] === "learn") {
        // Update the language in case the user just logged in
        updateLanguage();
        return set("Choosing something to learn");
    }
    if (path[0] === "practice")
        return set("Practicing everything learned");
    if (path[0] === "skill") {
        if (path.length < 3)
            return;

        const lesson = path[2]
            .replace(/([a-z]+)([A-Z]|-\d)/g, "$1 $2")
            .replace(/-(\d)/g, "$1");
        if (path.length >= 4) {
            if (path[3] === "tips")
                return set(`Reading tips for ${lesson}`);
            if (path[3] === "practice")
                return set(`Practicing ${lesson}`);
            if (path[3] === "test")
                return set(`Testing out of ${lesson}`);
        }
        return set(`In a lesson: ${lesson}`);
    }
    if (path[0] === "shop")
        return set("In the shop");
    if (path[0] === "words")
        return set("Viewing all learned words");
    if (path[0] === "stories") {
        if (path.length < 2)
            return set("Choosing a story to read");

        const selector = `body > ${"div > ".repeat(11)} .phrase`,
            phrases = document.querySelectorAll(selector);
        let storyName = "";
        if (phrases.length !== 0) {
            for (const phrase of phrases)
                storyName += phrase.textContent;
            return set(`Reading ${storyName}`);
        }
        return set("Reading a story");
    }
    if (path[0] === "mistakes-review")
        return set("Reviewing past mistakes");
    if (path[0] === "checkpoint") {
        if (path.length < 4)
            return;

        const checkpoint = parseInt(path[2], 10) + 1;
        if (path[3] === "practice")
            return set(`Practicing Checkpoint ${checkpoint}`);
        if (path[3] === "bigtest")
            return set(`Taking the Checkpoint ${checkpoint} test`);
        return;
    }
}

function checkStartingPages(path: string[]) {
    function set(state: string) {
        presenceData.details = "Getting started";
        presenceData.state = state;
    }

    if (path[0] === "register")
        return set("Choosing a language");
    if (path[0] === "welcome")
        return set("Answering some questions");
    if (path[0] === "placement")
        return set("Taking the placement test");
}

presence.on("UpdateData", async () => {
    presenceData.smallImageKey = language.imageKey;
    presenceData.smallImageText = `Learning ${language.name}`;
    delete presenceData.details;
    delete presenceData.state;

    let path = decodeURI(window.location.pathname).split("/");
    path = path.filter(p => p !== "");

    checkBasicPages(path);
    checkLearningPages(path);
    checkStartingPages(path);

    presence.setActivity(presenceData);
});
