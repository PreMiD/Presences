var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "650569876993343529"
});
var item, profile, title;
var browsingStamp = Math.floor(Date.now() / 1000);
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function PMD_info(message) {
    console.log("%cPreMiD%cINFO%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function PMD_error(message) {
    console.log("%cPreMiD%cERROR%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function PMD_success(message) {
    console.log("%cPreMiD%cSUCCESS%c " + message, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "logo-512"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.hostname.includes("v3rmillion.net")) {
        if (document.location.pathname.includes("index.php") || document.location.pathname == "/") {
            profile = document.querySelector("#panel strong");
            presenceData.details = "Viewing Homepage";
            presenceData.state = "Logged in as " + profile.innerText;
            presenceData.smallImageKey = "twemoji-house-1024x";
        }
        else if (document.location.pathname.includes("showthread.php")) {
            title = document.querySelector(".thread_title");
            presenceData.details = "Browsing Thread:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "twemoji-paper-1024x";
            let textarea = document.querySelector("form #message");
            if (textarea != null && textarea == document.activeElement) {
                presenceData.details = "Replying to Thread:";
                presenceData.state = title.innerText;
                presenceData.smallImageKey = "twemoji-memo-1024x";
            }
        }
        else if (document.location.pathname.includes("forumdisplay.php")) {
            title = document.querySelector(".navigation .active");
            presenceData.details = "Viewing Forum:";
            presenceData.state = title.innerText;
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
        else if (document.location.pathname.includes("newreply.php")) {
            title = document.querySelector("form .smalltext > strong");
            presenceData.details = "Replying to Thread:";
            presenceData.state = title.innerText.substring(title.innerText.indexOf("thread: ") + 8);
            presenceData.smallImageKey = "twemoji-pencil-1024x";
        }
        else if (document.location.pathname.includes("member.php")) {
            profile = document.querySelector(".profile_header strong span");
            presenceData.details = "Viewing Profile:";
            presenceData.state = profile.innerText;
            presenceData.smallImageKey = "twemoji-spy-1024x";
        }
        else if (document.location.pathname == "/siterules.php") {
            presenceData.details = "Viewing Rules";
            delete presenceData.state;
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
        else if (document.location.pathname == "/usercp.php") {
            profile = document.querySelector("#panel strong");
            presenceData.details = "User Control Panel";
            presenceData.state = "Logged in as " + profile.innerText;
            presenceData.smallImageKey = "twemoji-cog-1024x";
        }
        else if (document.location.pathname.includes("search.php")) {
            profile = document.querySelector("#panel strong");
            presenceData.details = "Searching site";
            presenceData.state = "Logged in as " + profile.innerText;
        }
        else if (document.location.pathname.includes("pages.php")) {
            let page = document.URL.substring(document.URL.indexOf(".php") + 10);
            presenceData.details = "Reading page:";
            presenceData.state = page.charAt(0).toUpperCase() + page.substring(1);
            presenceData.smallImageKey = "twemoji-paper-1024x";
        }
    }
    if (presenceData.details == null) {
        PMD_error("Unable to determine location.");
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsQ0FBQztBQUNILElBQUksSUFBUyxFQUFFLE9BQVksRUFBRSxLQUFVLENBQUM7QUFDeEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDbEQsSUFBSSxZQUFZLEdBQUcsbURBQW1ELENBQUM7QUFHdkUsU0FBUyxRQUFRLENBQUMsT0FBTztJQUNyQixPQUFPLENBQUMsR0FBRyxDQUNQLG1CQUFtQixHQUFHLE9BQU8sRUFDN0IsWUFBWSxHQUFHLG9EQUFvRCxFQUNuRSxZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLGVBQWUsQ0FDbEIsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxPQUFPO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQ1Asb0JBQW9CLEdBQUcsT0FBTyxFQUM5QixZQUFZLEdBQUcsb0RBQW9ELEVBQ25FLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsZUFBZSxDQUNsQixDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLE9BQU87SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxzQkFBc0IsR0FBRyxPQUFPLEVBQ2hDLFlBQVksR0FBRyxvREFBb0QsRUFDbkUsWUFBWTtRQUNaLGtFQUFrRSxFQUNsRSxlQUFlLENBQ2xCLENBQUM7QUFDTixDQUFDO0FBR0QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBRWpDLElBQUksWUFBWSxHQUFpQjtRQUM3QixhQUFhLEVBQUUsVUFBVTtLQUM1QixDQUFDO0lBQ0YsWUFBWSxDQUFDLGNBQWMsR0FB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