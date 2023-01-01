const presence = new Presence({
    clientId: "794916348761210920",
}), presenceData = {
    largeImageKey: "logo",
    startTimestamp: Math.floor(Date.now() / 1000),
};
presence.on("UpdateData", async () => {
    switch (document.location.pathname.endsWith("/") &&
        document.location.pathname.length > 1
        ? document.location.pathname.slice(0, document.location.pathname.length - 1)
        : document.location.pathname) {
        case "/":
            presenceData.details = "Viewing homepage";
            break;
        case "/anime-list":
            presenceData.details = "Viewing anime list";
            break;
        case "/jadwal-rilis":
            presenceData.details = "Viewing release schedule";
            break;
        case "/ongoing-anime":
            presenceData.details = "Viewing ongoing anime list";
            break;
        case "/genre-list":
            presenceData.details = "Viewing anime genre list";
            break;
        default: {
            if (document.location.search.startsWith("?s")) {
                const { s } = JSON.parse(`{"${decodeURI(document.location.search.substring(1))
                    .replaceAll('"', '\\"')
                    .replaceAll("&", '","')
                    .replaceAll("=", '":"')}"}`);
                presenceData.details = "Searching for:";
                presenceData.state = s;
                presenceData.smallImageKey = "search";
            }
            if (document.location.pathname.startsWith("/anime")) {
                presenceData.details = "Viewing anime";
                presenceData.state = document
                    .querySelector(".jdlrx > h1")
                    .textContent.replace(/Subtitle Indonesia/gi, "");
                presenceData.buttons = [
                    { label: "View anime", url: document.location.href },
                ];
            }
            if (document.querySelector(".mirrorstream")) {
                presenceData.details = "Watching anime";
                presenceData.state = document
                    .querySelector(".posttl")
                    .textContent.replace(/Subtitle Indonesia/gi, "");
                presenceData.buttons = [
                    { label: "Watch Anime", url: document.location.href },
                    {
                        label: "View Anime",
                        url: [...document.querySelectorAll("a")].find(x => /See All Episodes/gi.exec(x.textContent)).href,
                    },
                ];
            }
            break;
        }
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0lBQ3JCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Q0FDN0MsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLFFBQ0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN4QyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNwQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUNoQyxDQUFDLEVBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDcEM7UUFDSCxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQzVCO1FBQ0QsS0FBSyxHQUFHO1lBQ1AsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxNQUFNO1FBQ1AsS0FBSyxhQUFhO1lBQ2pCLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsTUFBTTtRQUNQLEtBQUssZUFBZTtZQUNuQixZQUFZLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1lBQ2xELE1BQU07UUFDUCxLQUFLLGdCQUFnQjtZQUNwQixZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1lBQ3BELE1BQU07UUFDUCxLQUFLLGFBQWE7WUFDakIsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztZQUNsRCxNQUFNO1FBQ1AsT0FBTyxDQUFDLENBQUM7WUFDUixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3ZCLEtBQUssU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbkQsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7cUJBQ3RCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO3FCQUN0QixVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQzVCLENBQUM7Z0JBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO2FBQ3RDO1lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO2dCQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVE7cUJBQzNCLGFBQWEsQ0FBQyxhQUFhLENBQUM7cUJBQzVCLFdBQVcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUc7b0JBQ3RCLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7aUJBQ3BELENBQUM7YUFDRjtZQUNELElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRO3FCQUMzQixhQUFhLENBQUMsU0FBUyxDQUFDO3FCQUN4QixXQUFXLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHO29CQUN0QixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNyRDt3QkFDQyxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsR0FBRyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDakQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDeEMsQ0FBQyxJQUFJO3FCQUNOO2lCQUNELENBQUM7YUFDRjtZQUNELE1BQU07U0FDTjtLQUNEO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQyJ9