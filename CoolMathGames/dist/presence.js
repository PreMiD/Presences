const presence = new Presence({
    clientId: "630561466872889344"
});
var elapsed, oldUrl;
presence.on("UpdateData", async () => {
    if (window.location.href !== oldUrl) {
        oldUrl = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    var details = undefined, state = undefined, startTimestamp = elapsed;
    var path = window.location.pathname;
    if (path === "/") {
        details = "Browsing...";
    }
    else if (path.match("/user") || path.match("/signup")) {
        if (path.match("signup")) {
            details = "Signing up...";
        }
        else {
            details = "Logging in...";
        }
    }
    else if (path.match("/terms-use")) {
        details = "Viewing Terms of Use";
    }
    else if (path.match("/trivia")) {
        details = "Viewing Trivia";
        var title = document.querySelector("#start-the-quiz-title");
        if (title) {
            state = title.textContent;
        }
    }
    else {
        var playlists = document.querySelector(".playlists-queue-wrapper");
        var breadcrumb = document.querySelector(".pane-content > .breadcrumb > ol");
        var breadcrumb_last = document.querySelector(".pane-content > .breadcrumb > ol > li:last-child > span");
        var difficulty = document.querySelector("a.active");
        if (breadcrumb && breadcrumb_last && difficulty) {
            details = "Viewing Jigsaw Puzzle";
            state = `${breadcrumb_last.textContent} (${difficulty.textContent})`;
        }
        else if (breadcrumb && breadcrumb_last) {
            details = "Viewing Jigsaw Puzzles";
            state = breadcrumb_last.textContent;
        }
        else if (playlists) {
            details = "Viewing Category";
            state = "Jigsaw Puzzles";
        }
        else {
            var parsedData = parse(path);
            if (parsedData) {
                var type = parsedData[0];
                var name = parsedData[1];
                switch (type) {
                    case PageType.Category:
                        details = "Viewing Category";
                        break;
                    case PageType.Game:
                        details = "Viewing Game";
                        break;
                    default:
                        break;
                }
                state = name;
            }
        }
    }
    var data = {
        details: details,
        state: state,
        largeImageKey: "coolmathgames",
        startTimestamp: startTimestamp
    };
    presence.setActivity(data);
});
var PageType;
(function (PageType) {
    PageType[PageType["Game"] = 0] = "Game";
    PageType[PageType["Category"] = 1] = "Category";
})(PageType || (PageType = {}));
const parse = (path) => {
    path = path.replace("/", "");
    var split = path.split("-");
    return [parseInt(split[0]), capitalize(split.slice(1))];
};
const capitalize = (text) => {
    return text
        .map(str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    })
        .join(" ");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUVwQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNuQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUNyQixLQUFLLEdBQUcsU0FBUyxFQUNqQixjQUFjLEdBQUcsT0FBTyxDQUFDO0lBRTNCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRXBDLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNoQixPQUFPLEdBQUcsYUFBYSxDQUFDO0tBQ3pCO1NBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sR0FBRyxlQUFlLENBQUM7U0FDM0I7YUFBTTtZQUNMLE9BQU8sR0FBRyxlQUFlLENBQUM7U0FDM0I7S0FDRjtTQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNuQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDbEM7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