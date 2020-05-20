const presence = new Presence({
    clientId: "712294190339588209"
});

let path;
let strings;
let clipTitle;
let clipAuthor;
const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    strings = await presence.getStrings({
        live: "presence.activity.live",
        play: "presence.playback.playing",
        pause:  "presence.playback.paused"
    });
    const presenceData: presenceData = {
        largeImageKey: "peloton"
    };

    if(window.location.hostname.includes("www.onepeloton")){
        switch(window.location.pathname){
            case "/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the Home Page";
                break;
            case "/bike":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the bikes";
                break;
            case "/app":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the app";
                break;
            case "/membership":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing memberships";
                break;
            case "/terms":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the terms of service";
                break;
            case "/company":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing Peloton's Mission";
                break;
            case "/showrooms":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the showrooms";
                break;
            case "/membership-terms":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the membership terms";
                break;
        }
    }

    else if(window.location.hostname.includes("support.onepeloton")){
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Browsing the support pages";
    }

    else if(window.location.hostname.includes("blog.onepeloton")){
        switch(window.location.pathname){
            case "/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the blogs";
                break;
            case "/category/community/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the community blogs";
                break;
            case "/category/lifestyle/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the lifestyle blogs";
                break;
            case "/category/news/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the news blogs";
                break;
            case "/category/tech/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the tech blogs";
                break;
            case "/category/wellness/":
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing the wellness blogs";
                break;
        }
    }

    else if(window.location.hostname.includes("members.onepeloton")){
        //Class categories
        if(window.location.pathname == "/classes"){
            presenceData.startTimestamp = browsingStamp;
            return presenceData.details = "Browsing classes";;
        }

        //Class category
        if(window.location.pathname.includes("/classes/")){
            path = window.location.pathname.replace("/classes/", "");
            switch(path){
                case "strength":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing strength classes";
                    break;
                case "yoga":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing yoga classes";
                    break;
                case "meditation":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing meditation classes";
                    break;
                case "cardio":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing cardio classes";
                    break;
                case "stretching":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing stretching classes";
                    break;
                case "cycling":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing cycling classes";
                    break;
                case "outdoor":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing outdoor classes";
                    break;
                case "running":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing running classes";
                    break;
                case "walking":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing walking classes";;
                    break;
                case "bootcamp":
                    presenceData.startTimestamp = browsingStamp;
                    presenceData.details = "Browsing bootcamp classes";;
                    break;
            }

            //Video
            if(path.includes("player/")){
                var video: HTMLVideoElement = document.querySelector(".jw-video");
                clipTitle = document.querySelector(".jw-controlbar > div:nth-child(3) > div > div > div > h1").textContent.replace("&amp;", "&");
                clipAuthor = document.querySelector(".jw-controlbar > div:nth-child(3) > div > div > div > p").textContent.split("<");
                
                switch(!video.paused){
                    case true:
                        presenceData.smallImageKey = 'play';
                        presenceData.smallImageText = strings.play;
                        presenceData.endTimestamp = new Date(Date.now() + (video.duration - video.currentTime) * 1000).getTime();
                        break;
                    case false:
                        presenceData.smallImageKey = 'pause';
                        presenceData.smallImageText = strings.pause;
                        presenceData.endTimestamp = null;
                        break;
                }
                presenceData.details = clipTitle;
                presenceData.state = clipAuthor[0];
            }
        }

        //Live
        if(window.location.pathname.includes("/player/live")){
            var video: HTMLVideoElement = document.querySelector(".jw-video");
            if(clipTitle = document.querySelector(".jw-controlbar > div:nth-child(3) > div > div > div > h1")){}
            else{clipTitle = null;}
            if(clipAuthor = document.querySelector(".jw-controlbar > div:nth-child(3) > div > div > div > p").textContent.split("<")){}
            else{clipAuthor = null;}
            
            switch(!video.paused){
                case true:
                    presenceData.smallImageKey = 'live';
                    presenceData.smallImageText = strings.live;                   
                    break;
                case false:
                    presenceData.smallImageKey = 'live';
                    presenceData.smallImageText = strings.live;
                    break;
            }
            presenceData.details = clipTitle.textContent.replace("&amp;", "&");
            presenceData.state = clipAuthor[0];
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
        presenceData.details = "Browsing Peloton";
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});