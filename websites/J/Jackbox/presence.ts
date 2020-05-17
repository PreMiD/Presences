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

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "jackbox"
  };

  // PP6
  if (document.getElementsByClassName("Ridictionary").length > 0) {
    presenceData.details = "Playing Dictionarium";
  } else if (document.getElementsByClassName("TriviaDeath2").length > 0) {
    presenceData.details = "Playing Trivia Murder Party 2";
  } else if (document.getElementsByClassName("RoleModels").length > 0) {
    presenceData.details = "Playing Role Models";
  } else if (document.getElementsByClassName("Jokeboat").length > 0) {
    presenceData.details = "Playing Joke Boat";
  } else if (document.getElementsByClassName("Push The Button").length > 0) {
    presenceData.details = "Playing Push The Button";

    // PP5
  } else if (document.getElementsByClassName("YDKJ2018").length > 0) {
    presenceData.details = "Playing You Don't Know Jack: Full Stream";
  } else if (document.getElementsByClassName("RapBattle").length > 0) {
    presenceData.details = "Playing Mad Verse City";
  } else if (document.getElementsByClassName("PatentlyStupid").length > 0) {
    presenceData.details = "Playing Patently Stupid";
  } else if (document.getElementsByClassName("SlingShoot").length > 0) {
    presenceData.details = "Playing Zeeple Dome";
  } else if (document.getElementsByClassName("SplitTheRoom").length > 0) {
    presenceData.details = "Playing Split The Room";

    // PP4
  } else if (document.getElementsByClassName("Fibbage3").length > 0) {
    presenceData.details = "Playing Fibbage 3";
  } else if (document.getElementsByClassName("SurviveTheInternet").length > 0) {
    presenceData.details = "Playing Survive The Internet";
  } else if (document.getElementsByClassName("MonsterMingle").length > 0) {
    presenceData.details = "Playing Monster Seeking Monster";
  } else if (document.getElementsByClassName("bracketeering").length > 0) {
    presenceData.details = "Playing Bracketeering";
  } else if (document.getElementsByClassName("Overdrawn").length > 0) {
    presenceData.details = "Playing Civic Doodle";

    // PP3
  } else if (document.getElementById("page-quiplash")) {
    presenceData.details = "Playing Quiplash 1/XL/2";
  } else if (document.getElementById("page-triviadeath")) {
    presenceData.details = "Playing Trivia Murder Party";
  } else if (document.getElementById("page-pollposition")) {
    presenceData.details = "Playing Guesspionage";
  } else if (document.getElementById("page-fakinit")) {
    presenceData.details = "Playing Fakin' It";
  } else if (document.getElementById("page-awshirt")) {
    presenceData.details = "Playing Tee K.O.";

    // PP2
  } else if (document.getElementById("page-fibbage")) {
    presenceData.details = "Playing Fibbage XL/2";
  } else if (document.getElementById("page-earwax")) {
    presenceData.details = "Playing Earwax";
  } else if (document.getElementById("page-auction")) {
    presenceData.details = "Playing Bidiots";
  } else if (document.getElementById("page-bombintern")) {
    presenceData.details = "Playing Bomb Corp";

    // PP1
  } else if (document.getElementById("page-ydkj2015")) {
    presenceData.details = "Playing You Don't Know Jack 2015";
  } else if (document.getElementById("page-drawful")) {
    presenceData.details = "Playing Drawful 1/2";
  } else if (document.getElementById("page-wordspud")) {
    presenceData.details = "Playing Word Spud";
  } else if (document.getElementById("page-lieswatter")) {
    presenceData.details = "Playing Lie Swatter";

    // Other
  } else if (window.location.href.includes("games.jackbox.tv")) {
    presenceData.details = "Looking at a past game";
  } else {
    presenceData.details = "Not playing anything";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
