const presence = new Presence({clientId: "886254740399349852"});

let url: string,
 graphing: number,
 pageType: string,
 title: string,
 numEquations: number,
 startTime: number = Date.now();

presence.on("UpdateData", async () => {
  // Getting Data
  url = document.URL;
  if (url[url.length - 1] === "/") 
  	url = url.substring(0, url.length - 1);
  
  const splitUrl = url.split("/"),
   urlPage = splitUrl[splitUrl.length - 1];
  if (urlPage === "www.desmos.com")  
  	pageType = "Home Page"; 
   else  
  	pageType = urlPage[0].toUpperCase() + urlPage.substring(1); // Capitalize page title
  
  if (url.includes("/calculator")) { // Graphing Calculator
  	graphing = 2;   
  	title = document.getElementsByClassName("dcg-variable-title")[0].innerHTML;
  	numEquations = document.getElementsByClassName("dcg-template-expressioneach")[0].childElementCount;
  } else if (url.includes("/geometry")) { // Geometry Tool
  	graphing = 1;   
  	title = document.getElementsByClassName("dcg-variable-title")[0].innerHTML;
  	pageType = "Geometry";
  	numEquations = 0;
  } else if (["scientific", "fourfunction", "matrix", "practice"].includes(urlPage)) {
  	graphing = 1;
  	if (pageType === "Scientific" || pageType === "Fourfunction") { // These three use a different container for equations
  		numEquations = document.getElementsByClassName("dcg-basic-list")[0].childElementCount;
  	} else if (pageType === "Matrix") 
  		numEquations = document.getElementsByClassName("dcg-matrix-list")[0].childElementCount;
  	 else 
  		numEquations = 0;
  	
  } else 
  	graphing = 0;
  
  
  // Setting Presence
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: startTime
  };
  
  if (graphing === 2) {
    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "Desmos Graphing Calculator";
    presenceData.details = "Plotting a Graph: ".concat(title);
    presenceData.state = numEquations.toString().concat(" Equation");
    if (numEquations !== 1) presenceData.state += "s"; 
  } else {
    delete presenceData.smallImageKey;
    delete presenceData.smallImageText;
    if (graphing === 1) {
        presenceData.details = "Using Desmos ".concat(pageType);
        if (numEquations > 0) {
            presenceData.details += " Calculator";
            presenceData.state = numEquations.toString().concat(" Expression");
            if (numEquations !== 1) presenceData.state += "s"; 
        } else 
            delete presenceData.state;
        
        if (title !== "") 
            presenceData.details += ": ".concat(title);
        
    } else 
        presenceData.details = "Reading ".concat(pageType);
    
  }
  
  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});