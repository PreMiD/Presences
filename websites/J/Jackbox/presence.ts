const presence = new Presence({
  clientId: "638118757453004820"
});

// TODO: Game List
// PP6
// [x] TMP2
// [x] Dictionarium
// [x] Role Models
// [x] Joke Boat
// [x] Push The Button
//
// PP5
// [x] YDKJ: Full Stream
// [x] Patently Stupid
// [x] Mad Verse City
// [x] Zeeple Dome
// [x] Split The Room
//
// PP4
// [x] Fibbage 3
// [x] Survive The Internet
// [x] Monster Seeking Monster
// [x] Bracketeering
// [x] Civic Doodle
//
// PP3
// [x] TMP
// [x] Quiplash 2
// [x] Guesspionage
// [x] Tee K.O.
// [x] Fakin' It
//
// PP2
// [x] Fibbage 2
// [x] Quiplash XL
// [x] Earwax
// [x] Bidiots
// [x] Bomb Corp
//
// PP1
// [x] YDKJ 2015
// [x] Drawful
// [x] Word Spud
// [x] Lie Swatter
// [x] Fibbage XL
//
// Standalone
// [x] Drawful 2
// [x] Quiplash

let layout: string;
const elapsed: number = Math.round(new Date().getTime() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "jackbox"
    },
    // Check for presence setting
    useName: boolean = await presence.getSetting("useName"),
    useTime: boolean = await presence.getSetting("useTime");

  if (useTime) presenceData.startTimestamp = elapsed;

  // PP6
  if (document.getElementsByClassName("Ridictionary").length > 0) {
    presenceData.details = "Playing Dictionarium";
    layout = "dict";
  } else if (document.getElementsByClassName("TriviaDeath2").length > 0) {
    presenceData.details = "Playing Trivia Murder Party 2";
    layout = "new";
  } else if (document.getElementsByClassName("RoleModels").length > 0) {
    presenceData.details = "Playing Role Models";
    layout = "new";
  } else if (document.getElementsByClassName("Jokeboat").length > 0) {
    presenceData.details = "Playing Joke Boat";
    layout = "new";
  } else if (document.getElementsByClassName("Push The Button").length > 0) {
    presenceData.details = "Playing Push The Button";
    layout = "new";

    // PP5
  } else if (document.getElementsByClassName("YDKJ2018").length > 0) {
    presenceData.details = "Playing You Don't Know Jack: Full Stream";
    layout = "new";
  } else if (document.getElementsByClassName("RapBattle").length > 0) {
    presenceData.details = "Playing Mad Verse City";
    layout = "new";
  } else if (document.getElementsByClassName("PatentlyStupid").length > 0) {
    presenceData.details = "Playing Patently Stupid";
    layout = "new";
  } else if (document.getElementsByClassName("SlingShoot").length > 0) {
    presenceData.details = "Playing Zeeple Dome";
    layout = "new";
  } else if (document.getElementsByClassName("SplitTheRoom").length > 0) {
    presenceData.details = "Playing Split The Room";
    layout = "new";

    // PP4
  } else if (document.getElementsByClassName("Fibbage3").length > 0) {
    presenceData.details = "Playing Fibbage 3";
    layout = "new";
  } else if (document.getElementsByClassName("SurviveTheInternet").length > 0) {
    presenceData.details = "Playing Survive The Internet";
    layout = "new";
  } else if (document.getElementsByClassName("MonsterMingle").length > 0) {
    presenceData.details = "Playing Monster Seeking Monster";
    layout = "new";
  } else if (document.getElementsByClassName("bracketeering").length > 0) {
    presenceData.details = "Playing Bracketeering";
    layout = "new";
  } else if (document.getElementsByClassName("Overdrawn").length > 0) {
    presenceData.details = "Playing Civic Doodle";
    layout = "new";

    // PP3
  } else if (document.getElementById("page-quiplash")) {
    presenceData.details = "Playing Quiplash 1/XL/2";
    layout = "legacy";
  } else if (document.getElementById("page-triviadeath")) {
    presenceData.details = "Playing Trivia Murder Party";
    layout = "legacy";
  } else if (document.getElementById("page-pollposition")) {
    presenceData.details = "Playing Guesspionage";
    layout = "guessp";
  } else if (document.getElementById("page-fakinit")) {
    presenceData.details = "Playing Fakin' It";
    layout = "legacy";
  } else if (document.getElementById("page-awshirt")) {
    presenceData.details = "Playing Tee K.O.";
    layout = "legacy";

    // PP2
  } else if (document.getElementById("page-fibbage")) {
    presenceData.details = "Playing Fibbage XL/2";
    layout = "legacy";
  } else if (document.getElementById("page-earwax")) {
    presenceData.details = "Playing Earwax";
    layout = "legacy";
  } else if (document.getElementById("page-auction")) {
    presenceData.details = "Playing Bidiots";
    layout = "legacy";
  } else if (document.getElementById("page-bombintern")) {
    presenceData.details = "Playing Bomb Corp";
    layout = "legacy";

    // PP1
  } else if (document.getElementById("page-ydkj2015")) {
    presenceData.details = "Playing You Don't Know Jack 2015";
    layout = "legacy";
  } else if (document.getElementById("page-drawful")) {
    presenceData.details = "Playing Drawful 1/2";
    layout = "legacy";
  } else if (document.getElementById("page-wordspud")) {
    presenceData.details = "Playing Word Spud";
    layout = "legacy";
  } else if (document.getElementById("page-lieswatter")) {
    presenceData.details = "Playing Lie Swatter";
    layout = "legacy";

    // Other
  } else if (window.location.href.includes("games.jackbox.tv"))
    presenceData.details = "Looking at a past game";
  else presenceData.details = "Idle";

  if (useName && layout === "new") {
    presenceData.state = `as ${
      document.getElementById("playername").innerHTML
    }`;
  }

  if (useName && layout === "legacy") {
    presenceData.state = `as ${
      document.getElementById("player").children[0].innerHTML
    }`;
  }

  if (useName && layout === "dict") {
    presenceData.state = `as ${
      document.getElementById("playericon").className.split("_")[1]
    }${document.getElementById("playername").innerHTML.toLowerCase()}`;
  }

  if (useName && layout === "guessp") {
    presenceData.state = `as ${
      document.getElementById("player").children[1].innerHTML
    }`;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
