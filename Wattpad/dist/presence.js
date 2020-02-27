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
    clientId: "619740858257899520",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "wattpad-logo"
    };
    var path = document.location.pathname;
    var storyCheck = document.location.pathname.split("/")[1].match(/^\d/) ? true : false;
    if (path == ("/home")) {
        data.details = "Viewing Homepage",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/stories") || path.includes("/featured")) {
        data.details = "Browsing Stories",
            data.startTimestamp = browsingStamp;
    }
    else if (path.startsWith("/user")) {
        var user = document.querySelector("#alias").textContent;
        data.details = "Viewing User Profile",
            data.state = user;
        data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/myworks")) {
        if (path.endsWith("/myworks")) {
            data.details = "Viewing their Stories",
                data.startTimestamp = browsingStamp;
        }
        else if (path.includes("/write")) {
            var story = document.querySelector("p.group-title").textContent;
            data.details = "Writing a Story",
                data.state = story;
            data.startTimestamp = browsingStamp;
        }
        else if (path.includes("/analytics")) {
            var story = document.querySelector(".text-left h2").textContent;
            data.details = "Viewing Analytics",
                data.state = story;
            data.startTimestamp = browsingStamp;
        }
        else if (path.includes("/new")) {
            data.details = "Setting-up a new Story",
                data.startTimestamp = browsingStamp;
        }
        else {
            var story = document.querySelector("div.works-item-metadata span.h4").textContent;
            data.details = "Viewing their Story",
                data.state = story;
            data.startTimestamp = browsingStamp;
        }
    }
    else if (path.includes("/story")) {
        if (path.endsWith("/rankings")) {
            var story = document.querySelector("#story-ranking h2").textContent;
            data.details = "Viewing Rankings",
                data.state = story;
            data.startTimestamp = browsingStamp;
        }
        else {
            var story = document.querySelector("#story-landing h1").textContent;
            data.details = "Viewing a Story",
                data.state = story;
            data.startTimestamp = browsingStamp;
        }
    }
    else if (storyCheck) {
        var story = document.querySelector("span.info h1.title").textContent;
        var chapter = document.querySelector(".panel-reading h2").textContent;
        data.details = "Reading " + story,
            data.state = chapter;
        data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/settings")) {
        data.details = "Viewing Settings",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/inbox")) {
        data.details = "Viewing Inbox",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/notifications")) {
        data.details = "Viewing Notifications",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/newsfeed")) {
        data.details = "Viewing Newsfeed",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/library")) {
        data.details = "Viewing Library",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/archive")) {
        data.details = "Viewing Archive",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/list")) {
        data.details = "Viewing Reading Lists",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/invite-friends")) {
        data.details = "Inviting Friends",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/writers")) {
        data.details = "Viewing Writers Resources",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("contests")) {
        data.details = "Viewing Writing Contests",
            data.startTimestamp = browsingStamp;
    }
    else if (path.includes("premium")) {
        data.details = "Viewing Premium",
            data.startTimestamp = browsingStamp;
    }
    else {
        data.details = "Somewhere on the site",
            data.startTimestamp = browsingStamp;
    }
    presence.setActivity(data);
}));
