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
    var ret = "";
    text.map(text => {
        ret += text.charAt(0).toUpperCase() + text.slice(1) + " ";
    });
    return ret;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUVwQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNwQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxPQUFPLEdBQUcsU0FBUyxFQUN0QixLQUFLLEdBQUcsU0FBUyxFQUNqQixjQUFjLEdBQUcsT0FBTyxDQUFDO0lBRTFCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBRXBDLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtRQUNqQixPQUFPLEdBQUcsYUFBYSxDQUFDO0tBQ3hCO1NBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDeEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sR0FBRyxlQUFlLENBQUM7U0FDMUI7YUFBTTtZQUNOLE9BQU8sR0FBRyxlQUFlLENBQUM7U0FDMUI7S0FDRDtTQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNwQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDakM7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