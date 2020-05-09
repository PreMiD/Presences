var presence = new Presence({
    clientId: "629072489238233111"
});
var item, user, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "labymod"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "www.labymod.net") {
        if (document.location.pathname.includes("/download")) {
            presenceData.details = "Viewing downloads";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/ideas")) {
            presenceData.details = "Ideas, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/idea")) {
            item = document.querySelector("#content > div > div:nth-child(1) > div > div:nth-child(2) > h3 > label");
            title = document.querySelector("#content > div > div:nth-child(1) > div > div:nth-child(2) > h3");
            if (item != null) {
                title = title.innerText.replace(item.innerText, "");
            }
            else {
                title = title.innerText;
            }
            presenceData.details = "Ideas, Viewing:";
            presenceData.state = title;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/shop")) {
            title = document.querySelector("#variSection > div.contentWrapper > article.selectedProduct > table > tbody > tr > td:nth-child(2) > h3");
            user = document.querySelector("#renderoverlay");
            if (user.width == "0") {
                presenceData.details = "Shop, Ordering...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Shop, Viewing:";
                presenceData.state = title.innerText.replace("LABYMOD", "");
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/dashboard")) {
            presenceData.details = "Viewing their dashboard";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/coins")) {
            presenceData.details = "Viewing their coins";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/impressum")) {
            presenceData.details = "Viewing impressum";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/datenschutz")) {
            presenceData.details = "Viewing datenschutz";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/tsverify")) {
            presenceData.details = "Verify-ing their TeamSpeak";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "faq.labymod.net") {
        presenceData.details = "Viewing frequently";
        presenceData.state = "asked questions";
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "apply.labymod.net") {
        presenceData.details = "Viewing Jobs";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "docs.labymod.net") {
        title = document.querySelector("body > div > main > div > div.md-content > article > h1");
        user = document.querySelector("body > div > main > div > div.md-sidebar.md-sidebar--primary > div > div > nav > ul > li.md-nav__item.md-nav__item--active.md-nav__item--nested > label");
        title = user.innerText + " - " + title.innerText;
        presenceData.details = "Docs viewing:";
        presenceData.state = title;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLElBQVMsRUFBRSxLQUFVLENBQUM7QUFFckMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxTQUFTO0tBQ3pCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUFFO1FBQ25ELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IseUVBQXlFLENBQzFFLENBQUM7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsaUVBQWlFLENBQ2xFLENBQUM7WUFDRixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2hCLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ3pCO1lBQ0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUUzQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qix5R0FBeUcsQ0FDMUcsQ0FBQztZQUNGLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDaEQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsRUFBRTtnQkFDckIsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztnQkFDM0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRTVELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztZQUNqRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1lBQzdDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztZQUM3QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1lBQ3BELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6QjtLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFBRTtRQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7UUFFdkMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLG1CQUFtQixFQUFFO1FBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksa0JBQWtCLEVBQUU7UUFDM0QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLHlEQUF5RCxDQUMxRCxDQUFDO1FBQ0YsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLHlKQUF5SixDQUMxSixDQUFDO1FBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFM0IsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDekI7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9