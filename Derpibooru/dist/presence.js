var presence = new Presence({
    clientId: "611544256758153225"
}), presenceData = {
    largeImageKey: "logo"
};
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        presenceData.details = "Viewing the homepage";
    }
    else if (document.location.pathname.startsWith("/users/sign_in")) {
        presenceData.details = "Logging in";
    }
    else if (document.location.pathname.startsWith("/users/sign_up")) {
        presenceData.details = "Registering";
    }
    else if (document.location.pathname.startsWith("/store")) {
        presenceData.details = "Browsing through the store";
    }
    else if (document.location.pathname.startsWith("/rankings")) {
        presenceData.details = "Browsing through the rankings";
    }
    else if (document.location.pathname.startsWith("/settings")) {
        presenceData.details = "Editing settings";
    }
    else if (document.location.pathname.startsWith("/galleries")) {
        presenceData.details = "Browsing through the Gallerie";
    }
    else if (document.location.pathname.startsWith("/commissions")) {
        presenceData.details = "Browsing through commissions";
    }
    else if (document.location.pathname.startsWith("/channels")) {
        presenceData.details = "Browsing through livestreams";
    }
    else if (document.location.pathname.startsWith("/tags/ratings")) {
        presenceData.details = "Browsing through the tag ratings";
    }
    else if (document.location.pathname.startsWith("/pages/tags")) {
        presenceData.details = "Looking at the tag guide";
    }
    else if (document.location.pathname.startsWith("/tags/aliases")) {
        presenceData.details = "Going through the tag aliases";
    }
    else if (document.location.pathname == "/art") {
        presenceData.details = "Browsing through art chats";
    }
    else if (document.location.pathname.startsWith("/art/")) {
        presenceData.details = "Reading the post:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname.startsWith("/writing")) {
        presenceData.details = "Browsing through Fanfictions";
    }
    else if (document.location.pathname == "/dis") {
        presenceData.details = "Browsing through Discussions";
    }
    else if (document.location.pathname.startsWith("/dis/")) {
        presenceData.details = "Reading the general discussion:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/generals") {
        presenceData.details = "Looking at general posts";
    }
    else if (document.location.pathname.startsWith("/generals/")) {
        presenceData.details = "test <work in progress>";
    }
    else if (document.location.pathname == "/pony") {
        presenceData.details = "Browsing through pony discussion";
    }
    else if (document.location.pathname.startsWith("/pony/")) {
        presenceData.details = "Reading the pony discussion:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/rp") {
        presenceData.details = "Browsing through rp's";
    }
    else if (document.location.pathname.startsWith("/rp/")) {
        presenceData.details = "Reading the rp chat:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/meta") {
        presenceData.details = "Browsing through the website policy";
    }
    else if (document.location.pathname.startsWith("/meta/")) {
        presenceData.details = "Reading the information post:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/tagging") {
        presenceData.details = "Browsing through tagging discussions";
    }
    else if (document.location.pathname.startsWith("/tagging/")) {
        presenceData.details = "Reading the tagging discussion:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/uppers") {
        presenceData.details = "Browsing through uploader discussions";
    }
    else if (document.location.pathname.startsWith("/uppers/")) {
        presenceData.details = "Reading the uploader discussion:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/tagging") {
        presenceData.details = "Browsing through tagging discussions";
    }
    else if (document.location.pathname.startsWith("/tagging/")) {
        presenceData.details = "Reading the tagging discussion:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname == "/forums") {
        presenceData.details = "Browsing through the forum";
    }
    else if (document.location.pathname.startsWith("/forums")) {
        presenceData.details = "Reading the forum post:";
        presenceData.state = document.querySelector(".layout--narrow h1").innerText;
    }
    else if (document.location.pathname.startsWith("/activity")) {
        presenceData.details = "Browsing recently uploaded pictures";
    }
    else if (document.location.pathname.startsWith("/lists")) {
        presenceData.details = "Browsing through top scores";
    }
    else if (document.location.pathname.startsWith("/posts")) {
        presenceData.details = "Browsing through global posts";
    }
    else if (document.location.pathname.startsWith("/search")) {
        presenceData.details = "Searching something";
    }
    else if (document.location.pathname.startsWith("/filters")) {
        presenceData.details = "Changing their filter settings";
    }
    else if (document.location.pathname.startsWith("/settings")) {
        presenceData.details = "Changing their settings";
    }
    else if (document.location.pathname.startsWith("/pages/rules")) {
        presenceData.details = "Reading the rules";
    }
    else if (document.location.pathname.startsWith("/pages/privacy")) {
        presenceData.details = "Reading the privacy informations";
    }
    else if (document.location.pathname.startsWith("/pages/takedowns")) {
        presenceData.details = "Reading about takedowns";
    }
    else if (document.location.pathname.startsWith("/dnp")) {
        presenceData.details = "Reading through the Do-Not-Post List";
    }
    else if (document.location.pathname.startsWith("/changelog")) {
        presenceData.details = "Reading the changelog";
    }
    else if (document.location.pathname.startsWith("/pages/faq")) {
        presenceData.details = "Reading the FAQ";
    }
    else if (document.location.pathname.startsWith("/pages/api")) {
        presenceData.details = "Reading about the API";
    }
    else if (document.location.pathname.startsWith("/pages/shortcuts")) {
        presenceData.details = "Reading about the keyboard shortcuts";
    }
    else if (document.location.pathname.startsWith("/pages/advertising")) {
        presenceData.details = "Reading about their advertising";
    }
    else if (document.location.pathname.startsWith("/pages/onion")) {
        presenceData.details = "Reading about onions";
    }
    else if (document.location.pathname.startsWith("/pages/stats")) {
        presenceData.details = "Watching the website stats";
    }
    else if (document.location.pathname.startsWith("/pages/staff")) {
        presenceData.details = "Looking at the staff list";
    }
    else if (document.location.pathname.startsWith("/images")) {
        if (document.location.pathname.startsWith("/images/new")) {
            presenceData.details = "uploading a new picture";
        }
        else {
            presenceData.details = "Browsing through all pictures";
        }
    }
    else {
        presenceData = {
            largeImageKey: "logo"
        };
    }
    presence.setActivity(presenceData);
});
presence.on("iFrameData", function (data) {
    console.log(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzVCLGFBQWEsRUFBRSxNQUFNO0NBQ3JCLENBQUM7QUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQzlDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNuRSxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDbkUsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDckM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO0tBQ3BEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDOUQsWUFBWSxDQUFDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztLQUN2RDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENB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