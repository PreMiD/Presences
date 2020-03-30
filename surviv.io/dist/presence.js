var presence = new Presence({
    clientId: "640711877609127976"
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
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "logo"
    };
    active =
        window.getComputedStyle(document.getElementById("game-area-wrapper"))
            .display != "none"
            ? true
            : false;
    end =
        window.getComputedStyle(document.getElementById("ui-stats")).display !=
            "none"
            ? true
            : false;
    if (!active) {
        pagetype =
            window.getComputedStyle(document.getElementById("start-menu")).display !=
                "none"
                ? "default"
                : "private";
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
        gameregion = document
            .querySelector("[data-label]:checked")
            .innerHTML.match(regionregex)[1];
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
        data.details =
            parseInt(killcount) != 1
                ? killcount + " kills with " + alivecount + " alive"
                : killcount + " kill with " + alivecount + " alive";
        data.state = gametype + " " + gameregion;
        presence.setActivity(data, true);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQVFILElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksVUFBVSxDQUFDO0FBQ2YsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBRWhDLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxTQUFTLENBQUM7QUFDZCxJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxHQUFZLENBQUM7QUFFakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxNQUFNO0tBQ3JCLENBQUM7SUFFRixNQUFNO1FBQ0wsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNuRSxPQUFPLElBQUksTUFBTTtZQUNsQixDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDVixHQUFHO1FBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ3BFLE1BQU07WUFDTCxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDVixJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1osUUFBUTtZQUNQLE1BQU0sQ0FB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