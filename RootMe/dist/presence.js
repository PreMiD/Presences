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
console.log('%c RootMe Presence ', 'background: #7289da; color: white; padding: 2px; border-radius: 50px', "Presence detected !");
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    var route = document.location.pathname.split('/');
    if (document.location.pathname == "/") {
        presenceData.details = "Home";
        if (!parseQueryString(document.location.hash).page) {
            presenceData.state = "Watching home page";
        }
        else if (parseQueryString(document.location.hash).page === "news") {
            presenceData.state = parseQueryString(document.location.hash).inc ? `Watching ${parseQueryString(document.location.hash).page} page (${document.querySelector("dl.tabs > dd.active").textContent} )` : `Watching ${parseQueryString(document.location.hash).page} page`;
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
        switch (document.querySelector("img.grayscale").getAttribute("alt") || document.querySelector("img.grayscale").getAttribute("title")) {
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
        presenceData.details = route[3] ? `${route[2]} - ${route[3].replace(/-/g, " ")}` : `${route[2]}`;
        presenceData.state = !route[4] ? "Navigating..." : document.querySelector(".crayon").textContent;
    }
    else if (document.location.pathname.includes("/Capture-The-Flag/")) {
        presenceData.smallImageKey = "ctf";
        presenceData.smallImageText = "Capture The Flag";
        presenceData.details = route[3] ? `${route[2].replace(/-/g, " ")} - ${route[3].replace(/-/g, " ")}` : route[2].replace(/-/g, " ");
        presenceData.state = "Navigating...";
    }
    else if (document.location.pathname.includes("/Communaute/") || document.location.pathname.includes("/Comunidad/") || document.location.pathname.includes("/Community/")) {
        presenceData.smallImageKey = "commu";
        presenceData.smallImageText = "Communaute";
        presenceData.details = route[3] ? `${route[2]} - ${route[3].replace(/-/g, " ")}` : route[2];
        presenceData.state = "Navigating...";
    }
    else if (document.location.pathname.includes("/Documentation/") || document.location.pathname.includes("/Materialien/") || document.location.pathname.includes("/Documentacion/") || document.location.pathname.includes("/Docs/")) {
        presenceData.smallImageKey = "docu";
        presenceData.smallImageText = "Documentation";
        if (route[3] !== "Reseaux") {
            presenceData.details = route[3] ? `${route[2]} - ${route[3].replace(/-/g, " ")}` : `${route[2]}`;
            presenceData.state = !route[4] ? "Navigating..." : route[4].replace(/-/g, " ");
        }
        else {
            presenceData.details = route[4] ? `${route[2]} - ${route[3]} > ${route[4]}` : `${route[2]} - ${route[3]}`;
            presenceData.state = !route[5] ? "Navigating..." : route[5].replace(/-/g, " ");
        }
    }
    else if (document.location.pathname.includes("/Informations/") || document.location.pathname.includes("/Information/") || document.location.pathname.includes("/Info/")) {
        presenceData.smallImageKey = "infos";
        presenceData.smallImageText = "Informations";
        presenceData.details = `${route[2]}`;
        presenceData.state = !route[3] ? "Navigating..." : document.querySelector(".crayon").textContent;
    }
    else if (document.location.pathname.includes("/Tools/") || document.location.pathname.includes("/Herramientas/") || document.location.pathname.includes("/Outils/")) {
        presenceData.smallImageKey = "tools";
        presenceData.smallImageText = "Tools";
        presenceData.details = route[3] ? `${route[2]} - ${route[3].replace(/-/g, " ")}` : `${route[2]}`;
        presenceData.state = !route[4] ? "Navigating..." : route[4];
    }
    else {
        presenceData.details = `Watching member : ` + document.querySelector("span.forum").textContent;
        presenceData.state = parseQueryString(document.location.hash).inc ? `Page : ${parseQueryString(document.location.hash).inc}` : "Page : profil";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUVILFNBQVMsZ0JBQWdCLENBQUMsV0FBb0I7SUFDMUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNkLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFDRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBa0IsRUFBRSxFQUFFO1FBQ25DLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsTUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFJRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHNFQUFzRSxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFFbEksUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsTUFBTSxZQUFZLEdBQWlCO1FBQy9CLGFBQWEsRUFBRSxNQUFNO0tBQ3hCLENBQUM7SUFFRixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEQsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUIsSUFBRyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7U0FDN0M7YUFBTSxJQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNoRSxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxVQUFVLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDO1NBQzNRO2FBQU0sSUFBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDckUsSUFBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxxQkFBcUIsRUFBRTtnQkFDdkUsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQzthQUN4RTtpQkFBTTtnQkFDSCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLENBQUM7YUFDN0U7U0FDSjthQUFNLElBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ25FLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDM0U7YUFBTSxJQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNoRSxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQzNFO2FBQU0sSUFBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDL0QsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQztTQUN4RTtRQUNELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQ3ZDLFFBQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakksS0FBSyxJQUFJO2dCQUNMLFlBQVksQ0FBQyxjQUFjLEdBQUcscUJBQXFCLENBQUM7Z0JBQ3BELE1BQU07WUFDVixLQUFLLElBQUk7Z0JBQ0wsWUFBWSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQztnQkFDbkQsTUFBTTtZQUNWLEtBQUssSUFBSTtnQkFDTCxZQUFZLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO2dCQUNuRCxNQUFNO1lBQ1YsS0FBSyxJQUFJO2dCQUNMLFlBQVksQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUM7Z0JBQ25ELE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7S0FDSjtTQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzNELFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pHLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUM7S0FDcEc7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ2xFLFlBQVksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUM7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEksWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQ3hLLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUYsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbE8sWUFBWSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUM7UUFDOUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pHLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbEY7YUFBTTtZQUNILFlBQVksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFHLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbEY7S0FDSjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN2SyxZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDckMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztLQUNwRztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuSyxZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztRQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqRyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvRDtTQUFNO1FBQ0gsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUMvRixZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztLQUNsSjtJQUVELElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDOUIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUMxQjtTQUFNO1FBQ0gsSUFBRyxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUMzQixZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztTQUN4QztRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdEM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9