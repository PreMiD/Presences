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
    clientId: "640711877609127976",
    mediaKeys: false
});
var value;
var pagetype;
var gametype;
var gameregion;
var regionregex = /(.*) \[.*\]/;
var active;
var killcount;
var alivecount;
var place;
var end;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "logo",
    };
    active = window.getComputedStyle(document.getElementById("game-area-wrapper")).display != "none" ? true : false;
    end = window.getComputedStyle(document.getElementById("ui-stats")).display != "none" ? true : false;
    if (!active) {
        pagetype = window.getComputedStyle(document.getElementById("start-menu")).display != "none" ? "default" : "private";
        if (pagetype == "default") {
            var solo = document.querySelector("#btn-start-mode-0");
            var duo = document.querySelector("#btn-start-mode-1");
            var squad = document.querySelector("#btn-start-mode-2");
            solo.addEventListener("mousedown", function () {
                console.log("Works");
                value = "Solos: ";
            });
            duo.addEventListener("mousedown", function () {
                value = "Duos: ";
            });
            squad.addEventListener("mousedown", function () {
                value = "Squads: ";
            });
            gametype = value;
        }
        else if (pagetype == "private") {
            var button = document.querySelector("a.btn-hollow-selected");
            gametype = button.innerHTML + "s: ";
        }
        data.state = "Looking for game...";
        data.startTimestamp = browsingStamp;
        gameregion = document.querySelector("[data-label]:checked").innerHTML.match(regionregex)[1];
        presence.setActivity(data, true);
    }
    else if (end) {
        place = document.querySelector(".ui-stats-header-value").innerHTML;
        data.state = "Placed " + place;
        data.startTimestamp = browsingStamp;
        presence.setActivity(data, true);
    }
    else if (active) {
        alivecount = document.querySelector(".ui-players-alive").innerHTML;
        killcount = document.querySelector(".ui-player-kills").innerHTML;
        data.startTimestamp = browsingStamp;
        data.details = parseInt(killcount) != 1 ? killcount + " kills with " + alivecount + " alive" : killcount + " kill with " + alivecount + " alive";
        data.state = gametype + " " + gameregion;
        presence.setActivity(data, true);
    }
    ;
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQTtBQVFGLElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksVUFBVSxDQUFDO0FBQ2YsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBRWhDLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxTQUFTLENBQUM7QUFDZCxJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxHQUFZLENBQUM7QUFFakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7QUFFaEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ25DLElBQUksSUFBSSxHQUFpQjtRQUN2QixhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFBO0lBRUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtJQUMvRyxHQUFHLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNuRyxJQUFJLENBQUMsTUFBTSxFQUFF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