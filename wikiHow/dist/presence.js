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
    clientId: "630570838084812801"
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const path = document.location.pathname,
        topic = document.querySelector("#intro > h1 > a"),
        category = document.querySelector("#article > div.wh_block > h1");

    if (topic && topic.textContent != "") {
        const author = document.querySelector("#expert_coauthor > a"),
            date = document.querySelector("#expert_coauthor > p"),
            presenceData = {
                details: topic.textContent,
                state: `by ${author && author.textContent != "" ? author.textContent : "unknown"}${date && date.textContent != "" ? ` (${date.textContent.replace("Updated: ", "")})` : ""} `,
                largeImageKey: "banner",
                smallImageKey: "logo",
                smallImageText: decodeURIComponent(document.location.href),
                startTimestamp: Math.floor(Date.now() / 1000)
            };

        presence.setActivity(presenceData);
    } else if (category && category.textContent != "") {
        const presenceData = {
                details: "Viewing a category:",
                state: category.textContent,
                largeImageKey: "banner",
                smallImageKey: "logo",
                smallImageText: decodeURIComponent(document.location.href),
                startTimestamp: Math.floor(Date.now() / 1000)
            };

        presence.setActivity(presenceData);
    } else if (path == "/index.php") {
        // Note that I (EGGSY) didn't work on this part, I don't know if it's working on the main site but I'm sure it doesn't work on Spanish version.
        const newTopic = document.getElementsByClassName("firstHeading")[0] ? document.getElementsByClassName("firstHeading")[0].textContent : null,
            presenceData = {
                details: "Editing/Writing How to",
                state: `Topic: ${newTopic ? newTopic : "Unknown."} `,
                largeImageKey: "banner",
                smallImageKey: "logo",
                smallImageText: decodeURIComponent(document.location.href),
                startTimestamp: Math.floor(Date.now() / 1000)
            };

        presence.setActivity(presenceData);
    } else if (path == "/wikiHowTo") {
        const searching = document.location.search.replace("?search=", ''),
            presenceData = {
                details: `Searching for:`,
                state: `${searching[0].toUpperCase() + searching.slice(1).toLowerCase()}`,
                largeImageKey: "banner",
                smallImageKey: "logo",
                smallImageText: "Searching...",
                startTimestamp: Math.floor(Date.now() / 1000)
            };

        presence.setActivity(presenceData);
    } else {
        const presenceData = {
            details: "Viewing a page:",
            state: "Homepage",
            largeImageKey: "banner",
            smallImageKey: "logo",
            startTimestamp: Math.floor(Date.now() / 1000)
        };

        presence.setActivity(presenceData);
    }
}));