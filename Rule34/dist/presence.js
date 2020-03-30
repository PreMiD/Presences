var presence = new Presence({
    clientId: "619967690056007699"
});
presence.on("UpdateData", async () => {
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.href.includes("rule34.xxx")) {
        if (document.location.pathname == "/") {
            var presenceData = {
                details: "Viewing the homepage...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
        else if (urlParams.get("page") &&
            urlParams.get("s") &&
            urlParams.get("page") == "post") {
            if (urlParams.get("s") == "list") {
                if (urlParams.get("tags")) {
                    var presenceData = {
                        details: "Searching...",
                        state: urlParams.get("tags").replace(" ", ", "),
                        largeImageKey: "lg-r34"
                    };
                    presence.setActivity(presenceData);
                }
                else {
                    var presenceData = {
                        details: "Viewing Posts List...",
                        largeImageKey: "lg-r34"
                    };
                    presence.setActivity(presenceData);
                }
            }
            else if (urlParams.get("s") == "view" && urlParams.get("id")) {
                var presenceData = {
                    details: "Viewing a Post...",
                    state: "Post " + urlParams.get("id"),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
            else {
                var presenceData = {
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
        }
        else {
            var presenceData = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.href.includes("rule34.paheal.net")) {
        var path = document.location.pathname.split("/");
        if (document.location.pathname == "/") {
            var presenceData = {
                details: "Viewing the homepage...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
        else if (path[1] == "post") {
            if (path[2] == "list" && path.length == 3) {
                var presenceData = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
            else if (path[2] == "list" && path.length > 3) {
                var presenceData = {
                    details: "Searching...",
                    state: path[3].replace("%20", ", ").replace("%21", "!"),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
            else if (path[2] == "view") {
                var presenceData = {
                    details: "Viewing a post...",
                    state: "Post " + path[3],
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
            else {
                var presenceData = {
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(presenceData);
            }
        }
        else {
            var presenceData = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(presenceData);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDbEQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDdEMsSUFBSSxZQUFZLEdBQWlCO2dCQUNoQyxPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxhQUFhLEVBQUUsUUFBUTthQUN2QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuQzthQUFNLElBQ04sU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDbEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQzlCO1lBQ0QsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sRUFBRTtnQkFDakMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMxQixJQUFJLFlBQVksR0FBaUI7d0JBQ2hDLE9BQU8sRUFBRSxjQUFjO3dCQUN2QixLQUFLLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzt3QkFD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