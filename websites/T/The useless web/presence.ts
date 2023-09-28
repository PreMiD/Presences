const presence = new Presence({
	clientId: "630358456938790923",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/T/The%20useless%20web/assets/logo.jpg",
	};

	if (window.location.href.toLowerCase().includes("theuselessweb.com"))
		presenceData.state = "Main site";

	if (window.location.href.toLowerCase().includes("www.theuselessweb.com"))
		presenceData.state = "Main site";

	if (window.location.href.toLowerCase().includes("heeeeeeeey.com"))
		presenceData.state = "heeeeeeeey.com";

	if (window.location.href.toLowerCase().includes("tinytuba.com"))
		presenceData.state = "tinytuba.com";

	if (window.location.href.toLowerCase().includes("corndog.io"))
		presenceData.state = "corndog.io";

	if (window.location.href.toLowerCase().includes("thatsthefinger.com"))
		presenceData.state = "thatsthefinger.com";

	if (window.location.href.toLowerCase().includes("cant-not-tweet-this.com"))
		presenceData.state = "cant-not-tweet-this.com";

	if (window.location.href.toLowerCase().includes("weirdorconfusing.com"))
		presenceData.state = "weirdorconfusing.com";

	if (window.location.href.toLowerCase().includes("www.eyes-only.net"))
		presenceData.state = "www.eyes-only.net";

	if (window.location.href.toLowerCase().includes("eelslap.com"))
		presenceData.state = "eelslap.com";

	if (window.location.href.toLowerCase().includes("www.staggeringbeauty.com"))
		presenceData.state = "www.staggeringbeauty.com";

	if (window.location.href.toLowerCase().includes("burymewithmymoney.com"))
		presenceData.state = "burymewithmymoney.com";

	if (window.location.href.toLowerCase().includes("endless.horse"))
		presenceData.state = "endless.horse";

	if (window.location.href.toLowerCase().includes("www.trypap.com"))
		presenceData.state = "www.trypap.com";

	if (
		window.location.href.toLowerCase().includes("www.republiquedesmangues.fr")
	)
		presenceData.state = "www.republiquedesmangues.fr";

	if (window.location.href.toLowerCase().includes("www.movenowthinklater.com"))
		presenceData.state = "www.movenowthinklater.com";

	if (window.location.href.toLowerCase().includes("www.partridgegetslucky.com"))
		presenceData.state = "www.partridgegetslucky.com";

	if (window.location.href.toLowerCase().includes("www.rrrgggbbb.com"))
		presenceData.state = "www.rrrgggbbb.com";

	if (window.location.href.toLowerCase().includes("beesbeesbees.com"))
		presenceData.state = "beesbeesbees.com";

	if (window.location.href.toLowerCase().includes("www.koalastothemax.com"))
		presenceData.state = "www.koalastothemax.com";

	if (window.location.href.toLowerCase().includes("www.everydayim.com"))
		presenceData.state = "www.everydayim.com";

	if (window.location.href.toLowerCase().includes("randomcolour.com"))
		presenceData.state = "randomcolour.com";

	if (window.location.href.toLowerCase().includes("cat-bounce.com"))
		presenceData.state = "cat-bounce.com";

	if (window.location.href.toLowerCase().includes("chrismckenzie.com"))
		presenceData.state = "chrismckenzie.com";

	if (
		window.location.href
			.toLowerCase()
			.includes("hasthelargehadroncolliderdestroyedtheworldyet.com")
	)
		presenceData.state = "Has the word ended?";

	if (window.location.href.toLowerCase().includes("ninjaflex.com"))
		presenceData.state = "ninjaflex.com";

	if (window.location.href.toLowerCase().includes("ihasabucket.com"))
		presenceData.state = "ihasabucket.com";

	if (window.location.href.toLowerCase().includes("corndogoncorndog.com"))
		presenceData.state = "corndogoncorndog.com";

	if (window.location.href.toLowerCase().includes("www.hackertyper.com"))
		presenceData.state = "www.hackertyper.com";

	if (window.location.href.toLowerCase().includes("pointerpointer.com"))
		presenceData.state = "pointerpointer.com";

	if (window.location.href.toLowerCase().includes("imaninja.com"))
		presenceData.state = "imaninja.com";

	if (window.location.href.toLowerCase().includes("www.ismycomputeron.com"))
		presenceData.state = "www.ismycomputeron.com";

	if (window.location.href.toLowerCase().includes("www.nullingthevoid.com"))
		presenceData.state = "www.nullingthevoid.com";

	if (window.location.href.toLowerCase().includes("www.muchbetterthanthis.com"))
		presenceData.state = "www.muchbetterthanthis.com";

	if (window.location.href.toLowerCase().includes("www.yesnoif.com"))
		presenceData.state = "www.yesnoif.com";

	if (window.location.href.toLowerCase().includes("iamawesome.com"))
		presenceData.state = "iamawesome.com";

	if (window.location.href.toLowerCase().includes("www.pleaselike.com"))
		presenceData.state = "www.pleaselike.com";

	if (window.location.href.toLowerCase().includes("crouton.net"))
		presenceData.state = "crouton.net";

	if (window.location.href.toLowerCase().includes("corgiorgy.com"))
		presenceData.state = "corgiorgy.com";

	if (window.location.href.toLowerCase().includes("www.wutdafuk.com"))
		presenceData.state = "www.wutdafuk.com";

	if (window.location.href.toLowerCase().includes("unicodesnowmanforyou.com"))
		presenceData.state = "unicodesnowmanforyou.com";

	if (window.location.href.toLowerCase().includes("www.crossdivisions.com"))
		presenceData.state = "www.crossdivisions.com";

	if (window.location.href.toLowerCase().includes("tencents.info"))
		presenceData.state = "tencents.info";

	if (
		window.location.href.toLowerCase().includes("www.patience-is-a-virtue.org")
	)
		presenceData.state = "www.patience-is-a-virtue.org";

	if (window.location.href.toLowerCase().includes("whitetrash.nl"))
		presenceData.state = "whitetrash.nl";

	if (window.location.href.toLowerCase().includes("www.theendofreason.com"))
		presenceData.state = "www.theendofreason.com";

	if (window.location.href.toLowerCase().includes("pixelsfighting.com"))
		presenceData.state = "pixelsfighting.com";

	if (window.location.href.toLowerCase().includes("isitwhite.com"))
		presenceData.state = "isitwhite.com";

	if (window.location.href.toLowerCase().includes("onemillionlols.com"))
		presenceData.state = "onemillionlols.com";

	if (window.location.href.toLowerCase().includes("www.omfgdogs.com"))
		presenceData.state = "www.omfgdogs.com";

	if (window.location.href.toLowerCase().includes("oct82.com"))
		presenceData.state = "oct82.com";

	if (window.location.href.toLowerCase().includes("chihuahuaspin.com"))
		presenceData.state = "chihuahuaspin.com";

	if (window.location.href.toLowerCase().includes("www.blankwindows.com"))
		presenceData.state = "www.blankwindows.com";

	if (window.location.href.toLowerCase().includes("dogs.are.the.most.moe"))
		presenceData.state = "dogs.are.the.most.moe";

	if (window.location.href.toLowerCase().includes("tunnelsnakes.com"))
		presenceData.state = "tunnelsnakes.com";

	if (window.location.href.toLowerCase().includes("www.trashloop.com"))
		presenceData.state = "www.trashloop.com";

	if (
		window.location.href.toLowerCase().includes("www.ascii-middle-finger.com")
	)
		presenceData.state = "www.ascii-middle-finger.com";

	if (window.location.href.toLowerCase().includes("spaceis.cool"))
		presenceData.state = "spaceis.cool";

	if (
		window.location.href.toLowerCase().includes("www.donothingfor2minutes.com")
	)
		presenceData.state = "www.donothingfor2minutes.com";

	if (window.location.href.toLowerCase().includes("buildshruggie.com"))
		presenceData.state = "buildshruggie.com";

	if (window.location.href.toLowerCase().includes("buzzybuzz.biz"))
		presenceData.state = "buzzybuzz.biz";

	if (window.location.href.toLowerCase().includes("yeahlemons.com"))
		presenceData.state = "yeahlemons.com";

	if (window.location.href.toLowerCase().includes("burnie.com"))
		presenceData.state = "burnie.com";

	if (window.location.href.toLowerCase().includes("wowenwilsonquiz.com"))
		presenceData.state = "wowenwilsonquiz.com";

	if (window.location.href.toLowerCase().includes("thepigeon.org"))
		presenceData.state = "thepigeon.org";

	if (window.location.href.toLowerCase().includes("notdayoftheweek.com"))
		presenceData.state = "notdayoftheweek.com";

	if (window.location.href.toLowerCase().includes("www.amialright.com"))
		presenceData.state = "www.amialright.com";

	if (window.location.href.toLowerCase().includes("nooooooooooooooo.com"))
		presenceData.state = "nooooooooooooooo.com";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
