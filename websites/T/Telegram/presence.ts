const presence = new Presence({
	clientId: "664595715242197008"
});

function setPresenceData(
	presenceData: PresenceData,
	showName: boolean,
	activeChatDetails: Element,
	isLoggedIn?: boolean,
	textArea?: HTMLElement,
	messagesCount?: number,
	statusSpan?: HTMLElement
): PresenceData {
	if (activeChatDetails?.textContent) {
		if (showName) {
			presenceData.details = `Talking to this ${
				statusSpan?.textContent.includes("member") ? "group" : "user"
			}:`;
			presenceData.state = activeChatDetails.textContent;
		} else presenceData.details = "Talking to someone";
		presenceData.smallImageKey =
			textArea && textArea.textContent.length >= 1 ? "writing" : "reading";
		presenceData.smallImageText =
			textArea && textArea.textContent.length >= 1
				? "Typing a message"
				: `Reading ${messagesCount} message${messagesCount > 1 ? "s" : ""}`;
	} else if (isLoggedIn) presenceData.details = "Logged in";
	else presenceData.details = "Logging in...";
	return presenceData;
}

presence.on("UpdateData", async () => {
	const showName: boolean = await presence.getSetting<boolean>("name");
	let presenceData: PresenceData = {
			largeImageKey: "telegram"
		},
		isLoggedIn: boolean,
		activeChatDetails: HTMLElement,
		textArea: HTMLElement,
		messagesCount: number,
		statusSpan: HTMLElement;
	if (document.location.href.includes("legacy=1"))
		// if web client is the classic version
		(activeChatDetails = document.querySelector(
			"body > div.page_wrap > div:nth-child(1) > div > div > div.tg_head_main_wrap > div > div.tg_head_peer_title_wrap > a > div > span.tg_head_peer_title"
		)),
			(isLoggedIn =
				document.getElementsByClassName("im_history_not_selected_wrap")
					?.length > 0),
			(textArea = document.querySelector("div.composer_rich_textarea")),
			(messagesCount = document.querySelectorAll("div.im_message_body").length),
			(statusSpan = document.querySelector(".tg_head_peer_status"));
	else if (document.location.href.includes("/k/")) {
		(activeChatDetails = document.querySelector(
			"#column-center > div.chats-container > div.chat > div.sidebar-header > div.chat-info-container > div.chat-info > div.person > div.content > div.top > div.user-title > span.peer-title"
		)),
			(isLoggedIn =
				document.getElementsByClassName("chat-background-item is-visible")[0]
					?.childElementCount < 1),
			(textArea = document.querySelector(".input-message-input")),
			(messagesCount = document.getElementsByClassName("message").length),
			(statusSpan = document.querySelector(
				"div.content > div.bottom > div.info > span.i18n"
			));
	} else if (document.location.href.includes("/z/")) {
		(activeChatDetails = document.querySelector(
			"#MiddleColumn > div.messages-layout > div.MiddleHeader > div.Transition.slide-fade > div.Transition__slide--active > div.chat-info-wrapper > div.ChatInfo > div.info > div.title > h3"
		)),
			(isLoggedIn = !!document.getElementById("middle-column-bg")),
			(textArea = document.getElementById("editable-message-text")),
			(messagesCount = document.getElementsByClassName("Message").length),
			(statusSpan = document.querySelector("span.status"));
	}
	presenceData = {
		...presenceData,
		...setPresenceData(
			presenceData,
			showName,
			activeChatDetails,
			isLoggedIn,
			textArea,
			messagesCount,
			statusSpan
		)
	};

	presence.setActivity(presenceData);
});
