var presence = new Presence({
    clientId: "620283648171835392"
});
const boards = {
    toradora: "Toradora!",
    kiminonawa: "Kimi no Na wa. / Your Name."
};
presence.on("UpdateData", () => {
    var presenceData = {
        largeImageKey: "lg-imgb"
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sTUFBTSxHQUFHO0lBQ2IsUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLDZCQUE2QjtDQUMxQyxDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsU0FBUztLQUN6QixDQUFDO0lBQ0YsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNsQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDOUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6QjtJQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ3JDLFlBQVksR0FBRztZQUNiLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztZQUMxQixLQUFLLEVBQUUsdUJBQXVCO1lBQzlCLGFBQWEsRUFBRSxTQUFTO1NBQ3pCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDekMsWUFBWSxHQUFHO29CQUNiLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztvQkFDMUIsS0FBSyxFQUFFLHVCQUF1QjtvQkFDOUIsYUFBYSxFQUFFLFNBQVM7aUJBQ3pCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQy9DLFlBQVksR0FBRztvQkFDYixPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUs7b0JBQzFCLEtBQUssRUFDSCxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7b0JBQ2xFLGFBQWEsRUFBRSxTQUFTO2lCQUN6QixDQUFDO2dCQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7aUJBQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO2dCQUM1QixZQUFZLEdBQUc7b0JBQ2IsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO29CQUMxQixLQUFLLEVBQUUscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUc7b0JBQzVDLGFBQWEsRUFBRSxTQUFTO2lCQUN6QixDQUFDO2dCQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsWUFBWSxHQUFHO29CQUNiLE9BQU8sRUFBRSxTQUFTLEdBQUcsS0FBSztvQkFDMUIsYUFBYSxFQUFFLFNBQVM7aUJBQ3pCLENBQUM7Z0JBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztTQUNGO2FBQU07WUFDTCxZQUFZLEdBQUc7Z0JBQ2IsT0FBTyxFQUFFLFNBQVMsR0FBRyxLQUFLO2dCQUMxQixhQUFhLEVBQUUsU0FBUzthQUN6QixDQUFDO1lBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztLQUNGO1NBQU07UUFDTCxZQUFZLEdBQUc7WUFDYixPQUFPLEVBQUUsU0FBUyxHQUFHLEtBQUs7WUFDMUIsYUFBYSxFQUFFLFNBQVM7U0FDekIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9