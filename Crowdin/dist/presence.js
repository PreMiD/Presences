var presence = new Presence({
    clientId: "614200757989670934"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var translatePageTitle;
var translatingFile, translateProject, translatingLanguage;
var profileName, profileNickname;
var projectsTab;
presence.on("UpdateData", async () => {
    const presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELElBQUksa0JBQXVCLENBQUM7QUFFNUIsSUFBSSxlQUFvQixFQUFFLGdCQUFxQixFQUFFLG1CQUF3QixDQUFDO0FBRTFFLElBQUksV0FBZ0IsRUFBRSxlQUFvQixDQUFDO0FBRTNDLElBQUksV0FBZ0IsQ0FBQztBQUVyQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsT0FBTyxFQUFFLGNBQWM7UUFDdkIsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUVGLElBQ0UsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRztRQUNqQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUTtRQUMzQixRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFDL0M7UUFDQSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6QyxnQ0FBZ0MsQ0FDakMsQ0FBQztRQUVGLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzlCLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDM0Qsa0JBQWtCLEdBQUcs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