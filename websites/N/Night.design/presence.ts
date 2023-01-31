const presence = new Presence({
	clientId: "1031730262092042321",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
	};

	presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	presenceData.buttons = [
		{
			label: "View Website",
			url: "https://night.design/",
		},
		{
			label: "Actually Page",
			url: document.location.href,
		},
	];

	let domain = document.location.pathname.slice(3);

	if (domain === "/home") {
		presenceData.details = "View the Homepage";
	} else if (domain === "/resources") {
		if (!document.location.search) {
			presenceData.details = "Search...";
		}
	} else if (domain === "/settings/account") {
		presenceData.details = "Change my Account Settings";
	} else if (domain === "/settings/notifications") {
		presenceData.details = "Change my notifications Settings";
	} else if (domain === "/settings/connected-accounts") {
		presenceData.details = "Add a user connection to my account";
	} else if (domain === "/settings/account-security") {
		presenceData.details = "Change my Account Security Settings";
	} else if (domain === "/password-forgotten") {
		presenceData.details = "Change my Password";
	} else if (domain === "/login") {
		presenceData.details = "Sign in with my Account";
	} else if (domain === "/register") {
		presenceData.details = "Create a new Account";
	} else if (domain === "/dashboard") {
		presenceData.details = "View my Dashboard";
	} else if (domain === "/creator") {
		presenceData.details = "View Creator page";
	} else if (domain === "/modder") {
		presenceData.details = "View Modder Page";
	} else if (domain === "/modder/publisher") {
		presenceData.details = "Apply to become a Modder";
	} else if (domain === "/legal/terms-of-service") {
		presenceData.details = "Read the Terms of Service from Night.design";
	} else if (domain === "/legal/privacy-policy") {
		presenceData.details = "Read the Privacy Policy from Night.design";
	} else if (domain === "/legal/imprint") {
		presenceData.details = "Read the Imprint from Night.design";
	} else if (domain === `/resources/${document.location.pathname.split("/")[3]}`) {
		presenceData.details = document.getElementsByClassName("m-b-10")[0].innerHTML;
		let pic = document.getElementById("prev") as HTMLImageElement;
		presenceData.largeImageKey = pic.src;
	} else if (domain === `/u/${document.location.pathname.split("/")[3]}/activities`) {
		let image = document.getElementsByClassName("rounded-circle  ng-lazyloaded")[0] as HTMLImageElement;
		presenceData.largeImageKey = image.src;
		presenceData.details = `View ${document.location.pathname.split("/")[3]}'s activitys`;
	} else if (domain === `/u/${document.location.pathname.split("/")[3]}/resources`) {
		let image = document.getElementsByClassName("rounded-circle  ng-lazyloaded")[0] as HTMLImageElement;
		presenceData.largeImageKey = image.src;
		presenceData.details = `View ${document.location.pathname.split("/")[3]}'s designs`;
	} else if (domain ===`/u/${document.location.pathname.split("/")[3]}/connected-accounts`) {
		let image = document.getElementsByClassName("rounded-circle  ng-lazyloaded")[0] as HTMLImageElement;
		presenceData.largeImageKey = image.src;
		presenceData.details = `View ${document.location.pathname.split("/")[3]}'s connections`;
	} else if(domain === `/modder/${document.location.pathname.split("/")[3]}/statistics`) {
		presenceData.details = "View my Application Statistics";
	} else if(domain === `/modder/${document.location.pathname.split("/")[3]}/moderation/queue`) {
		presenceData.details = "Manage moderations for my Application";
	} else if(domain ===`/modder/${document.location.pathname.split("/")[3]}/settings/basic`) {
		presenceData.details = "Manage Settings for my Application";
	} else if(domain === `/modder/${document.location.pathname.split("/")[3]}/settings/members`) {
		presenceData.details = "Manage members for my Application";
	} else {
		presenceData.details = "Nothing Found";
	}
	presence.setActivity(presenceData);
});
