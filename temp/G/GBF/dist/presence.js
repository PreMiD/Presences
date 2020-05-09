var presence = new Presence({
    clientId: "632983924414349333"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const data = {
        largeImageKey: "logo"
    };
    data.startTimestamp = browsingStamp;
    if (document.location.hostname == "game.granbluefantasy.jp") {
        if (document.location.href.includes("/#mypage")) {
            data.details = "Home page";
        }
        else if (document.location.href.includes("/#quest")) {
            data.details = "Selecting a quest";
            if (document.location.href.includes("/#quest/extra")) {
                data.state = "Treasure Quests / Event Quest";
            }
            else if (document.location.href.includes("/#quest/assist")) {
                data.state = "Joining a raid";
            }
            else if (document.location.href.includes("/#quest/supporter")) {
                data.state = "Choosing a summon";
            }
            else if (document.location.href.includes("/#quest/fate")) {
                data.state = "Choosing a fate quest";
            }
            else if (document.location.href.includes("/#quest/scene")) {
                data.state = "In a story scene";
            }
        }
        else if (document.location.href.includes("/#result")) {
            data.details = "In a Quest result screen";
        }
        else if (document.location.href.includes("/#raid") ||
            document.location.href.includes("/#raid_multi")) {
            data.details = "In a battle";
        }
        else if (document.location.href.includes("/#party/index/0/npc/0")) {
            data.details = "Viewing party";
        }
        else if (document.location.href.includes("/#enhancement")) {
            data.details = "Upgrading : ";
            if (document.location.href.includes("/#enhancement/npc")) {
                data.state = "Characters";
            }
            else if (document.location.href.includes("/#enhancement/weapon")) {
                data.state = "Weapons";
            }
            else if (document.location.href.includes("/#enhancement/summon")) {
                data.state = "Summons";
            }
        }
        else if (document.location.href.includes("/#evolution")) {
            data.details = "Uncapping :";
            if (document.location.href.includes("/#evolution/npc")) {
                data.state = "Characters";
            }
            else if (document.location.href.includes("/#evolution/weapon")) {
                data.state = "Weapons";
            }
            else if (document.location.href.includes("/#evolution/summon")) {
                data.state = "Summons";
            }
        }
        else if (document.location.href.includes("/#coopraid")) {
            data.details = "Co-op :";
            if (document.location.href.includes("/#coopraid/offer")) {
                data.state = "Searching a raid coop room";
            }
            else if (document.location.href.includes("/#coopraid/room")) {
                data.state = "In a coop room";
            }
        }
        else if (document.location.href.includes("/#lobby/room")) {
            data.details = "Co-op :";
            data.state = "In a raid coop room";
        }
        else if (document.location.href.includes("/#casino")) {
            data.details = "Casino :";
            data.state = "Main menu";
            if (document.location.href.includes("/#casino/list/poker")) {
                data.state = "Choosing poker bet";
            }
            else if (document.location.href.includes("/#casino/game/poker")) {
                data.state = "Playing poker";
            }
            else if (document.location.href.includes("#casino/list/slot")) {
                data.state = "Choosing slots bet";
            }
            else if (document.location.href.includes("/#casino/game/slot")) {
                data.state = "Playing slots";
            }
            else if (document.location.href.includes("/#casino/list/bingo")) {
                data.state = "Choosing bingo bet";
            }
            else if (document.location.href.includes("/#casino/game/bingo")) {
                data.state = "Playing bingo";
            }
            else if (document.location.href.includes("/#casino/exchange")) {
                data.state = " In the casino cage";
            }
            else if (document.location.href.includes("/#casino/rule/casino")) {
                data.state = "Viewing casino rules";
            }
        }
        else if (document.location.href.includes("/#gacha")) {
            data.details = "In the Draw menu";
        }
        else if (document.location.href.includes("/#profile")) {
            data.details = "Viewing profile page";
        }
        else if (document.location.href.includes("/#archive")) {
            data.details = "Viewing journal";
        }
        else if (document.location.href.includes("/#title")) {
            data.details = "Viewing trophies";
        }
        else if (document.location.href.includes("/#guild")) {
            data.details = "Viewing crew";
        }
        else if (document.location.href.includes("/#shop")) {
            data.details = "Shop :";
            data.state = "Main menu";
            if (document.location.href.includes("/#shop/exchange/points")) {
                data.state = "Pendants shop";
            }
            else if (document.location.href.includes("/#shop/exchange/moon")) {
                data.state = "Trading moons";
            }
            else if (document.location.href.includes("/#shop/exchange/trajectory")) {
                data.state = "Journey drops";
            }
            else if (document.location.href.includes("/#shop/exchange/ceiling")) {
                data.state = "Trading ceruleans stones";
            }
            else if (document.location.href.includes("/#shop/skin/top")) {
                data.state = "Outfit shop";
            }
            else if (document.location.href.includes("/#shop/skycompass/points")) {
                data.state = "SkyCompass points exchange";
            }
            else if (document.location.href.includes("/#shop/lupi/0")) {
                data.state = "Crystal shop";
            }
            else if (document.location.href.includes("/#shop/exchange/list")) {
                data.state = "Treasure trading";
            }
        }
        else if (document.location.href.includes("/#archaic")) {
            data.details = "Shop :";
            data.state = "Weapons Crafting";
            if (document.location.href.includes("/#archaic/job")) {
                data.state = "Crafting Class Champion weapons";
            }
            else if (document.location.href.includes("/#archaic/numbers")) {
                data.state = "Crafting Revenant weapons";
            }
            else if (document.location.href.includes("/#archaic/seraphic")) {
                data.state = "Crafting Seraphic weapons";
            }
            else if (document.location.href.includes("/#archaic/xeno/list")) {
                data.state = "Crafting Xeno weapons";
            }
            else if (document.location.href.includes("/#archaic/bahamut")) {
                data.state = "Crafting Bahamut weapons";
            }
            else if (document.location.href.includes("/#archaic/omega")) {
                data.state = "Crafting Ultima weapons";
            }
        }
        else if (document.location.href.includes("#arcarum2/enhancement")) {
            data.details = " Shop :";
            data.state = "Crafting Arcarum summons";
        }
        else if (document.location.href.includes("/#item")) {
            data.details = "Viewing supplies";
        }
        else if (document.location.href.includes("/#present")) {
            data.details = "Viewing Crate";
        }
        else if (document.location.href.includes("/#list")) {
            data.details = "Viewing inventory";
        }
        else if (document.location.href.includes("/#container")) {
            data.details = "Viewing stash";
        }
        else if (document.location.href.includes("/#friend")) {
            data.details = "Viewing friends list";
        }
        else if (document.location.href.includes("/#event")) {
            data.details = "Event Menu";
        }
        else if (document.location.href.includes("/#setting")) {
            data.details = "Changing settings";
        }
        else if (document.location.href.includes("/#teaser")) {
            data.details = "Viewing event preview";
        }
        else if (document.location.href.includes("/#sell")) {
            data.details = "Selling weapons/summons";
        }
        else if (document.location.href.includes("/#decompose")) {
            data.details = "Reducing weapons/summons";
        }
        else if (document.location.href.includes("/#recycle")) {
            data.details = "Reserve weapons/summons";
        }
        else if (document.location.href.includes("/#help")) {
            data.details = "Viewing help";
        }
        else if (document.location.href.includes("/#sidestory")) {
            data.details = "Viewing side stories";
        }
        else if (document.location.href.includes("/#trial_battle")) {
            data.details = "Viewing trial battles";
        }
        else if (document.location.href.includes("/#campaign/panel")) {
            data.details = "Viewing pinboard missions";
        }
        else if (document.location.href.includes("/#beginnercomic")) {
            data.details = "Reading This is Granblue Fantasy";
        }
        else if (document.location.href.includes("/#news")) {
            data.details = "Viewing the news";
        }
        else if (document.location.href.includes("/#comic")) {
            data.details = "Reading Grand Blues";
        }
        presence.setActivity(data);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFpQjtRQUN6QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFcEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSx5QkFBeUIsRUFBRTtRQUMzRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztTQUM1QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDbkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsK0JBQStCLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQzthQUMvQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFtQixDQUFDO2FBQ2xDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDO2FBQ3RDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO2FBQ2pDO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLDBCQUEwQixDQUFDO1NBQzNDO2FBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFDL0M7WUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztTQUM5QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7U0FDaEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUU5QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQzthQUMzQjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzthQUN4QjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzthQUN4QjtTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7WUFFN0IsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDeEI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDeEI7U0FDRjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBRXpCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUM7YUFDM0M7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQzthQUMvQjtTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1lBQ3pCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7YUFDbkM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDakUsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQzthQUNuQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQzthQUM5QjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO2FBQ25DO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO2FBQzlCO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7YUFDcEM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQzthQUNyQztTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNuQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDdkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1NBQ2xDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNuQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7WUFFekIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7YUFDOUI7aUJBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsRUFDN0Q7Z0JBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQzthQUN6QztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUM3RCxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO2dCQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO2FBQzNDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO2FBQ2pDO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1lBQ2hDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLGlDQUFpQyxDQUFDO2FBQ2hEO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRywyQkFBMkIsQ0FBQzthQUMxQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUNqRSxJQUFJLENBQUMsS0FBSyxHQUFHLHVCQUF1QixDQUFDO2FBQ3RDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUM7YUFDekM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDN0QsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBeUIsQ0FBQzthQUN4QztTQUNGO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUNuRSxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO1NBQ3pDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNuQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUN2QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1NBQzdCO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztTQUNwQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7U0FDeEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1NBQzFDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztTQUMzQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7U0FDMUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztTQUMvQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDdkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7U0FDeEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7U0FDNUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsa0NBQWtDLENBQUM7U0FDbkQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1NBQ25DO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUN0QztRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9