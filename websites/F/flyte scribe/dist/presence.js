var presence = new Presence({
    clientId: "707632555612045413"
}), startBrowse = Date.now(), presenceData = {
    startTimestamp: startBrowse,
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
        var blogData = (presenceData = {
            details: "Looking at a Blog Post",
            state: blogTitle.innerHTML,
            startTimestamp: startBrowse,
            largeImageKey: "logo"
        });
        blogCheck = true;
        presence.setActivity(blogData);
    }
    if (!blogCheck) {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUN4QixZQUFZLEdBQWlCO0lBQzNCLGNBQWMsRUFBRSxXQUFXO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFdEIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztLQUMvQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0tBQ3BEO1NBQU07UUFDTCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELElBQUksUUFBUSxHQUFHLENBQUMsWUFBWSxHQUFHO1lBQzdCLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxTQUFTO1lBQzFCLGNBQWMsRUFBRSxXQUFXO1lBQzNCLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUMsQ0FBQztRQUNILFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNoQztJQUVELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==