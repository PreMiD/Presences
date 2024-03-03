const presence = new Presence({
    clientId: "1213365863470866462",
});

const enum Assets {
    Logo = "https://i.imgur.com/4hrNGBS.png",
}

let browsingTimestamp: number;

function updatePresence() {
    if (!browsingTimestamp) {
        browsingTimestamp = Math.floor(Date.now() / 1000);
    }
    
    let presenceData: PresenceData = {
        largeImageKey: Assets.Logo,
        startTimestamp: browsingTimestamp
    };

    const pages: Record<string, PresenceData> = {
        "/charts/": {
            details: "Viewing Chart:",
        },
        "/new-music/": {
            details: "New Releases",
        },
        "/genres/": {
            details: "Genres",
        },
        "/lists/": {
            details: "Lists",
        },
        "/subscribe/": {
            details: "Subscribe",
        },
        "/": {
            details: "Home",
        },
    };

    //chart page
    if (location.pathname.startsWith("/charts/")) {
        const chartNameElement = document.getElementById("page_charts_section_charts_header_chart_name");
        if (chartNameElement) {
            const chartName = chartNameElement.textContent?.trim();
            if (chartName) {
                presenceData.details = "Viewing Chart:";
                presenceData.state = chartName;
            }
        }
    }

    //account page
    if (location.pathname.startsWith("/account/")) {
        presenceData.details = "Account";
    }

    //recs page
    if (location.pathname.startsWith("/recs/to/") || location.pathname.startsWith("/recs/from/")) {
        const username = location.pathname.split("/")[3];
        presenceData.details = "Viewing User Recs:";
        presenceData.state = username;
    }

    //play history page
    if (location.pathname.startsWith("/play-history/")) {
        const username = location.pathname.split("/")[2];
        presenceData.details = "Viewing Play History:";
        presenceData.state = `${username}`;
    }

    //user stats page
    if (location.pathname.startsWith("/stats/userstats")) {
        const username = new URLSearchParams(location.search).get("user");
        presenceData.details = "Viewing User Stats:";
        presenceData.state = username;
    }

    //messages page
    if (location.pathname.startsWith("/messages/")) {
        presenceData.details = "Messages";
    }

    //development page
    if (location.pathname.startsWith("/development/")) {
        presenceData.details = "Development";
    }

    //RYMzilla page
    if (location.pathname.startsWith("/rymzilla/")) {
        presenceData.details = "RYMzilla";
    }

    //wiki page
    if (location.pathname.startsWith("/wiki/")) {
        presenceData.details = "Wiki";
    }

    //privacy page
    if (location.pathname.startsWith("/privacy/")) {
        presenceData.details = "Privacy Policy";
    }

    //tos page
    if (location.pathname.startsWith("/tos/")) {
        presenceData.details = "Terms of Service";
    }

    //contact page
    if (location.pathname.startsWith("/contact/")) {
        presenceData.details = "Support / Feedback";
    }

    //latest reviews page
    if (location.pathname.startsWith("/latest")) {
        const dateElement = document.querySelector("h4");
        if (dateElement) {
            const date = dateElement.textContent?.trim();
            presenceData.details = "Latest Reviews";
            presenceData.state = date;
        }
    }

    //feature page
    if (location.pathname.startsWith("/feature/")) {
        const featureTitleElement = document.querySelector("h1");
        if (featureTitleElement) {
            const featureTitle = featureTitleElement.textContent?.trim();
            presenceData.details = "Viewing Feature:";
            presenceData.state = featureTitle;
        }
    }

    //recommendations page
    if (location.pathname.startsWith("/recommendations/")) {
        const username = location.pathname.split("/")[2];
        presenceData.details = "Viewing Recommendations:";
        presenceData.state = `${username}`;
    }

    //friends page
    if (location.pathname.startsWith("/friends/")) {
        const username = location.pathname.split("/")[2];
        presenceData.details = "Viewing Friends:";
        presenceData.state = username;
    }

    //label page
    if (location.pathname.startsWith("/label/")) {
        const labelNameElement = document.querySelector(".page_company_music_section_name_inner h1");
        if (labelNameElement) {
            const labelName = labelNameElement.textContent?.trim();
            presenceData.details = "Viewing Label:";
            presenceData.state = labelName;
        }
    }

    //work page
    if (location.pathname.startsWith("/work/")) {
        const workNameElement = document.querySelector("li#ui_breadcrumb_item_page_breadcrumb");
        if (workNameElement) {
            const workName = workNameElement.textContent?.trim();
            presenceData.details = "Viewing Work:";
            presenceData.state = workName;
        }
    }

    //review page
    if (location.pathname.startsWith("/music-review/")) {
        const albumNameElement = document.querySelector("a.album");
        const artistElement = document.querySelector("a.artist");
        const userElement = document.querySelector("a.user");
        if (albumNameElement && artistElement && userElement) {
            const albumName = albumNameElement.textContent?.trim();
            const artist = artistElement.textContent?.trim();
            const user = userElement.textContent?.trim();
            presenceData.details = "Viewing Review:";
            presenceData.state = `${albumName} by ${artist} | Review by ${user}`;
        }
    }

    //submissions page
    if (location.pathname.startsWith("/submissions/") || location.pathname.startsWith("/admin/") || location.pathname.startsWith("/artist/profile_history?scope=") || location.pathname.startsWith("/rgenre/")) {
        presenceData.details = "Submissions";
    }

    //genre page
    if (location.pathname.startsWith("/genre/")) {
        const genreNameElement = document.querySelector("#page_genre_section_name h1");
        if (genreNameElement) {
            const genreName = genreNameElement.textContent?.trim();
            if (genreName) {
                presenceData.details = "Viewing Genre:";
                presenceData.state = genreName;
            }
        }
    }

    //artist page
    if (location.pathname.startsWith("/artist/")) {
        const artistNameElement = document.querySelector("h1.artist_name_hdr");
        if (artistNameElement) {
            const artistName = artistNameElement.textContent?.trim();
            if (artistName) {
                presenceData.details = "Viewing Artist:";
                presenceData.state = artistName;
            }
        }
    }

    //user page
    if (location.pathname.startsWith("/~")) {
        const usernameElement = document.querySelector("#profilename");
        if (usernameElement) {
            const username = usernameElement.textContent?.trim();
            if (username) {
                presenceData.details = "Viewing User:";
                presenceData.state = username;
            }
        }
    }

    //list page
    if (location.pathname.startsWith("/list/")) {
        const listTitleElement = document.querySelector("h1[style='font-size:2.1em']");
        const listOwner = location.pathname.split("/")[2];
        if (listTitleElement) {
            const listTitle = listTitleElement.textContent?.trim();
            if (listTitle && listOwner) {
                presenceData.details = "Viewing List:";
                presenceData.state = `${listTitle} by ${listOwner}`;
            }
        }
    }

    //voting on descriptors page
    if (location.pathname.startsWith("/rdescriptor/set")) {
        const albumElement = document.querySelector("a.album");
        const artistElement = document.querySelector("a.artist");
        if (albumElement && artistElement) {
            const album = albumElement.textContent?.trim();
            const artist = artistElement.textContent?.trim();
            presenceData.details = "Voting on Descriptors";
            presenceData.state = `${album} by ${artist}`;
        }
    }

    //editing list page
    if (location.pathname.startsWith("/lists/edit")) {
        const listNameElement = document.querySelector("span");
        if (listNameElement) {
            presenceData.details = "Editing List:";
        }
    }

    //search page
    if (location.pathname.startsWith("/search")) {
        const searchTerm = new URLSearchParams(location.search).get("searchterm");
        if (searchTerm) {
            presenceData.details = "Searching for:";
            presenceData.state = searchTerm;
        }
    }

    //release page
    if (location.pathname.startsWith("/release/")) {
        const albumTitleElement = document.querySelector(".album_title");
        const artistElement = document.querySelector(".album_artist_small a.artist");
        if (albumTitleElement && artistElement) {
            const albumTitle = albumTitleElement.textContent?.trim();
            presenceData.details = `Viewing Release:`;
            presenceData.state = `${albumTitle}`;
        }
    }

    //collection page
    if (location.pathname.startsWith("/collection/")) {
        const collectionOwner = location.pathname.split("/")[2];
        presenceData.details = "Viewing Collection:";
        presenceData.state = `${collectionOwner}`;
    }

    //compatibility page
    if (location.pathname.startsWith("/find_similar_users")) {
        const username = new URLSearchParams(location.search).get("user");
        presenceData.details = "Viewing Compatibility:";
        presenceData.state = username;
    }

    for (const [path, data] of Object.entries(pages)) {
        if (location.pathname === path) {
            presenceData = { ...presenceData, ...data };
            break;
        }
    }

    presence.setActivity(presenceData);
}

updatePresence();

window.addEventListener("popstate", updatePresence);

setInterval(updatePresence, 10000);