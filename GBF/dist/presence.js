var presence = new Presence({
    clientId: "632983924414349333"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var url = new URL(document.location.href);
var raid;
presence.on("UpdateData", async () => {
    let data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFMUMsSUFBSSxJQUFTLENBQUM7QUFFZCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLElBQUksR0FBaUI7UUFDeEIsYUFBYSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRXBDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkseUJBQXlCLEVBQUU7UUFDNUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7U0FDM0I7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNyRCxJQUFJLENBQUMsS0FBSyxHQUFHLCtCQUErQixDQUFDO2FBQzdDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7YUFDOUI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBbUIsQ0FBQzthQUNqQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQzthQUNyQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQzthQUNoQztTQUNEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztTQUMxQzthQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQzlDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7U0FDN0I7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1NBQy9CO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFFOUIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtnQkFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7YUFDMUI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDdkI7U0FDRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBRTdCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2FBQzFCO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2FBQ3ZCO1NBQ0Q7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztZQUV6QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO2dCQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLDRCQUE0QixDQUFDO2FBQzFDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7YUFDOUI7U0FDRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7U0FDbkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUN6QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDO2FBQ2xDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO2FBQzdCO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7YUFDbEM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDakUsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUM7YUFDN0I7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQzthQUNsQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQzthQUM3QjtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDO2FBQ25DO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7YUFDcEM7U0FDRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7U0FDbEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztTQUNqQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7U0FDbEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztTQUM5QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1lBRXpCLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO2FBQzdCO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7Z0JBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO2FBQzdCO2lCQUFNLElBQ04sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQzVEO2dCQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO2FBQzdCO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUU7Z0JBQ3RFLElBQUksQ0FBQyxLQUFLLEdBQUcsMEJBQTBCLENBQUM7YUFDeEM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyw0QkFBNEIsQ0FBQzthQUMxQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQzthQUNoQztTQUNEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztZQUNoQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxpQ0FBaUMsQ0FBQzthQUMvQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDO2FBQ3pDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxLQUFLLEdBQUcsMkJBQTJCLENBQUM7YUFDekM7aUJBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBdUIsQ0FBQzthQUNyQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLDBCQUEwQixDQUFDO2FBQ3hDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcseUJBQXlCLENBQUM7YUFDdkM7U0FDRDthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDcEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRywwQkFBMEIsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7U0FDbEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztTQUMvQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDbkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztTQUMvQjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDdEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztTQUM1QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3hELElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7U0FDbkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQztTQUN6QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUM7U0FDMUM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1NBQ3pDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7U0FDOUI7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO1NBQ3RDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO1NBQzNDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLGtDQUFrQyxDQUFDO1NBQ2xEO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNsQzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7U0FDckM7UUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==