const presence = new Presence({
  clientId: "858886158045806602" //The client ID of the Application created at https://discordapp.com/developers/applications
});

/*

function myOutsideHeavyLiftingFunction(){
  //Grab and process all your data here

  // element grabs //
  // api calls //
  // variable sets //
}

setInterval(myOutsideHeavyLiftingFunction, 10000);
//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up

*/
let prevURL="",
 timestamp=Date.now(),
 details="",
 state="";
presence.on("UpdateData", async () => {
if (prevURL!=window.location.pathname){
  prevURL = window.location.pathname;
  timestamp=Date.now();
}
if (window.location.pathname=="/"){
  details = "Browsing Home Page";
  state = "";
} else if (window.location.pathname=="/portal/learning") {
  details = "Netacad Portal";
  state = "";
} else if (window.location.pathname.startsWith("/course/")) {
  details = "Viewing course";
  state = document.getElementsByTagName("h3")[0].innerText;
} else if (window.location.pathname.startsWith("/grade/report/")) {
  details = "Viewing grades";
  state = document.getElementsByTagName("h3")[0].innerText;
} else if (window.location.pathname.startsWith("/local/mail/")) {
  details = "Viewing messages";
  state = "";
} else if (window.location.pathname.startsWith("/calendar/")) {
  details = "Viewing calendar";
  state = document.getElementsByTagName("h3")[0].innerText;
} else if (window.location.pathname.startsWith("/mod/")) {
  if (document.getElementsByTagName("h2")[0].innerText.toUpperCase().includes("EXAM")){
    details = "Viewing exam";
  } else {
    details = "Viewing course content";
  }
  state = document.getElementsByTagName("h3")[0].innerText;
} else if (window.location.pathname.startsWith("/srwe-dl/")) {
  details = "Viewing course content";
  state = document.getElementsByTagName("h1")[0].innerText;
} else if (window.location.pathname.includes("assessment_history")) {
  details = "Viewing Assesment History";
  state = "";
} else {
  details = "Browsing";
  state = "";
}

const presenceData: PresenceData = {
  largeImageKey: "netacadlogo",
  details: details,
  state: state,
  startTimestamp: timestamp
};
if (presenceData.details == null) {
  presence.setTrayTitle();
  presence.setActivity();
} else {
  presence.setActivity(presenceData);
}
});