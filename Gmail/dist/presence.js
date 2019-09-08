var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "620072679139180575",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "gmail-logo"
    };
    var path = window.location.href;
    var emailCheck = window.location.href.split("/").length == 7 ? false : true;
    console.log(emailCheck);
    if (emailCheck) {
        data.details = "Viewing an Email";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("compose=new")) {
        data.details = "Composing a New Email";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("inbox")) {
        data.details = "Viewing Inbox";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("starred")) {
        data.details = "Viewing Starred";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("snoozed")) {
        data.details = "Viewing Snoozed";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("sent")) {
        data.details = "Viewing Sent";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("drafts")) {
        data.details = "Viewing Drafts";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("imp")) {
        data.details = "Viewing Important";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("chats")) {
        data.details = "Viewing Chats";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("scheduled")) {
        data.details = "Viewing Scheduled";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("all")) {
        data.details = "Viewing All Mail";
        data.startTimestamp = elapsed;
    }
    else if (path.endsWith("spam")) {
        data.details = "Viewing Spam";
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Viewing Mail";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
}));
