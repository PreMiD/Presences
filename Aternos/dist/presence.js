var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "631166262881550359",
    mediaKeys: false
});
let presenceData = {
    largeImageKey: "logo"
};
let startTimestamp;
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.hostname === "aternos.org") {
        const panel = document.querySelector("base[href=\"/panel/\"]");
        if (panel) {
            let path = document.location.pathname;
            if (path === "/go/") {
                startTimestamp = null;
                delete presenceData.startTimestamp;
                presenceData.details = "Login Page";
            }
            else {
                if (!startTimestamp)
                    startTimestamp = Date.now();
                path = toTitleCase(document.location.pathname.split("/")[1]);
                presenceData.details = `Configuring Server - ${path}`;
                presenceData.startTimestamp = startTimestamp;
            }
            ;
        }
        else {
            presenceData.details = "Home Page";
        }
        ;
    }
    else {
        const page = document.location.hostname.split(".")[0];
        presenceData.startTimestamp = Date.now();
        switch (page) {
            case "support":
                if (document.location.pathname.includes("categories")) {
                    let category = document.querySelector(".page-header h1");
                    if (category) {
                        presenceData.details = `Help Center - Viewing category:`;
                        presenceData.state = category.textContent;
                    }
                    ;
                }
                else if (document.location.pathname.includes("sections")) {
                    let section = document.querySelector(".page-header h1");
                    if (section) {
                        presenceData.details = `Help Center - Viewing section:`;
                        presenceData.state = section.textContent.trim();
                    }
                    ;
                }
                else if (document.location.pathname.includes("articles")) {
                    let article = document.querySelector(".article-title");
                    if (article) {
                        presenceData.details = `Help Center - Viewing article:`;
                        presenceData.state = article.textContent.trim();
                    }
                    ;
                }
                else if (document.location.pathname.includes("search")) {
                    let article = document.querySelector("#query");
                    presenceData.details = `Help Center - Searching:`;
                    presenceData.state = article.value;
                }
                else {
                    presenceData.details = "Help Center";
                }
                ;
                break;
            case "board":
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Community Forums";
                break;
        }
        ;
    }
    ;
    presence.setActivity(presenceData);
}));
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDbkIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxZQUFZLEdBQWlCO0lBQzdCLGFBQWEsRUFBRSxNQUFNO0NBQ3hCLENBQUM7QUFDRixJQUFJLGNBQXNCLENBQUM7QUFFM0IsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssYUFBYSxFQUFFO1FBQzlDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUMvRCxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3RDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDakIsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDdEIsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsY0FBYztvQkFBRSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixJQUFJLEVBQUUsQ0FBQztnQkFDdEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7YUFDaEQ7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