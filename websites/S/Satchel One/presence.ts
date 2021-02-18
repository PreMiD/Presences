const presence = new Presence({
  clientId: "779686224708894771"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "eyyv17uu4aq4ri0"
  };




  if (document.location.href.includes("calendar/personal")) {
    presenceData.details = "Viewing timetable";
  } else if (document.location.href.includes("behaviour")) {
    presenceData.details = "Viweing behaviour Dashboard";
  } else if (document.location.href.includes("gradebook")){
    presenceData.details = "Viweing Grades";
  } else if (document.location.href.includes("calendar/school")){
    presenceData.details = "Viweing whole school calendar";
  } else if (document.location.href.includes("classwork")){
    presenceData.details = "Viweing task";
  } else if (document.location.href.includes("homeworks")){
    presenceData.details ="Viweing task";
  } else if(document.location.href.includes("login")){
  presenceData.details ="logging in";
  } else if(document.location.href.includes("todo")){
  presenceData.details ="task list";
  }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
