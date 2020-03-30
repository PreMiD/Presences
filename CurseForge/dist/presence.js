var presence = new Presence({
    clientId: "626536244670889985"
});
var item, user, search, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "curseforge"
    };
    function setStateGame(game, categoryURL, categoryText, categoryTextSingle) {
        if (document.location.pathname.includes("/" + categoryURL + "/")) {
            title = document.querySelector("body > div.flex.flex-col.min-h-full.min-h-screen > main > div.z-0 > header > div.container.mx-auto.mt-auto.flex.justify-between > div:nth-child(1) > div > div:nth-child(1) > h2");
            if (title == null) {
                title = document.querySelector("body > div.flex.flex-col.min-h-full.min-h-screen > main > div.z-0 > div > section > div.px-2.flex-1 > div > div.flex.flex-col.mb-4 > h2");
                presenceData.details = game + ", Viewing category:";
                presenceData.state =
                    categoryText + " - " + title.innerText.replace("All ", "");
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = game + ", Viewing " + categoryTextSingle + ":";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
                }
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/" + categoryURL)) {
            presenceData.details = game + ", Viewing category:";
            presenceData.state = categoryText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presenceData.details = "CurseForge - " + game;
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname == "www.curseforge.com") {
        if (document.location.pathname.includes("/minecraft/")) {
            if (document.location.pathname.includes("/modpacks")) {
                setStateGame("MC", "modpacks", "Modpacks", "modpack");
            }
            else if (document.location.pathname.includes("/bukkit-plugins")) {
                setStateGame("MC", "bukkit-plugins", "Bukkit plugins", "Bukkit plugin");
            }
            else if (document.location.pathname.includes("/customization")) {
                setStateGame("MC", "customization", "Customizations", "customization");
            }
            else if (document.location.pathname.includes("/mc-addons")) {
                setStateGame("MC", "mc-addons", "Addons", "addon");
            }
            else if (document.location.pathname.includes("/mc-mods")) {
                setStateGame("MC", "mc-mods", "Mods", "mod");
            }
            else if (document.location.pathname.includes("/texture-packs")) {
                setStateGame("MC", "texture-packs", "Texture Packs", "texturepack");
            }
            else if (document.location.pathname.includes("/worlds")) {
                setStateGame("MC", "worlds", "Worlds", "world");
            }
            else {
                presenceData.details = "CurseForge - MC";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/wow/")) {
            setStateGame("WoW", "addons", "Addons", "addon");
        }
        else if (document.location.pathname.includes("/sc2/")) {
            setStateGame("SC2", "assets", "Assets", "asset");
        }
        else if (document.location.pathname.includes("/kerbal/")) {
            setStateGame("Kerbal", "ksp-mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/wildstar/")) {
            setStateGame("WildStar", "ws-addons", "Addons", "addon");
        }
        else if (document.location.pathname.includes("/terraria/")) {
            if (document.location.pathname.includes("/maps")) {
                setStateGame("Terraria", "maps", "Maps", "map");
            }
            else if (document.location.pathname.includes("/mods")) {
                setStateGame("Terraria", "mods", "Mods", "mod");
            }
            else {
                presenceData.details = "CurseForge - Terraria";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/worldoftanks/")) {
            if (document.location.pathname.includes("/wot-mods")) {
                setStateGame("WoT", "wot-mods", "Mods", "mod");
            }
            else if (document.location.pathname.includes("/wot-skins")) {
                setStateGame("WoT", "wot-skins", "Skins", "skin");
            }
            else {
                presenceData.details = "CurseForge - WoT";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/rift/")) {
            setStateGame("Rift", "addons", "Addons", "addon");
        }
        else if (document.location.pathname.includes("/rom/")) {
            setStateGame("RoM", "addons", "Addons", "addon");
        }
        else if (document.location.pathname.includes("/skyrim/")) {
            setStateGame("Skyrim", "mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/tsw/")) {
            setStateGame("TSW", "tsw-mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/teso/")) {
            setStateGame("TESO", "teso-addons", "Addons", "addon");
        }
        else if (document.location.pathname.includes("/stardewvalley/")) {
            setStateGame("Stardew Valley", "mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/swlegends/")) {
            setStateGame("SWLegends", "tswl-mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/chronicles-of-arcadia/")) {
            setStateGame("Chronicles of Arcadia", "addons", "Addons", "addon");
        }
        else if (document.location.pathname.includes("/surviving-mars/")) {
            setStateGame("Surviving Mars", "mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/darkestdungeon/")) {
            setStateGame("Darkest Dungeon", "dd-mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/gta5/")) {
            if (document.location.pathname.includes("/gta-v-mods")) {
                setStateGame("GTA5", "gta-v-mods", "Mods", "mod");
            }
            else if (document.location.pathname.includes("/gta-v-tools")) {
                setStateGame("GTA5", "gta-v-tools", "Tools", "tool");
            }
            else {
                presenceData.details = "CurseForge - GTA5";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/staxel/")) {
            setStateGame("Staxel", "staxel-mods", "Mods", "mod");
        }
        else if (document.location.pathname.includes("/members/")) {
            user = document.querySelector("body > div.flex.flex-col.min-h-full.min-h-screen > main > section > div > div.text-base > div.username.text-xl");
            presenceData.details = "Viewing user:";
            presenceData.state = user.innerText;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/private-messages")) {
            presenceData.details = "Reading DMs";
            delete presenceData.state;
            presenceData.smallImageKey = "reading";
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/account")) {
            presenceData.details = "Viewing account settings";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/all-games")) {
            presenceData.details = "Viewing all games";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/project/")) {
            presenceData.details = "CurseForge - Projects";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
            presence.setTrayTitle();
        }
    }
    else if (document.location.hostname == "minecraft.curseforge.com" ||
        document.location.hostname == "authors.curseforge.com") {
        if (document.location.pathname.includes("/forums/")) {
            title = document.querySelector("#content > section > div > header > h2");
            if (title != null) {
                presenceData.details = "Forums, viewing category:";
                presenceData.state = title.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else if (document.querySelector("#content > section > div > div > header > h2") !== null) {
                title = document.querySelector("#content > section > div > div > header > h2");
                presenceData.details = "Forums, reading thread:";
                if (title.innerText.length > 128) {
                    presenceData.state = title.innerText.substring(0, 125) + "...";
                }
                else {
                    presenceData.state = title.innerText;
                }
                presenceData.smallImageKey = "reading";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Browsing...";
                delete presenceData.state;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/search")) {
            search = document.querySelector("#field-search");
            if (search.value.length > 1) {
                presenceData.details = "Forums, Searching for:";
                presenceData.state = search.value;
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Going to search";
                presenceData.state = "something up";
                presenceData.smallImageKey = "search";
                presence.setActivity(presenceData);
            }
        }
        else if (document.location.pathname.includes("/account")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "Account Settings";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/knowledge-base")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "Knowledge Base";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/store")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "Reward Store";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/dashboard")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "Dashboard";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/paste")) {
            presenceData.details = "Forums, viewing:";
            presenceData.state = "Paste";
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("/members")) {
            if (document.URL.includes("filter-user-sort=")) {
                title = document.URL;
                title = title.split("filter-user-sort=")[1].split("&")[0];
                switch (title) {
                    case "1":
                        presenceData.details = "Forums, Viewing list of";
                        presenceData.state = "members in alphabetical order";
                        delete presenceData.smallImageKey;
                        presence.setActivity(presenceData);
                        break;
                    case "2":
                        presenceData.details = "Forums, Viewing list of";
                        presenceData.state = "members with most messages";
                        delete presenceData.smallImageKey;
                        presence.setActivity(presenceData);
                        break;
                    case "3":
                        presenceData.details = "Forums, Viewing list of";
                        presenceData.state = "members which are online";
                        delete presenceData.smallImageKey;
                        presence.setActivity(presenceData);
                        break;
                    case "4":
                        presenceData.details = "Forums, Viewing the list";
                        presenceData.state = "members sorted by newest";
                        delete presenceData.smallImageKey;
                        presence.setActivity(presenceData);
                        break;
                    case "5":
                        presenceData.details = "Forums, Viewing the list";
                        presenceData.state = "members sorted by oldest";
                        delete presenceData.smallImageKey;
                        presence.setActivity(presenceData);
                        break;
                }
            }
            else if (document.querySelector("#content > section > section > div.p-user-info > ul.p-user-details > li.username") !== null) {
                user = document.querySelector("#content > section > section > div.p-user-info > ul.p-user-details > li.username");
                presenceData.details = "Forums, Viewing user:";
                presenceData.state = user.innerText;
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
            else {
                presenceData.details = "Forums, Viewing list of";
                presenceData.state = "members which are online";
                delete presenceData.smallImageKey;
                presence.setActivity(presenceData);
            }
        }
        else {
            presenceData.details = "Forums, Browsing...";
            delete presenceData.state;
            delete presenceData.smallImageKey;
            presence.setActivity(presenceData);
        }
    }
    else if (document.querySelector("#content > section > div.featured-site-info-container > div > h2") !== null) {
        title = document.querySelector("#content > section > div.featured-site-info-container > div > h2");
        presenceData.details = "Viewing game:";
        presenceData.state = title.innerText;
        delete presenceData.smallImageKey;
        presence.setActivity(presenceData);
    }
    else {
        presence.setActivity();
        presence.setTrayTitle();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLElBQVMsRUFBRSxNQUFXLEVBQUUsS0FBVSxDQUFDO0FBRWxELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsWUFBWTtLQUMzQixDQUFDO0lBQ0YsU0FBUyxZQUFZLENBQ3BCLElBQVksRUFDWixXQUFtQixFQUNuQixZQUFvQixFQUNwQixrQkFBMEI7UUFFMUIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNqRSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDN0Isa0xBQWtMLENBQ2xMLENBQUM7WUFDRixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2xCLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3Qix5SUFBeUksQ0FDekksQ0FBQztnQkFDRixZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxxQkFBcUIsQ0FBQztnQkFDcEQsWUFBWSxDQUFDLEtBQUs7b0JBQ2pCLFlBQVksR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUU1RCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBRWxDLFFBQVEsQ0FB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