const presence = new Presence({
    clientId: "632983924414349333"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  };

  if (document.location.hostname === "game.granbluefantasy.jp") {
    if (document.location.href.includes("/#mypage"))
      presenceData.details = "Home page";
    else if (document.location.href.includes("/#quest")) {
      presenceData.details = "Selecting a quest";
      if (document.location.href.includes("/#quest/extra"))
        presenceData.state = "Treasure Quests / Event Quest";
      else if (document.location.href.includes("/#quest/assist"))
        presenceData.state = "Joining a raid";
      else if (document.location.href.includes("/#quest/supporter"))
        presenceData.state = "Choosing a summon";
      else if (document.location.href.includes("/#quest/fate"))
        presenceData.state = "Choosing a fate quest";
      else if (document.location.href.includes("/#quest/scene"))
        presenceData.state = "In a story scene";
    } else if (document.location.href.includes("/#result"))
      presenceData.details = "In a Quest result screen";
    else if (
      document.location.href.includes("/#raid") ||
      document.location.href.includes("/#raid_multi")
    ) {
      presenceData.details =
        document.getElementsByClassName("name")[0].textContent;
    } else if (document.location.href.includes("/#party/index/0/npc/0"))
      presenceData.details = "Viewing party";
    else if (document.location.href.includes("/#enhancement")) {
      presenceData.details = "Upgrading : ";

      if (document.location.href.includes("/#enhancement/npc"))
        presenceData.state = "Characters";
      else if (document.location.href.includes("/#enhancement/weapon"))
        presenceData.state = "Weapons";
      else if (document.location.href.includes("/#enhancement/summon"))
        presenceData.state = "Summons";
    } else if (document.location.href.includes("/#evolution")) {
      presenceData.details = "Uncapping :";

      if (document.location.href.includes("/#evolution/npc"))
        presenceData.state = "Characters";
      else if (document.location.href.includes("/#evolution/weapon"))
        presenceData.state = "Weapons";
      else if (document.location.href.includes("/#evolution/summon"))
        presenceData.state = "Summons";
    } else if (document.location.href.includes("/#coopraid")) {
      presenceData.details = "Co-op :";

      if (document.location.href.includes("/#coopraid/offer"))
        presenceData.state = "Searching a raid coop room";
      else if (document.location.href.includes("/#coopraid/room"))
        presenceData.state = "In a coop room";
    } else if (document.location.href.includes("/#lobby/room")) {
      presenceData.details = "Co-op :";
      presenceData.state = "In a raid coop room";
    } else if (document.location.href.includes("/#casino")) {
      presenceData.details = "Casino :";
      presenceData.state = "Main menu";
      if (document.location.href.includes("/#casino/list/poker"))
        presenceData.state = "Choosing poker bet";
      else if (document.location.href.includes("/#casino/game/poker"))
        presenceData.state = "Playing poker";
      else if (document.location.href.includes("#casino/list/slot"))
        presenceData.state = "Choosing slots bet";
      else if (document.location.href.includes("/#casino/game/slot"))
        presenceData.state = "Playing slots";
      else if (document.location.href.includes("/#casino/list/bingo"))
        presenceData.state = "Choosing bingo bet";
      else if (document.location.href.includes("/#casino/game/bingo"))
        presenceData.state = "Playing bingo";
      else if (document.location.href.includes("/#casino/exchange"))
        presenceData.state = " In the casino cage";
      else if (document.location.href.includes("/#casino/rule/casino"))
        presenceData.state = "Viewing casino rules";
    } else if (document.location.href.includes("/#gacha"))
      presenceData.details = "In the Draw menu";
    else if (document.location.href.includes("/#profile"))
      presenceData.details = "Viewing profile page";
    else if (document.location.href.includes("/#archive"))
      presenceData.details = "Viewing journal";
    else if (document.location.href.includes("/#title"))
      presenceData.details = "Viewing trophies";
    else if (document.location.href.includes("/#guild"))
      presenceData.details = "Viewing crew";
    else if (document.location.href.includes("/#shop")) {
      presenceData.details = "Shop :";
      presenceData.state = "Main menu";

      if (document.location.href.includes("/#shop/exchange/points"))
        presenceData.state = "Pendants shop";
      else if (document.location.href.includes("/#shop/exchange/moon"))
        presenceData.state = "Trading moons";
      else if (document.location.href.includes("/#shop/exchange/trajectory"))
        presenceData.state = "Journey drops";
      else if (document.location.href.includes("/#shop/exchange/ceiling"))
        presenceData.state = "Trading ceruleans stones";
      else if (document.location.href.includes("/#shop/skin/top"))
        presenceData.state = "Outfit shop";
      else if (document.location.href.includes("/#shop/skycompass/points"))
        presenceData.state = "SkyCompass points exchange";
      else if (document.location.href.includes("/#shop/lupi/0"))
        presenceData.state = "Crystal shop";
      else if (document.location.href.includes("/#shop/exchange/list"))
        presenceData.state = "Treasure trading";
    } else if (document.location.href.includes("/#archaic")) {
      presenceData.details = "Shop :";
      presenceData.state = "Weapons Crafting";
      if (document.location.href.includes("/#archaic/job"))
        presenceData.state = "Crafting Class Champion weapons";
      else if (document.location.href.includes("/#archaic/numbers"))
        presenceData.state = "Crafting Revenant weapons";
      else if (document.location.href.includes("/#archaic/seraphic"))
        presenceData.state = "Crafting Seraphic weapons";
      else if (document.location.href.includes("/#archaic/xeno/list"))
        presenceData.state = "Crafting Xeno weapons";
      else if (document.location.href.includes("/#archaic/bahamut"))
        presenceData.state = "Crafting Bahamut weapons";
      else if (document.location.href.includes("/#archaic/omega"))
        presenceData.state = "Crafting Ultima weapons";
    } else if (document.location.href.includes("#arcarum2/enhancement")) {
      presenceData.details = " Shop :";
      presenceData.state = "Crafting Arcarum summons";
    } else if (document.location.href.includes("/#item"))
      presenceData.details = "Viewing supplies";
    else if (document.location.href.includes("/#present"))
      presenceData.details = "Viewing Crate";
    else if (document.location.href.includes("/#list"))
      presenceData.details = "Viewing inventory";
    else if (document.location.href.includes("/#container"))
      presenceData.details = "Viewing stash";
    else if (document.location.href.includes("/#friend"))
      presenceData.details = "Viewing friends list";
    else if (document.location.href.includes("/#event"))
      presenceData.details = "Event Menu";
    else if (document.location.href.includes("/#setting"))
      presenceData.details = "Changing settings";
    else if (document.location.href.includes("/#teaser"))
      presenceData.details = "Viewing event preview";
    else if (document.location.href.includes("/#sell"))
      presenceData.details = "Selling weapons/summons";
    else if (document.location.href.includes("/#decompose"))
      presenceData.details = "Reducing weapons/summons";
    else if (document.location.href.includes("/#recycle"))
      presenceData.details = "Reserve weapons/summons";
    else if (document.location.href.includes("/#help"))
      presenceData.details = "Viewing help";
    else if (document.location.href.includes("/#sidestory"))
      presenceData.details = "Viewing side stories";
    else if (document.location.href.includes("/#trial_battle"))
      presenceData.details = "Viewing trial battles";
    else if (document.location.href.includes("/#campaign/panel"))
      presenceData.details = "Viewing pinboard missions";
    else if (document.location.href.includes("/#beginnercomic"))
      presenceData.details = "Reading This is Granblue Fantasy";
    else if (document.location.href.includes("/#news"))
      presenceData.details = "Viewing the news";
    else if (document.location.href.includes("/#comic"))
      presenceData.details = "Reading Grand Blues";

    presence.setActivity(presenceData);
  }
});
