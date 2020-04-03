if (document.getElementsByTagName("frame")[1]) {
    if (document.baseURI != document.getElementsByTagName("frame")[1].src) {
        window.location.replace(document.getElementsByTagName("frame")[1].src);
    }
}
var presence = new Presence({
    clientId: "656959119118565406",
});
var loggedout = false;
if ((document.baseURI.match(/module=adm/) &&
    document.baseURI.match(/(type=|classes)/)) ||
    document.getElementsByClassName("menuitem")[1].innerText ==
        "") {
    loggedout = true;
}
var Classname = "";
var Worksheet = "...";
var WSNo = "";
var EXNo = "";
var Exercise = "";
var timestamp = null;
var timeleft = null;
if (!loggedout) {
    if (document.querySelector(".wims_subclasses")) {
        Classname =
            document.querySelector(".wimscenter").innerText.split("\n")[1] + " ";
    }
    else if (document.querySelectorAll("td.small")[1]) {
        Classname =
            document.querySelectorAll("td.small")[1].innerText.split(" ")[0] + " ";
    }
    else
        Classname =
            document.querySelector(".wimscenter").innerText.split("\n")[0] + " ";
    if (document.baseURI.match(/sh=/)) {
        WSNo = document.baseURI.match(/sh=(.?.?)/)[1].replace(/&|#/g, "");
        Worksheet =
            "- " +
                document.getElementsByClassName("text_item ")[1].innerHTML +
                "" +
                WSNo;
        Exercise = "...";
    }
    else if (document.baseURI.match(/(worksheet=|reply)/)) {
        WSNo = document.querySelector(".sheet").href
            .match(/sh=(.?.?)/)[1]
            .replace(/&|#/g, "");
        Worksheet =
            "- " +
                document.querySelector(".sheet").innerText +
                " " +
                WSNo;
        Classname =
            document.querySelectorAll("td.small")[2].innerText.split(" ")[0] + " ";
        if (document.querySelector(".main_body .titre")) {
            if (document.querySelector(".main_body .titre") &&
                document.getElementsByTagName("kbd")[1] &&
                !document.querySelector(".answer")) {
                EXNo = document
                    .getElementsByTagName("kbd")[1]
                    .innerText.match(/\d+/)[0];
                Exercise =
                    document.querySelector(".sheet").href
                        .match(/#ex(.?.?)/)[1]
                        .replace(/&|#/g, "") +
                        "." +
                        EXNo +
                        ": " +
                        document.querySelector(".main_body .titre")
                            .innerText;
            }
            else
                Exercise = document.querySelector(".main_body .titre")
                    .innerText;
        }
        if (document.querySelector(".oeftitle")) {
            if (document.querySelector(".oeftitle") &&
                document.getElementsByTagName("kbd")[1] &&
                !document.querySelector(".oefanswer")) {
                EXNo = document
                    .getElementsByTagName("kbd")[1]
                    .innerText.match(/\d+/)[0];
                Exercise =
                    document.querySelector(".oeftitle").innerText +
                        ": " +
                        EXNo;
            }
            else
                Exercise = document.querySelector(".oeftitle")
                    .innerText;
        }
        if (EXNo > "1") {
            timestamp = parseInt(sessionStorage.getItem("TimeStampStorage"));
        }
        else if (document.querySelector(".answer") ||
            document.querySelector(".oefanswer")) {
            timestamp = 0;
        }
        else
            timestamp = Date.now();
    }
    else if (document.baseURI.match(/(exam=)/)) {
        Worksheet = "";
        Exercise = document.querySelector("h1.wims_title font")
            .innerText;
        timeleft =
            Date.now() +
                (parseInt(document.querySelector("p#exam_clock").innerText.split(":")[1]) *
                    60 +
                    parseInt(document.querySelector("p#exam_clock").innerText.split(":")[2])) *
                    1000;
    }
}
presence.on("UpdateData", async () => {
    let presenceData = {
        details: Classname + Worksheet,
        state: Exercise,
        startTimestamp: timestamp,
        endTimestamp: timeleft,
        largeImageKey: "wims_lg"
    };
    if (loggedout) {
        presence.setActivity();
    }
    else
        presence.setActivity(presenceData);
    if (EXNo != undefined) {
        sessionStorage.setItem("TimeStampStorage", timestamp.toString());
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUM3QyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtRQUNyRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEU7Q0FDRjtBQUVELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzFCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDL0IsQ0FBQyxDQUFDO0FBR0gsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ3RCLElBQ0UsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDbkMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMzQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFpQixDQUFDLFNBQVM7UUFDdkUsRUFBRSxFQUNKO0lBQ0EsU0FBUyxHQUFHLElBQUksQ0FBQztDQUNsQjtBQUVELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNuQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztBQUNyQixJQUFJLFFBQVEsR0FBRyxJ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