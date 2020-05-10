const presence = new Presence({
    clientId: "665519810054062100"
}), strings = presence.getStrings({
    search: "presence.activity.searching",
    browsing: "presence.activity.browsing",
    reading: "presence.activity.reading"
});
presence.on("UpdateData", async () => {
    const host = window.location.hostname.replace("www.", "");
    const path = window.location.pathname.split("/").slice(1);
    const presenceData = {
        details: "IFTTT",
        largeImageKey: "logo_big"
    };
    switch (host) {
        case "ift.tt":
            presence.setTrayTitle();
            presence.setActivity();
            return;
        case "platform.ifttt.com":
            presenceData.details = "for Business";
            if (path.length > 0) {
                switch (path[0]) {
                    case "plans":
                        presenceData.state = "Plans";
                        break;
                    case "docs":
                        presenceData.state = "Documentation";
                        if (document.querySelector("h1")) {
                            presenceData.smallImageKey = "reading";
                            presenceData.smallImageText = (await strings).reading;
                            presenceData.details = "Documentation";
                            presenceData.state = document.querySelector("h1").innerText;
                        }
                        else {
                            presenceData.smallImageKey = "reading";
                            presenceData.smallImageText = (await strings).browsing;
                        }
                        break;
                    case "blog":
                        presenceData.state = "Library";
                        if (document.getElementsByClassName("story-title").length > 0) {
                            presenceData.smallImageKey = "reading";
                            presenceData.smallImageText = (await strings).reading;
                            presenceData.details = "Library";
                            presenceData.state = document.getElementsByClassName("story-title")[0].textContent;
                        }
                        break;
                    case "case_studies":
                        presenceData.state = "Case studies";
                        if (document.getElementsByClassName("story-title").length > 0) {
                            presenceData.smallImageKey = "reading";
                            presenceData.smallImageText = (await strings).reading;
                            presenceData.details = "Case studies";
                            presenceData.state = document.getElementsByClassName("story-title")[0].textContent;
                        }
                        break;
                    case "testimonials":
                        presenceData.state = "Testimonials";
                        break;
                    case "contact_sales":
                        presenceData.state = "Contact";
                        break;
                    case "terms":
                        presenceData.state = "Terms of Use";
                        break;
                }
            }
            break;
        case "help.ifttt.com":
            presenceData.details = "Help Center";
            if (path.length > 2) {
                switch (path[2]) {
                    case "articles":
                        presenceData.smallImageKey = "reading";
                        presenceData.smallImageText = (await strings).reading;
                        presenceData.state = document.querySelector("h1").innerText;
                        break;
                    case "categories":
                    case "sections":
                        presenceData.smallImageKey = "reading";
                        presenceData.smallImageText = (await strings).browsing;
                        presenceData.state = document.querySelector("h1").innerText;
                        break;
                    case "search":
                        presenceData.smallImageKey = "search";
                        presenceData.smallImageText = (await strings).search;
                        presenceData.state = `Searching for "${new URLSearchParams(window.location.search).get("query")}"`;
                        break;
                }
            }
            break;
        default:
        case "ifttt.com":
            switch (path[0]) {
                case "applets":
                case "connections":
                    presenceData.smallImageKey = "reading";
                    presenceData.smallImageText = (await strings).browsing;
                    presenceData.details = document.getElementsByClassName("connection-title")[0].textContent;
                    presenceData.state = document
                        .getElementsByClassName("owner by-and-author-link")[0]
                        .textContent.replace("\n", " ");
                    break;
                case "join":
                    presenceData.smallImageKey = "writing";
                    presenceData.details = "Sign up";
                    break;
                case "login":
                    presenceData.smallImageKey = "writing";
                    presenceData.details = "Sign in";
                    break;
                case "session":
                    if (path.length > 1) {
                        switch (path[1]) {
                            case "logout":
                                presenceData.smallImageKey = "writing";
                                presenceData.details = "Sign out";
                                break;
                        }
                    }
                    else {
                        presence.setTrayTitle();
                        presence.setActivity();
                        return;
                    }
                    break;
                case "settings":
                case "profile":
                    presenceData.details = "Settings";
                    if (path.length > 1) {
                        switch (path[1]) {
                            case "edit":
                                presenceData.state = "Edit profile";
                                break;
                            case "change_password":
                                presenceData.state = "Change password";
                                break;
                            case "export_my_data":
                                presenceData.state = "Export data";
                                break;
                            case "confirm_deletion":
                                presenceData.state = "Delete account";
                                break;
                        }
                    }
                    break;
                case "my_applets":
                    presenceData.details = "My Applets";
                    break;
                case "create":
                    presenceData.details = "Creating an Applet";
                    if (document.getElementsByClassName("header").length > 0) {
                        presenceData.smallImageKey = "writing";
                        presenceData.smallImageText = document.getElementsByClassName("user-step")[0].textContent;
                        presenceData.state = document.getElementsByClassName("header")[0].textContent;
                    }
                    break;
                case "activity":
                    presenceData.details = "Activity";
                    if (path.length > 1) {
                        switch (path[1]) {
                            case "service":
                                presenceData.state = document.querySelector("h1").innerText;
                                break;
                        }
                    }
                    break;
                case "date_and_time":
                case "email":
                case "email_digest":
                case "ifttt":
                case "feed":
                case "space":
                case "weather":
                case "maker_webhooks":
                    presenceData.details = "My Services";
                    presenceData.state = document.querySelector("h1").innerText;
                    break;
                case "my_services":
                    presenceData.details = "My Services";
                    break;
                case "connect":
                    presenceData.details = "My Services";
                    presenceData.state = `Connect ${document.querySelector("h1").firstElementChild
                        .title} to ${document.querySelector("h1").lastElementChild
                        .title}`;
                    break;
                case "discover":
                    presenceData.details = "Explore";
                    break;
                case "search":
                    presenceData.smallImageKey = "search";
                    presenceData.smallImageText = (await strings).search;
                    presenceData.details = `Searching for "${document.getElementById("search").value}"`;
                    presenceData.state = `Tab: ${document.getElementsByClassName("active")[1].textContent}`;
                    break;
                case "terms":
                    presenceData.details = "Privacy Policy & Terms of Use";
                    break;
                case "careers":
                    presenceData.details = "Careers";
                    break;
                default:
                    if (document.getElementsByClassName("brand-section").length > 0) {
                        presenceData.details = "Services";
                        presenceData.state = document.querySelector("h1").innerText;
                    }
                    else {
                        presence.setTrayTitle();
                        presence.setActivity();
                        return;
                    }
            }
            break;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixNQUFNLEVBQUUsNkJBQTZCO0lBQ3JDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsT0FBTyxFQUFFLDJCQUEyQjtDQUNyQyxDQUFDLENBQUM7QUFFTCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGFBQWEsRUFBRSxVQUFVO0tBQzFCLENBQUM7SUFFRixRQUFRLElBQUksRUFBRTtRQUVaLEtBQUssUUFBUTtZQUNYLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsT0FBTztRQUdULEtBQUssb0JBQW9CO1lBQ3ZCLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQ3RDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25CLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUVmLEtBQUssT0FBTzt3QkFDVixZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQzt3QkFDN0Is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