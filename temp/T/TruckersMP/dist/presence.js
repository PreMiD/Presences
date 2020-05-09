var presence = new Presence({
    clientId: "624006279769227265"
});
var item, user, item2, item3, server, players, output;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "truckersmp"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "truckersmp.com") {
        if (document.location.pathname.includes("/team")) {
            presenceData.details = "Viewing the staff team";
            presenceData.state = user.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/status")) {
            presenceData.details = "Viewing server status";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/knowledge-base")) {
            presenceData.details = "Viewing Knowledge Base";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/support")) {
            presenceData.details = "Viewing Support Center";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/rules")) {
            presenceData.details = "Viewing the rules";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/download")) {
            presenceData.details = "Viewing the";
            presenceData.state = "download page";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/user/")) {
            item = document.querySelector("body > div.wrapper > div.container.content.profile > div.row > div.col-md-9 > div > div.row > div.col-sm-8.sm-margin-bottom-30 > div > div.profile-bio > div > div > h1");
            presenceData.details = "Viewing user:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/vtc")) {
            item = document.querySelector("body > div.wrapper > div.breadcrumbs-v1.text-center.hidden-sm.hidden-xs > div > div > div.col-lg-10.col-md-9 > div > h2");
            item2 = document.querySelector("body > div.wrapper > div.container > div > div.col-md-9 > h1");
            if (document.location.pathname.includes("/news")) {
                presenceData.details = "VTC, reading post:";
                if (item2 == null) {
                    if (item.innerText.length > 128) {
                        presenceData.state = item.innerText.substring(0, 125) + "...";
                    }
                    else {
                        presenceData.state = item.innerText;
                    }
                }
                else {
                    if (item2.innerText.length > 128) {
                        presenceData.state = item2.innerText.substring(0, 125) + "...";
                    }
                    else {
                        presenceData.state = item2.innerText;
                    }
                }
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/search")) {
                presenceData.details = "Searching a VTC";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (item !== null) {
                presenceData.details = "Viewing VTC:";
                if (item.innerText.length > 128) {
                    presenceData.state = item.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = item.innerText;
                }
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (document.location.pathname.includes("/create")) {
                presenceData.details = "Creating a VTC";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "VTC, Browsing...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/blog/")) {
            item = document.querySelector("body > div.wrapper > div.breadcrumbs-v1.text-center.hidden-sm.hidden-xs > div > h1");
            presenceData.details = "Blog, Viewing post:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/blog")) {
            presenceData.details = "Viewing blog posts";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "forum.truckersmp.com") {
        item = document.querySelector("#ipsLayout_mainArea > div.ipsColumns > div.ipsColumn.ipsColumn_fluid > div > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span > span");
        item2 = document.querySelector("#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span > span");
        item3 = document.querySelector("#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span.ipsType_break.ipsContained > span");
        if (document.URL.includes("/forum/")) {
            item = document.querySelector("#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > header > h1");
            presenceData.details = "Forums, viewing category:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/staff/")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "staff list";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/online/")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "online users";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/messenger/")) {
            presenceData.details = "Forums, viewing their";
            presenceData.state = "direct messages";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/profile/")) {
            item = document.querySelector("#elProfileHeader > div.ipsColumns.ipsColumns_collapsePhone > div.ipsColumn.ipsColumn_fluid > div > h1");
            presenceData.details = "Forums, viewing user:";
            presenceData.state = item.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (item !== null) {
            presenceData.details = "Forums, reading post:";
            if (item.innerText.length > 128) {
                presenceData.state = item.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (item2 !== null) {
            presenceData.details = "Forums, reading post:";
            if (item2.innerText.length > 128) {
                presenceData.state = item2.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item2.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (item3 !== null) {
            presenceData.details = "Forums, reading post:";
            if (item3.innerText.length > 128) {
                presenceData.state = item3.innerText.substring(0, 125) + "...";
            }
            else {
                presenceData.state = item3.innerText;
            }
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.URL.includes("/search/")) {
            item = document.querySelector("#elMainSearchInput");
            presenceData.details = "Forums, searching for:";
            presenceData.state = item.value;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Forums, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "ets2map.com") {
        user = document.querySelector("#playerView");
        for (var i = 0; i < 999; i++) {
            item = "#server_";
            item = item + i;
            if (document.querySelector(item) !== null) {
                if (document.querySelector(item).className.includes("active")) {
                    server = item + " > a";
                    server = document.querySelector(server).innerText;
                    players = item + " > span";
                    players = document.querySelector(players).innerText;
                    if (players == "-") {
                        players = "None";
                    }
                }
            }
        }
        if (!user.style.cssText.includes("display: none")) {
            user = document.querySelector("#playerClicked > div.player-name");
            item = document.querySelector("#game-time");
            output =
                user.innerText +
                    " (Server: " +
                    server +
                    ", In-game time: " +
                    item.innerText +
                    ", " +
                    players +
                    " online)";
            presenceData.details = "ETS2Map, tracking player:";
            if (output.length > 128) {
                presenceData.state = output.substring(0, 125) + "...";
            }
            else {
                presenceData.state = output;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            item = document.querySelector("#game-time");
            output =
                "Server: " +
                    server +
                    ", In-game time: " +
                    item.innerText +
                    ", " +
                    players +
                    " online";
            presenceData.details = "ETS2Map, viewing:";
            if (output.length > 128) {
                presenceData.state = output.substring(0, 125) + "...";
            }
            else {
                presenceData.state = output;
            }
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "traffic.krashnz.com") {
        if (document.location.pathname.split("/")[3] !== undefined) {
            item = document.querySelector("body > div.container > div > div:nth-child(1) > ol > li:nth-child(2) > a");
            item2 = document.querySelector("body > div.container > div > div:nth-child(1) > ol > li.breadcrumb-item.active");
            presenceData.details = "Traffic Stats, viewing city:";
            presenceData.state =
                item2.innerText.replace(" (City)", "") +
                    " (Server: " +
                    item.innerText +
                    ")";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.split("/")[2] !== undefined) {
            item = document.querySelector("body > div.container > div > div > ol > li.breadcrumb-item.active");
            item2 = document.querySelector("#stats-players");
            output = document.querySelector("#stats-time");
            presenceData.details = "Traffic Stats, viewing server:";
            presenceData.state =
                item.innerText + " (Online: " + item2.innerText + ")";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Viewing Traffic Stats";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.hostname == "stats.truckersmp.com") {
        if (document.location.pathname.includes("/history")) {
            presenceData.details = "TMP Stats, viewing:";
            presenceData.state = "version history";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/api")) {
            presenceData.details = "Reading the API Docs";
            delete presenceData.state;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/live")) {
            presenceData.details = "Viewing TMP Live Stats";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "Viewing TMP Stats";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUNYLElBQVMsRUFDVCxLQUFVLEVBQ1YsS0FBVSxFQUNWLE1BQVcsRUFDWCxPQUFZLEVBQ1osTUFBVyxDQUFDO0FBRWQsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxZQUFZO0tBQzVCLENBQUM7SUFFRixZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGdCQUFnQixFQUFFO1FBQ2xELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7WUFDaEQsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXBDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ2pFLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7WUFDaEQsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBRTFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztZQUNoRCxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFFMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQzNDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUUxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzNELFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1lBRXJDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLHlLQUF5SyxDQUMxSyxDQUFDO1lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7WUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRXBDLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLHlIQUF5SCxDQUMxSCxDQUFDO1lBQ0YsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzVCLDhEQUE4RCxDQUMvRCxDQUFDO1lBQ0YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7Z0JBQzVDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDakIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7d0JBQy9CLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDL0Q7eUJBQU07d0JBQ0wsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO3FCQUNyQztpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTt3QkFDaEMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUNoRTt5QkFBTTt3QkFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7cUJBQ3RDO2lCQUNGO2dCQUVELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUV2QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN6RCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO2dCQUN6QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO2dCQUN0QyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtvQkFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMvRDtxQkFBTTtvQkFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3JDO2dCQUVELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNwQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUMxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztnQkFDMUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUMxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDcEM7U0FDRjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQixvRkFBb0YsQ0FDckYsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDN0MsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQy9CLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUMvRDtpQkFBTTtnQkFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckM7WUFFRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZELFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7WUFDNUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU07WUFDTCxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHNCQUFzQixFQUFFO1FBQy9ELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQixnTEFBZ0wsQ0FDakwsQ0FBQztRQUNGLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1Qix5SkFBeUosQ0FDMUosQ0FBQztRQUNGLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM1QixvTEFBb0wsQ0FDckwsQ0FBQztRQUNGLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLG1FQUFtRSxDQUNwRSxDQUFDO1lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztZQUNuRCxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNDLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7WUFFbEMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVDLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7WUFFcEMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7WUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUV2QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzNCLHVHQUF1RyxDQUN4RyxDQUFDO1lBQ0YsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDeEIsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDL0IsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNyQztZQUVELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDaEMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2hFO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUN0QztZQUVELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekIsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztZQUMvQyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDaEMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2hFO2lCQUFNO2dCQUNMLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQzthQUN0QztZQUVELFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzVDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDcEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztZQUNoRCxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFaEMsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDN0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtRQUN0RCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLElBQUksR0FBRyxVQUFVLENBQUM7WUFDbEIsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDekMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzdELE1BQU0sR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUN2QixNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2xELE9BQU8sR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDO29CQUMzQixPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ3BELElBQUksT0FBTyxJQUFJLEdBQUcsRUFBRTt3QkFDbEIsT0FBTyxHQUFHLE1BQU0sQ0FBQztxQkFDbEI7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNqRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2xFLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVDLE1BQU07Z0JBQ0osSUFBSSxDQUFDLFNBQVM7b0JBQ2QsWUFBWTtvQkFDWixNQUFNO29CQUNOLGtCQUFrQjtvQkFDbEIsSUFBSSxDQUFDLFNBQVM7b0JBQ2QsSUFBSTtvQkFDSixPQUFPO29CQUNQLFVBQVUsQ0FBQztZQUNiLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7WUFDbkQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDdkIsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDN0I7WUFDRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUMsTUFBTTtnQkFDSixVQUFVO29CQUNWLE1BQU07b0JBQ04sa0JBQWtCO29CQUNsQixJQUFJLENBQUMsU0FBUztvQkFDZCxJQUFJO29CQUNKLE9BQU87b0JBQ1AsU0FBUyxDQUFDO1lBQ1osWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztZQUMzQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUN2QixZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN2RDtpQkFBTTtnQkFDTCxZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUM3QjtZQUNELE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQixFQUFFO1FBQzlELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUMxRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IsMEVBQTBFLENBQzNFLENBQUM7WUFDRixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIsZ0ZBQWdGLENBQ2pGLENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1lBQ3RELFlBQVksQ0FBQyxLQUFLO2dCQUNoQixLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO29CQUN0QyxZQUFZO29CQUNaLElBQUksQ0FBQyxTQUFTO29CQUNkLEdBQUcsQ0FBQztZQUNOLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2pFLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQixtRUFBbUUsQ0FDcEUsQ0FBQztZQUNGLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakQsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztZQUN4RCxZQUFZLENBQUMsS0FBSztnQkFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDeEQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7WUFDL0MsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzFCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVsQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHNCQUFzQixFQUFFO1FBQy9ELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25ELFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDN0MsWUFBWSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQztZQUV2QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBRTFCLFlBQVksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBRXZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsT0FBTyxHQUFHLHdCQUF3QixDQUFDO1lBQ2hELE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUMxQixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7WUFFbEMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztZQUMzQyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDcEM7S0FDRjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUN6QjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=