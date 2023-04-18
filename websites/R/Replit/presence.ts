const presence = new Presence({
    clientId: "830504223153717311",
}), browsingTimestamp = Math.floor(Date.now());
presence.on("UpdateData", () => {
    const presenceData = {
        details: "Viewing unsupported page",
        largeImageKey: "https://i.imgur.com/ge3dweY.png",
        startTimestamp: browsingTimestamp,
    }, { pathname } = document.location;
    if (pathname === "/" || pathname === "/~")
        presenceData.details = "Viewing home page";
    else if (pathname.startsWith("/@")) {
        if (pathname
            .replace("/@", "")
            .split("/")
            .filter(elm => elm !== "").length === 1) {
            presenceData.details = "Viewing a user's profile";
            presenceData.state = pathname.replace("/@", "");
        }
        else if (document.querySelector(".content span") &&
            !document.querySelector(".breadcrumb-content")) {
            presenceData.details = `Viewing ${pathname.replace("/@", "").split("/")[0]}'s repl`;
            presenceData.state =
                document.querySelector(".content span").textContent;
        }
        else {
            presenceData.details = `Editing ${document.querySelector("div.language-icon-container")
                .title} repl`;
            presenceData.state = `${pathname.split("/").filter(elm => elm !== "")[1]}${window.location.hash ? ` - ${window.location.hash.slice(1)}` : ""}`;
        }
    }
    else if (pathname.startsWith("/notifications"))
        presenceData.details = "Viewing notifications";
    else if (pathname.startsWith("/languages")) {
        presenceData.details = "Browsing languages:";
        presenceData.state = "All languages";
    }
    else if (pathname.startsWith("/new")) {
        presenceData.details = "Creating new repl:";
        presenceData.state = `${document.querySelector("input[data-cy='new-repl-language-input']").value || "No languages chosen"}`;
    }
    else if (pathname.startsWith("/repls")) {
        const repls = document.querySelector("#__next > div > div > div.jsx-2888589246.content > div.jsx-1264267603.repl-content > div.jsx-4064465542 > div:nth-child(3)"), length = repls
            ? repls.children.length - (pathname === "/repls" ? 2 : 1)
            : 0;
        presenceData.details = `Viewing repls ${length ? `(Total ${length})` : ""}`;
        presenceData.state = `${pathname === "/repls"
            ? "In the main page"
            : `In a folder : ${pathname.replace("/repls/folder/", "")}`}`;
    }
    else if (pathname.startsWith("/community")) {
        presenceData.details = "Surfing feed";
        const [postType] = pathname.replace("/community/", "").split("/"), postElement = document.querySelector("#__next > div > div.jsx-132086333.content > div.jsx-2019133593 > div.jsx-2019133593.post-page-content > div.jsx-347352367 > div.jsx-347352367.board-post-detail-header > div.jsx-347352367.board-post-detail-title");
        switch (pathname.replace("/community/", "")) {
            case "all":
                presenceData.state = "All posts";
                break;
            default:
                presenceData.state = `${postType
                    .charAt(0)
                    .toUpperCase()}${postType.slice(1)}${postElement ? ` : ${postElement.textContent}` : ""}`;
                break;
        }
    }
    else if (pathname.startsWith("/bounties")) {
        presenceData.details = "Exploring bounties";
        }

     else if (pathname.startsWith("/cycles")) {
        presenceData.details = "Viewing home page";
        }
    else if (pathname.startsWith("/themes")) {
        presenceData.details = "Browsing themes";
        }
        else if (pathname.startsWith("/theme")) {
            const pathArray = pathname.split("/");
            if (pathArray.length > 2 && pathArray[pathArray.length - 1].length > 0) {
              const themeName = pathArray[pathArray.length - 1].replace(/-/g, " ");
              presenceData.details = `Admiring a theme`;
              presenceData.state = `Looking at ${themeName}`;
            }
          }
          
    else if (pathname.startsWith("/learn")) {
        presenceData.details = "Searching for courses";
        const pathArray = pathname.split("/");
        if (pathArray.length > 2 && pathArray[2].length > 0) {
            const searchTerm = pathArray[2].replace(/-/g, " ");
            presenceData.details = `Learning about ${searchTerm}`;
        } else {
            presenceData.details = "Looking at courses";
        }
    }

    else if (pathname.startsWith("/team")) {
        presenceData.details = "Looking at their teams";
        const pathArray = pathname.split("/");
        if (pathArray.length > 2 && pathArray[2].length > 0) {
            const searchTerm = pathArray[2].replace(/-/g, " ");
            presenceData.details = `Looking at ${searchTerm}`;
            presenceData.state = "Teams";
        }
    }
          
    
    else if (pathname.startsWith("/templates"))
        presenceData.details = "Viewing replit templates";
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM5QixNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLDBCQUEwQjtRQUNuQyxhQUFhLEVBQUUsaUNBQWlDO1FBQ2hELGNBQWMsRUFBRSxpQkFBaUI7S0FDakMsRUFDRCxFQUFFLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFbEMsSUFBSSxRQUFRLEtBQUssR0FBRyxJQUFJLFFBQVEsS0FBSyxJQUFJO1FBQ3hDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDdkMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25DLElBQ0MsUUFBUTthQUNOLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2FBQ2pCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDdkM7WUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1lBQ2xELFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUNOLFFBQVEsQ0FBQyxhQUFhLENBQWtCLGVBQWUsQ0FBQztZQUN4RCxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsRUFDN0M7WUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLFdBQ3RCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ3hDLFNBQVMsQ0FBQztZQUNWLFlBQVksQ0FBQyxLQUFLO2dCQUNqQixRQUFRLENBQUMsYUFBYSxDQUFrQixlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDdEU7YUFBTTtZQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FDdEIsUUFBUSxDQUFDLGFBQWEsQ0FBaUIsNkJBQTZCLENBQUM7aUJBQ25FLEtBQ0gsT0FBTyxDQUFDO1lBQ1IsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNwQixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2hELEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ3ZFO0tBQ0Q7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztTQUMzQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDM0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztLQUNyQztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FDcEIsUUFBUSxDQUFDLGFBQWEsQ0FDckIsMENBQTBDLENBQzFDLENBQUMsS0FBSyxJQUFJLHFCQUNaLEVBQUUsQ0FBQztLQUNIO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDRIQUE0SCxDQUM1SCxFQUNELE1BQU0sR0FBRyxLQUFLO1lBQ2IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUUsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNwQixRQUFRLEtBQUssUUFBUTtZQUNwQixDQUFDLENBQUMsa0JBQWtCO1lBQ3BCLENBQUMsQ0FBQyxpQkFBaUIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsRUFDM0QsRUFBRSxDQUFDO0tBQ0g7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDN0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDaEUsV0FBVyxHQUFtQixRQUFRLENBQUMsYUFBYSxDQUNuRCxvTkFBb04sQ0FDcE4sQ0FBQztRQUNILFFBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDNUMsS0FBSyxLQUFLO2dCQUNULFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1A7Z0JBQ0MsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVE7cUJBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQ1QsV0FBVyxFQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FDbEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDakQsRUFBRSxDQUFDO2dCQUNILE1BQU07U0FDUDtLQUNEO1NBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO0lBQ25ELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMifQ==
