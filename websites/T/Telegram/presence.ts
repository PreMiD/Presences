// BUG: "Writing" status doesn't work on classic

const presence = new Presence({
	clientId: "664595715242197008"
});

async function legacyVer(): Promise<PresenceData> {
	// for classic version, tested on 0.7.0 and still works fine
	const showName = await presence.getSetting<boolean>("name"),
		presenceData: PresenceData = {
			largeImageKey: "telegram"
		},
		title = document.querySelector(
			"body > div.page_wrap > div:nth-child(1) > div > div > div.tg_head_main_wrap > div > div.tg_head_peer_title_wrap > a > div > span.tg_head_peer_title"
		);

	if (title && title.textContent) {
		const textArea: HTMLElement = document.querySelector(
				"div.composer_rich_textarea"
			),
			messages: NodeList = document.querySelectorAll("div.im_message_body"),
			statusSpan: HTMLElement = document.querySelector(".tg_head_peer_status");
		if (showName) {
			presenceData.details = `Talking to this ${
				statusSpan?.textContent.includes("member") ? "group" : "user"
			}:`;
			presenceData.state = title.textContent;
		} else presenceData.details = "Talking to someone";

		presenceData.smallImageKey =
			textArea.textContent.length >= 1 ? "writing" : "reading";
		presenceData.smallImageText =
			textArea.textContent.length >= 1
				? "Typing a message."
				: `Reading ${messages.length} message${
						messages.length > 1 ? "s" : ""
				  }.`;
	} else if (
		document.getElementsByClassName("im_history_not_selected_wrap").length > 0
	)
		presenceData.details = "Logged in";
	else presenceData.details = "Logging in..";
	return presenceData;
}

async function kVer(): Promise<PresenceData> {
	// for K version (Telegram WebK alpha 1.1.0 (103))
	const presenceData: PresenceData = {
			largeImageKey: "telegram"
		},
		showName: boolean = await presence.getSetting<boolean>("name"),
		activeChatDetails = document.querySelector(
			"#column-center > div.chats-container > div.chat > div.sidebar-header > div.chat-info-container > div.chat-info > div.person > div.content > div.top > div.user-title > span.peer-title"
		);
	if (activeChatDetails) {
		const textArea: HTMLElement = document.querySelector(
				".input-message-input"
			),
			messagesCount: number = document.getElementsByClassName("message").length,
			statusSpan: HTMLElement = document.querySelector(
				"div.content > div.bottom > div.info > span.i18n"
			);
		if (showName) {
			presenceData.details = `Talking to this ${
				statusSpan?.textContent.includes("member") ? "group" : "user"
			}:`;
			presenceData.state = activeChatDetails.textContent;
		} else presenceData.details = "Talking to someone";
		presenceData.smallImageKey =
			textArea?.textContent.length > 1 ? "writing" : "reading";
		presenceData.smallImageText =
			textArea?.textContent.length > 1
				? "Typing a message"
				: `Reading ${messagesCount} message${messagesCount > 1 ? "s" : ""}`;
	} else if (
		document.getElementsByClassName("chat-background-item is-visible")[0]
			.childElementCount < 1
	)
		presenceData.details = "Logged in";
	else presenceData.details = "Logging in...";
	return presenceData;
}

async function zVer(): Promise<PresenceData> {
	// for Z version (Telegram WebZ 1.33.4)
	const presenceData: PresenceData = {
			largeImageKey: "telegram"
		},
		showName: boolean = await presence.getSetting<boolean>("name"),
		activeChatDetails: Element = document.querySelector(
			"#MiddleColumn > div.messages-layout > div.MiddleHeader > div.Transition.slide-fade > div.Transition__slide--active > div.chat-info-wrapper > div.ChatInfo > div.info > div.title > h3"
		);
	if (activeChatDetails) {
		const textArea: HTMLElement = document.getElementById(
				"editable-message-text"
			),
			messagesCount: number = document.getElementsByClassName("Message").length,
			statusSpan: HTMLElement = document.querySelector("span.status");
		if (showName) {
			presenceData.details = `Talking to this ${
				statusSpan?.textContent.includes("member") ? "group" : "user"
			}:`;
			presenceData.state = activeChatDetails.textContent;
		} else presenceData.details = "Talking to someone";
		presenceData.smallImageKey =
			textArea && textArea.textContent.length > 0 ? "writing" : "reading";
		presenceData.smallImageText =
			textArea && textArea.textContent.length > 0
				? "Typing a message"
				: `Reading ${messagesCount} message${messagesCount > 1 ? "s" : ""}`;
	} else if (document.getElementById("middle-column-bg"))
		presenceData.details = "Logged in";
	else presenceData.details = "Logging in...";
	return presenceData;
}

presence.on("UpdateData", async () => {
	let presenceData;
	if (document.location.href.includes("legacy=1"))
		// if web client is the classic version
		presenceData = await legacyVer();
	else if (document.location.href.includes("/k/")) presenceData = await kVer();
	else if (document.location.href.includes("/z/")) presenceData = await zVer();
	presence.setActivity(presenceData);
});
