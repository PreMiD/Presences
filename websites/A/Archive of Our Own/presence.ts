const presence = new Presence({
	//The client ID of the Application created at https://discordapp.com/developers/applications
	clientId: "1005873313551220757",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://archiveofourown.org/images/ao3_logos/logo_42.png",
		},
		[work, tag] = await Promise.all([
			presence.getSetting<string>("work"),
			presence.getSetting<string>("tag"),
		]),
		{ pathname, href } = document.location;
	if (pathname === "/") presenceData.details = "Viewing home page";
	else if (pathname.includes("/tags/")) {
		if (tag) {
			presenceData.details = `Browsing tag : ${
				document.querySelector(".heading > .tag").textContent
			}`;
			presenceData.state = document.querySelector("h2.heading").textContent;
		} else presenceData.details = " Browsing tags...";
	} else if (pathname.includes("/works/")) {
		if (work) {
			presenceData.details = `Reading : ${
				document.querySelector("h2").textContent
			}`;

			if (document.querySelector("div.chapter > h3"))
				presenceData.state = "Oneshot";
			else {
				presenceData.state = `${
					document.querySelector("div.chapter > h3").textContent
				}`;
			}
			presenceData.buttons = [
				{
					label: "View",
					url: href,
				},
			];
		} else presenceData.details = " Reading a work...";
	} else if (pathname.includes("/users"))
		presenceData.details = "Viewing profile...";
	else if (pathname.includes("/series")) {
		presenceData.details = `Viewing Series : ${
			document.querySelector("h2.heading").textContent
		}`;
		presenceData.state = `By ${
			document.querySelector("a[rel=author]").textContent
		}`;
		presenceData.buttons = [
			{
				label: "View",
				url: href,
			},
		];
	} else presenceData.details = "Browsing the website...";

	//Update the presence with all the values from the presenceData object
	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});
