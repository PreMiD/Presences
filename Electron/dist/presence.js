const presence = new Presence({
    clientId: "691406198091677737"
});
var user;
var title;
var replace;
var search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "logo"
    };
    var route = document.location.pathname.split("/");
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText =
        "Language : " +
            document.querySelector("a.site-header-nav-item.bordered.lang-select-button")
                .textContent;
    if (document.location.pathname === "/") {
        presenceData.details = "Home";
    }
    else if (document.location.pathname.includes("/apps")) {
        if (!route[2]) {
            presenceData.details = "Apps";
            presenceData.state = !parseQueryString(document.location.hash).q
                ? `Watching apps list ${!parseQueryString(document.location.hash).category
                    ? ""
                    : `(${parseQueryString(document.location.hash).category})`}`
                : `Searching ${parseQueryString(document.location.hash).q} ${!parseQueryString(document.location.hash).category
                    ? ""
                    : `(${parseQueryString(document.location.hash).category})`}`;
        }
        else {
            presenceData.details = "Watching app";
            presenceData.state = document.querySelector("h1.f00-light.lh-condensed.mb-3").textContent;
        }
    }
    else if (document.location.pathname.includes("/docs")) {
        if (!route[2]) {
            presenceData.details = document.querySelector("span.f0-light.mr-3.mr-lg-4").textContent;
        }
        else if (route[2] === "tutorial") {
            if (!route[3]) {
                presenceData.details = document.querySelector("h4.f3-light.docs-breadcrumbs").textContent;
            }
            else {
                presenceData.details = "Docs / Guides";
                presenceData.state = document
                    .querySelector("title")
                    .textContent.replace(" | Electron", "");
            }
        }
        else if (route[2] === "api") {
            if (!route[3]) {
                presenceData.details = document.querySelector("h4.f3-light.docs-breadcrumbs").textContent;
            }
            else if (route[3] === "structures") {
                if (!route[4]) {
                    presenceData.details = document.querySelector("h4.f3-light.docs-breadcrumbs").textContent;
                }
                else {
                    presenceData.details = "Docs / API Structures";
                    presenceData.state = document
                        .querySelector("title")
                        .textContent.replace(" | Electron", "");
                }
            }
            else {
                presenceData.details = "Docs / API";
                presenceData.state = document
                    .querySelector("title")
                    .textContent.replace(" | Electron", "");
            }
        }
        else if (route[2] === "development") {
            if (!route[3]) {
                presenceData.details = document.querySelector("h4.f3-light.docs-breadcrumbs").textContent;
            }
            else {
                presenceData.details = "Docs / Development";
                presenceData.state = document
                    .querySelector("title")
                    .textContent.replace(" | Electron", "");
            }
        }
    }
    else if (document.location.pathname.includes("/blog")) {
        if (!route[2]) {
            presenceData.details = document.querySelector("h1.f00-light").textContent;
        }
        else {
            var title = document.querySelector("title").textContent.split(" | ");
            presenceData.details = title[1];
            presenceData.state = title[0];
        }
    }
    else if (document.location.pathname.includes("/releases/")) {
        presenceData.details = document.querySelector(".container-narrow h1").textContent;
        presenceData.state = `${!parseQueryString(document.location.hash).version
            ? "Version : all"
            : `Version : ${parseQueryString(document.location.hash).version}`}${!parseQueryString(document.location.hash).page
            ? " | Page : 1"
            : ` | Page : ${parseQueryString(document.location.hash).page}`}`;
    }
    else {
        presenceData.details = document.querySelector("h1.f00-light").textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        if (presenceData.state == null)
            presenceData.state = "Navigating...";
        presence.setActivity(presenceData);
    }
});
function parseQueryString(queryString) {
    if (!queryString) {
        queryString = window.location.search.substring(1);
    }
    const params = {};
    const queries = queryString.split("&");
    queries.forEach((indexQuery) => {
        const indexPair = indexQuery.split("=");
        const queryKey = decodeURIComponent(indexPair[0]);
        const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
        params[queryKey] = queryValue;
    });
    return params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUN2QyxZQUFZLENBQUMsY0FBYztRQUN6QixhQUFhO1lBQ2IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvREFBb0QsQ0FBQztpQkFDekUsV0FBVyxDQUFDO0lBRWpCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQy9CO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQzlCLFlBQVksQ0FBQyxLQUFLLEdBQUcs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