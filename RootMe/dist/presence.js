const presence = new Presence({
    clientId: "673322920809988120"
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
console.log("%c RootMe Presence ", "background: #7289da; color: white; padding: 2px; border-radius: 50px", "Presence detected !");
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    var route = document.location.pathname.split("/");
    if (document.location.pathname == "/") {
        presenceData.details = "Home";
        if (!parseQueryString(document.location.hash).page) {
            presenceData.state = "Watching home page";
        }
        else if (parseQueryString(document.location.hash).page === "news") {
            presenceData.state = parseQueryString(document.location.hash).inc
                ? `Watching ${parseQueryString(document.location.hash).page} page (${document.querySelector("dl.tabs > dd.active").textContent} )`
                : `Watching ${parseQueryString(document.location.hash).page} page`;
        }
        else if (parseQueryString(document.location.hash).page === "structure") {
            if (parseQueryString(document.location.hash).inc === "inclusions/services") {
                presenceData.state = document.querySelector(".row > h1").textContent;
            }
            else {
                presenceData.state = document.querySelector(".ajaxbloc > h1").textContent;
            }
        }
        else if (parseQueryString(document.location.hash).page === "contact") {
            presenceData.state = document.querySelector(".t-body > h1").textContent;
        }
        else if (parseQueryString(document.location.hash).page === "plan") {
            presenceData.state = document.querySelector(".t-body > h1").textContent;
        }
        else if (parseQueryString(document.location.hash).page === "faq") {
            presenceData.state = document.querySelector("h1.crayon").textContent;
        }
        presenceData.smallImageKey = "reading";
        switch (document.querySelector("img.grayscale").getAttribute("alt") ||
            document.querySelector("img.grayscale").getAttribute("title")) {
            case "fr":
                presenceData.smallImageText = "Language : français";
                break;
            case "es":
                presenceData.smallImageText = "Language : espanol";
                break;
            case "de":
                presenceData.smallImageText = "Language : deutsch";
                break;
            case "en":
                presenceData.smallImageText = "Language : english";
                break;
            default:
                break;
        }
    }
    else if (document.location.pathname.includes("/Challenges/")) {
        presenceData.smallImageKey = "chall";
        presenceData.smallImageText = "Challenges";
        presenceData.details = route[3]
            ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
            : `${route[2]}`;
        presenceData.state = !route[4]
            ? "Navigating..."
            : document.querySelector(".crayon").textContent;
    }
    else if (document.location.pathname.includes("/Capture-The-Flag/")) {
        presenceData.smallImageKey = "ctf";
        presenceData.smallImageText = "Capture The Flag";
        presenceData.details = route[3]
            ? `${route[2].replace(/-/g, " ")} - ${route[3].replace(/-/g, " ")}`
            : route[2].replace(/-/g, " ");
        presenceData.state = "Navigating...";
    }
    else if (document.location.pathname.includes("/Communaute/") ||
        document.location.pathname.includes("/Comunidad/") ||
        document.location.pathname.includes("/Community/")) {
        presenceData.smallImageKey = "commu";
        presenceData.smallImageText = "Communaute";
        presenceData.details = route[3]
            ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
            : route[2];
        presenceData.state = "Navigating...";
    }
    else if (document.location.pathname.includes("/Documentation/") ||
        document.location.pathname.includes("/Materialien/") ||
        document.location.pathname.includes("/Documentacion/") ||
        document.location.pathname.includes("/Docs/")) {
        presenceData.smallImageKey = "docu";
        presenceData.smallImageText = "Documentation";
        if (route[3] !== "Reseaux") {
            presenceData.details = route[3]
                ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
                : `${route[2]}`;
            presenceData.state = !route[4]
                ? "Navigating..."
                : route[4].replace(/-/g, " ");
        }
        else {
            presenceData.details = route[4]
                ? `${route[2]} - ${route[3]} > ${route[4]}`
                : `${route[2]} - ${route[3]}`;
            presenceData.state = !route[5]
                ? "Navigating..."
                : route[5].replace(/-/g, " ");
        }
    }
    else if (document.location.pathname.includes("/Informations/") ||
        document.location.pathname.includes("/Information/") ||
        document.location.pathname.includes("/Info/")) {
        presenceData.smallImageKey = "infos";
        presenceData.smallImageText = "Informations";
        presenceData.details = `${route[2]}`;
        presenceData.state = !route[3]
            ? "Navigating..."
            : document.querySelector(".crayon").textContent;
    }
    else if (document.location.pathname.includes("/Tools/") ||
        document.location.pathname.includes("/Herramientas/") ||
        document.location.pathname.includes("/Outils/")) {
        presenceData.smallImageKey = "tools";
        presenceData.smallImageText = "Tools";
        presenceData.details = route[3]
            ? `${route[2]} - ${route[3].replace(/-/g, " ")}`
            : `${route[2]}`;
        presenceData.state = !route[4] ? "Navigating..." : route[4];
    }
    else {
        presenceData.details =
            `Watching member : ` + document.querySelector("span.forum").textContent;
        presenceData.state = parseQueryString(document.location.hash).inc
            ? `Page : ${parseQueryString(document.location.hash).inc}`
            : "Page : profil";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        if (presenceData.state == null) {
            presenceData.state = "Navigating...";
        }
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsZ0JBQWdCLENBQUMsV0FBb0I7SUFDNUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUNuQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3pDLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUlELE9BQU8sQ0FBQyxHQUFHLENBQ1QscUJBQXFCLEVBQ3JCLHNFQUFzRSxFQUN0RSxxQkFBcUIsQ0FDdEIsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25D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