var presence = new Presence({
  clientId: "664595715242197008"
});

presence.on("UpdateData", async () => {
  const path = document.location.href,
    showName = await presence.getSetting("name"),
    presenceData: PresenceData = {
      largeImageKey: "telegram"
    };

  const title = document.querySelector(
    "body > div.page_wrap > div:nth-child(1) > div > div > div.tg_head_main_wrap > div > div.tg_head_peer_title_wrap > a > div > span.tg_head_peer_title"
  );

  if (title && title.textContent) {
    const textArea: HTMLTextAreaElement = document.querySelector(
      "body > div.page_wrap > div.im_page_wrap.clearfix > div > div.im_history_col_wrap.noselect.im_history_loaded > div.im_history_selected_wrap > div > div.im_bottom_panel_wrap > div.im_send_panel_wrap.noselect > div > div > div > form > div.im_send_field_wrap.hasselect > textarea"
    );
    const messages: NodeList = document.querySelectorAll("div.im_message_body");

    if (showName) {
      presenceData.details =
        "Talking to this " +
        (path.includes("p=@") || path.includes("p=u") ? "user" : "group") +
        ":";
      presenceData.state = title.textContent;
    } else {
      presenceData.details = "Talking to someone";
    }

    presenceData.smallImageKey =
      textArea.value.length >= 1 ? "writing" : "reading";
    presenceData.smallImageText =
      textArea.value.length >= 1
        ? "Typing a message."
        : `Reading ${messages.length} message${
            messages.length > 1 ? "s" : ""
          }.`;
  } else {
    presenceData.details = "Logging in..";
  }

  presence.setActivity(presenceData);
});
