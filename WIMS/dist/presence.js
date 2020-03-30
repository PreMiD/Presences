if (document.getElementsByTagName("frame")[1]) {
    if (document.baseURI != document.getElementsByTagName("frame")[1].src) {
        window.location.replace(document.getElementsByTagName("frame")[1].src);
    }
}
var presence = new Presence({
    clientId: "656959119118565406"
});
if ((document.baseURI.match(/module=adm/) &&
    document.baseURI.match(/(type=|classes)/)) ||
    document.getElementsByClassName("menuitem")[1].innerText ==
        "") {
    var loggedout = true;
}
if (!loggedout) {
    var Classname = "";
    Worksheet = "...";
    if (document.querySelector(".wims_subclasses")) {
        var Classname = document.querySelector(".wimscenter").innerText.split("\n")[1] + " ";
    }
    else if (document.querySelectorAll("td.small")[1]) {
        var Classname = document.querySelectorAll("td.small")[1].innerText.split(" ")[0] + " ";
    }
    else
        var Classname = document.querySelector(".wimscenter").innerText.split("\n")[0] + " ";
    if (document.baseURI.match(/sh=/)) {
        var WSNo = document.baseURI.match(/sh=(.?.?)/)[1].replace(/&|#/g, "");
        var Worksheet = "- " +
            document.getElementsByClassName("text_item ")[1].innerHTML +
            "" +
            WSNo;
        var Exercise = "...";
    }
    else if (document.baseURI.match(/(worksheet=|reply)/)) {
        var WSNo = document.querySelector(".sheet").href
            .match(/sh=(.?.?)/)[1]
            .replace(/&|#/g, "");
        var Worksheet = "- " +
            document.querySelector(".sheet").innerText +
            " " +
            WSNo;
        var Classname = document.querySelectorAll("td.small")[2].innerText.split(" ")[0] + " ";
        if (document.querySelector(".main_body .titre")) {
            if (document.querySelector(".main_body .titre") &&
                document.getElementsByTagName("kbd")[1] &&
                !document.querySelector(".answer")) {
                var EXNo = document
                    .getElementsByTagName("kbd")[1]
                    .innerText.match(/\d+/)[0];
                var Exercise = document.querySelector(".sheet").href
                    .match(/#ex(.?.?)/)[1]
                    .replace(/&|#/g, "") +
                    "." +
                    EXNo +
                    ": " +
                    document.querySelector(".main_body .titre")
                        .innerText;
            }
            else
                var Exercise = document.querySelector(".main_body .titre").innerText;
        }
        if (document.querySelector(".oeftitle")) {
            if (document.querySelector(".oeftitle") &&
                document.getElementsByTagName("kbd")[1] &&
                !document.querySelector(".oefanswer")) {
                var EXNo = document
                    .getElementsByTagName("kbd")[1]
                    .innerText.match(/\d+/)[0];
                var Exercise = document.querySelector(".oeftitle").innerText +
                    ": " +
                    EXNo;
            }
            else
                var Exercise = document.querySelector(".oeftitle")
                    .innerText;
        }
        if (EXNo > "1") {
            var timestamp = parseInt(sessionStorage.getItem("TimeStampStorage"));
        }
        else if (document.querySelector(".answer") ||
            document.querySelector(".oefanswer")) {
            var timestamp = 0;
        }
        else
            var timestamp = Date.now();
    }
    else if (document.baseURI.match(/(exam=)/)) {
        var Worksheet = "";
        var Exercise = document.querySelector("h1.wims_title font")
            .innerText;
        var timeleft = Date.now() +
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUM5QyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtRQUN0RSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkU7Q0FDRDtBQUVELElBQUksUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDO0lBQzNCLFFBQVEsRUFBRSxvQkFBb0I7Q0FDOUIsQ0FBQyxDQUFDO0FBR0gsSUFDQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUNwQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQWlCLENBQUMsU0FBUztRQUN4RSxFQUFFLEVBQ0Y7SUFDRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7Q0FDckI7QUFHRCxJQUFJLENBQUMsU0FBUyxFQUFFO0lBR2YsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ25CLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDbEIsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7UUFDL0MsSUFBSSxTQUFTLEdBQ1gsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FDckUsSUFBSSxDQUNKLENBQUMsQ0FBQyxDQUFD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