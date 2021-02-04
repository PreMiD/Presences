const presence = new Presence({
    clientId: "806655244880707664"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var startTime = Date.now()


presence.on("UpdateData", async () => {
  console.log('eyh')
  function getProj() {
    var proj = window.location.pathname
    var user = proj.substring(proj.lastIndexOf("user/") + 1, proj.lastIndexOf("/files"))
    
    var file = proj.substring(proj.lastIndexOf("/"), proj.lastIndexOf("?"))
    
    return [user, file]
  }
  var data = getProj()
  //var elapsed = Date.now() - startTime
  
  const presenceData: PresenceData = {
    largeImageKey:
      "pyanywherel", 
    smallImageKey:
      "pyanywheres",
    smallImageText: "Python anywhere", 
    details: data[0], 
    state: "in "+data[1], 
    startTimestamp: startTime,
  };

  if (presenceData.details == null) {
    presence.setTrayTitle(); 
    presence.setActivity(); 
  } else {
    presence.setActivity(presenceData);
  }
});