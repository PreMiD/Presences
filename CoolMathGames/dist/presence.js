const presence = new Presence({
    clientId: "630561466872889344"
});
var PageType;
(function (PageType) {
    PageType[PageType["Game"] = 0] = "Game";
    PageType[PageType["Category"] = 1] = "Category";
})(PageType || (PageType = {}));
const capitalize = (text) => {
    return text
        .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    })
        .join(" ");
};
const parse = (path) => {
    path = path.replace("/", "");
    var split = path.split("-");
    return [split[0], capitalize(split.slice(1))];
};
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
            var type = parseInt(parsedData[0]);
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
    var data = {
        details: details,
        state: state,
        largeImageKey: "coolmathgames",
        startTimestamp: startTimestamp
    };
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUssUUFHSjtBQUhELFdBQUssUUFBUTtJQUNYLHVDQUFRLENBQUE7SUFDUiwrQ0FBWSxDQUFBO0FBQ2QsQ0FBQyxFQUhJLFFBQVEsS0FBUixRQUFRLFFBR1o7QUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQW1CLEVBQVUsRUFBRTtJQUNqRCxPQUFPLElBQUk7U0FDUixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBWSxFQUFpQixFQUFFO0lBQzVDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QixJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUzQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFFRixJQUFJLE9BQU8sRUFBRSxNQUFNLENBQUM7QUFFcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxNQUFNLENBQUMsUUFBUSxD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