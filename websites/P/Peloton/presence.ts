const presence = new Presence({
    clientId: "712294190339588209"
});

let path;
const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: presenceData = {
        largeImageKey: "peloton"
    };

    if(window.location.hostname.includes("www.onepeloton")){
        switch(window.location.pathname){
            case "/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Veiwing the Home Page"
                break;
            case "/bike":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the bikes"
                break;
            case "/app":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing the app"
                break;
            case "/membership":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing memberships"
                break;
            case "/terms":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing the terms of service"
                break;
        }
    }

    if(window.location.hostname.includes("members.onepeloton")){
        //Class categories
        if(window.location.pathname == "/classes"){
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing classes";
        }

        //Class category
        if(window.location.pathname.includes("/classes/")){
            path = window.location.pathname.replace("/classes/", "");
            switch(path){
                case "strength":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing strength classes"
                    break;
                case "yoga":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing yoga classes"
                    break;
                case "meditation":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing meditation classes"
                    break;
                case "cardio":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing cardio classes"
                    break;
                case "stretching":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing stretching classes"
                    break;
                case "cycling":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing cycling classes"
                    break;
                case "outdoor":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing outdoor classes"
                    break;
                case "running":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing running classes"
                    break;
                case "walking":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing walking classes";
                    break;
                case "bootcamp":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing bootcamp classes";
                    break;
            }

            //Video
            if(path.includes("player/")){
                console.log("Here1");
                var video: HTMLVideoElement = document.querySelector(".jw-media jw-reset > video");
                presenceData.endTimestamp = new Date(Date.now() + (video.duration - video.currentTime) * 1000).getTime();
                presenceData.details = "Browsing classes";
            }
        }

        //schedule
        if(window.location.pathname.includes("/schedule/")){
            path = window.location.pathname.replace("/schedule/", "")
            switch(path){
                case "strength":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing strength schedule";
                    break;
                case "yoga":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing yoga schedule";
                    break;
                case "meditation":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing meditation schedule";
                    break;
                case "cardio":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing cardio schedule";
                    break;
                case "stretching":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing stretching schedule";
                    break;
                case "cycling":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing cycling schedule";
                    break;
                case "running":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing running schedule";
                    break;
                case "walking":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing walking schedule";
                    break;
                case "bootcamp":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing bootcamp schedule";
                    break;
                default:
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing schedule";
                    break;
            }
        }

        //Challenges
        if(window.location.pathname.includes("/challenges/")){
            path = window.location.pathname.replace("/challenges/", "");
            switch(path){
                case "active":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing active challenges";
                    break;
                case "upcoming":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing upcoming challenges";
                    break;
                case "completed":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing completed challenges";
                    break;
                default:
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing challenges";
                    break;
            }
        }

        //Profile
        if(window.location.pathname.includes("/profile/")){
            path = window.location.pathname.replace("/profile/", "");
            switch(path){
                case "overview":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing their profile";
                    break;
                case "workouts":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing their workouts";
                    break;
                case "completed":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing their achievements";
                    break;
                default:
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing their profile";
                    break;
            }
        }

        //Profile
        if(window.location.pathname.includes("/preferences/")){
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing their profile";
        }
        
    } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing Peloton";
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
    console.log(window.location);
});