const presence = new Presence({
    clientId: "938732156346314795"
}), user = document.cookie.split(";").find(val => val.startsWith("letterboxd")).split("=")[1]

let details = "";

type Show = { d: string, s?: string };

presence.on("UpdateData", async () => {
    const path = document.location.pathname.slice(1).split("/"); path.pop();

    let pd: PresenceData = {
        largeImageKey: "final",
        startTimestamp: Date.now(),
        buttons: [{ label: "View", url: window.location.href }]
    }

    switch (path.length) {
        case 0: pd.details = "At home"; break;

        case 1: pd.details = "Viewing " + (path[0] == "journal" ? "the journal" : path[0]); break;

        case 2:
            switch (path[0]) {
                case "film":
                    const header = (tag: string) => document.getElementById("featured-film-header").getElementsByTagName(tag)
                    const title = (header("h1")[0] as HTMLElement).innerText;

                    pd.details = title + ", " + (header("a")[0] as HTMLElement).innerText;
                    pd.state = "By " + (header("a")[1] as HTMLElement).innerText;
                    pd.buttons = [{ label: "View " + title, url: window.location.href }]

                    break;

                case "films": pd.details = `Viewing ${path[1]} films`; break;

                case "activity":
                    if (path[1] == "you") pd.details = "Viewing personal activity"
                    else pd.details = "Viewing incoming activity";

                    break;

                case user.toLowerCase() || user:
                    switch (path[1]) {
                        case "films": pd.details = "Viewing their films"; break;
                        case "watchlist": pd.details = "Viewing their watchlist"; break;
                        case "lists": pd.details = "Viewing their own lists"; break;
                        case "liked": pd.details = "Viewing their liked films"; break;
                        case "tags": pd.details = "Viewing their tagged films"; break;
                        case "following": pd.details = "Viewing who they're following"; break;
                        case "followers": pd.details = "Viewing their followers"; break;
                        case "blocked": pd.details = "Viewing who they've blocked"; break;
                    }

                    break;
            } break;

        case 3:
            switch (path[0]) {
                case user.toLowerCase() || user:
                    pd.details = `Viewing their ${path[1] == "tags" ? "tagged" : ""} ${path[2]}`
                    break;

                default:
                    if (path[1] == "film") {
                        const title = document.getElementsByClassName("film-title-wrapper")[0]
                            .getElementsByTagName("a")[0]
                            .innerText
                        const spans = document.getElementsByTagName("span");
                        let rater = "", rating = "";


                        for (let i = 0; i < spans.length; i++) {
                            if (spans[i].getAttribute("itemprop") == "name")
                                rater = spans[i].innerText
                            if (spans[i].className.startsWith("rating"))
                                rating = spans[i].innerText
                        }

                        pd.details = "Review of " + title
                        pd.state = `By ${rater} (${rating})`
                        pd.buttons = [{ label: "View review", url: window.location.href }]
                    }
            }

            break;

        default:
            switch (path[0]) {
                case user.toLowerCase() || user:

                    break;
            }
    }

    if (details != pd.details) {
        presence.setActivity(pd);
        details = pd.details;
    }
});