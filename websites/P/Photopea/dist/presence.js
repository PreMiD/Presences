const presence = new Presence({
    clientId: "685559589625659492"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "photopea"
    }, Path = document.location.pathname;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    if (Path.startsWith("/learn")) {
        presenceData.details = `Learning new cool tricks :`;
        presenceData.state = `${Path.replace("/learn/", "").length < 1
            ? "Main Section"
            : `${Path.replace("/learn/", "").toUpperCase()} Section`}`;
    }
    else if (Path == "/") {
        switch (document.querySelector("body > div.flexrow.photopea > div:nth-child(1) > div.flexrow > div.panelblock.mainblock > div > div.panelhead").children.length) {
            case 0:
                presenceData.details = `Viewing the home page `;
                break;
            default: {
                const name = document.querySelector("div.active > span").textContent;
                presenceData.details = `Editing a ${name.split(".").length > 1
                    ? name.split(".")[name.split(".").length - 1]
                    : name.split(".")[1]} file :`;
                presenceData.state = name;
            }
        }
    }
    else if (Path.startsWith("/api")) {
        presenceData.details = `Consulting the api docs :`;
        presenceData.state = `${Path.replace("/api/", "").length < 1
            ? "Main Section"
            : `${Path.replace("/api/", "").toUpperCase()} Section`}`;
    }
    else if (Path.startsWith("/tuts")) {
        presenceData.details = `Consulting the tutorials :`;
        presenceData.state = `${Path.replace("/tuts/", "").length < 1
            ? "Main Section"
            : `${document.querySelector("#post-396 > h1").textContent}`}`;
    }
    else {
        presenceData.details = `Browsing the site `;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLFVBQVU7S0FDMUIsRUFDRCxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDcEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUU1RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDN0IsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxjQUFjO1lBQ2hCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUNsRCxFQUFFLENBQUM7S0FDSjtTQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUN0QixRQUNFLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLCtHQUErRyxDQUNoSCxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ2pCO1lBQ0EsS0FBSyxDQUFDO2dCQUNKLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7Z0JBQ2hELE1BQU07WUFDUixPQUFPLENBQUMsQ0FBQztnQkFDUCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUNyRSxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUN2QixTQUFTLENBQUM7Z0JBQ1YsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDM0I7U0FDRjtLQUNGO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNsQyxDQUFDLENBQUMsY0FBYztZQUNoQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFDaEQsRUFBRSxDQUFDO0tBQ0o7U0FBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztRQUNwRCxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxjQUFjO1lBQ2hCLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLEVBQzdELEVBQUUsQ0FBQztLQUNKO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUMsQ0FBQyJ9