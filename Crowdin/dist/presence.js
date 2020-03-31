var presence = new Presence({
    clientId: "614200757989670934"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var translatePageTitle;
var translatingFile, translateProject, translatingLanguage;
var profileName, profileNickname;
var projectsTab;
presence.on("UpdateData", async () => {
    let presenceData = {
        details: "Unknown page",
        largeImageKey: "lg"
    };
    if (document.location.pathname == "/" ||
        !document.location.pathname ||
        document.location.pathname == "/project/premid") {
        translatePageTitle = document.querySelector("#wrap > div.section > div > h1");
        presenceData.details = "Home";
        presenceData.state = translatePageTitle.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/project/")) {
        translatePageTitle = document.querySelector("#wrap > div.section > div > h1");
        if (document.location.pathname.includes("activity_stream")) {
            presenceData.details = "Viewing activity";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("reports")) {
            presenceData.details = "Viewing reports";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("discussions")) {
            presenceData.details = "Viewing discussions";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("tasks")) {
            presenceData.details = "Viewing tasks";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (document.location.pathname.includes("translators")) {
            presenceData.details = "Viewing translators";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Home";
            presenceData.state = translatePageTitle.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/translate")) {
        translatingFile = document.querySelector("#file-menu-item > div > span.file-name");
        translatingLanguage = document.querySelector("#file-language-info > a.btn.mdc-button.open-language-menu > span");
        translateProject = document.querySelector("#project-menu-content > ul > li:nth-child(1) > h3");
        presenceData.details = "Translating " + translatingFile.innerHTML;
        presenceData.state =
            translateProject.innerText + " (" + translatingLanguage.innerHTML + ")";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/profile")) {
        profileName = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > h3");
        profileNickname = document.querySelector("#profile-page > div > div > div.profile-left-pane > div > div.profile-page-user.clearfix > div > div > span");
        if (document.location.pathname.includes("activity")) {
            presenceData.details = "Viewing activity";
            presenceData.state =
                profileName.innerText + " - " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.details = "Viewing a profile";
            presenceData.state =
                profileName.innerText + " - " + profileNickname.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/projects")) {
        projectsTab = document.querySelector("#search_form > div > div > ul > li.active > a");
        presenceData.details = "Exploring projects";
        presenceData.state = projectsTab.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    presence.setActivity(presenceData);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxrQkFBdUIsQ0FBQztBQUU1QixJQUFJLGVBQW9CLEVBQUUsZ0JBQXFCLEVBQUUsbUJBQXdCLENBQUM7QUFFMUUsSUFBSSxXQUFnQixFQUFFLGVBQW9CLENBQUM7QUFFM0MsSUFBSSxXQUFnQixDQUFDO0FBRXJCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksWUFBWSxHQUFpQjtRQUMvQixPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsSUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ2pDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUMvQztRQUNBLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3pDLGdDQUFnQyxDQUNqQyxDQUFDO1FBRUYsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUIsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7UUFDbEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENB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