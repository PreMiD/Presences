const presence = new Presence({
    clientId: "691406198091677737"
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
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsZ0JBQWdCLENBQUMsV0FBb0I7SUFDNUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUNuQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3pDLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxLQUFLLEdBQUcs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