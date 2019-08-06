// Redirect to iframe source, to prevent loss of progress
if (document.getElementsByTagName("frame")[1]) {
  if(document.baseURI != document.getElementsByTagName("frame")[1].src) { 	
    window.location.replace(document.getElementsByTagName("frame")[1].src);
  }
}

var presence = new Presence({
  clientId: "556828545469513730",
  mediaKeys: false
})

// Check whether loggedout
if (document.baseURI.match(/module=adm/) && document.baseURI.match(/(type=|classes)/) || ((document.getElementsByClassName("menuitem")[1]) as HTMLElement).innerText == "") {
  var loggedout = true;
}

// In Worksheet
if (!loggedout) {
  // Set Class
  // if (document.querySelector(".wimscenter"))
  var Classname = "";
      Worksheet = "...";
  if (document.querySelector(".wims_subclasses")) {
    var Classname = (document.querySelector(".wimscenter") as HTMLElement).innerText.split("\n")[1] + " ";
  } else if (document.querySelectorAll("td.small")[1]) {
    var Classname = ((document.querySelectorAll("td.small")[1] as HTMLElement).innerText.split(" ")[0]) + " ";
  } else var Classname = (document.querySelector(".wimscenter") as HTMLElement).innerText.split("\n")[0] + " ";

  // Set Worksheet
  if (document.baseURI.match(/sh=/)) {
    var WSNo = ((document.baseURI.match(/sh=(.?.?)/))[1]).replace(/&|#/g,"");
    var Worksheet = " - " + (document.getElementsByClassName("text_item ")[1].innerHTML) + "" + WSNo;
    var Exercise = "...";
  }
  
  // In Exercise
  else if (document.baseURI.match(/(worksheet=|reply)/)) {
    // Set Worksheet
    var WSNo = (((document.querySelector(".sheet") as HTMLAnchorElement).href.match(/sh=(.?.?)/))[1]).replace(/&|#/g,"");
    var Worksheet = " - " + (document.querySelector(".sheet") as HTMLElement).innerText + " " + WSNo;
    var Classname = ((document.querySelectorAll("td.small")[2] as HTMLElement).innerText.split(" ")[0]) + " ";
    
    // Set Exercise
    if (document.querySelector(".main_body .titre")) {
      if (document.querySelector(".main_body .titre") && document.getElementsByTagName("kbd")[1] && !document.querySelector(".answer")) {
        var EXNo = document.getElementsByTagName("kbd")[1].innerText.match(/\d+/)[0];
        var Exercise = (document.querySelector(".main_body .titre") as HTMLElement).innerText + " - " + EXNo;
      } else var Exercise = (document.querySelector(".main_body .titre") as HTMLElement).innerText // Results page, so no EXNo
    }
    if (document.querySelector(".oeftitle")) {
      if (document.querySelector(".oeftitle") && document.getElementsByTagName("kbd")[1] && !document.querySelector(".oefanswer")) {
        var EXNo = document.getElementsByTagName("kbd")[1].innerText.match(/\d+/)[0];
        var Exercise = (document.querySelector(".oeftitle") as HTMLElement).innerText + " - " + EXNo;
      } else var Exercise = (document.querySelector(".oeftitle") as HTMLElement).innerText;
    }
    if (EXNo > "1") { // If exercise >1 get last time
      var timestamp = parseInt(sessionStorage.getItem("TimeStampStorage"));
    } else if (document.querySelector(".answer") || document.querySelector(".oefanswer")) { // If answer page hide time
      var timestamp = 0;
    } else var timestamp = Date.now(); // Else reset time
  }
}

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    details: Classname + Worksheet,
    state: Exercise,
    startTimestamp: timestamp,
    largeImageKey: "wims_lg"
  };
  if (loggedout) {
    presence.setActivity();
  } else presence.setActivity(presenceData);
  if (EXNo != undefined) {
    sessionStorage.setItem("TimeStampStorage", timestamp.toString());
  }
});