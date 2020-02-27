const presence = new Presence({
    clientId: "631166262881550359",
    mediaKeys: false
});
let presenceData: presenceData = {
    largeImageKey: "logo"
};
let startTimestamp: number;

presence.on("UpdateData", async () => {
    if (document.location.hostname === "aternos.org") {
        const panel = document.querySelector("base[href=\"/panel/\"]");
        if (panel) {
            let path = document.location.pathname;
            if (path === "/go/") {
                startTimestamp = null;
                delete presenceData.startTimestamp;
                presenceData.details = "Login Page";
            } else {
                if (!startTimestamp) startTimestamp = Date.now();
                path = toTitleCase(document.location.pathname.split("/")[1]);
                presenceData.details = `Configuring Server - ${path}`;
                presenceData.startTimestamp = startTimestamp;
            };
        } else {
            presenceData.details = "Home Page";
        };
    } else {
        const page = document.location.hostname.split(".")[0];
        presenceData.startTimestamp = Date.now();
        switch (page) {
            case "support":
                if (document.location.pathname.includes("categories")) {
                    let category = document.querySelector(".page-header h1");
                    if (category) {
                        presenceData.details = `Help Center - Viewing category:`;
                        presenceData.state = category.textContent;
                    };
                } else if (document.location.pathname.includes("sections")) {
                    let section = document.querySelector(".page-header h1");
                    if (section) {
                        presenceData.details = `Help Center - Viewing section:`;
                        presenceData.state = section.textContent.trim();
                    };
                } else if (document.location.pathname.includes("articles")) {
                    let article = document.querySelector(".article-title");
                    if (article) {
                        presenceData.details = `Help Center - Viewing article:`;
                        presenceData.state = article.textContent.trim();
                    };
                } else if (document.location.pathname.includes("search")) {
                    let article: HTMLInputElement = document.querySelector("#query");
                    presenceData.details = `Help Center - Searching:`;
                    presenceData.state = article.value;
                } else {
                    presenceData.details = "Help Center";
                };
                break;
            case "board":
                presenceData.startTimestamp = Date.now();
                presenceData.details = "Community Forums";
                break;
        };
    };
    presence.setActivity(presenceData);
});

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};