const presence = new Presence({
    clientId: "630358456938790923"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "uselesslogo"
    };
    if (window.location.href.toLowerCase().includes("theuselessweb.com")) {
        presenceData.state = "Main site";
    }
    if (window.location.href.toLowerCase().includes("www.theuselessweb.com")) {
        presenceData.state = "Main site";
    }
    if (window.location.href.toLowerCase().includes("heeeeeeeey.com")) {
        presenceData.state = "heeeeeeeey.com";
    }
    if (window.location.href.toLowerCase().includes("tinytuba.com")) {
        presenceData.state = "tinytuba.com";
    }
    if (window.location.href.toLowerCase().includes("corndog.io")) {
        presenceData.state = "corndog.io";
    }
    if (window.location.href.toLowerCase().includes("thatsthefinger.com")) {
        presenceData.state = "thatsthefinger.com";
    }
    if (window.location.href.toLowerCase().includes("cant-not-tweet-this.com")) {
        presenceData.state = "cant-not-tweet-this.com";
    }
    if (window.location.href.toLowerCase().includes("weirdorconfusing.com")) {
        presenceData.state = "weirdorconfusing.com";
    }
    if (window.location.href.toLowerCase().includes("www.eyes-only.net")) {
        presenceData.state = "www.eyes-only.net";
    }
    if (window.location.href.toLowerCase().includes("eelslap.com")) {
        presenceData.state = "eelslap.com";
    }
    if (window.location.href.toLowerCase().includes("www.staggeringbeauty.com")) {
        presenceData.state = "www.staggeringbeauty.com";
    }
    if (window.location.href.toLowerCase().includes("burymewithmymoney.com")) {
        presenceData.state = "burymewithmymoney.com";
    }
    if (window.location.href.toLowerCase().includes("endless.horse")) {
        presenceData.state = "endless.horse";
    }
    if (window.location.href.toLowerCase().includes("www.trypap.com")) {
        presenceData.state = "www.trypap.com";
    }
    if (window.location.href.toLowerCase().includes("www.republiquedesmangues.fr")) {
        presenceData.state = "www.republiquedesmangues.fr";
    }
    if (window.location.href.toLowerCase().includes("www.movenowthinklater.com")) {
        presenceData.state = "www.movenowthinklater.com";
    }
    if (window.location.href.toLowerCase().includes("www.partridgegetslucky.com")) {
        presenceData.state = "www.partridgegetslucky.com";
    }
    if (window.location.href.toLowerCase().includes("www.rrrgggbbb.com")) {
        presenceData.state = "www.rrrgggbbb.com";
    }
    if (window.location.href.toLowerCase().includes("beesbeesbees.com")) {
        presenceData.state = "beesbeesbees.com";
    }
    if (window.location.href.toLowerCase().includes("www.koalastothemax.com")) {
        presenceData.state = "www.koalastothemax.com";
    }
    if (window.location.href.toLowerCase().includes("www.everydayim.com")) {
        presenceData.state = "www.everydayim.com";
    }
    if (window.location.href.toLowerCase().includes("randomcolour.com")) {
        presenceData.state = "randomcolour.com";
    }
    if (window.location.href.toLowerCase().includes("cat-bounce.com")) {
        presenceData.state = "cat-bounce.com";
    }
    if (window.location.href.toLowerCase().includes("chrismckenzie.com")) {
        presenceData.state = "chrismckenzie.com";
    }
    if (window.location.href
        .toLowerCase()
        .includes("hasthelargehadroncolliderdestroyedtheworldyet.com")) {
        presenceData.state = "Has the word ended?";
    }
    if (window.location.href.toLowerCase().includes("ninjaflex.com")) {
        presenceData.state = "ninjaflex.com";
    }
    if (window.location.href.toLowerCase().includes("ihasabucket.com")) {
        presenceData.state = "ihasabucket.com";
    }
    if (window.location.href.toLowerCase().includes("corndogoncorndog.com")) {
        presenceData.state = "corndogoncorndog.com";
    }
    if (window.location.href.toLowerCase().includes("www.hackertyper.com")) {
        presenceData.state = "www.hackertyper.com";
    }
    if (window.location.href.toLowerCase().includes("pointerpointer.com")) {
        presenceData.state = "pointerpointer.com";
    }
    if (window.location.href.toLowerCase().includes("imaninja.com")) {
        presenceData.state = "imaninja.com";
    }
    if (window.location.href.toLowerCase().includes("www.ismycomputeron.com")) {
        presenceData.state = "www.ismycomputeron.com";
    }
    if (window.location.href.toLowerCase().includes("www.nullingthevoid.com")) {
        presenceData.state = "www.nullingthevoid.com";
    }
    if (window.location.href.toLowerCase().includes("www.muchbetterthanthis.com")) {
        presenceData.state = "www.muchbetterthanthis.com";
    }
    if (window.location.href.toLowerCase().includes("www.yesnoif.com")) {
        presenceData.state = "www.yesnoif.com";
    }
    if (window.location.href.toLowerCase().includes("iamawesome.com")) {
        presenceData.state = "iamawesome.com";
    }
    if (window.location.href.toLowerCase().includes("www.pleaselike.com")) {
        presenceData.state = "www.pleaselike.com";
    }
    if (window.location.href.toLowerCase().includes("crouton.net")) {
        presenceData.state = "crouton.net";
    }
    if (window.location.href.toLowerCase().includes("corgiorgy.com")) {
        presenceData.state = "corgiorgy.com";
    }
    if (window.location.href.toLowerCase().includes("www.wutdafuk.com")) {
        presenceData.state = "www.wutdafuk.com";
    }
    if (window.location.href.toLowerCase().includes("unicodesnowmanforyou.com")) {
        presenceData.state = "unicodesnowmanforyou.com";
    }
    if (window.location.href.toLowerCase().includes("www.crossdivisions.com")) {
        presenceData.state = "www.crossdivisions.com";
    }
    if (window.location.href.toLowerCase().includes("tencents.info")) {
        presenceData.state = "tencents.info";
    }
    if (window.location.href.toLowerCase().includes("www.patience-is-a-virtue.org")) {
        presenceData.state = "www.patience-is-a-virtue.org";
    }
    if (window.location.href.toLowerCase().includes("whitetrash.nl")) {
        presenceData.state = "whitetrash.nl";
    }
    if (window.location.href.toLowerCase().includes("www.theendofreason.com")) {
        presenceData.state = "www.theendofreason.com";
    }
    if (window.location.href.toLowerCase().includes("pixelsfighting.com")) {
        presenceData.state = "pixelsfighting.com";
    }
    if (window.location.href.toLowerCase().includes("isitwhite.com")) {
        presenceData.state = "isitwhite.com";
    }
    if (window.location.href.toLowerCase().includes("onemillionlols.com")) {
        presenceData.state = "onemillionlols.com";
    }
    if (window.location.href.toLowerCase().includes("www.omfgdogs.com")) {
        presenceData.state = "www.omfgdogs.com";
    }
    if (window.location.href.toLowerCase().includes("oct82.com")) {
        presenceData.state = "oct82.com";
    }
    if (window.location.href.toLowerCase().includes("chihuahuaspin.com")) {
        presenceData.state = "chihuahuaspin.com";
    }
    if (window.location.href.toLowerCase().includes("www.blankwindows.com")) {
        presenceData.state = "www.blankwindows.com";
    }
    if (window.location.href.toLowerCase().includes("dogs.are.the.most.moe")) {
        presenceData.state = "dogs.are.the.most.moe";
    }
    if (window.location.href.toLowerCase().includes("tunnelsnakes.com")) {
        presenceData.state = "tunnelsnakes.com";
    }
    if (window.location.href.toLowerCase().includes("www.trashloop.com")) {
        presenceData.state = "www.trashloop.com";
    }
    if (window.location.href.toLowerCase().includes("www.ascii-middle-finger.com")) {
        presenceData.state = "www.ascii-middle-finger.com";
    }
    if (window.location.href.toLowerCase().includes("spaceis.cool")) {
        presenceData.state = "spaceis.cool";
    }
    if (window.location.href.toLowerCase().includes("www.donothingfor2minutes.com")) {
        presenceData.state = "www.donothingfor2minutes.com";
    }
    if (window.location.href.toLowerCase().includes("buildshruggie.com")) {
        presenceData.state = "buildshruggie.com";
    }
    if (window.location.href.toLowerCase().includes("buzzybuzz.biz")) {
        presenceData.state = "buzzybuzz.biz";
    }
    if (window.location.href.toLowerCase().includes("yeahlemons.com")) {
        presenceData.state = "yeahlemons.com";
    }
    if (window.location.href.toLowerCase().includes("burnie.com")) {
        presenceData.state = "burnie.com";
    }
    if (window.location.href.toLowerCase().includes("wowenwilsonquiz.com")) {
        presenceData.state = "wowenwilsonquiz.com";
    }
    if (window.location.href.toLowerCase().includes("thepigeon.org")) {
        presenceData.state = "thepigeon.org";
    }
    if (window.location.href.toLowerCase().includes("notdayoftheweek.com")) {
        presenceData.state = "notdayoftheweek.com";
    }
    if (window.location.href.toLowerCase().includes("www.amialright.com")) {
        presenceData.state = "www.amialright.com";
    }
    if (window.location.href.toLowerCase().includes("nooooooooooooooo.com")) {
        presenceData.state = "nooooooooooooooo.com";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLGFBQWE7S0FDN0IsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDcEUsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDbEM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ3hFLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ2xDO0lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNqRSxZQUFZLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDO0tBQ3ZDO0lBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDL0QsWUFBWSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7S0FDckM7SUFDRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM3RCxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztLQUNuQztJQUNELElB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