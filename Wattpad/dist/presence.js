var presence = new Presence({
    clientId: "619740858257899520"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "wattpad-logo"
    };
    var path = document.location.pathname;
    var storyCheck = document.location.pathname.split("/")[1].match(/^\d/)
        ? true
        : false;
    if (path == "/home") {
        (data.details = "Viewing Homepage"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/stories") || path.includes("/featured")) {
        (data.details = "Browsing Stories"), (data.startTimestamp = browsingStamp);
    }
    else if (path.startsWith("/user")) {
        var user = document.querySelector("#alias").textContent;
        (data.details = "Viewing User Profile"), (data.state = user);
        data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/myworks")) {
        if (path.endsWith("/myworks")) {
            (data.details = "Viewing their Stories"),
                (data.startTimestamp = browsingStamp);
        }
        else if (path.includes("/write")) {
            var story = document.querySelector("p.group-title").textContent;
            (data.details = "Writing a Story"), (data.state = story);
            data.startTimestamp = browsingStamp;
        }
        else if (path.includes("/analytics")) {
            var story = document.querySelector(".text-left h2").textContent;
            (data.details = "Viewing Analytics"), (data.state = story);
            data.startTimestamp = browsingStamp;
        }
        else if (path.includes("/new")) {
            (data.details = "Setting-up a new Story"),
                (data.startTimestamp = browsingStamp);
        }
        else {
            var story = document.querySelector("div.works-item-metadata span.h4")
                .textContent;
            (data.details = "Viewing their Story"), (data.state = story);
            data.startTimestamp = browsingStamp;
        }
    }
    else if (path.includes("/story")) {
        if (path.endsWith("/rankings")) {
            var story = document.querySelector("#story-ranking h2").textContent;
            (data.details = "Viewing Rankings"), (data.state = story);
            data.startTimestamp = browsingStamp;
        }
        else {
            var story = document.querySelector("#story-landing h1").textContent;
            (data.details = "Viewing a Story"), (data.state = story);
            data.startTimestamp = browsingStamp;
        }
    }
    else if (storyCheck) {
        var story = document.querySelector("span.info h1.title").textContent;
        var chapter = document.querySelector(".panel-reading h2").textContent;
        (data.details = "Reading " + story), (data.state = chapter);
        data.startTimestamp = browsingStamp;
    }
    else if (path.includes("/settings")) {
        (data.details = "Viewing Settings"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/inbox")) {
        (data.details = "Viewing Inbox"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/notifications")) {
        (data.details = "Viewing Notifications"),
            (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/newsfeed")) {
        (data.details = "Viewing Newsfeed"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/library")) {
        (data.details = "Viewing Library"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/archive")) {
        (data.details = "Viewing Archive"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/list")) {
        (data.details = "Viewing Reading Lists"),
            (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/invite-friends")) {
        (data.details = "Inviting Friends"), (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("/writers")) {
        (data.details = "Viewing Writers Resources"),
            (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("contests")) {
        (data.details = "Viewing Writing Contests"),
            (data.startTimestamp = browsingStamp);
    }
    else if (path.includes("premium")) {
        (data.details = "Viewing Premium"), (data.startTimestamp = browsingStamp);
    }
    else {
        (data.details = "Somewhere on the site"),
            (data.startTimestamp = browsingStamp);
    }
    presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksSUFBSSxHQUFpQjtRQUN4QixhQUFhLEVBQUUsY0FBYztLQUM3QixDQUFDO0lBRUYsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDckUsQ0FBQyxDQUFDLElBQUk7UUFDTixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ1QsSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1FBQ3BCLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsQ0FBQztLQUMzRTtTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ25FLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUMsQ0FBQztLQUMzRTtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFP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