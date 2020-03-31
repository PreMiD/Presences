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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFMUMsSUFBSSxJQUFTLENBQUM7QUFFZCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLElBQUksR0FBaUI7UUFDdkIsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0lBRXBDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUkseUJBQXlCLEVBQUU7UUFDM0QsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7U0FDNUI7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1lBQ25DLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLCtCQUErQixDQUFDO2FBQzlDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENB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