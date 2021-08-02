const presence = new Presence({
  clientId: "871752405551829013" //The client ID of the Application created at https://discordapp.com/developers/applications
});

let startTime: number;
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

presence.on("UpdateData", async () => {

  /*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.

    It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

  const presenceData: PresenceData = {
    largeImageKey:
      "logo" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    // details: "Browsing Page Name", //The upper section of the presence text
    // state: "Reading section A", //The lower section of the presence text
    startTimestamp: startTime ?? (startTime = Date.now()), //The unix epoch timestamp for when to start counting from
    "buttons": [
      {
        "label": "Go to page",
        url: location.href
      }
    ]
  },
 username = (document.querySelector('[data-test-id="header-profile-button"]')as HTMLSpanElement)?.innerText;
if(username) {
presenceData.buttons.push(
  {
    "label": `${username}'s profile`,
    url: `https://www.khanacademy.org/profile/${username}`
  });
}
  const title = document.title.split(" | ");
  title.pop();
  title.reverse();


  const currently = document.getElementById("uid-dialog-0-title")?.innerText;
  if (currently) title.push(currently);

  if (title.length && !document.hidden) {
    const details = [],
     state = [],
     topRowLen = Math.ceil(title.length / 2);
    for (let i = 0; i < topRowLen; i++) 
      details.push(title[ i ]);
    
    for (let i = topRowLen; i < title.length; i++) 
      state.push(title[ i ]);
    
    presenceData.details = details.join(" | ");
    presenceData.state = state.join(" | ");
    console.log(presenceData);
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  } else {
    startTime = null;
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  }
});
