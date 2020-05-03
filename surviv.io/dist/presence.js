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
    const data = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQVFILElBQUksS0FBVSxDQUFDO0FBQ2YsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLFFBQVEsQ0FBQztBQUNiLElBQUksVUFBVSxDQUFDO0FBQ2YsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBRWhDLElBQUksTUFBTSxDQUFDO0FBQ1gsSUFBSSxTQUFTLENBQUM7QUFDZCxJQUFJLFVBQVUsQ0FBQztBQUNmLElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxHQUFZLENBQUM7QUFFakIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQWlCO1FBQ3pCLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixNQUFNO1FBQ0osTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUNsRSxPQUFPLElBQUksTUFBTTtZQUNsQixDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDWixHQUFHO1FBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ3BFLE1BQU07WUFDSixDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDWixJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1gsUUFBUTtZQUNOLE1BQU0sQ0FB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