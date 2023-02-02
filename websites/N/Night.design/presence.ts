const presence = new Presence({
	clientId: "1031730262092042321",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/4mDvKNa.png",
	};

	presenceData.startTimestamp = Math.floor(Date.now() / 1000);

	const pathname = document.location.pathname.slice(3);

	switch (pathname) {
		case "/home":
			presenceData.details = "View the Homepage";
			break;
		case "/resources":
			presenceData.details = "Search...";
			break;
		case "/settings/account":
			presenceData.details = "Change my Account Settings";
			break;
		case "/settings/notifications":
			presenceData.details = "Change my Notifications Settings";
			break;
		case "/settings/connected-accounts":
			presenceData.details = "Add a user Connection to my account";
			break;
		case "/settings/account-security":
			presenceData.details = "Change my Account Security Settings";
			break;
		case "/password-forgotten":
			presenceData.details = "Change my Password";
			break;
		case "/login":
			presenceData.details = "Sign in with my Account";
			break;
		case "/register":
			presenceData.details = "Create a new Account";
			break;
		case "/dashboard":
			presenceData.details = "View my Dashboard";
			break;
		case "/creator":
			presenceData.details = "View Creator page";
			break;
		case "/modder":
			presenceData.details = "View Modder Page";
			break;
		case "/modder/publisher":
			presenceData.details = "Apply to become a Modder";
			break;
		case "/legal/terms-of-service":
			presenceData.details = "Read the Terms of Service from Night.design";
			break;
		case "/legal/privacy-policy":
			presenceData.details = "Read the Privacy Policy from Night.design";
			break;
		case "/legal/imprint":
			presenceData.details = "Read the Imprint from Night.design";
			break;
		case `/resources/${document.location.pathname.split("/")[3]}`:
			{
				const pic = document.querySelector(".img-fluid") as HTMLImageElement;
				presenceData.largeImageKey = pic.src;
				presenceData.details = document.querySelector(".m-b-10").innerHTML;
			}
			break;
		case `/u/${document.location.pathname.split("/")[3]}/activities`:
			{
				const image = document.querySelectorAll(
					".rounded-circle"
				)[0] as HTMLImageElement;
				presenceData.largeImageKey = image.src;
				presenceData.details = `View ${
					document.location.pathname.split("/")[3]
				}'s activitys`;
			}
			break;
		case `/u/${document.location.pathname.split("/")[3]}/resources`:
			{
				const image1 = document.querySelectorAll(
					".rounded-circle"
				)[0] as HTMLImageElement;
				presenceData.largeImageKey = image1.src;
				presenceData.details = `View ${
					document.location.pathname.split("/")[3]
				}'s designs`;
			}
			break;
		case `/u/${document.location.pathname.split("/")[3]}/connected-accounts`:
			{
				const image2 = document.querySelectorAll(
					".rounded-circle"
				)[0] as HTMLImageElement;
				presenceData.largeImageKey = image2.src;
				presenceData.details = `View ${
					document.location.pathname.split("/")[3]
				}'s connections`;
			}
			break;
		case `/modder/${document.location.pathname.split("/")[3]}/statistics`:
			presenceData.details = "View my Application Statistics";
			break;
		case `/modder/${document.location.pathname.split("/")[3]}/moderation/queue`:
			presenceData.details = "Manage moderations for my Application";
			break;
		case `/modder/${document.location.pathname.split("/")[3]}/settings/basic`:
			presenceData.details = "Manage Settings for my Application";
			break;
		case `/modder/${document.location.pathname.split("/")[3]}/settings/members`:
			presenceData.details = "Manage Members for my Application";
			break;
		default:
			presenceData.details = "Nothing Found";
	}
	presence.setActivity(presenceData);
});
