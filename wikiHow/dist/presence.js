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
    const topic = document.getElementById("intro") && document.getElementById("intro").firstElementChild && document.getElementById("intro").firstElementChild.textContent ? document.getElementById("intro").firstElementChild.textContent : null,
        author = document.getElementById("expert_coauthor") && document.getElementById("expert_coauthor").children[0] && document.getElementById("expert_coauthor").children[0].innerText ? document.getElementById("expert_coauthor").children[0].innerText : null,
        date = document.getElementById("expert_coauthor") && document.getElementById("expert_coauthor").children[1] && document.getElementById("expert_coauthor").children[1].innerText ? document.getElementById("expert_coauthor").children[1].innerText : null;

    if (topic && author && date) {
        const presenceData = {
            details: topic,
            state: `by ${author} (${date}) `,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href
        };

        presence.setActivity(presenceData);
    } else if (document.location.pathname == "/index.php") {
        const newTopic = document.getElementsByClassName("firstHeading")[0] ? document.getElementsByClassName("firstHeading")[0].innerText : null;

        const presenceData = {
            details: "Editing/Writing How to",
            state: `Topic: ${newTopic ? newTopic : "Unknown."} `,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: Math.floor(Date.now() / 1000)
        };

        presence.setActivity(presenceData);

    } else if (document.location.pathname == "/wikiHowTo") {
        const searching = document.location.search.replace("?search=", '')

        const presenceData = {
            details: `Searching for:`,
            state: `${searching[0].toUpperCase() + searching.slice(1).toLowerCase()}`,
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: "searching",
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