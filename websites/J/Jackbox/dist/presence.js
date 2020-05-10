const presence = new Presence({
    clientId: "638118757453004820"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "jackbox"
    };
    if (document.getElementsByClassName("Ridictionary").length > 0) {
        presenceData.details = "Playing Dictionarium";
    }
    else if (document.getElementsByClassName("TriviaDeath2").length > 0) {
        presenceData.details = "Playing Trivia Murder Party 2";
    }
    else if (document.getElementsByClassName("RoleModels").length > 0) {
        presenceData.details = "Playing Role Models";
    }
    else if (document.getElementsByClassName("Jokeboat").length > 0) {
        presenceData.details = "Playing Joke Boat";
    }
    else if (document.getElementsByClassName("Push The Button").length > 0) {
        presenceData.details = "Playing Push The Button";
    }
    else if (document.getElementsByClassName("YDKJ2018").length > 0) {
        presenceData.details = "Playing You Don't Know Jack: Full Stream";
    }
    else if (document.getElementsByClassName("RapBattle").length > 0) {
        presenceData.details = "Playing Mad Verse City";
    }
    else if (document.getElementsByClassName("PatentlyStupid").length > 0) {
        presenceData.details = "Playing Patently Stupid";
    }
    else if (document.getElementsByClassName("SlingShoot").length > 0) {
        presenceData.details = "Playing Zeeple Dome";
    }
    else if (document.getElementsByClassName("SplitTheRoom").length > 0) {
        presenceData.details = "Playing Split The Room";
    }
    else if (document.getElementsByClassName("Fibbage3").length > 0) {
        presenceData.details = "Playing Fibbage 3";
    }
    else if (document.getElementsByClassName("SurviveTheInternet").length > 0) {
        presenceData.details = "Playing Survive The Internet";
    }
    else if (document.getElementsByClassName("MonsterMingle").length > 0) {
        presenceData.details = "Playing Monster Seeking Monster";
    }
    else if (document.getElementsByClassName("bracketeering").length > 0) {
        presenceData.details = "Playing Bracketeering";
    }
    else if (document.getElementsByClassName("Overdrawn").length > 0) {
        presenceData.details = "Playing Civic Doodle";
    }
    else if (document.getElementById("page-quiplash")) {
        presenceData.details = "Playing Quiplash 1/XL/2";
    }
    else if (document.getElementById("page-triviadeath")) {
        presenceData.details = "Playing Trivia Murder Party";
    }
    else if (document.getElementById("page-pollposition")) {
        presenceData.details = "Playing Guesspionage";
    }
    else if (document.getElementById("page-fakinit")) {
        presenceData.details = "Playing Fakin' It";
    }
    else if (document.getElementById("page-awshirt")) {
        presenceData.details = "Playing Tee K.O.";
    }
    else if (document.getElementById("page-fibbage")) {
        presenceData.details = "Playing Fibbage XL/2";
    }
    else if (document.getElementById("page-earwax")) {
        presenceData.details = "Playing Earwax";
    }
    else if (document.getElementById("page-auction")) {
        presenceData.details = "Playing Bidiots";
    }
    else if (document.getElementById("page-bombintern")) {
        presenceData.details = "Playing Bomb Corp";
    }
    else if (document.getElementById("page-ydkj2015")) {
        presenceData.details = "Playing You Don't Know Jack 2015";
    }
    else if (document.getElementById("page-drawful")) {
        presenceData.details = "Playing Drawful 1/2";
    }
    else if (document.getElementById("page-wordspud")) {
        presenceData.details = "Playing Word Spud";
    }
    else if (document.getElementById("page-lieswatter")) {
        presenceData.details = "Playing Lie Swatter";
    }
    else if (window.location.href.includes("games.jackbox.tv")) {
        presenceData.details = "Looking at a past game";
    }
    else {
        presenceData.details = "Not playing anything";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQWlESCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFNBQVM7S0FDekIsQ0FBQztJQUdGLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztLQUMvQztTQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDckUsWUFBWSxDQUFDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztLQUN4RDtTQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztLQUM5QztTQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakUsWUFBWSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztLQUM1QztTQUFNLElBQUksUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4RSxZQUFZLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO0tBR2xEO1NBQU0sSUFBSSxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMs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