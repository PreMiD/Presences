const presence = new Presence({
    clientId: "813518808634621952"
}),

 browsingStamp =  Math.floor(Date.now() / 1000);

let details: string,
    state: string,
    smallImageKey: string,
    smallImageText: string;

const noPlayIndicator: Array<string> = ["Video Chat", "Web view", "Paint", "Table", "Virtual room"];

presence.on("UpdateData", async () => {

      switch (location.host) {
        case "kosmi.io":
            details = "On the Startpage";
            break;
        case "app.kosmi.io": 
            if (location.pathname === "/") {
                details =  "Viewing the Home Page...";
                state = " ";
            }
                
            else if (location.pathname === "/lobby") {
                details = "Browsing public rooms...";
                state = "";
            }
                
            else if ( location.pathname.includes("room") ) {
                    details = "In a room";
                    state = "Choosing an activity";
                
                if ((document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement)  !== null && !noPlayIndicator.includes((document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement).innerText ) ) {
                    state = "Playing " + (document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement).innerText;
                    smallImageKey = "gamepad";
                    smallImageText = `With ${parseInt((document.querySelector(`a[class="item swipableMenuItem-2YW"]`) as HTMLElement).innerText.trim(), 10) - 1} other(s)`;
                    
                } else if ((document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement)  !== null && noPlayIndicator.includes((document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement).innerText)) {
                    state = `${((document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement).innerText) == "Paint" ? "Painting" : "In a " + (document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement).innerText}`;
                    smallImageKey = `${((document.querySelector(`div[class="appTitle-WJ3"]`) as HTMLElement).innerText) == "Paint" ? "paintbrush" : "vcall"  }`;
                    smallImageText = `With ${parseInt((document.querySelector(`a[class="item swipableMenuItem-2YW"]`) as HTMLElement).innerText.trim(), 10) - 1} other(s)`;
                
                } else if ( (document.querySelector(`video`) as HTMLElement)  !== null || (document.querySelector(`iframe`) as HTMLElement)  !== null ) {
                    state = `In a watchparty`;
                    smallImageKey = "live";
                    smallImageText = `With ${parseInt((document.querySelector(`a[class="item swipableMenuItem-2YW"]`) as HTMLElement).innerText.trim(), 10) - 1} other(s)`;
                }
            }
                    
            break;
      default: break;
    }

        const presenceData: PresenceData = {
            largeImageKey: "kosmimain",
            smallImageKey,
            smallImageText,
            details,
            state,
            startTimestamp: browsingStamp
        };

        if (presenceData.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        } else {
            presence.setActivity(presenceData);
        }      
});