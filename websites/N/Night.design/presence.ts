const presence = new Presence({
	clientId: "1031730262092042321",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/4mDvKNa.png",
	};

	presenceData.startTimestamp = Math.floor(Date.now() / 1000);

	const pathname = document.location.pathname.slice(3);

	if (pathname === "/home") presenceData.details = "View the Homepage";
	else if (pathname === "/resources") presenceData.details = "Search...";
	else if (pathname === "/settings/account")
		presenceData.details = "Change my Account Settings";
	else if (pathname === "/settings/notifications")
		presenceData.details = "Change my notifications Settings";
	else if (pathname === "/settings/connected-accounts")
		presenceData.details = "Add a user connection to my account";
	else if (pathname === "/settings/account-security")
		presenceData.details = "Change my Account Security Settings";
	else if (pathname === "/password-forgotten")
		presenceData.details = "Change my Password";
	else if (pathname === "/login")
		presenceData.details = "Sign in with my Account";
	else if (pathname === "/register")
		presenceData.details = "Create a new Account";
	else if (pathname === "/dashboard")
		presenceData.details = "View my Dashboard";
	else if (pathname === "/creator") presenceData.details = "View Creator page";
	else if (pathname === "/modder") presenceData.details = "View Modder Page";
	else if (pathname === "/modder/publisher")
		presenceData.details = "Apply to become a Modder";
	else if (pathname === "/legal/terms-of-service")
		presenceData.details = "Read the Terms of Service from Night.design";
	else if (pathname === "/legal/privacy-policy")
		presenceData.details = "Read the Privacy Policy from Night.design";
	else if (pathname === "/legal/imprint")
		presenceData.details = "Read the Imprint from Night.design";
	else if (
		pathname === `/resources/${document.location.pathname.split("/")[3]}`
	) {
		presenceData.details = document.querySelector(".m-b-10").innerHTML;
		const pic = document.querySelector(".img-fluid") as HTMLImageElement;
		presenceData.largeImageKey = pic.src;
	} else if (
		pathname === `/u/${document.location.pathname.split("/")[3]}/activities`
	) {
		const image = document.querySelectorAll(
			".rounded-circle"
		)[0] as HTMLImageElement;
		presenceData.largeImageKey = image.src;
		presenceData.details = `View ${
			document.location.pathname.split("/")[3]
		}'s activitys`;
	} else if (
		pathname === `/u/${document.location.pathname.split("/")[3]}/resources`
	) {
		const image = document.querySelectorAll(
			".rounded-circle"
		)[0] as HTMLImageElement;
		presenceData.largeImageKey = image.src;
		presenceData.details = `View ${
			document.location.pathname.split("/")[3]
		}'s designs`;
	} else if (
		pathname ===
		`/u/${document.location.pathname.split("/")[3]}/connected-accounts`
	) {
		const image = document.querySelectorAll(
			".rounded-circle"
		)[0] as HTMLImageElement;
		presenceData.largeImageKey = image.src;
		presenceData.details = `View ${
			document.location.pathname.split("/")[3]
		}'s connections`;
	} else if (
		pathname ===
		`/modder/${document.location.pathname.split("/")[3]}/statistics`
	)
		presenceData.details = "View my Application Statistics";
	else if (
		pathname ===
		`/modder/${document.location.pathname.split("/")[3]}/moderation/queue`
	)
		presenceData.details = "Manage moderations for my Application";
	else if (
		pathname ===
		`/modder/${document.location.pathname.split("/")[3]}/settings/basic`
	)
		presenceData.details = "Manage Settings for my Application";
	else if (
		pathname ===
		`/modder/${document.location.pathname.split("/")[3]}/settings/members`
	)
		presenceData.details = "Manage Members for my Application";
	else presenceData.details = "Nothing Found";

	presence.setActivity(presenceData);
});
