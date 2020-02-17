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
        clientId: "632924426131996702"
    }),
    pages = {
        "/": "Home",
        "/learn": "Learn to Play Chess",
        "/practice": "Practice",
        "/training/coordinate": "Coordinate",
        "/study": "Study",
        "/coach": "Coaches",
        "/tv": "Lichess TV",
        "/games": "Current Games",
        "/streamer": "Streamers",
        "/broadcast": "Broadcasts",
        "/video": "Video Library",
        "/player": "Players",
        "/team/all": "Teams",
        "/forum": "Forums",
        "/analysis": "Analysis Board",
        "/editor": "Board Editor",
        "/paste": "Import Game",
        "/games/search": "Advanced Search"
    };

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        game = document.querySelector("#main-wrap > main > aside > div > section > div.game__meta__infos > div > div > div"),
        status = document.querySelector("#main-wrap > main > aside > div > section.status");

    let data = {
        largeImageKey: "lc-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    if (page && pages[page] || page && pages[page.slice(0, -1)]) {
        data.details = "Viewing a page:";
        data.state = pages[page] || pages[page.slice(0, -1)];
    } else if (page.includes("/training/")) {
        data.details = "Viewing a page:";
        data.state = "Training"
    } else if (page.includes("/@/")) {
        data.details = "Searching for:";
        data.state = document.title.replace(" • lichess.org", "");
        data.smallImageKey = "search";
    } else if (status && status.textContent != "" && game && game.textContent != "") {
        data.details = game.textContent.trim();
        data.state = status.textContent.trim();
    } else if (!status && game && game.textContent != "") {
        data.details = "Playing a game:";
        data.state = game.textContent.trim();
    }

    if (data.details && data.state && data.details != "" && data.state != "") presence.setActivity(data);
}));