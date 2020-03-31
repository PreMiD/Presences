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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUNyQyxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixDQUFDO0tBQy9DO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtRQUNsRSxZQUFZLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztLQUNyQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7UUFDbEUsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7S0FDdEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO0tBQ3JEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDN0QsWUFBWSxDQUFDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztLQUN4RDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzdELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENB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