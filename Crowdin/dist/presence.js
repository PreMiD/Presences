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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxrQkFBdUIsQ0FBQztBQUU1QixJQUFJLGVBQW9CLEVBQUUsZ0JBQXFCLEVBQUUsbUJBQXdCLENBQUM7QUFFMUUsSUFBSSxXQUFnQixFQUFFLGVBQW9CLENBQUM7QUFFM0MsSUFBSSxXQUFnQixDQUFDO0FBRXJCLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxPQUFPLEVBQUUsY0FBYztRQUN2QixhQUFhLEVBQUUsSUFBSTtLQUNuQixDQUFDO0lBRUYsSUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHO1FBQ2pDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1FBQzNCLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUM5QztRQUNELGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzFDLGdDQUFnQyxDQUNoQyxDQUFDO1FBRUYsWUFBWSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUIsWUFBWSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7UUFDbEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENB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