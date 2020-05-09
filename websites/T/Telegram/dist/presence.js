var presence = new Presence({
    clientId: "664595715242197008"
});
presence.on("UpdateData", async () => {
    const path = document.location.href;
    const presenceData = {
        largeImageKey: "telegram"
    };
    const title = document.querySelector("body > div.page_wrap > div:nth-child(1) > div > div > div.tg_head_main_wrap > div > div.tg_head_peer_title_wrap > a > div > span.tg_head_peer_title");
    if (title && title.textContent) {
        const textArea = document.querySelector("body > div.page_wrap > div.im_page_wrap.clearfix > div > div.im_history_col_wrap.noselect.im_history_loaded > div.im_history_selected_wrap > div > div.im_bottom_panel_wrap > div.im_send_panel_wrap.noselect > div > div > div > form > div.im_send_field_wrap.hasselect > textarea");
        const messages = document.querySelectorAll("div.im_message_body");
        presenceData.details =
            "Talking this " +
                (path.includes("p=@") || path.includes("p=u") ? "user" : "group") +
                ":";
        presenceData.state = title.textContent;
        presenceData.smallImageKey =
            textArea.value.length >= 1 ? "writing" : "reading";
        presenceData.smallImageText =
            textArea.value.length >= 1
                ? "Typing a message."
                : `Reading ${messages.length} message${messages.length > 1 ? "s" : ""}.`;
    }
    else {
        presenceData.details = "Logging in..";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBRXBDLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsVUFBVTtLQUMxQixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMscUpBQXFKLENBQ3RKLENBQUM7SUFFRixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1FBQzlCLE1BQU0sUUFBUSxHQUF3QixRQUFRLENBQUMsYUFBYSxDQUMxRCxzUkFBc1IsQ0FDdlIsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFhLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRTVFLFlBQVksQ0FBQyxPQUFPO1lBQ2xCLGVBQWU7Z0JBQ2YsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNqRSxHQUFHLENBQUM7UUFDTixZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFFdkMsWUFBWSxDQUFDLGFBQWE7WUFDeEIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNyRCxZQUFZLENBQUMsY0FBYztZQUN6QixRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUN4QixDQUFDLENBQUMsbUJBQW1CO2dCQUNyQixDQUFDLENBQUMsV0FBVyxRQUFRLENBQUMsTUFBTSxXQUN4QixRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUM5QixHQUFHLENBQUM7S0FDWDtTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7S0FDdkM7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=