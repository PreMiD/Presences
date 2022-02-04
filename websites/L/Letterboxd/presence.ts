const presence = new Presence({
    clientId: "938732156346314795"
}),
    user = document.cookie.split(";").find(val => val.startsWith("letterboxd")).split("=")[1]

let details = "";

type Show = { d: string, s?: string };

function clarifyString(str: string) {
    return str
        .replaceAll(String.fromCharCode(160), " ")
        .replaceAll(String.fromCharCode(8217), "'");
}

function getImageURLByAlt(alt: string) {
    const imgs = document.getElementsByTagName("img");

    for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].alt == alt) {
            return imgs[i].src
        }
    }
}

function filterIterable<T extends Element>(itr: HTMLCollectionOf<T>, fnc: (val: T, ind?: number) => boolean) {
    for (let i = 0; i < itr.length; i++) {
        if (fnc(itr[i], i)) return itr[i]
    }
}

presence.on("UpdateData", async () => {
    const path = document.location.pathname.slice(1).split("/"); path.pop();

    let pd: PresenceData = {
        largeImageKey: "final",
        startTimestamp: Date.now(),
        buttons: [{ label: "View", url: window.location.href }]
    }

    if (path[0]) switch (path[0]) {
        case "lists": pd.details = "Viewing all lists"; break;
        case "members": pd.details = "Viewing all members"; break;
        case "journal": pd.details = "Viewing the journal"; break;
        case "search": pd.details = "Searching for " + path[1].replaceAll("+", " "); break;

        case "settings": {
            const small_pfp = getImageURLByAlt(user)

            pd.details = "Changing their settings";
            pd.smallImageKey = small_pfp;
            pd.buttons = undefined

            break;
        }

        case "list": {
            const small_pfp = getImageURLByAlt(user)

            pd.details = "Creating a list";
            pd.smallImageKey = small_pfp;
            pd.buttons = undefined

            break;
        }

        case "invitations": {
            const small_pfp = getImageURLByAlt(user)

            pd.details = "Viewing their invitations";
            pd.smallImageKey = small_pfp;
            pd.buttons = undefined

            break;
        }

        case "actor":
        case "director": {
            const name = (document.getElementsByClassName("title-1 prettify")[0] as HTMLHeadingElement)
                .innerText.replace(path[0] == "director" ? "FILMS DIRECTED BY\n" : "FILMS STARRING\n", "");
            const pfp = ((document.getElementsByClassName("avatar person-image image-loaded")[0] as HTMLDivElement)
                .firstElementChild as HTMLImageElement).src;

            pd.details = `Viewing ${path[0] == "director" ? "director" : "actor"}: ${name}`;
            pd.largeImageKey = pfp;
            pd.smallImageKey = "final";
            pd.buttons = [{ label: "View " + name, url: window.location.href }]

            break;
        }

        case "activity": {
            const name = (document.getElementsByClassName("title-3")[0]
                .firstElementChild as HTMLAnchorElement).innerText
            const small_pfp = getImageURLByAlt(name);

            pd.smallImageKey = small_pfp;
            pd.smallImageText = name;

            if (path[1]) switch (path[1]) {
                case "you": pd.details = "Viewing personal activity"; break;
                case "incoming": pd.details = "Viewing incoming activity"; break;
            } else pd.details = "Viewing all activity";

            break;
        }

        case "films": {
            if (path[1]) switch (path[1]) {
                case "upcoming": pd.details = "Viewing upcoming films"; break;
                case "popular": pd.details = "Viewing popular films"; break;
                case "genre": pd.details = `Viewing ${path[2] ? path[2] : "unknown"} films`; break;
                case "decade": pd.details = `Viewing films from the ${path[2] ? path[2] : "unknown"}`

            } else pd.details = "Viewing films";

            if (!pd.details) pd.details = "Viewing films";

            break;
        }

        case "film": {
            if (path[2]) {
                const title = (document.getElementsByClassName("contextual-title")[0]
                    .firstElementChild.firstElementChild
                    .nextElementSibling as HTMLAnchorElement)
                const year = (title.nextElementSibling.firstElementChild as HTMLAnchorElement).innerText

                switch (path[2]) {
                    case "members": pd.details = `Viewing people who have seen ${title.innerText}, ${year}`; break;
                    case "fans": pd.details = `Viewing fans of ${title.innerText}, ${year}`; break;
                    case "likes": pd.details = `Viewing people who have liked ${title.innerText}, ${year}`; break;
                    case "ratings": pd.details = `Viewing ratings of ${title.innerText}, ${year}`; break;
                    case "reviews": pd.details = `Viewing reviews of ${title.innerText}, ${year}`; break;
                    case "lists": pd.details = `Viewing lists that include ${title.innerText}, ${year}`; break;
                }

                pd.largeImageKey = getImageURLByAlt(clarifyString(title.innerText));
                pd.smallImageKey = "final";

            } else if (path[1]) {
                const header = (tag: string) => document.getElementById("featured-film-header").getElementsByTagName(tag)
                const title = clarifyString((header("h1")[0] as HTMLElement).innerText)


                pd.details = title + ", " + (header("a")[0] as HTMLElement).innerText;
                pd.state = "By " + (header("a")[1] as HTMLElement).innerText;
                pd.buttons = [{ label: "View " + title, url: window.location.href }]
                pd.largeImageKey = getImageURLByAlt(title);
                pd.smallImageKey = "final"
            }

            break;
        }

        default:
            if (path[1]) {
                switch (path[1]) {
                    case "watchlist": pd.details = "Viewing their watchlist"; break;
                    case "lists": pd.details = "Viewing their lists"; break;
                    case "likes": pd.details = "Viewing their liked films"; break;
                    case "following": pd.details = "Viewing who they've followed"; break;
                    case "followers": pd.details = "Viewing their followers"; break;
                    case "blocked": pd.details = "Viewing who they've blocked"; break;

                    case "activity": {
                        if (path[2]) pd.details = "Viewing who they've followed's activity";
                        else pd.details = "Viewing their activity";

                        break;
                    }

                    case "films": {
                        if (path[2]) switch (path[2]) {
                            case "reviews": pd.details = "Viewing their reviews"; break;
                            case "ratings": pd.details = "Viewing their ratings"; break;
                            case "diary": pd.details = "Viewing their diary"; break;

                        } else pd.details = "Viewing their films";

                        break;
                    }

                    case "tags": {
                        if (path[2]) switch (path[2]) {
                            case "diary": pd.details = "Viewing their diary tags"; break;
                            case "reviews": pd.details = "Viewing their tagged reviews"; break;
                            case "lists": pd.details = "Viewing their tagged lists"; break;

                        } else pd.details = "Viewing their tagged films";

                        break;
                    }

                    case "stats": {
                        const name = document.getElementsByClassName("yir-member-subtitle")[0].lastElementChild as HTMLAnchorElement;
                        const pfp = (name.previousElementSibling.firstElementChild as HTMLImageElement).src;

                        pd.details = `Viewing ${name.innerText}'s statistics`;
                        pd.largeImageKey = pfp;
                        pd.smallImageKey = "final";
                        pd.buttons = [{ label: `View ${name.innerText}'s stats`, url: window.location.href }]

                        break;
                    }

                    case "list": {
                        const title = (document.getElementsByClassName("title-1 prettify")[0] as HTMLHeadingElement).innerText
                        const name = (document.getElementsByClassName("name")[0]
                            .firstElementChild as HTMLSpanElement).innerText;
                        const small_pfp = getImageURLByAlt(name);

                        pd.details = `Viewing the list ${title}`;
                        pd.state = `By ${name}`;
                        pd.smallImageKey = small_pfp;
                        pd.smallImageText = name;

                        break;
                    }

                    case "friends": {
                        const title = (document.getElementsByClassName("contextual-title")[0]
                            .firstElementChild.firstElementChild
                            .nextElementSibling as HTMLAnchorElement)
                        const year = (title.nextElementSibling.firstElementChild as HTMLAnchorElement).innerText

                        if (path[4]) switch (path[4]) {
                            case "ratings": pd.details = `Viewing friends' ratings of ${title.innerText}, ${year}`; break;
                            case "reviews": pd.details = `Viewing friends' reviews of ${title.innerText}, ${year}`; break;
                            case "lists": pd.details = `Viewing friends' lists that include ${title.innerText}, ${year}`; break;

                            case "fans":
                                pd.details = "Viewing friends who are fans of...";
                                pd.state = `${title.innerText}, ${year}`;

                                break;

                            case "likes":
                                pd.details = "Viewing friends who have liked...";
                                pd.state = `${title.innerText}, ${year}`;

                                break;

                        } else pd.details = "Viewing friends who have seen..."; pd.state = `${title.innerText}, ${year}`;

                        pd.largeImageKey = getImageURLByAlt(clarifyString(title.innerText));
                        pd.smallImageKey = "final";

                        break;
                    }

                    case "film": {
                        const title = clarifyString((document.getElementsByClassName("film-title-wrapper")[0]
                            .firstElementChild as HTMLAnchorElement)
                            // Once again...
                            .innerText)

                        const rater = filterIterable(document.getElementsByTagName("span"), val => {
                            if (val.getAttribute("itemprop") == "name") return true
                        }).innerText;

                        const rating = filterIterable(document.getElementsByTagName("span"), val => {
                            if (val.className.startsWith("rating rating-large")) return true
                        }).innerText;

                        pd.details = "Review of " + title
                        pd.state = `By ${rater} (${rating})`
                        pd.buttons = [{ label: "View review", url: window.location.href }]
                        pd.largeImageKey = getImageURLByAlt(title);
                        pd.smallImageKey = getImageURLByAlt(rater);
                        pd.smallImageText = rater;

                        break;
                    }
                }

                if (["watchlist", "films", "activity",
                    "blocked", "followers", "following",
                    "tags", "likes", "lists"]
                    .includes(path[1])) {
                    const name = (document.getElementsByClassName("title-3")[0]
                        .firstElementChild as HTMLAnchorElement).innerText
                    const small_pfp = getImageURLByAlt(name);

                    if (path[0] != user && path[0] != user.toLowerCase())
                        pd.details = pd.details.replace("their", name + "'s").replace("they've", name + " has")

                    pd.smallImageKey = small_pfp;
                    pd.smallImageText = name;
                }

            } else {
                const name = (document.getElementsByClassName("title-1")[0] as HTMLHeadingElement).innerText
                // I could use the get image func but ID is available so its fine (smaller loop (I think))
                const pfp = (document.getElementById("avatar-zoom").previousElementSibling as HTMLImageElement)

                pd.details = `Viewing ${path[0] == user ? "their own" : name + "'s"} profile`
                pd.state = `(${path[0] == user ? `${name}/${path[0]}` : path[0]})`
                pd.largeImageKey = pfp.src;
                pd.smallImageKey = "final";
                pd.buttons = [{ label: "View " + name, url: window.location.href }]

                break;
            }
    } else pd.details = "At home";

    if (!(await presence.getSetting("show_buttons"))) pd.buttons = undefined;

    if (details != pd.details) {
        presence.setActivity(pd);
        details = pd.details;
    }
});