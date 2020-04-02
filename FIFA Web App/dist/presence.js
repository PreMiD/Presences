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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUNwQix5RUFBeUUsQ0FDMUUsS0FBSyxJQUFJLEVBQ1Y7UUFFQSxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFFL0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxJQUNFLFFBQVE7aUJBQ0wsYUFBYSxDQUFDLGtDQUFrQyxDQUFDO2lCQUNqRCxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUNqQztnQkFDQSxZQUFZLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDO2FBQ3hDO2lCQUFNLElBQ0wsUUFBUTtpQkFDTCxhQUFhLENBQUMsa0NBQWtDLENBQUM7aUJBQ2pELFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQ2pDO2dCQUNBLFlBQVksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2FBQ25DO2lCQUFNLElBQ0wsUUFBUTtpQkFDTCxhQUFhLENBQUMsa0NBQWtDLENBQUM7aUJBQ2pELFNB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