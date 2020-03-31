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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQy9DO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPO1FBQ3JDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDL0M7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQ25ELEVBQUUsQ0FBQztZQUVILElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDOUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUMvRCxVQUFVLENBQUMsRUFBRTtvQkFDWCxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQ1YsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQzFELENBQUM7cUJBQ0g7Z0JBQ0gsQ0FBQyxDQUNGLENBQUM7Z0JBRUYsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUNyQixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUNuRCxFQUFFLENBQUM7Z0JBQ0gsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDO2FBQ3RDO1lBRUQsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLHVDQUF1QyxDQUFDLEVBQUU7Z0JBQ25FLElBQUksUUFBUSxHQUFHLFFBQVE7cUJBQ3BCLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQztxQkFDdEQsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDaEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLFFBQVEsTUFDeEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FDbkQsR0FBRyxDQUFDO2dCQUNKLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQzthQUN0QztTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUN4RSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUN6RSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1NBQ3hDO2FBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsRUFDL0Q7WUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1NBQ3pDO0tBRUY7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO0tBQzVDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFFdEMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdEMsa0JBQWtCLENBQ0EsQ0FBQztRQUVyQixZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUMxRTtJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUMifQ==