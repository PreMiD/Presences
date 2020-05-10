const presence = new Presence({
    clientId: "650103083438702613"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/gui/home") {
        presenceData.state = "Browsing on mainpage...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/gui/home/upload") {
        presenceData.details = "Uploading an file...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/gui/home/url") {
        presenceData.details = "Search an URL...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/gui/home/search") {
        presenceData.details = "Search an anything...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/gui/sign-in") {
        presenceData.details = "Sign In to VirusTotal";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/gui/join-us") {
        presenceData.details = "Sign Up to VirusTotal";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname == "/gui/settings") {
        const nickname = document
            .querySelector("body > vt-virustotal-app")
            .shadowRoot.querySelector("#toolbar")
            .shadowRoot.querySelector("#omnibarWrapper > vt-ui-account-widget")
            .shadowRoot.querySelector("#userDropdown > div.avatar-section > span")
            .textContent;
        presenceData.details = "Update their profile...";
        presenceData.state = nickname;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/gui/user/")) {
        const profilex = document
            .querySelector("body > vt-virustotal-app")
            .shadowRoot.querySelector("#authChecker > user-view")
            .shadowRoot.querySelector("#pageWrapper > div.wrapper > vt-ui-generic-card > div:nth-child(2) > div.avatar-name > div > h3").textContent;
        presenceData.details = "Reading profile of...";
        presenceData.state = profilex;
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/gui/top-users")) {
        presenceData.details = "Looking for top users...";
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/gui/domain/")) {
        if (document.location.pathname.endsWith("detection")) {
            const detectionURL = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span");
            presenceData.details = "Reading detections of...";
            presenceData.state = detectionURL.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("details")) {
            const detectionURL = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span");
            presenceData.details = "Reading details of...";
            presenceData.state = detectionURL.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("relations")) {
            const detectionURL = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span");
            presenceData.details = "Reading relations of...";
            presenceData.state = detectionURL.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("community")) {
            const detectionURL = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span");
            presenceData.details = "Reading comments of...";
            presenceData.state = detectionURL.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("summary")) {
            const detectionURL = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.domain-id > span");
            presenceData.details = "Reading summary of...";
            presenceData.state = detectionURL.textContent;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/gui/file/")) {
        if (document.location.pathname.endsWith("detection")) {
            const detectionFILE = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#authChecker > file-view")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-file-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a");
            presenceData.details = "Reading detections of...";
            presenceData.state = detectionFILE.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("details")) {
            const detectionFILE = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#authChecker > file-view")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-file-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a");
            presenceData.details = "Reading details of...";
            presenceData.state = detectionFILE.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("community")) {
            const detectionFILE = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#authChecker > file-view")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-file-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a");
            presenceData.details = "Reading comments of...";
            presenceData.state = detectionFILE.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("summary")) {
            const detectionFILE = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#authChecker > file-view")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-file-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a");
            presenceData.details = "Reading summary of...";
            presenceData.state = detectionFILE.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("behavior")) {
            const detectionFILE = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#authChecker > file-view")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-file-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.file-name > a");
            presenceData.details = "Reading behavior of...";
            presenceData.state = detectionFILE.textContent;
            presence.setActivity(presenceData);
        }
    }
    else if (document.location.pathname.includes("/gui/url/")) {
        if (document.location.pathname.endsWith("detection")) {
            const detectionURL2 = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a");
            presenceData.details = "Reading detections of ...";
            presenceData.state = detectionURL2.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("details")) {
            const detectionURL2 = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a");
            presenceData.details = "Reading details of...";
            presenceData.state = detectionURL2.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("community")) {
            const detectionURL2 = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a");
            presenceData.details = "Reading comments of...";
            presenceData.state = detectionURL2.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.endsWith("summary")) {
            const detectionURL2 = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a");
            presenceData.details = "Reading summary of...";
            presenceData.state = detectionURL2.textContent;
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname.includes("behavior")) {
            const detectionURL2 = document
                .querySelector("body > vt-virustotal-app")
                .shadowRoot.querySelector("#domainView")
                .shadowRoot.querySelector("#report")
                .shadowRoot.querySelector("div > header > vt-ui-domain-card")
                .shadowRoot.querySelector("vt-ui-generic-card > div:nth-child(2) > div:nth-child(1) > div.object-id > div.parent-domain > a");
            presenceData.details = "Reading behavior of...";
            presenceData.state = detectionURL2.textContent;
            presence.setActivity(presenceData);
        }
        else {
            presence.setActivity();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1FBRTdDLFlBQVksQ0FBQyxLQUFLLEdBQUcseUJBQXlCLENBQUM7UUFDL0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksa0JBQWtCLEVBQUU7UUFFM0QsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFlLEVBQUU7UUFFeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtRQUUzRCxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQy9DLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGNBQWMsRUFBRTtRQUV2RCxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1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