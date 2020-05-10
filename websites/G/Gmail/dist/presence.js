const presence = new Presence({
    clientId: "620072679139180575"
});
const elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "gmail-logo"
    };
    const path = window.location.href;
    const emailCheck = window.location.href.split("/").length == 7 ? false : true;
    if (emailCheck) {
        if (path.endsWith("#category/social")) {
            presenceData.details = "Viewing Social Mails";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("#category/updates")) {
            presenceData.details = "Viewing Updates Mails";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("#category/forums")) {
            presenceData.details = "Viewing Forums Mails";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("#category/promotions")) {
            presenceData.details = "Viewing Promotions Mails";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.match("/#label/")) {
            var labelname = document.querySelector("head > title").textContent;
            presenceData.details = "In the Label: ";
            presenceData.state = labelname.replace('"', "").split('" - ')[0];
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/general")) {
            presenceData.details = "In the General settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/labels")) {
            presenceData.details = "In the Labels settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/inbox")) {
            presenceData.details = "In the settings of the";
            presenceData.state = "Inbox Mails";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/accounts")) {
            presenceData.details = "In the Account settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/filters")) {
            presenceData.details = "In the Filter settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/fwdandpop")) {
            presenceData.details = "In the settings:";
            presenceData.state = "POP and IMAP";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/addons")) {
            presenceData.details = "In the Addons settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/chat")) {
            presenceData.details = "In the Chat settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/labs")) {
            presenceData.details = "In the Advanced settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/offline")) {
            presenceData.details = "In the Offline settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.endsWith("/#settings/oldthemes")) {
            presenceData.details = "In the Themes settings";
            presenceData.startTimestamp = elapsed;
        }
        else if (path.match("/#search/")) {
            presenceData.details = "Looking for a mail";
            presenceData.startTimestamp = elapsed;
        }
        else {
            presenceData.details = "Viewing an Email";
            presenceData.startTimestamp = elapsed;
        }
    }
    else if (path.endsWith("inbox")) {
        presenceData.details = "Viewing Inbox";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("compose=new")) {
        presenceData.details = "Composing a New Email";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("starred")) {
        presenceData.details = "Viewing Starred";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("snoozed")) {
        presenceData.details = "Viewing Snoozed";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("sent")) {
        presenceData.details = "Viewing Sent";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("drafts")) {
        presenceData.details = "Viewing Drafts";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("imp")) {
        presenceData.details = "Viewing Important";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("chats")) {
        presenceData.details = "Viewing Chats";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("scheduled")) {
        presenceData.details = "Viewing Scheduled";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("all")) {
        presenceData.details = "Viewing All Mail";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("spam")) {
        presenceData.details = "Viewing Spam";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("trash")) {
        presenceData.details = "Viewing Trash";
        presenceData.startTimestamp = elapsed;
    }
    else if (path.endsWith("#category/social")) {
        presenceData.details = "Viewing Social Mails";
        presenceData.startTimestamp = elapsed;
    }
    else {
        presenceData.details = "Viewing Mail";
        presenceData.startTimestamp = elapsed;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTlDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFlBQVk7S0FDNUIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ2xDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUU5RSxJQUFJLFVBQVUsRUFBRTtRQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3JDLFlBQVksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDOUMsWUFBWSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7U0FDdkM7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUM3QyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1lBQy9DLFlBQVksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FB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