const presence = new Presence({
	clientId: "656959119118565406",
});

// Redirect to iframe source, to prevent loss of progress
if (
	document.querySelectorAll("frame")[1] &&
	document.baseURI !== document.querySelectorAll("frame")[1].getAttribute("src")
) {
	window.location.replace(
		document.querySelectorAll("frame")[1].getAttribute("src")
	);
}

// Check whether loggedout
let loggedout = false;
if (
	(document.baseURI.match(/module=adm/) &&
		document.baseURI.match(/(type=|classes)/)) ||
	(document.querySelectorAll(".menuitem")[1] as HTMLElement).textContent === ""
)
	loggedout = true;

let classname: string,
	worksheet = "...",
	WSNo: string,
	EXNo: string,
	exercise: string,
	timestamp: number,
	timeleft: number;

// In Worksheet
if (!loggedout) {
	// Set Class
	// if (document.querySelector(".wimscenter"))
	if (document.querySelector(".wims_subclasses")) {
		[, classname] = document
			.querySelector<HTMLElement>(".wimscenter")
			.textContent.split("\n");
	} else if (document.querySelectorAll("td.small")[1]) {
		classname = `${
			document
				.querySelectorAll<HTMLElement>("td.small")[1]
				.textContent.split(" ")[0]
		} `;
	} else {
		classname = `${
			document
				.querySelector<HTMLElement>(".wimscenter")
				.textContent.split("\n")[0]
		} `;
	}

	// Set Worksheet
	if (document.baseURI.match(/sh=/)) {
		WSNo = document.baseURI.match(/sh=(.?.?)/)[1].replaceAll("&|#", "");
		worksheet = `- ${
			document.querySelectorAll(".text_item")[1].textContent
		}${WSNo}`;
		exercise = "...";
	} else if (document.baseURI.match(/(worksheet=|reply)/)) {
		// In Exercise
		// Set Worksheet
		WSNo = document
			.querySelector<HTMLAnchorElement>(".sheet")
			.href.match(/sh=(.?.?)/)[1]
			.replaceAll("&|#", "");
		worksheet = `- ${
			document.querySelector<HTMLElement>(".sheet").textContent
		} ${WSNo}`;
		classname = `${
			document
				.querySelectorAll<HTMLElement>("td.small")[2]
				.textContent.split(" ")[0]
		} `;

		// Set Exercise
		if (document.querySelector(".main_body .titre")) {
			if (
				document.querySelector(".main_body .titre") &&
				document.querySelectorAll("kbd")[1] &&
				!document.querySelector(".answer")
			) {
				[EXNo] = document.querySelectorAll("kbd")[1].textContent.match(/\d+/);
				exercise = `${document
					.querySelector<HTMLAnchorElement>(".sheet")
					.href.match(/#ex(.?.?)/)[1]
					.replaceAll("&|#", "")}.${EXNo}: ${
					document.querySelector<HTMLElement>(".main_body .titre").textContent
				}`;
			} else {
				exercise =
					document.querySelector<HTMLElement>(".main_body .titre").textContent;
			} // Results page, so no EXNo
		}
		if (document.querySelector(".oeftitle")) {
			if (
				document.querySelector(".oeftitle") &&
				document.querySelectorAll("kbd")[1] &&
				!document.querySelector(".oefanswer")
			) {
				[EXNo] = document.querySelectorAll("kbd")[1].textContent.match(/\d+/);
				exercise = `${
					document.querySelector<HTMLElement>(".oeftitle").textContent
				}: ${EXNo}`;
			} else
				exercise = document.querySelector<HTMLElement>(".oeftitle").textContent;
		}
		if (EXNo > "1") {
			// If exercise >1 get last time
			timestamp = parseInt(sessionStorage.getItem("TimeStampStorage"));
		} else if (
			document.querySelector(".answer") ||
			document.querySelector(".oefanswer")
		) {
			// If answer page hide time
			timestamp = 0;
		} else timestamp = Date.now(); // Else reset time
	} else if (document.baseURI.match(/(exam=)/)) {
		// In Exam
		worksheet = "";
		exercise =
			document.querySelector<HTMLElement>("h1.wims_title font").textContent;
		timeleft =
			Date.now() +
			(parseInt(
				document
					.querySelector<HTMLElement>("p#exam_clock")
					.textContent.split(":")[1]
			) *
				60 +
				parseInt(
					document
						.querySelector<HTMLElement>("p#exam_clock")
						.textContent.split(":")[2]
				)) *
				1000;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: classname + worksheet,
		state: exercise,
		startTimestamp: timestamp,
		endTimestamp: timeleft,
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/W/WIMS/assets/logo.png",
	};
	if (loggedout) presence.setActivity();
	else presence.setActivity(presenceData);
	if (EXNo) sessionStorage.setItem("TimeStampStorage", timestamp.toString());
});
