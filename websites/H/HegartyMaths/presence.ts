const presence = new Presence({
		clientId: "935600572457963561"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function getQueryVariable(v: string) {
	const vars = window.location.search.substring(1).split("&");
	for (let i = 0; i < vars.length; i++)
		if (vars[i].split("=")[0] === v) return vars[i].split("=")[1];
	return false;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		startTimestamp: browsingTimestamp
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname.includes("/login/")
	)
		presenceData.details = "Viewing home page";
	else if (document.location.pathname === "/my-stats") {
		presenceData.details = "Viewing profile";
		const correct = Math.round(
			(Number(
				document.querySelector("div#vue-tooltip-6 small span").innerHTML
			) /
				Number(
					document.querySelector("div#vue-tooltip-5 small span").innerHTML
				)) *
				100
		);
		presenceData.state = `${correct}% correct answers`;
	} else if (document.location.pathname === "/assessment") {
		if (
			document.querySelectorAll("ul.Assessment__breadcrumb li")[0].innerHTML ===
			"Fix Up 5"
		) {
			presenceData.details = "Revising";
			presenceData.state = "Fix Up 5";
		} else {
			presenceData.details = "Doing a lesson";

			presenceData.state = new DOMParser().parseFromString(
				document.querySelectorAll("ul.Assessment__breadcrumb li")[2].innerHTML,
				"text/html"
			).documentElement.textContent;
		}
	} else if (document.location.pathname.includes("/progress"))
		presenceData.details = "Choosing a lesson";
	else if (document.location.pathname.includes("scores")) {
		switch (getQueryVariable("filter")) {
			case "green":
				presenceData.details = "Viewing green scores";
				break;
			case "amber":
				presenceData.details = "Viewing amber scores";
				break;
			case "red":
				presenceData.details = "Viewing red scores";
				break;
			default:
				presenceData.details = "Viewing all scores";
				break;
		}
		const text = document.querySelector("div.row div.col-xs-12").innerHTML,
			outof = Math.ceil(
				Number(text.substring(text.indexOf("f ") + 1).slice(0, 4)) / 10
			);
		presenceData.state = `Page ${
			getQueryVariable("page") ? getQueryVariable("page") : 1
		} of ${outof === 0 ? 1 : outof}`;
	} else if (document.location.pathname === "/tasks") {
		presenceData.details = "Viewing tasks";
		if (document.querySelector("div.text-grey-darker h3").innerHTML)
			presenceData.state = "No tasks";
	} else if (document.location.pathname === "/fixup5") {
		presenceData.details = "Revising";
		presenceData.state = "Fix Up 5";
	} else if (document.location.pathname === "/memri") {
		presenceData.details = "Revising";
		presenceData.state = "Memri";
	}
	presence.setActivity(presenceData);
});
