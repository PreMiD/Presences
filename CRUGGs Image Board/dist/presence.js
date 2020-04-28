var presence = new Presence({
    clientId: "620283648171835392"
});
const boards = {
    toradora: "Toradora!",
    kiminonawa: "Kimi no Na wa. / Your Name."
};
presence.on("UpdateData", () => {
    var presenceData;
    var path = document.location.pathname.split("/");
    var board = "N/A";
    if (path[1] && boards[path[1]]) {
        board = boards[path[1]];
    }
    if (document.location.pathname == "/") {
        presenceData = {
            details: "Board: " + board,
            state: "Viewing the frontpage",
            largeImageKey: "lg-imgb"
        };
        presence.setActivity(presenceData);
    }
    else if (boards[path[1]]) {
        if (path[2] == "post") {
            if (path[3] == "list" && path.length == 4) {
                presenceData = {
                    details: "Board: " + board,
                    state: "Viewing Posts List...",
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
            else if (path[3] == "list" && path.length > 4) {
                presenceData = {
                    details: "Board: " + board,
                    state: "Searching: " + path[4].replace("%20", ", ").replace("%21", "!"),
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
            else if (path[3] == "view") {
                presenceData = {
                    details: "Board: " + board,
                    state: "Viewing a Post... (" + path[4] + ")",
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
            else {
                presenceData = {
                    details: "Board: " + board,
                    largeImageKey: "lg-imgb"
                };
                presence.setActivity(presenceData);
            }
        }
        else {
            presenceData = {
                details: "Board: " + board,
                largeImageKey: "lg-imgb"
            };
            presence.setActivity(presenceData);
        }
    }
    else {
        presenceData = {
            details: "Board: " + board,
            largeImageKey: "lg-imgb"
        };
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHO0lBQ2IsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLDZCQUE2QjtDQUMxQyxDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLElBQUksWUFBMEIsQ0FBQztJQUMvQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM5QixLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxHQUFHO1lBQ2IsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO1lBQzFCLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsYUFBYSxFQUFFLFNBQVM7U0FDekIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUMxQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDckIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN6QyxZQUFZLEdBQUc7b0JBQ2IsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO29CQUMxQixLQUFLLEVBQUUsdUJBQXVCO29CQUM5QixhQUFhLEVBQUUsU0FBUztpQkFDekIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDL0MsWUFBWSxHQUFHO29CQUNiLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztvQkFDMUIsS0FBSyxFQUNILGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztvQkFDbEUsYUFBYSxFQUFFLFNBQVM7aUJBQ3pCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUU7Z0JBQzVCLFlBQVksR0FBRztvQkFDYixPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUs7b0JBQzFCLEtBQUssRUFBRSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztvQkFDNUMsYUFBYSxFQUFFLFNBQVM7aUJBQ3pCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxZQUFZLEdBQUc7b0JBQ2IsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO29CQUMxQixhQUFhLEVBQUUsU0FBUztpQkFDekIsQ0FBQztnQkFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7YUFBTTtZQUNMLFlBQVksR0FBRztnQkFDYixPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUs7Z0JBQzFCLGFBQWEsRUFBRSxTQUFTO2FBQ3pCLENBQUM7WUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTTtRQUNMLFlBQVksR0FBRztZQUNiLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztZQUMxQixhQUFhLEVBQUUsU0FBUztTQUN6QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=