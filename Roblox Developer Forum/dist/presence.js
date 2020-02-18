var presence = new Presence({
    clientId: "678654521454493745", 
    mediaKeys: false 
}),

    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused"
    });



function myOutsideHeavyLiftingFunction() {

}

setInterval(10000, myOutsideHeavyLiftingFunction);

var presenceData = {
    largeImageKey: "rbx_icon", 
    smallImageKey: "browsing_icon", 
    smallImageText: "Browsing...", 
    details: "Browsing", 
    state: "Home", 
    startTimestamp: Math.round((new Date()).getTime() / 1000) 
    //endTimestamp: 
}; 



presence.on("UpdateData", () => {

     if (window.location.pathname.substring(1, 3) == "t/") {
        var Title = document.getElementsByClassName('fancy-title')[0].innerHTML;
        var Username = document.querySelectorAll("a[data-user-card]")[1].innerHTML;

        //Reading post
        if (Title != undefined && Username != undefined) {
            presenceData.details = "Read a post of " + Username
            presenceData.state = Title
            presence.setActivity(presenceData)
        }//Browsing
    } else if (document.location.pathname == "/") {
        presenceData.details = "Browsing"
        presenceData.state = "Home"
        presence.smallImageText = "Browsing..."
        presence.smallImageKey = "browsing_icon"
        presence.setActivity(presenceData)
    } else if (document.location.pathname.substring(1, 3) == "c/" ) {
        presenceData.details = "Browsing Category"
        presenceData.state = document.getElementsByClassName('category-name')[0].innerHTML;
        presence.setActivity(presenceData)
    }else if (document.location.pathname.substring(1, 2) == "u" && document.location.pathname.substring(document.location.pathname.length - 7, document.location.pathname.length) == "summary") {
        presenceData.details = "View Profile"
        presenceData.state = document.location.pathname.substring(3, document.location.pathname.length - 8)
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/u")  {
        presenceData.details = "Browsing"
        presenceData.state = "User page"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/latest")  {
        presenceData.details = "Browsing"
        presenceData.state = "Recents"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/unread")  {
        presenceData.details = "Browsing"
        presenceData.state = "Unread"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/badges")  {
        presenceData.details = "Browsing"
        presenceData.state = "Badges"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/g")  {
        presenceData.details = "Browsing"
        presenceData.state = "Groups"
        presence.setActivity(presenceData)
    }else if (document.location.pathname.substring(1,8) == "cakeday")  {
        presenceData.details = "Browsing"
        presenceData.state = "Anniversary"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/new")  {
        presenceData.details = "Browsing"
        presenceData.state = "New"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/top")  {
        presenceData.details = "Browsing"
        presenceData.state = "Top"
        presence.setActivity(presenceData)
    }else if (document.location.pathname == "/tags")  {
        presenceData.details = "Browsing"
        presenceData.state = "Tags"
        presence.setActivity(presenceData)
    }else if (document.location.pathname.substring(1, 3) == "u/" && document.location.pathname.substring(document.location.pathname.length - 8, document.location.pathname.length) == "activity") {
        presenceData.details = "View Activity profile"
        presenceData.state = "Activity of " + document.location.pathname.substring(3, document.location.pathname.length - 9)
        presence.setActivity(presenceData)
    }else if (document.location.pathname.substring(1, 3) == "u/" && document.location.pathname.substring(document.location.pathname.length - 8, document.location.pathname.length) == "messages") {
        presenceData.details = "Browsing"
        presenceData.state = "Look his DMs" 
        presence.setActivity(presenceData)
    }else if (document.location.pathname.substring(1, 3) == "u/" && document.location.pathname.substring(document.location.pathname.length - 19, document.location.pathname.length - 8) == "preferences") {
        presenceData.details = "Account"
        presenceData.state = "Configure his account" 
        presence.setActivity(presenceData)
    }
    

    if (presenceData.details == null) {
       
        presence.setTrayTitle(); 
        presence.setActivity(); 
    } else {
        //This will fire if you set presence details
        presence.setActivity(presenceData);
    }
});