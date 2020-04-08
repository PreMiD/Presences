var presence = new Presence({
    clientId: "647973934603567130"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var title;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "bahamut"
    };
    if (document.location.hostname == "forum.gamer.com.tw") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing home page";
        }
        else if (document.querySelector(".BH-menu") !== null) {
            if (document.location.pathname.includes("A.php")) {
                title = document
                    .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
                    .getAttribute("title");
                presenceData.details = title;
                presenceData.state = "首頁";
                presence.setActivity(presenceData);
                presenceData.smallImageKey = "reading";
            }
            if (document.location.pathname.includes("B.php")) {
                title = document
                    .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
                    .getAttribute("title");
                presenceData.details = title;
                presenceData.state = "列表";
                presence.setActivity(presenceData);
                presenceData.smallImageKey = "reading";
            }
            if (document.location.pathname.includes("C.php")) {
                title = document
                    .querySelector("div.BH-menu > ul.BH-menuE > li > a[title]")
                    .getAttribute("title");
                var header_title = document.getElementsByClassName("c-post__header__title")[0].innerHTML;
                presenceData.details = title;
                presenceData.state = header_title;
                presence.setActivity(presenceData);
                presenceData.smallImageKey = "reading";
            }
        }
    }
    if (presenceData.details == null) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing site:";
        presenceData.state = "巴哈姆特";
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksS0FBVSxDQUFDO0FBRWYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG9CQUFvQixFQUFFO1FBQ3RELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3RELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNoRCxLQUFLLEdBQUcsUUFBUTtxQkFDYixhQUFhLENBQUMsMkNBQTJDLENBQUM7cUJBQzFELFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzthQUN4QztZQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNoRCxLQUFLLEdBQUcsUUFBUTtxQkFDYixhQUFhLENBQUMsMkNBQTJDLENBQUM7cUJBQzFELFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzthQUN4QztZQUNELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNoRCxLQUFLLEdBQUcsUUFBUTtxQkFDYixhQUFhLENBQUMsMkNBQTJDLENBQUM7cUJBQzFELFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDekIsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUNoRCx1QkFBdUIsQ0FDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2YsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzdCLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2dCQUNsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQzthQUN4QztTQUNGO0tBQ0Y7SUFDRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9