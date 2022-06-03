const presence = new Presence({
	//The client ID of the Application created at https://discordapp.com/developers/applications
	clientId: "982268503480487936"
}),
//You can use this to get translated strings in their browser language
strings = presence.getStrings({
	play: "presence.playback.playing",
	pause: "presence.playback.paused"
});

let Details: string
let State: string
let startTime = Date.now()
let isStudying: Boolean
  
function myOutsideHeavyLiftingFunction(){
	Details = ''
	State = ''
	if (window.location.pathname.split('/')[1] == 'dashboard'){
		Details = 'Viewing dashboard'
		isStudying = false
		startTime = Date.now()
	}else if(window.location.pathname.split('/')[1] == 'session' && document.title.split('|')[0] != 'Session Results '){
		Details = 'Studying'
		isStudying = true
		if (!isStudying) {
			startTime = Date.now()
		}
		if(document.querySelector('.participants-list.scrollbar').childElementCount - 1 == 0){
			State = `in ${document.title.split('|')[0]}`
		}else if (document.querySelector('.participants-list.scrollbar').childElementCount - 1 == 1){
			State = `in ${document.title.split('|')[0]} with 1 other`
		}else{
			State = `in ${document.title.split('|')[0]} with ${(document.querySelector('.participants-list.scrollbar').childElementCount - 1).toString()} others`
		}
	}else{
		Details = `Viewing ${document.title.split('|')[0]}`
		startTime = Date.now()
		isStudying = false
	}
}
  
  setInterval(myOutsideHeavyLiftingFunction, 1000);
  //Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up
  
  
presence.on("UpdateData", async () => {
	/*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
	  It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/
  
	const presenceData: PresenceData = {
	  //The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
	  largeImageKey: "logo",
	  //The small image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
	//   smallImageKey: "https://mycrazywebsite.com/coolImage.png",
	  //The text which is displayed when hovering over the small image
	//   smallImageText: "Some hover text",
	   //The upper section of the presence text
	  details: Details,
	  //The lower section of the presence text
	  state: State,
	  //The unix epoch timestamp for when to start counting from
	  startTimestamp: startTime,
	  //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
	//   endTimestamp: 3133700400000
	  //Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceData.type = "blahblah"; type examples: details, state, etc.
	};
	//Update the presence with all the values from the presenceData object
	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});