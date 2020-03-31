var presence = new Presence({
    clientId: "629413450774347786"
});
var item, user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "mcstacker"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "bimbimma.com" &&
        document.URL.includes("/mcstacker/2014-08-31.php")) {
        presenceData.details = "MCStacker for 1.7.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "mcstacker.bimbimma.com" &&
        document.URL.includes("/mcstacker1.10.php")) {
        presenceData.details = "MCStacker for 1.8.x - 1.10.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "mcstacker.bimbimma.com" ||
        document.URL.includes("mcstacker.net/1.12.php")) {
        presenceData.details = "MCStacker for 1.12.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "mcstacker.bimbimma.com" ||
        document.URL.includes("mcstacker.net/1.12.php")) {
        presenceData.details = "MCStacker for 1.12.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.URL.includes("mcstacker.net/1.13converter.php")) {
        presenceData.details = "MCStacker Converter for 1.13.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.URL.includes("mcstacker.net/1.13.php")) {
        presenceData.details = "MCStacker for 1.13.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.URL.includes("mcstacker.net/1.14.php")) {
        presenceData.details = "MCStacker for 1.14.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.URL.includes("mcstacker.net/1.15.php")) {
        presenceData.details = "MCStacker for 1.15.x";
        delete presenceData.state;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else if (document.location.hostname == "mcstacker.net") {
        if (document.querySelector("#lootTableContainer") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a loot table";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#lootPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /loot command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#bossbarPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /bossbar command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#scoreboardPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /scoreboard command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#teamPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /team command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#particlePane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /particle command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#soundPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /playsound command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#replaceItemPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /replaceitem command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#rootEntity") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /execute command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#tellrawPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /tellraw command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#replaceItemPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /teleport command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#blockPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /block command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#rootEntity") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /entity command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#givePane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /give command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.querySelector("#effectPane") != null) {
            presenceData.details = "MCStacker for latest";
            presenceData.state = "Making a /effect command";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/versions.php")) {
            presenceData.details = "MCStacker viewing:";
            presenceData.state = "Version page";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/npc/")) {
            presenceData.details = "Using the";
            presenceData.state = "NPC generator";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/murals/")) {
            presenceData.details = "Using the";
            presenceData.state = "Mural generator";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLElBQVMsRUFBRSxNQUFXLEVBQUUsS0FBVSxDQUFDO0FBRWxELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsV0FBVztLQUMzQixDQUFDO0lBQ0YsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFDNUMsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxjQUFjO1FBQzVDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLEVBQ2xEO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztRQUM3QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHdCQUF3QjtRQUN0RCxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUMzQztRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7UUFDdEQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSx3QkFBd0I7UUFDdEQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFDL0M7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1FBQzlDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksd0JBQXdCO1FBQ3RELFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQy9DO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxDQUFDLEVBQUU7UUFDbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztRQUN4RCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGVBQWUsRUFBRTtRQUN4RCxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO1lBRTNDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUM7WUFFOUMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztZQUVqRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUM1RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsOEJBQThCLENBQUM7WUFFcEQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztZQUU5QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO1lBRWxELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsNkJBQTZCLENBQUM7WUFFbkQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLCtCQUErQixDQUFDO1lBRXJELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUM7WUFFakQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3pELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQztZQUVqRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUM3RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUM7WUFFbEQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQztZQUUvQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1lBRWhELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1lBQzlDLFlBQVksQ0FBQyxLQUFLLEdBQUcsd0JBQXdCLENBQUM7WUFFOUMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQztZQUVoRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDakQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztZQUVwQyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1lBRXJDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7WUFDbkMsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUV2QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6QjtLQUNGO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==