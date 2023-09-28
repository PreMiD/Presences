const presence = new Presence({ clientId: "870727282405306368" });

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/S/Subso/assets/logo.png",
	};

	switch (window.location.host) {
		case "sub.so": {
			presenceData.details = "Landing site";
			switch (window.location.pathname) {
				case "/support":
					presenceData.state = "Support";
					break;
				case "/tos":
					presenceData.state = "Terms of Service";
					break;
				case "/privacy":
					presenceData.state = "Privacy Policy";
					break;
				case "/blog":
					presenceData.state = "Blog";
					break;
				default:
					presenceData.state = "Home";
					break;
			}

			break;
		}
		case "app.sub.so": {
			switch (window.location.pathname) {
				case "/home":
					presenceData.details = "Homepage";
					presenceData.state = "Viewing activity";
					break;
				case "/subscriptions":
					presenceData.details = "Homepage";
					presenceData.state = "Viewing subscriptions";
					break;
				case "/notifications":
					presenceData.details = "Homepage";
					presenceData.state = "Viewing notifications";
					break;
				case "/lists":
					presenceData.details = "Homepage";
					presenceData.state = "Viewing lists";
					break;
				case "/watchlater":
					presenceData.details = "Homepage";
					presenceData.state = "Viewing watch later";
					break;
				default:
					if (window.location.pathname.startsWith("/c/")) {
						if (document.title === "Subso") {
							presenceData.details = "Viewing a creator:";
							presenceData.state = "Creator not found";
						} else {
							presenceData.details = "Viewing a creator:";
							[presenceData.state] = document.title.split(
								" — All their content in one place on Subso"
							);
							presenceData.buttons = [
								{
									label: "View Creator",
									url: window.location.href,
								},
							];
						}
					} else if (window.location.pathname.startsWith("/settings/")) {
						const tab = window.location.pathname
							.split("/settings/")[1]
							.replace("watchlater", "Watch Later");
						presenceData.details = "Settings:";
						presenceData.state = tab.charAt(0).toUpperCase() + tab.slice(1);
					}
					break;
			}

			break;
		}
		case "creators.sub.so": {
			presenceData.details = "Creator Dashboard";
			switch (window.location.pathname) {
				case "/auth/login":
					presenceData.state = "Login";
					break;
				case "/auth/resetpassword":
					presenceData.state = "Password Reset";
					break;
				case "/auth/register":
					presenceData.state = "Creating an account";
					break;
				case "/dashboard":
					presenceData.state = "Home";
					break;
				case "/profile":
					presenceData.state = "Profile";
					break;
				case "/drafts":
					presenceData.state = "Drafts";
					break;
				case "/layouts":
					presenceData.state = "Layouts";
					break;
			}

			break;
		}
		// No default
	}

	presence.setActivity(presenceData);
});
