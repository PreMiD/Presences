const presences: Record<string, PresenceData> = {
		"/challenges/retired": {
			details: "Challenges",
			state: "Browsing retired challenges...",
		},
		"/challenges/todo": {
			details: "Challenges",
			state: "Browsing to-do list...",
		},
		"/login": {
			details: "Login",
			state: "Logging in...",
		},
		"/fortresses": {
			details: "Fortresses",
			state: "Browsing fortresses...",
		},
		"/endgames": {
			details: "Endgames",
			state: "Browsing endgames...",
		},
		"/starting-point": {
			details: "Starting Point",
			state: "Browsing starting points...",
		},
		"/rankings": {
			details: "Rankings",
			state: "Browsing rankings...",
		},
		"/register": {
			details: "Register",
			state: "Creating new account...",
		},
		"/machines/list/unreleased": {
			details: "Machines",
			state: "Browsing scheduled machines...",
		},
		"/machines/list/active": {
			details: "Machines",
			state: "Browsing active machines...",
		},
		"/machines/list/retired": {
			details: "Machines",
			state: "Browsing retired machines...",
		},
		"/machines/list/todo": {
			details: "Machines",
			state: "Browsing machines to-do list...",
		},
		"/home": {
			details: "Homepage",
		},
		"/machines/{}": {
			details: "Playing machine",
		},
		"/challenges/{}": {
			details: "Playing challenge",
		},
		"/profile/overview": {
			details: "Profile",
			state: "Browsing profile overview...",
		},
		"/profile/settings": {
			details: "Profile",
			state: "Changing profile settings...",
		},
		"/profile/subscriptions/plans": {
			details: "Profile",
			state: "Browsing subscriptions...",
		},
		"/users/{}": {
			details: "Looking at profile",
		},
		"/tracks": {
			details: "Tracks",
			state: "Browsing tracks...",
		},
	},
	presence = new Presence({
		clientId: "1042105891681472595",
	});

function getHomePageDetails() {
	return `${
		document
			.querySelectorAll(".text-left.font-size15.col")[0]
			.querySelectorAll(".color-green")[0].textContent
	}, Rank: ${
		document.querySelectorAll(".htb-text2.font-size15.text-left.mb-0")[0]
			.textContent
	}`;
}

function getPersonalProfileDetails() {
	return document.querySelectorAll(".htb-subtitle.greenOnHover")[0].textContent;
}

function getMachineDetails() {
	const diff = document.querySelectorAll(
			".d-inline-block.pl-2.pr-2.borderRadius13.label-reset.no-space.color-main.htb-label.undefined.letterSpacingundefined.borderRadius4"
		)[0].textContent,
		name = document
			.querySelectorAll(
				".d-inline-block.pl-2.pr-2.borderRadius13.label-reset.no-space.color-white.fontSemiBold.letterSpacing0.borderRadius4"
			)[1]
			.querySelectorAll("span")[0].textContent,
		status = document
			.querySelectorAll(".htb-label2.offline-text.text-left.pl-3")[0]
			.textContent.includes("offline")
			? "offline"
			: "online";

	return `${name} (${diff}) - ${status}`;
}

function getChallengeDetails() {
	const name = document
		.querySelectorAll(
			".d-inline-block.pl-2.pr-2.borderRadius13.label-reset.no-space.color-white.fontSemiBold.letterSpacing0.borderRadius4"
		)[1]
		.querySelectorAll("span")[0].textContent;

	return `${name} - ${
		document.querySelectorAll(".htb-label2.offline-text.text-left.pl-3")[0]
			.textContent
	}`;
}

function getUserId() {
	return document.cookie
		.split(";")
		.find(item => item.includes("ajs_user_id"))
		.split("=")[1];
}

function executeMethod(path: string): string {
	switch (path) {
		case "/home":
			return getHomePageDetails();
		case "/profile/overview":
			return getPersonalProfileDetails();
		case "/machines/{}":
			return getMachineDetails();
		case "/challenges/{}":
			return getChallengeDetails();
		case "/users/{}":
			return "";
		default:
			return "";
	}
}

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {};

	for (const [path, data] of Object.entries(presences)) {
		const regex = new RegExp(path.replace(/{}/g, ".*"), "g");

		if (
			document.location.pathname.includes(path) ||
			regex.test(document.location.pathname)
		) {
			presenceData = {
				...presenceData,
				...data,
				...(!data.state &&
					path.includes("{}") && {
						state: executeMethod(path),
					}),
			};

			break;
		}

		presenceData = {
			...presenceData,
			largeImageKey: "https://i.imgur.com/aMjnyic.png",
			buttons: [
				{
					label: "My Profile",
					url: `https://app.hackthebox.com/users/${getUserId()}`,
				},
			],
		};
	}

	presence.setActivity(presenceData);
});
