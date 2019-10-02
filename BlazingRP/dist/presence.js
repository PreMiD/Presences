var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var mainPresence = new Presence({
    clientId: "629041369515687937",
    mediaKeys: false
});
var hubPresence = new Presence({
    clientId: "629041900804112385",
    mediaKeys: false
});
var devPresence = new Presence({
    clientId: "629042148100276244",
    mediaKeys: false
});
mainPresence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "lg"
    };
    if (document.location.hostname == "blazingrp.net") {
        if (document.location.pathname == "/") {
            presenceData.details = "Betrachtet die Startseite...";
        }
        else if (document.location.pathname.startsWith("/jobs")) {
            presenceData.details = "Betrachtet freie Stellen...";
        }
        else if (document.location.pathname.startsWith("/roadmap")) {
            presenceData.details = "Betrachtet die Roadmap...";
        }
        else if (document.location.pathname.startsWith("/changelogs")) {
            presenceData.details = "Betrachtet die Changelogs...";
        }
        else if (document.location.pathname.startsWith("/wiki")) {
            if (document.getElementsByClassName("page-header")[0].textContent.startsWith("Bearbeiten von „")) {
                presenceData.details = "Bearbeitet einen Wiki Artikel...";
                presenceData.state = document.getElementsByClassName("page-header")[0].textContent.replace("Bearbeiten von „", "").replace("“", "");
            }
            else {
                presenceData.details = "Liest einen Wiki Artikel...";
                presenceData.state = document.getElementsByClassName("page-header")[0].textContent;
            }
        }
        mainPresence.setActivity(presenceData);
    }
    else if (document.location.hostname == "hub.blazingrp.net") {
        if (document.location.pathname == "/login") {
            presenceData.details = "Betrachtet die Loginseite...";
        }
        else if (document.location.pathname.startsWith("/register")) {
            presenceData.details = "Betrachtet die Registrierungsseite...";
        }
        hubPresence.setActivity(presenceData);
    }
    else if (document.location.hostname == "bugs.blazingrp.net") {
        presenceData.details = "Bugtracker";
        if (document.location.pathname == "/my_view_page.php") {
            presenceData.state = "Betrachtet das Dashboard...";
        }
        else if (document.location.pathname.startsWith("/view_all_bug_page.php")) {
            presenceData.state = "Betrachtet die Bugübersicht...";
        }
        else if (document.location.pathname.startsWith("/bug_report_page.php")) {
            presenceData.state = "Erstellt einen Bug...";
        }
        else if (document.location.pathname.startsWith("/roadmap_page.php")) {
            presenceData.state = "Betrachtet die Bug-Roadmap...";
        }
        else if (document.location.pathname.startsWith("/view.php")) {
            presenceData.state = "Betrachtet einen Fehler...";
        }
        mainPresence.setActivity(presenceData);
    }
    else if (document.location.hostname == "cdn.blazingrp.net") {
        presenceData.details = "Betrachet den Fileserver...";
        mainPresence.setActivity(presenceData);
    }
    else if (document.location.hostname == "developers.blazingrp.net") {
        if (document.location.pathname == "/") {
            presenceData.details = "Betrachtet die Startseite...";
        }
        else if (document.location.pathname.startsWith("/javadocs")) {
            presenceData.details = "Javadocs";
            if (document.location.pathname.split("/").length == 3) {
                presenceData.state = "Übersicht";
            }
            else {
                presenceData.state = document.location.pathname.split("/")[2];
            }
        }
        devPresence.setActivity(presenceData);
    }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUksWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzlCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUIsU0FBUyxFQUFFLEtBQUs7Q0FDakIsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUM7SUFDN0IsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixTQUFTLEVBQUUsS0FBSztDQUNqQixDQUFDLENBQUM7QUFDSCxJQUFJLFdBQVcsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUdILFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUN2QyxJQUFJLFlBQVksR0FBaUI7UUFDL0IsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUNGLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksZUFBZSxFQUFFO1FBQ2hELElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1lBQ3BDLFlBQVksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUE7U0FDdEQ7YUFBTSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4RCxZQUFZLENBQUMsT0FBTyxHQUFHLDZCQUE2QixDQUFBO1NBQ3JEO2FBQU0sSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0QsWUFBWSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQTtTQUNuRDthQUFNLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFB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