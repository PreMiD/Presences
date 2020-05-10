const presence = new Presence({
    clientId: "670111348130185267"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        smallImageKey: "logo-outline",
        smallImageText: "codepen.io",
        details: "Codepen.io",
        state: "Coding..."
    };
    if (window.location.pathname.includes("/fullpage/") ||
        window.location.pathname.includes("/pen/")) {
        presenceData.details = "Editing a pen";
        presenceData.state =
            document.getElementById("editable-title-span").innerHTML +
                " by " +
                document
                    .getElementsByClassName("ItemTitle_ownerLink-tMhWC")[0]
                    .innerHTML.split("<")[0];
    }
    else if (window.location.pathname.includes("/collection/")) {
        presenceData.details =
            "Looking at collection " +
                document.getElementById("collection-name").innerText;
        if (document.getElementById("collection-desc").innerText == "") {
            presenceData.state =
                "Collection by " +
                    document
                        .getElementsByClassName("content-author")[0]
                        .textContent.split("\n")[0];
        }
        else {
            presenceData.state = document.getElementById("collection-desc").innerText;
        }
    }
    else if (window.location.pathname.includes("/topic/")) {
        presenceData.details =
            "Looking at topic " +
                document.getElementsByClassName("Topics_topicTitle-3OfJU")[0].textContent;
        presenceData.state = document
            .getElementsByClassName("Topics_topicDescription-2CNwF")[0]
            .textContent.split("\n")[3];
    }
    else if (window.location.pathname.includes("/tv/")) {
        presenceData.details =
            "Watching " +
                document
                    .getElementsByClassName("collection-details")[0]
                    .textContent.replace("From “", "")
                    .replace("”", "") +
                " on Codepen TV";
        presenceData.state =
            document.getElementsByClassName("item-title")[0].textContent +
                " " +
                document.getElementsByClassName("pen-author")[0].textContent;
    }
    else if (window.location.pathname.includes("/project/") ||
        window.location.pathname.includes("/project/")) {
        presenceData.details = "Editing a project";
        presenceData.state =
            document.getElementById("editable-title-span").innerHTML +
                " by " +
                document
                    .getElementsByClassName("ItemTitle_ownerLink-tMhWC")[0]
                    .innerHTML.split("<")[0];
    }
    else if (window.location.pathname == "/write/") {
        presenceData.details = "Making a post";
        if (document.getElementById("title").value == "") {
            presenceData.state = "Thinking about what the title should be.";
        }
        else {
            presenceData.state = document.getElementById("title").value;
        }
    }
    else if (window.location.pathname == "/") {
        presenceData.details = "On the home page";
        presenceData.state = "Looking at code snippets.";
    }
    else if (window.location.pathname == "/dashboard/") {
        presenceData.details = "On dashboard";
        presenceData.state = "Admiring their own pens.";
    }
    else if (window.location.pathname.includes("/search/")) {
        presenceData.details = "Searching for pens";
        presenceData.state = "Looking for " + location.search.replace("?q=", "");
    }
    else {
        if (document.getElementsByClassName("title-header")[0] == undefined) {
            presenceData.details = "Looking at page";
            presenceData.state = document.title;
        }
        else {
            presenceData.details = "Looking at page";
            presenceData.state = document
                .getElementsByClassName("title-header")[0]
                .textContent.split("\n")[0];
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07UUFDckIsYUFBYSxFQUFFLGNBQWM7UUFDN0IsY0FBYyxFQUFFLFlBQVk7UUFDNUIsT0FBTyxFQUFFLFlBQVk7UUFDckIsS0FBSyxFQUFFLFdBQVc7S0FDbkIsQ0FBQztJQUVGLElBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUMvQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQzFDO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUs7WUFDaEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVM7Z0JBQ3hELE1BQU07Z0JBQ04sUUFBUTtxQkFDTCxzQkFBc0IsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5QjtTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzVELFlBQVksQ0FBQyxPQUFPO1lBQ2xCLHdCQUF3QjtnQkFDeEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMs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