const presence = new Presence({
    clientId: "650373069172375577"
});
let user, title;
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "uptimerobot"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "uptimerobot.com") {
        if (document.location.pathname.includes("/login")) {
            presenceData.details = "Logging in";
        }
        else if (document.location.pathname.includes("/signUp")) {
            presenceData.details = "Signing up";
        }
        else if (document.location.pathname.includes("/dashboard")) {
            presenceData.details = "Viewing:";
            user = document.querySelector("#main-content > div.row-fluid.page-head > h2 > span");
            presenceData.state = user.innerText;
        }
        else if (document.location.pathname.includes("/support")) {
            presenceData.details = "Viewing the support page";
        }
        else if (document.location.pathname.includes("/faq")) {
            presenceData.details = "Viewing the FAQ page";
        }
        else if (document.querySelector("body > content > content > div:nth-child(3) > div:nth-child(3) > div.content > div.titleTopic") !== null) {
            user = document.querySelector("body > content > content > div:nth-child(3) > div:nth-child(3) > div.content > div.titleTopic");
            presenceData.details = "Viewing thread:";
        }
        else if (document.location.pathname.includes("/about")) {
            presenceData.details = "Viewing the about page";
        }
        else if (document.location.pathname.includes("/privacyPolicy")) {
            presenceData.details = "Viewing privacy";
            presenceData.state = "and policy page";
        }
        else if (document.location.pathname.includes("/locations")) {
            presenceData.details = "Viewing locations page";
        }
        else if (document.location.pathname.includes("/pricing")) {
            presenceData.details = "Looking at the pricing page";
        }
        else if (document.location.pathname.includes("/api")) {
            presenceData.details = "Looking at the api page";
        }
        else if (document.location.pathname.includes("/termsOfService")) {
            presenceData.details = "Viewing the TOS";
        }
        else if (document.location.pathname.includes("/account/")) {
            presenceData.details = "Forums, account settings";
        }
        else if (document.location.pathname.includes("/members/")) {
            if (document.URL.includes("key=staff_members")) {
                presenceData.details = "Viewing the list";
                presenceData.state = "of staff members";
            }
            else if (document.URL.includes("key=todays_birthdays")) {
                presenceData.details = "Viewing list of members";
                presenceData.state = "with today as their birthday";
            }
            else if (document.location.pathname.includes("/banned")) {
                presenceData.details = "Viewing the list";
                presenceData.state = "of banned users";
            }
            else if (document.location.pathname.includes("/list")) {
                presenceData.details = "Viewing the list";
                presenceData.state = "of all users";
            }
            else if (document.URL.includes("key=most_likes")) {
                presenceData.details = "Viewing list of members";
                presenceData.state = "with the most reactions";
            }
            else if (document.URL.includes("key=most_messages")) {
                presenceData.details = "Viewing list of members";
                presenceData.state = "with the most messages";
            }
            else if (document.querySelector("#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span > span") !== null) {
                user = document.querySelector("#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span > span");
                presenceData.details = "Viewing user:";
                presenceData.state = user.innerText;
            }
            else if (document.querySelector("#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span") !== null) {
                user = document.querySelector("#top > div.p-body > div > div > div > div.p-body-content > div > div.block > div > div > div > div > div > h1 > span");
                presenceData.details = "Viewing user:";
                presenceData.state = user.innerText;
            }
            else {
                presenceData.details = "Viewing overview of members";
            }
        }
        else if (document.location.pathname.includes("/forums/")) {
            title = document.querySelector("#top > div.p-body > div > div.uix_titlebar > div > div > div > h1");
            if (title != null) {
                presenceData.details = "Forums, viewing category:";
                presenceData.state = title.innerText;
            }
            else {
                presenceData.details = "Forums, Browsing...";
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBSSxFQUFFLEtBQUssQ0FBQztBQUNoQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVwRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLGFBQWE7S0FDN0IsQ0FBQztJQUVGLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBQzVDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksaUJBQWlCLEVBQUU7UUFDbkQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7U0FDckM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztTQUNyQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQixxREFBcUQsQ0FDdEQsQ0FBQztZQUNGLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNyQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQy9DO2FBQU0sSUFDTCxRQUFRLENBQUMsYUFBYSxDQUNwQiwrRkFBK0YsQ0FDaEcsS0FBSyxJQUFJLEVBQ1Y7WUFDQSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsK0ZBQStGLENBQ2hHLENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1NBQzFDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztTQUNqRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDaEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1NBQ3hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztTQUNqRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzFELFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7U0FDdEQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1NBQ2xEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUNqRSxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1NBQzFDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDM0QsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztTQUNuRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzNELElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDOUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztnQkFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQzthQUN6QztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7Z0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsOEJBQThCLENBQUM7YUFDckQ7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7YUFDeEM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7Z0JBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO2FBQ3JDO2lCQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztnQkFDakQsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7Z0JBQ2pELFlBQVksQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUM7YUFDL0M7aUJBQU0sSUFDTCxRQUFRLENBQUMsYUFBYSxDQUNwQiw2SEFBNkgsQ0FDOUgsS0FBSyxJQUFJLEVBQ1Y7Z0JBQ0EsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLDZIQUE2SCxDQUM5SCxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO2dCQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckM7aUJBQU0sSUFDTCxRQUFRLENBQUMsYUFBYSxDQUNwQixzSEFBc0gsQ0FDdkgsS0FBSyxJQUFJLEVBQ1Y7Z0JBQ0EsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLHNIQUFzSCxDQUN2SCxDQUFDO2dCQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO2dCQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckM7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQzthQUN0RDtTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLG1FQUFtRSxDQUNwRSxDQUFDO1lBQ0YsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNqQixZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO2dCQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQzthQUM5QztTQUNGO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9