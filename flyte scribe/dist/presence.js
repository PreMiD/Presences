var presence = new Presence({
    clientId: "707632555612045413"
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    var blogCheck = false;
    if (document.location.pathname == "/") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname == "/about/") {
        presenceData.details = "Looking at the blog info";
    }
    else if (document.location.pathname == "/flyte/") {
        presenceData.details = "Getting to know edo/flyte";
    }
    else {
        var blogTitle = document.querySelector("h1.post-title");
        var blogData = presenceData = {
            details: "Looking at a Blog Post",
            state: blogTitle.innerHTML,
            largeImageKey: "logo"
        };
        blogCheck = true;
        presence.setActivity(blogData);
    }
    if (!blogCheck) {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdEIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztLQUMvQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0tBQ3BEO1NBQU07UUFDTCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELElBQUksUUFBUSxHQUFHLFlBQVksR0FBRztZQUM1QixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLEtBQUssRUFBRSxTQUFTLENBQUMsU0FBUztZQUMxQixhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDO0lBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNkLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9