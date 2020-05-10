const presence = new Presence({
    clientId: "684803357000335401"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "repl"
    }, Path = document.location.pathname;
    if (Path.startsWith("/@")) {
        if (Path.replace("/@", "").split("/").length == 1) {
            presenceData.details = `Viewing a user's profile :`;
            presenceData.state = document.querySelector("#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-1419166693.profile-header-container > div.jsx-1419166693.profile-header > div.jsx-1419166693.profile-header-content > div.jsx-1419166693.name-wrap > h1").textContent;
        }
        else {
            const type = document.querySelector("#page > div > div > div > div:nth-child(1) > div > div > div > div.jsx-268062591.sidebar-layout-ws-header > div > div.jsx-718404847.jsx-1272337756.info-wrapper > div > div > div.jsx-1561825049.workspace-header-description-container > img").alt;
            const name = document.querySelector("#page > div > div > div > div:nth-child(1) > div > div > div > div.jsx-268062591.sidebar-layout-ws-header > div > div.jsx-718404847.jsx-1272337756.info-wrapper > div > div > div.jsx-1561825049.workspace-header-title > h1").textContent;
            presenceData.details = `Editing a ${type} project :`;
            presenceData.state = `${name}`;
        }
    }
    else if (Path.startsWith("/repls")) {
        const length = document.querySelector("#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-1444742247 > div > div.jsx-3858180552.repls-dashboard-list > div.jsx-397300979.replsdashboard-list").children.length;
        presenceData.details = `Viewing repls (${length} total) :`;
        presenceData.state = `${Path == "/repls"
            ? "In the main page"
            : "In a folder : " + Path.replace("/repls/folder/", "")}   `;
    }
    else if (Path.startsWith("/talk")) {
        presenceData.details = `Viewing community posts :`;
        switch (Path.replace("/talk/", "")) {
            case "all":
                presenceData.state = `All posts`;
                break;
            default:
                presenceData.state = `${document.querySelector("#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-330798097 > div.jsx-330798097.post-page-content > div.jsx-1910246347 > div.jsx-1910246347.board-post-detail-header > div.jsx-1910246347.board-post-detail-title") !== null
                    ? document.querySelector("#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-330798097 > div.jsx-330798097.post-page-content > div.jsx-1910246347 > div.jsx-1910246347.board-post-detail-header > div.jsx-1910246347.board-post-detail-title").textContent
                    : `${Path.replace("/talk/", "").toUpperCase()} related posts`}`;
        }
    }
    else if (Path.startsWith("/notifications")) {
        presenceData.details = `Viewing notifications :`;
    }
    else if (Path.startsWith("/languages")) {
        presenceData.details = `Browsing languages :`;
        presenceData.state = `All languages`;
    }
    else if (Path.startsWith("/templates")) {
        presenceData.details = `Browsing templates :`;
        presenceData.state = `${document.querySelector("#__next > div > div.jsx-3936643749.sidebar-layout-content > div > div > div.jsx-3938129460.page > div.jsx-3938129460.templates-container").children.length} total templates`;
    }
    else {
        presenceData.details = `Viewing the home page `;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLE1BQU07S0FDdEIsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztZQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLHlPQUF5TyxDQUMxTyxDQUFDLFdBQVcsQ0FBQztTQUNmO2FBQU07WUFDTCxNQUFNLElBQUksR0FBSSxRQUFRLENBQUMsYUFBYSxDQUNsQywrT0FBK08sQ0FDM04sQ0FBQyxHQUFHLENBQUM7WUFDM0IsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsOE5BQThOLENBQy9OLENBQUMsV0FBVyxDQUFDO1lBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLElBQUksWUFBWSxDQUFDO1lBQ3JELFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztTQUNoQztLQUNGO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ25DLG9MQUFvTCxDQUNyTCxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDbEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsTUFBTSxXQUFXLENBQUM7UUFDM0QsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNuQixJQUFJLElBQUksUUFBUTtZQUNkLENBQUMsQ0FBQyxrQkFBa0I7WUFDcEIsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUMxRCxLQUFLLENBQUM7S0FDUDtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1FBQ25ELFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDbEMsS0FBSyxLQUFLO2dCQUNSLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1I7Z0JBQ0UsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNuQixRQUFRLENBQUMsYUFBYSxDQUNwQixpUEFBaVAsQ0FDbFAsS0FBSyxJQUFJO29CQUNSLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUNwQixpUEFBaVAsQ0FDbFAsQ0FBQyxXQUFXO29CQUNmLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxnQkFDakQsRUFBRSxDQUFDO1NBQ047S0FDRjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7S0FDbEQ7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztLQUN0QztTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FDbkIsUUFBUSxDQUFDLGFBQWEsQ0FDcEIsMElBQTBJLENBQzNJLENBQUMsUUFBUSxDQUFDLE1BQ2Isa0JBQWtCLENBQUM7S0FDcEI7U0FBTTtRQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7S0FDakQ7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=