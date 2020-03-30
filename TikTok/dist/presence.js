var presence = new Presence({
    clientId: "621881103380381716"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "tiktok-logo"
    };
    var path = document.location.pathname;
    if (path.includes("/trending")) {
        data.details = "Viewing Trending";
        data.startTimestamp = elapsed;
    }
    else if (path.includes("/tag")) {
        var tag = document.querySelector("._challenge_header_title").textContent;
        data.details = "Viewing a tag";
        data.state = tag;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/@")) {
        if (path.includes("/video/")) {
            var user = document.querySelector("._video_card_big_user_info_handle")
                .textContent;
            data.details = "Viewing a TikTok";
            data.state = user;
            data.startTimestamp = elapsed;
        }
        else {
            var user = document.querySelector("._user_header_uniqueId").textContent;
            data.details = "Viewing a Profile";
            data.state = user;
            data.startTimestamp = elapsed;
        }
    }
    else {
        data.details = "Viewing the Homepage";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTVDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsYUFBYTtLQUM1QixDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDOUI7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN6RSxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztLQUM5QjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQztpQkFDcEUsV0FBVyxDQUFDO1lBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztTQUM5QjthQUFNO1lBQ04sSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN4RSxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1NBQzlCO0tBQ0Q7U0FBTTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7S0FDOUI7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIn0=