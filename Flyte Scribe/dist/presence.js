var presence = new Presence({
    clientId: "707632555612045413"
}), presenceData = {
    largeImageKey: "logo"
}, customData = false;
presence.on("UpdateData", async () => {
    customData = false;
    if (document.location.pathname == "/") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname == "/about/") {
        presenceData.details = "Learning about the blog";
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
        presence.setActivity(blogData);
    }
    if (!customData) {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLEVBQ0QsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUVyQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7S0FDL0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO0tBQ2xEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUU7UUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxJQUFJLFFBQVEsR0FBRyxZQUFZLEdBQUc7WUFDNUIsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFNBQVM7WUFDMUIsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7SUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=