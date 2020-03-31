var presence = new Presence({
    clientId: "619967690056007699"
});
presence.on("UpdateData", async () => {
    var urlParams = new URLSearchParams(window.location.search);
    if (document.location.href.includes("rule34.xxx")) {
        if (document.location.pathname == "/") {
            let pdata = {
                details: "Viewing the homepage...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(pdata);
        }
        else if (urlParams.get("page") &&
            urlParams.get("s") &&
            urlParams.get("page") == "post") {
            if (urlParams.get("s") == "list") {
                if (urlParams.get("tags")) {
                    let pdata = {
                        details: "Searching...",
                        state: urlParams.get("tags").replace(" ", ", "),
                        largeImageKey: "lg-r34"
                    };
                    presence.setActivity(pdata);
                }
                else {
                    let pdata = {
                        details: "Viewing Posts List...",
                        largeImageKey: "lg-r34"
                    };
                    presence.setActivity(pdata);
                }
            }
            else if (urlParams.get("s") == "view" && urlParams.get("id")) {
                let pdata = {
                    details: "Viewing a Post...",
                    state: "Post " + urlParams.get("id"),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(pdata);
            }
            else {
                let pdata = {
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(pdata);
            }
        }
        else {
            let pdata = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(pdata);
        }
    }
    else if (document.location.href.includes("rule34.paheal.net")) {
        var path = document.location.pathname.split("/");
        if (document.location.pathname == "/") {
            let pdata = {
                details: "Viewing the homepage...",
                largeImageKey: "lg-r34"
            };
            presence.setActivity(pdata);
        }
        else if (path[1] == "post") {
            if (path[2] == "list" && path.length == 3) {
                let pdata = {
                    details: "Viewing Posts List...",
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(pdata);
            }
            else if (path[2] == "list" && path.length > 3) {
                let pdata = {
                    details: "Searching...",
                    state: path[3].replace("%20", ", ").replace("%21", "!"),
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(pdata);
            }
            else if (path[2] == "view") {
                let pdata = {
                    details: "Viewing a post...",
                    state: "Post " + path[3],
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(pdata);
            }
            else {
                let pdata = {
                    largeImageKey: "lg-r34"
                };
                presence.setActivity(pdata);
            }
        }
        else {
            let pdata = {
                largeImageKey: "lg-r34"
            };
            presence.setActivity(pdata);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDakQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsSUFBSSxLQUFLLEdBQWlCO2dCQUN4QixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxhQUFhLEVBQUUsUUFBUTthQUN4QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjthQUFNLElBQ0wsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDbEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQy9CO1lBQ0EsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sRUFBRTtnQkFDaEMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN6QixJQUFJLEtBQUssR0FBaUI7d0JBQ3hCLE9BQU8sRUFBRSxjQUFjO3dCQUN2QixLQUFLLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzt3QkFDL0MsYUFBYSxFQUFFLFFBQVE7cUJBQ3hCLENBQUM7b0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0wsSUFBSSxLQUFLLEdBQWlCO3dCQUN4QixPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxhQUFhLEVBQUUsUUFBUTtxQkFDeEIsQ0FBQztvQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3QjthQUNGO2lCQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUQsSUFBSSxLQUFLLEdBQWlCO29CQUN4QixPQUFPLEVBQUUsbUJBQW1CO29CQUM1QixLQUFLLEVBQUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNwQyxhQUFhLEVBQUUsUUFBUTtpQkFDeEIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO2lCQUFNO2dCQUNMLElBQUksS0FBSyxHQUFpQjtvQkFDeEIsYUFBYSxFQUFFLFFBQVE7aUJBQ3hCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3QjtTQUNGO2FBQU07WUFDTCxJQUFJLEtBQUssR0FBaUI7Z0JBQ3hCLGFBQWEsRUFBRSxRQUFRO2FBQ3hCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1FBQy9ELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxJQUFJLEtBQUssR0FBaUI7Z0JBQ3hCLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLGFBQWEsRUFBRSxRQUFRO2FBQ3hCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDekMsSUFBSSxLQUFLLEdBQWlCO29CQUN4QixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxhQUFhLEVBQUUsUUFBUTtpQkFDeEIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0MsSUFBSSxLQUFLLEdBQWlCO29CQUN4QixPQUFPLEVBQUUsY0FBYztvQkFDdkIsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO29CQUN2RCxhQUFhLEVBQUUsUUFBUTtpQkFDeEIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRTtnQkFDNUIsSUFBSSxLQUFLLEdBQWlCO29CQUN4QixPQUFPLEVBQUUsbUJBQW1CO29CQUM1QixLQUFLLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLGFBQWEsRUFBRSxRQUFRO2lCQUN4QixDQUFDO2dCQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsSUFBSSxLQUFLLEdBQWlCO29CQUN4QixhQUFhLEVBQUUsUUFBUTtpQkFDeEIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1NBQ0Y7YUFBTTtZQUNMLElBQUksS0FBSyxHQUFpQjtnQkFDeEIsYUFBYSxFQUFFLFFBQVE7YUFDeEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7S0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=