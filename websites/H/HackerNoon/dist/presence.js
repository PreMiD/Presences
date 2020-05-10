const presence = new Presence({
    clientId: "651671730905153539"
});
presence.on("UpdateData", async () => {
    const page = document.location.pathname, tagged = document.querySelector("#root > div.more > div.divider-title > h1"), user = document.querySelector("#root > div.profile-author > div.name > strong"), posttitle = document.querySelector("#root > div.story.story-container > h1"), search = document.querySelector("#searchbox > div > form > input");
    const presenceData = {
        largeImageKey: "hn-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (page.includes("/tagged") && tagged && tagged.textContent != "") {
        presenceData.details = "Viewing Tag:";
        presenceData.state = `${tagged.textContent}`;
    }
    else if (posttitle && posttitle.textContent != "") {
        presenceData.details = "Reads a Post:";
        presenceData.state = posttitle.textContent;
    }
    else if (page.includes("/search")) {
        presenceData.details = "Searching:";
        presenceData.state = search.value;
        presenceData.smallImageKey = "hn-logo";
    }
    else if (user && user.textContent != "") {
        presenceData.details = "Viewing User Profile:";
        presenceData.state = user.textContent;
    }
    else {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Homepage";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0IsMkNBQTJDLENBQzVDLEVBQ0QsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLGdEQUFnRCxDQUNqRCxFQUNELFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNoQyx3Q0FBd0MsQ0FDekMsRUFDRCxNQUFNLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQy9DLGlDQUFpQyxDQUNsQyxDQUFDO0lBRUosTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxTQUFTO1FBQ3hCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDOUMsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDbEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUM5QztTQUFNLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztLQUM1QztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUNuQyxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztRQUNwQyxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDbEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7S0FDeEM7U0FBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUN6QyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN2QztTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDakM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9