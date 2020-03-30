var presence = new Presence({
    clientId: "620283648171835392"
});
const boards = {
    toradora: "Toradora!",
    kiminonawa: "Kimi no Na wa. / Your Name."
};
presence.on("UpdateData", () => {
    var path = document.location.pathname.split("/");
    var board = "N/A";
    if (path[1] && boards[path[1]]) {
        board = boards[path[1]];
    }
    if (document.location.pathname == "/") {
        var presenceData = {
            details: "Board: " + board,
            state: "Viewing the frontpage",
            largeImageKey: "lg-imgb"
        };
        presence.setActivity(presenceData);
    }
    else if (boards[path[1]]) {
        if (path[2] == "post") {
            if (path[3] == "list" && path.length == 4) {
                var presenceData = {
                    details: "Board: " + board,
                    state: "Viewing Posts List...",
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
            else if (path[3] == "list" && path.length > 4) {
                var presenceData = {
                    details: "Board: " + board,
                    state: "Searching: " + path[4].replace("%20", ", ").replace("%21", "!"),
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
            else if (path[3] == "view") {
                var presenceData = {
                    details: "Board: " + board,
                    state: "Viewing a Post... (" + path[4] + ")",
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
            else {
                var presenceData = {
                    details: "Board: " + board,
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
        }
        else {
            var presenceData = {
                details: "Board: " + board,
                largeImageKey: "lg-imgb"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        var presenceData = {
            details: "Board: " + board,
            largeImageKey: "lg-imgb"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHO0lBQ2QsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLDZCQUE2QjtDQUN6QyxDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzlCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQy9CLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7SUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUN0QyxJQUFJLFlBQVksR0FBaUI7WUFDaEMsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO1lBQzFCLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsYUFBYSxFQUFFLFNBQVM7U0FDeEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7U0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDdEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLFlBQVksR0FBaUI7b0JBQ2hDLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztvQkFDMUIsS0FBSyxFQUFFLHVCQUF1QjtvQkFDOUIsYUFBYSxFQUFFLFNBQVM7aUJBQ3hCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNuQztpQkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hELElBQUksWUFBWSxHQUFpQjtvQkFDaEMsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO29CQUMxQixLQUFLLEVBQ0osYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO29CQUNqRSxhQUFhLEVBQUUsU0FBUztpQkFDeEIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ25DO2lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxZQUFZLEdBQWlCO29CQUNoQyxPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUs7b0JBQzFCLEtBQUssRUFBRSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztvQkFDNUMsYUFBYSxFQUFFLFNBQVM7aUJBQ3hCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDTixJQUFJLFlBQVksR0FBaUI7b0JBQ2hDLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztvQkFDMUIsYUFBYSxFQUFFLFNBQVM7aUJBQ3hCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNuQztTQUNEO2FBQU07WUFDTixJQUFJLFlBQVksR0FBaUI7Z0JBQ2hDLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztnQkFDMUIsYUFBYSxFQUFFLFNBQVM7YUFDeEIsQ0FBQztZQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbkM7S0FDRDtTQUFNO1FBQ04sSUFBSSxZQUFZLEdBQWlCO1lBQ2hDLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztZQUMxQixhQUFhLEVBQUUsU0FBUztTQUN4QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNuQztBQUNGLENBQUMsQ0FBQyxDQUFDIn0=