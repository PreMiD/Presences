/* eslint-disable no-case-declarations */
const presence = new Presence({
	clientId: "991933219719086080",
}),
browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
let presenceData: PresenceData = {
	largeImageKey: "logo",
};
	
	if(document.location.pathname.includes("/account")) {
		presenceData.details = "Viewing account";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	} else if(document.location.pathname.includes("/wl")) {
		presenceData.details = "Viewing wishlist";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	} else if(document.location.pathname.includes("/library")) {
		presenceData.details = "Viewing library";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	} else if(document.location.pathname.includes("/pd")) {
		const title = document.querySelector("h1.bc-heading.bc-color-base.bc-pub-break-word.bc-text-bold").textContent;
		console.log(title);
		const author = document.querySelector("li.bc-list-item.authorLabel > a.bc-link.bc-color-link").textContent;
		console.log(author);
		const cover = document.querySelector("img.bc-pub-block.bc-image-inset-border.js-only-element").getAttribute("src");
		console.log(cover);
		presenceData.details = `Viewing ${title} by ${author}`;
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.largeImageKey = cover;
	} else {
		presenceData.details = "Browsing";
		delete presenceData.state;
		presenceData.startTimestamp = browsingTimestamp;
	}
presence.setActivity(presenceData);
});