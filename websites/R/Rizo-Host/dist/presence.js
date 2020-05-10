const presence = new Presence({
    clientId: "690593200473243759"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: browsingStamp
    };
    if (document.location.hostname === "rizo-host.com") {
        if (document.location.pathname.endsWith("/web")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Web Hosting";
        }
        else if (document.location.pathname.endsWith("/reseller")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Reseller Hosting";
        }
        else if (document.location.pathname.endsWith("/billing/")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Billing";
        }
        else if (document.location.pathname.endsWith("/discord/")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Discord Bot Hosting";
        }
        else if (document.location.href.includes("?action=")) {
            switch (document.location.href.split("?action=")[1]) {
                case "details":
                    presenceData.details = "Updating profile";
                    break;
                case "addcontact":
                    presenceData.details = "Managing the contacts";
                    break;
                case "changepw":
                    presenceData.details = "Changing the password";
                    break;
                case "security":
                    presenceData.details = "Managing the settings for:";
                    presenceData.state = "Security";
                    break;
                case "emails":
                    presenceData.details = "Viewing an email history";
                    break;
                case "domains":
                    presenceData.details = "Viewing the domains";
                    break;
                case "services":
                    presenceData.details = "Viewing a page:";
                    presenceData.state = "My Products & Services";
                    break;
                case "invoices":
                    presenceData.details = "Viewing the invoices";
                    break;
                case "quotes":
                    presenceData.details = "Viewing the quotes";
                    break;
            }
        }
        else if (document.location.href.includes("?a=")) {
            switch (document.location.href.split("?a=")[1]) {
                case "add&domain=register":
                    presenceData.details = "Registering a new domain";
                    break;
                case "add&domain=transfer":
                    presenceData.details = "Transferring a domain";
                    break;
                case "view":
                    presenceData.details = "Viewing a page:";
                    presenceData.state = "Cart review & checkout";
                    break;
            }
        }
        else if (document.location.pathname.endsWith("supporttickets.php")) {
            presenceData.details = "Viewing the tickets";
        }
        else if (document.location.pathname.endsWith("/announcements")) {
            presenceData.details = "Viewing the announcements";
        }
        else if (document.location.pathname.endsWith("/knowledgebase")) {
            presenceData.details = "Viewing the knowledgebase";
        }
        else if (document.location.pathname.endsWith("/download")) {
            presenceData.details = "Viewing the downloads";
        }
        else if (document.location.pathname.endsWith("/serverstatus.php")) {
            presenceData.details = "Viewing the server status";
        }
        else if (document.location.pathname.endsWith("/submitticket.php")) {
            presenceData.details = "Opening a new ticket";
        }
        else if (document.location.pathname.endsWith("/clientarea.php")) {
            presenceData.details = "Viewing a page:";
            presenceData.state = "Client Area";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07UUFDckIsY0FBYyxFQUFFLGFBQWE7S0FDOUIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssZUFBZSxFQUFFO1FBQ2xELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9DLFlBQVksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFDekMsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDcEM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7U0FDekM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1lBQ3pDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEs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