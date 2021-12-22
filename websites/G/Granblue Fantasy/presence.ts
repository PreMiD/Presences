const presence = new Presence({
    clientId: "632983924414349333"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  data.startTimestamp = browsingStamp;

  if (document.location.hostname === "game.granbluefantasy.jp") {
    if (document.location.href.includes("/#mypage")) data.details = "Home page";
    else if (document.location.href.includes("/#quest")) {
      data.details = "Selecting a quest";
      if (document.location.href.includes("/#quest/extra"))
        data.state = "Treasure Quests / Event Quest";
      else if (document.location.href.includes("/#quest/assist"))
        data.state = "Joining a raid";
      else if (document.location.href.includes("/#quest/supporter"))
        data.state = "Choosing a summon";
      else if (document.location.href.includes("/#quest/fate"))
        data.state = "Choosing a fate quest";
      else if (document.location.href.includes("/#quest/scene"))
        data.state = "In a story scene";
    } else if (document.location.href.includes("/#result"))
      data.details = "In a Quest result screen";
    else if (
      document.location.href.includes("/#raid") ||
      document.location.href.includes("/#raid_multi")
    ) {
      const boss = document.getElementsByClassName("name")[0].innerHTML;
      data.details = boss;
    } else if (document.location.href.includes("/#party/index/0/npc/0"))
      data.details = "Viewing party";
    else if (document.location.href.includes("/#enhancement")) {
      data.details = "Upgrading : ";

      if (document.location.href.includes("/#enhancement/npc"))
        data.state = "Characters";
      else if (document.location.href.includes("/#enhancement/weapon"))
        data.state = "Weapons";
      else if (document.location.href.includes("/#enhancement/summon"))
        data.state = "Summons";
    } else if (document.location.href.includes("/#evolution")) {
      data.details = "Uncapping :";

      if (document.location.href.includes("/#evolution/npc"))
        data.state = "Characters";
      else if (document.location.href.includes("/#evolution/weapon"))
        data.state = "Weapons";
      else if (document.location.href.includes("/#evolution/summon"))
        data.state = "Summons";
    } else if (document.location.href.includes("/#coopraid")) {
      data.details = "Co-op :";

      if (document.location.href.includes("/#coopraid/offer"))
        data.state = "Searching a raid coop room";
      else if (document.location.href.includes("/#coopraid/room"))
        data.state = "In a coop room";
    } else if (document.location.href.includes("/#lobby/room")) {
      data.details = "Co-op :";
      data.state = "In a raid coop room";
    } else if (document.location.href.includes("/#casino")) {
      data.details = "Casino :";
      data.state = "Main menu";
      if (document.location.href.includes("/#casino/list/poker"))
        data.state = "Choosing poker bet";
      else if (document.location.href.includes("/#casino/game/poker"))
        data.state = "Playing poker";
      else if (document.location.href.includes("#casino/list/slot"))
        data.state = "Choosing slots bet";
      else if (document.location.href.includes("/#casino/game/slot"))
        data.state = "Playing slots";
      else if (document.location.href.includes("/#casino/list/bingo"))
        data.state = "Choosing bingo bet";
      else if (document.location.href.includes("/#casino/game/bingo"))
        data.state = "Playing bingo";
      else if (document.location.href.includes("/#casino/exchange"))
        data.state = " In the casino cage";
      else if (document.location.href.includes("/#casino/rule/casino"))
        data.state = "Viewing casino rules";
    } else if (document.location.href.includes("/#gacha"))
      data.details = "In the Draw menu";
    else if (document.location.href.includes("/#profile"))
      data.details = "Viewing profile page";
    else if (document.location.href.includes("/#archive"))
      data.details = "Viewing journal";
    else if (document.location.href.includes("/#title"))
      data.details = "Viewing trophies";
    else if (document.location.href.includes("/#guild"))
      data.details = "Viewing crew";
    else if (document.location.href.includes("/#shop")) {
      data.details = "Shop :";
      data.state = "Main menu";

      if (document.location.href.includes("/#shop/exchange/points"))
        data.state = "Pendants shop";
      else if (document.location.href.includes("/#shop/exchange/moon"))
        data.state = "Trading moons";
      else if (document.location.href.includes("/#shop/exchange/trajectory"))
        data.state = "Journey drops";
      else if (document.location.href.includes("/#shop/exchange/ceiling"))
        data.state = "Trading ceruleans stones";
      else if (document.location.href.includes("/#shop/skin/top"))
        data.state = "Outfit shop";
      else if (document.location.href.includes("/#shop/skycompass/points"))
        data.state = "SkyCompass points exchange";
      else if (document.location.href.includes("/#shop/lupi/0"))
        data.state = "Crystal shop";
      else if (document.location.href.includes("/#shop/exchange/list"))
        data.state = "Treasure trading";
    } else if (document.location.href.includes("/#archaic")) {
      data.details = "Shop :";
      data.state = "Weapons Crafting";
      if (document.location.href.includes("/#archaic/job"))
        data.state = "Crafting Class Champion weapons";
      else if (document.location.href.includes("/#archaic/numbers"))
        data.state = "Crafting Revenant weapons";
      else if (document.location.href.includes("/#archaic/seraphic"))
        data.state = "Crafting Seraphic weapons";
      else if (document.location.href.includes("/#archaic/xeno/list"))
        data.state = "Crafting Xeno weapons";
      else if (document.location.href.includes("/#archaic/bahamut"))
        data.state = "Crafting Bahamut weapons";
      else if (document.location.href.includes("/#archaic/omega"))
        data.state = "Crafting Ultima weapons";
    } else if (document.location.href.includes("#arcarum2/enhancement")) {
      data.details = " Shop :";
      data.state = "Crafting Arcarum summons";
    } else if (document.location.href.includes("/#item"))
      data.details = "Viewing supplies";
    else if (document.location.href.includes("/#present"))
      data.details = "Viewing Crate";
    else if (document.location.href.includes("/#list"))
      data.details = "Viewing inventory";
    else if (document.location.href.includes("/#container"))
      data.details = "Viewing stash";
    else if (document.location.href.includes("/#friend"))
      data.details = "Viewing friends list";
    else if (document.location.href.includes("/#event"))
      data.details = "Event Menu";
    else if (document.location.href.includes("/#setting"))
      data.details = "Changing settings";
    else if (document.location.href.includes("/#teaser"))
      data.details = "Viewing event preview";
    else if (document.location.href.includes("/#sell"))
      data.details = "Selling weapons/summons";
    else if (document.location.href.includes("/#decompose"))
      data.details = "Reducing weapons/summons";
    else if (document.location.href.includes("/#recycle"))
      data.details = "Reserve weapons/summons";
    else if (document.location.href.includes("/#help"))
      data.details = "Viewing help";
    else if (document.location.href.includes("/#sidestory"))
      data.details = "Viewing side stories";
    else if (document.location.href.includes("/#trial_battle"))
      data.details = "Viewing trial battles";
    else if (document.location.href.includes("/#campaign/panel"))
      data.details = "Viewing pinboard missions";
    else if (document.location.href.includes("/#beginnercomic"))
      data.details = "Reading This is Granblue Fantasy";
    else if (document.location.href.includes("/#news"))
      data.details = "Viewing the news";
    else if (document.location.href.includes("/#comic"))
      data.details = "Reading Grand Blues";

    presence.setActivity(data);
  }
});
