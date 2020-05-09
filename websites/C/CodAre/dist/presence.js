const presence = new Presence({
    clientId: "655044555632148518"
});
const browsingStamp = Math.floor(Date.now() / 1000);
let user;
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.hostname == "codare.org") {
        presenceData.startTimestamp = browsingStamp;
        if (document.location.pathname.includes("/u/")) {
            presenceData.details = "Bir kullanıcının profiline";
            if (document.querySelector("#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > a > span")) {
                user = document.querySelector("#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > a > span").innerHTML;
            }
            else if (document.querySelector("#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > span")) {
                user = document.querySelector("#content > div > div.UserCard.Hero.UserHero > div > div > div > h2 > span").textContent;
            }
            presenceData.state = "bakıyor: " + user;
        }
        else if (document.location.pathname.includes("/d/")) {
            presenceData.details = "Bir konuyu okuyor:";
            const title = document.querySelector("#content > div > div.DiscussionPage-discussion > header > div > ul > li.item-title > h2").textContent;
            presenceData.state = title;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/settings")) {
            presenceData.details = "Ayarlarda düzenleme";
            presenceData.state = "yapıyor";
        }
        else if (document.location.pathname.includes("/tags")) {
            presenceData.details = "Etiketlere bakıyor";
        }
        else if (document.location.pathname.includes("/t/")) {
            presenceData.details = "Bir etikete göz atıyor:";
            const name = document.querySelector("#content > div > header > div > div > h2").textContent;
            presenceData.state = name;
        }
        else if (document.location.pathname.includes("/following")) {
            presenceData.details = "Takip edilen etiketlere";
            presenceData.state = "bakıyor";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3BELElBQUksSUFBSSxDQUFDO0FBRVQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzdCLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxZQUFZLEVBQUU7UUFDOUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUMsWUFBWSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztZQUNwRCxJQUNFLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLCtFQUErRSxDQUNoRixFQUNEO2dCQUNBLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiwrRUFBK0UsQ0FDaEYsQ0FBQyxTQUFTLENBQUM7YUFDYjtpQkFBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLDJFQUEyRSxDQUM1RSxFQUNEO2dCQUNBLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiwyRUFBMkUsQ0FDNUUsQ0FBQyxXQUFXLENBQUM7YUFDZjtZQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMseUZBQXlGLENBQzFGLENBQUMsV0FBVyxDQUFDO1lBQ2QsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDM0IsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDeEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1lBQzdDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztTQUM3QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7WUFDakQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsMENBQTBDLENBQzNDLENBQUMsV0FBVyxDQUFDO1lBQ2QsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDM0I7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM1RCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1lBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9