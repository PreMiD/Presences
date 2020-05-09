var presence = new Presence({
    clientId: "563434444321587202"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "maki"
    };
    if (document.location.hostname == "maki.gg") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/dashboard/")) {
            title = document.querySelector("div.app-content.content > div.content-wrapper > div.content-body > section.users-edit > div.card > div.card-content > div.card-body > div.tab-content > #general > div.media.mb-2 > div.media-body.mt-50 > h4.media-heading");
            presenceData.details = "Dashboard:";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname.includes("/premium")) {
            presenceData.details = "Premium";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Homepage";
        }
        else if (document.location.pathname == "/commands") {
            presenceData.details = "Commands";
        }
        else if (document.location.pathname == "/status") {
            presenceData.details = "Status";
        }
        else if (document.location.pathname == "/profile") {
            title = document.querySelector("div.app-content.content > div.content-wrapper > div.content-body > section.page-users-view > div.row > div.col-12 > div.card > div.card-body > div.row > div.col-12.col-sm-9.col-md-6.col-lg-5 > table > tbody > tr > tb.font-weight-bold");
            presenceData.details = "Profile";
            presenceData.state = title.innerText;
        }
        else if (document.location.pathname == "/verify") {
            presenceData.details = "Verification";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBVSxDQUFDO0FBRWYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUMzQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0RCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsNk5BQTZOLENBQzlOLENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztZQUNwQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7U0FDdEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUNqQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1NBQ25DO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxXQUFXLEVBQUU7WUFDcEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7U0FDbkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtZQUNsRCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztTQUNqQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksVUFBVSxFQUFFO1lBQ25ELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QiwyT0FBMk8sQ0FDNU8sQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ2pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUN0QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksU0FBUyxFQUFFO1lBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1NBQ3ZDO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9