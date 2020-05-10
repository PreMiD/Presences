const presence = new Presence({
    clientId: "650633388784615424"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: new Date().getTime()
    };
    const path = document.location.pathname;
    if (path === "/pages" || path === "/pages/") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Home Page";
    }
    else if (path === "/pages/enterprise") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Enterprise plans";
    }
    else if (path.startsWith("/pages/solutions/")) {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Solutions";
    }
    else if (path === "/pages/results") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Impact of LucidChart";
    }
    else if (path === "/pages/integrations") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "LucidChart Integrations";
    }
    else if (path === "/pages/case-studies") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Viewing Case Studies";
    }
    else if (path === "/pages/resource-center") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Resource Center";
    }
    else if (path === "/blog" || path === "/blog/") {
        presenceData.details = "Browsing LucidChart Blogs";
        presenceData.state = "Viewing all blogs";
    }
    else if (path.startsWith("/blog/")) {
        const title = document
            .getElementsByClassName("main-article")[0]
            .getElementsByTagName("h1")[0].innerText;
        presenceData.details = "Reading a LucidChart Blog";
        presenceData.state = title;
    }
    else if (path === "/pages/tour") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Viewing examples";
    }
    else if (path.startsWith("/users/registerLevel")) {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Viewing plans";
    }
    else if (path === "/users/login") {
        presenceData.details = "Browsing LucidChart";
        presenceData.state = "Logging in...";
    }
    else if (path === "/documents") {
        presenceData.details = "Editing a document";
        presenceData.state = "Viewing documents";
    }
    else if (path.startsWith("/documents/edit/")) {
        const title = document.title.replace(": Lucidchart", "");
        presenceData.details = "Editing a document";
        presenceData.state = title;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07UUFDckIsY0FBYyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFO0tBQ3JDLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV4QyxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUMzQyxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQzdDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxJQUFJLEtBQUssbUJBQW1CLEVBQUU7UUFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO0tBQ3pDO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztLQUNsQztTQUFNLElBQUksSUFBSSxLQUFLLGdCQUFnQixFQUFFO1FBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7UUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztLQUM3QztTQUFNLElBQUksSUFBSSxLQUFLLHFCQUFxQixFQUFFO1FBQ3pDLFlBQVks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