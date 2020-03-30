let presence = new Presence({
    clientId: "690628469746434089"
});
let browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "fifa"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-home.selected") !== null) {
        presenceData.details = "Browsing...";
        if (document.querySelector(".ut-objectives-list-view") !== null) {
            presenceData.details = "Viewing objectives";
            if (document
                .querySelector(".tab-menu > div > a:nth-child(1)")
                .className.includes("selected")) {
                presenceData.state = "Season Progress";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(2)")
                .className.includes("selected")) {
                presenceData.state = "Milestones";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(3)")
                .className.includes("selected")) {
                presenceData.state = "Season Objectives";
            }
        }
        else if (document.querySelector(".SBCHub") !== null) {
            presenceData.details = "Viewing the SBC's";
            if (document
                .querySelector(".tab-menu > div > a:nth-child(1)")
                .className.includes("selected")) {
                presenceData.details = "Viewing all SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(2)")
                .className.includes("selected")) {
                presenceData.details = "Viewing their favourite SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(3)")
                .className.includes("selected")) {
                presenceData.details = "Viewing the live SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(4)")
                .className.includes("selected")) {
                presenceData.details = "Viewing the basic SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(5)")
                .className.includes("selected")) {
                presenceData.details = "Viewing the advanced SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(6)")
                .className.includes("selected")) {
                presenceData.details = "Viewing players SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(7)")
                .className.includes("selected")) {
                presenceData.details = "Viewing icon swap SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(8)")
                .className.includes("selected")) {
                presenceData.details = "Viewing upgrade SBC's";
            }
        }
        else if (document.querySelector(".sbc-status-container") !== null &&
            document.querySelector(".challenge-content") !== null) {
            presenceData.details = "Viewing SBC challange:";
            presenceData.state = document.querySelector(".title").textContent;
        }
        else if (document.querySelector(".SBCChallenges") !== null) {
            presenceData.details = "Viewing SBC challange:";
            presenceData.state = document.querySelector(".title").textContent;
        }
        else if (document.querySelector(".ut-transfer-list-view") !== null) {
            presenceData.details = "Viewing the transfers";
        }
        else if (document.querySelector(".ut-squad-overview") !== null) {
            presenceData.details = "Viewing squad overview of club:";
            presenceData.state = document.querySelector(".title").textContent;
        }
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-squad.selected") !== null) {
        presenceData.details = "Browsing Squads...";
        if (document.querySelector(".totw") !== null) {
            presenceData.details = "Viewing the squad of the week";
        }
        else if (document.querySelector(".ut-squad-overview") !== null) {
            presenceData.details = "Viewing squad overview of club:";
            presenceData.state = document.querySelector(".title").textContent;
        }
        else if (document.querySelector(".squad-list") !== null) {
            presenceData.details = "Managing their squad";
        }
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-sbc.selected") !== null) {
        presenceData.details = "Browsing SBC...";
        if (document.querySelector(".SBCHub") !== null) {
            presenceData.details = "Viewing the SBC's";
            if (document
                .querySelector(".tab-menu > div > a:nth-child(1)")
                .className.includes("selected")) {
                presenceData.details = "Viewing all SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(2)")
                .className.includes("selected")) {
                presenceData.details = "Viewing their favourite SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(3)")
                .className.includes("selected")) {
                presenceData.details = "Viewing the live SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(4)")
                .className.includes("selected")) {
                presenceData.details = "Viewing the basic SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(5)")
                .className.includes("selected")) {
                presenceData.details = "Viewing the advanced SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(6)")
                .className.includes("selected")) {
                presenceData.details = "Viewing players SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(7)")
                .className.includes("selected")) {
                presenceData.details = "Viewing icon swap SBC's";
            }
            else if (document
                .querySelector(".tab-menu > div > a:nth-child(8)")
                .className.includes("selected")) {
                presenceData.details = "Viewing upgrade SBC's";
            }
        }
        else if (document.querySelector(".sbc-status-container") !== null &&
            document.querySelector(".challenge-content") !== null) {
            presenceData.details = "Viewing SBC challange:";
            presenceData.state = document.querySelector(".title").textContent;
        }
        else if (document.querySelector(".SBCChallenges") !== null) {
            presenceData.details = "Viewing SBC challange:";
            presenceData.state = document.querySelector(".title").textContent;
        }
        else if (document.querySelector(".ut-transfer-list-view") !== null) {
            presenceData.details = "Viewing the transfers";
        }
        else if (document.querySelector(".ut-squad-overview") !== null) {
            presenceData.details = "Viewing squad overview of club:";
            presenceData.state = document.querySelector(".title").textContent;
        }
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-transfer.selected") !== null) {
        presenceData.details = "Browsing Transfers...";
        if (document.querySelector(".ut-watch-list-view") !== null) {
            presenceData.details = "Viewing their transfer targets";
        }
        else if (document.querySelector(".ut-transfer-list-view") !== null) {
            presenceData.details = "Viewing their transfer list";
        }
        else if (document.querySelector(".ut-pinned-list-container.SearchResults") !== null) {
            presenceData.details = "Transfers - Searching for new players";
            presenceData.smallImageKey = "search";
        }
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-store.selected") !== null) {
        presenceData.details = "Browsing Store...";
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-club.selected") !== null) {
        presenceData.details = "Browsing through their club...";
        if (document.querySelector(".paginated-item-list") !== null) {
            presenceData.details = "Viewing their players";
            if ((document.querySelector(".ut-list-header-icon > img")).src
                .toLowerCase()
                .includes("staff")) {
                presenceData.details = "Viewing their staff";
            }
            else if (document.querySelector(".consumable") !== null) {
                presenceData.details = "Viewing their consumables";
            }
            else if ((document.querySelector(".ut-list-header-icon > img")).src
                .toLowerCase()
                .includes("items")) {
                presenceData.details = "Viewing their club items";
            }
            else if (document.querySelector(".ut-undodiscard-status-bar") !== null) {
                presenceData.details = "Viewing Quick Sell Recovery";
            }
        }
        else if (document.querySelector(".consumable-tile") !== null) {
            presenceData.details = "Viewing their consumables";
        }
        else if (document.querySelector(".celebrations-tile") !== null) {
            presenceData.details = "Viewing their club items";
        }
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-leaderboards.selected") !== null) {
        presenceData.details = "Viewing the leaderboards";
        if (document
            .querySelector(".tab-menu > div > a:nth-child(1)")
            .className.includes("selected")) {
            presenceData.details = "Viewing leaderboard of:";
            presenceData.state = "Match Earnings";
        }
        else if (document
            .querySelector(".tab-menu > div > a:nth-child(2)")
            .className.includes("selected")) {
            presenceData.details = "Viewing leaderboard of:";
            presenceData.state = "Transfer Profit";
        }
        else if (document
            .querySelector(".tab-menu > div > a:nth-child(3)")
            .className.includes("selected")) {
            presenceData.details = "Viewing leaderboard of:";
            presenceData.state = "Club Value";
        }
        else if (document
            .querySelector(".tab-menu > div > a:nth-child(4)")
            .className.includes("selected")) {
            presenceData.details = "Viewing leaderboard of:";
            presenceData.state = "Top Squad";
        }
    }
    else if (document.querySelector("body > main > section > nav > button.ut-tab-bar-item.icon-settings.selected") !== null) {
        presenceData.details = "Viewing their settings";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsTUFBTTtLQUNyQixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUNyQix5RUFBeUUsQ0FDekUsS0FBSyxJQUFJLEVBQ1Q7UUFFRCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFFaEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxJQUNDLFFBQVE7aUJBQ04sYUFBYSxDQUFDLGtDQUFrQyxDQUFDO2lCQUNqRCxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUMvQjtnQkFDRCxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO2FBQ3ZDO2lCQUFNLElBQ04sUUFBUTtpQkFDTixhQUFhLENBQUMsa0NBQWtDLENBQUM7aUJBQ2pELFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQy9CO2dCQUNELFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2FBQ2xDO2lCQUFNLElBQ04sUUFBUTtpQkFDTixhQUFhLENBQUMsa0NBQWtDLENBQUM7aUJBQ2pELFNB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