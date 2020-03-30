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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsRCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUN2QyxZQUFZLENBQUMsY0FBYztRQUMxQixhQUFhO1lBQ2IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxvREFBb0QsQ0FBQztpQkFDMUUsV0FBVyxDQUFDO0lBRWYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7S0FDOUI7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDOUIsWUFBWSxDQUFDLEtBQUssR0FBRyxD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