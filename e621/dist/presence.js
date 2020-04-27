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
                Array.from(document.querySelectorAll(".tag-type-artist")).forEach((artistHTML) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQy9DO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxPQUFPO1FBQ3JDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFDL0M7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUN0QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQ25CLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQ25ELEVBQUUsQ0FBQztZQUVILElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDOUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUMvRCxD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