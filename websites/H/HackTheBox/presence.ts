const presences = [
		{
			path: "/challenges/retired",
			details: "Challenges",
			state: "Browsing retired challenges...",
		},
		{
			path: "/challenges/todo",
			details: "Challenges",
			state: "Browsing to-do list...",
		},
		{
			path: "/login",
			details: "Login",
			state: "Logging in...",
		},
		{
			path: "/fortresses",
			details: "Fortresses",
			state: "Browsing fortresses...",
		},
		{
			path: "/endgames",
			details: "Endgames",
			state: "Browsing endgames...",
		},
		{
			path: "/starting-point",
			details: "Starting Point",
			state: "Browsing starting points...",
		},
		{
			path: "/rankings",
			details: "Rankings",
			state: "Browsing rankings...",
		},
		{
			path: "/register",
			details: "Register",
			state: "Creating new account...",
		},
		{
			path: "/machines/list/unreleased",
			details: "Machines",
			state: "Browsing scheduled machines...",
		},
		{
			path: "/machines/list/active",
			details: "Machines",
			state: "Browsing active machines...",
		},
		{
			path: "/machines/list/retired",
			details: "Machines",
			state: "Browsing retired machines...",
		},
		{
			path: "/machines/list/todo",
			details: "Machines",
			state: "Browsing machines to-do list...",
		},
		{
			path: "/home",
			details: "Homepage",
			stateMethod: "getHomePageDetails",
		},
		{
			path: "/machines/{}",
			details: "Playing machine",
			stateMethod: "getMachineDetails",
		},
		{
			path: "/challenges/{}",
			details: "Playing challenge",
			stateMethod: "getChallengeDetails",
		},
		{
			path: "/profile/overview",
			details: "Profile",
			state: "Browsing profile overview...",
		},
		{
			path: "/profile/settings",
			details: "Profile",
			state: "Changing profile settings...",
		},
		{
			path: "/profile/settings",
			details: "Profile",
			state: "Browsing profile settings...",
		},
		{
			path: "/profile/subscriptions/plans",
			details: "Profile",
			state: "Browsing subscriptions...",
		},
		{
			path: "/users/{}",
			details: "Looking at profile",
			stateMethod: "getPersonalProfileDetails",
		},
		{
			path: "/tracks",
			details: "Tracks",
			state: "Browsing tracks...",
		},
	],
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

function findPresence() {
	const item = presences.find(item => {
		if (item.path.includes("{}")) {
			if (
				new RegExp(item.path.replace("{}", ".+")).test(window.location.pathname)
			)
				return item;
		} else if (document.location.pathname.endsWith(item.path)) return item;
		else if (document.location.pathname.includes(item.path)) return item;
		else return null;
	});

	return item;
}

interface IMethods {
	[key: string]: () => string;
}

const methods: IMethods = {
	getHomePageDetails,
	getMachineDetails,
	getChallengeDetails,
	getPersonalProfileDetails,
};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {};

	for (let i = 0; i < presences.length; i++) {
		const item = findPresence();

		if (item) {
			presenceData.details = item.details;

			if (item.stateMethod)
				presenceData.state = methods[item.stateMethod as keyof IMethods]();
			else presenceData.state = item.state;
		}
	}

	presenceData.largeImageKey = "https://i.imgur.com/aMjnyic.png";
	presenceData.buttons = [
		{
			label: "My Profile",
			url: `https://app.hackthebox.com/users/${getUserId()}`,
		},
	];

	presence.setActivity(presenceData);
});
