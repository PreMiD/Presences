var presence = new Presence({
    clientId: "616738921765667023"
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname == "/post" ||
        document.location.pathname.startsWith("/post/")) {
        presenceData.details = "Viewing posts";
        if (document.location.pathname.startsWith("/post/show")) {
            presenceData.details = "Viewing post";
            presenceData.state = `#${document.location.pathname.split("/post/show/")[1]}`;
            if (document.querySelectorAll(".tag-type-artist a").length > 0) {
                var artists = [];
                Array.from(document.querySelectorAll(".tag-type-artist")).forEach(artistHTML => {
                    if (Array.from(artistHTML.querySelectorAll("a"))[1]) {
                        artists.push(Array.from(artistHTML.querySelectorAll("a"))[1].innerText);
                    }
                });
                presenceData.details = `Viewing #${document.location.pathname.split("/post/show/")[1]}`;
                presenceData.state = "by " + artists;
            }
            if (document.querySelector(".sidebar .status-notice div[id^=pool]")) {
                var PoolName = document
                    .querySelector(".sidebar .status-notice div[id^=pool]")
                    .querySelector("p").innerText;
                presenceData.details = `Viewing ${PoolName} (#${document.location.pathname.split("/post/show/")[1]})`;
                presenceData.state = "by " + artists;
            }
        }
        else if (document.location.pathname.startsWith("/post/popular_by_day")) {
            presenceData.details = "Viewing posts";
            presenceData.state = "Popular by Day";
        }
        else if (document.location.pathname.startsWith("/post/popular_by_week")) {
            presenceData.details = "Viewing posts";
            presenceData.state = "Popular by Week";
        }
        else if (document.location.pathname.startsWith("/post/popular_by_month")) {
            presenceData.details = "Viewing posts";
            presenceData.state = "Popular by Month";
        }
    }
    else if (document.location.pathname.startsWith("/forum")) {
        presenceData.details = "Viewing the forum";
    }
    else if (document.location.pathname.startsWith("/user/show")) {
        presenceData.details = "Viewing user";
        var HTMLElement = document.querySelector("#userpage div h2");
        presenceData.state = HTMLElement.innerHTML.split("<span")[0];
    }
    else {
        presenceData.details = `Viewing "${document.title.split(" - e621")[0]}"`;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3JCLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQzlDO1NBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPO1FBQ3JDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDOUM7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQ3BCLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQ2xELEVBQUUsQ0FBQztZQUVILElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUNoRSxVQUFVLENBQUMsRUFBRTtvQkFDWixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ3pELENBQUM7cUJBQ0Y7Z0JBQ0YsQ0FBQyxDQUNELENBQUM7Z0JBRUYsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUN0QixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUNsRCxFQUFFLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQ3JDO1lBRUQsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDLEVBQUU7Z0JBQ3BFLElBQUksUUFBUSxHQUFHLFFBQVE7cUJBQ3JCLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQztxQkFDdEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDL0IsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLFFBQVEsTUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FDbEQsR0FBRyxDQUFDO2dCQUNKLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUNyQztTQUNEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUN6RSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUMxRSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1NBQ3ZDO2FBQU0sSUFDTixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsRUFDOUQ7WUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1NBQ3hDO0tBRUQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO0tBQzNDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDL0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFFdEMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMsa0JBQWtCLENBQ0MsQ0FBQztRQUVyQixZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdEO1NBQU07UUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUN6RTtJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUMifQ==