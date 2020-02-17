var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
        clientId: "633419305836347393"
    }),
    pages = {
        "/games": "Games",
        "/login": "Login",
        "/join": "Register",
        "/terms": "Terms of Use",
        "/privacy": "Privacy Policy",
        "/cookies": "Cookie Policy",
        "/welcome": "Just Registered!",
        "/discover": "Explore",
        "/client": "Client",
        "/forums": "Forums",
        "/notifications": "Notifications",
        "/library": "Game Library",
        "/dashboard/profile/edit": "Edit Profile",
        "/settings": "Settings",
        "/dashboard/games/add": "Add a Game"
    };

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        gameName = document.querySelector("#content > div > div > div > div > header > section > div.container > div.row > div > div > h1 > a"),
        author = document.querySelector("#content > div > div > div > div > header > section > div.container > div.row > div > div > div > a > small"),
        profile = document.querySelector("#content > div > div > header > section > div > div.row > div > div > h1 > small");

    let data = {
        largeImageKey: "gj-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    if (page.includes("/games/tag-")) {
        const tagName = page.replace("/games/tag-", "");

        data.details = "Browsing games by tag:"
        data.state = tagName[0].toUpperCase() + tagName.slice(1);
    } else if (page.includes("/games/") && gameName && gameName.textContent !== "") {
        data.details = `Viewing a game${author && author.textContent !== "" ? " by " + author.textContent : ""}:`
        data.state = gameName.textContent.trim();
    } else if (pages[page] || pages[page.slice(0, -1)]) {
        data.details = "Viewing a page:"
        data.state = pages[page] || pages[page.slice(0, -1)];
    } else if (page.includes("/search")) {
        const fixedSearchName = document.title.replace(" - Game Jolt", "").replace("Search results for ", "");

        data.details = `Searching for${page.includes("/search/users") ? " a user" : `${page.includes("/search/games") ? " a game" : ""}`}:`
        data.state = fixedSearchName[0].toUpperCase() + fixedSearchName.slice(1);
        data.smallImageKey = "search";
    } else if (profile && profile.textContent != "") {
        data.details = `Viewing a user:`
        data.state = profile.textContent;
    } else {
        data.details = "Viewing a page:"
        data.state = "Home"
    }

    if (data.details && data.state && data.details != "" && data.state != "") presence.setActivity(data);
}));