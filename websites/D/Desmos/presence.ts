const desmosPresence = new Presence({
	clientId: "886254740399349852" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  /*strings = desmosPresence.getStrings({
	play: "presence.playback.playing",
	pause: "presence.playback.paused"
	//You can use this to get translated strings in their browser language
  });*/
  
var url: string
var graphing: number = 0
var pageType: string
var title: string = ""
var numEquations: number = 0
const startTime: number = Date.now()

desmosPresence.on("UpdateData", async () => {
  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

	It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
	
  // About the comment above: Is this really recommended? It appears to be not allowed according to the Presence Rules
  
  url = document.URL;
  if (url[url.length-1] === "/") {
	url = url.substring(0, url.length-1)
  }
  var splitUrl = url.split("/")
  var urlPage = splitUrl[splitUrl.length-1]
  if (urlPage === "www.desmos.com") { 
	pageType = "Home Page" 
  } else { 
	pageType = urlPage[0].toUpperCase() + urlPage.substring(1) 
  }
  if (url.includes("/calculator")) {
	graphing = 2;	
	title = document.getElementsByClassName("dcg-variable-title")[0].innerHTML;
	numEquations = document.getElementsByClassName("dcg-template-expressioneach")[0].childElementCount;
  } else if (url.includes("/geometry")) {
	graphing = 1;	
	title = document.getElementsByClassName("dcg-variable-title")[0].innerHTML;
	pageType = "Geometry"
	numEquations = 0
  } 
  else if (["scientific", "fourfunction", "matrix", "practice"].includes(urlPage)) {
	graphing = 1;
	if (pageType === "Scientific" || pageType === "Fourfunction") {
		numEquations = document.getElementsByClassName("dcg-basic-list")[0].childElementCount
	} else if (pageType === "Matrix") {
		numEquations = document.getElementsByClassName("dcg-matrix-list")[0].childElementCount
	} else {
		numEquations = 0
	}
  } else {
	graphing = 0;
  }
  
  var presenceData: PresenceData = {
	largeImageKey:
	  "logo",
	startTimestamp: startTime
  };
  
  if (graphing === 2) {
	presenceData.smallImageKey = "logo"
	presenceData.smallImageText = "Desmos Graphing Calculator"
	presenceData.details = "Plotting a Graph: ".concat(title)
	presenceData.state = numEquations.toString().concat(" Equation")
	if (numEquations !== 1) { presenceData.state += "s" }
  } else {
	delete presenceData.smallImageKey
	delete presenceData.smallImageText
	if (graphing === 1) {
		presenceData.details = "Using Desmos ".concat(pageType)
		if (numEquations > 0) {
			presenceData.details += " Calculator"
			presenceData.state = numEquations.toString().concat(" Expression")
			if (numEquations !== 1) { presenceData.state += "s" }
		} else {
			delete presenceData.state
		}
		if (title !== "") {
			presenceData.details += ": ".concat(title)
		}
	} else {
		presenceData.details = "Reading ".concat(pageType)
	}
  }
  
  if (presenceData.details === null) {
	//This will fire if you do not set presence details
	desmosPresence.setTrayTitle(); //Clears the tray title for mac users
	desmosPresence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
	//This will fire if you set presence details
	desmosPresence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});