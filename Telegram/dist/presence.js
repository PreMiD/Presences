var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "664595715242197008",
    
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let path = document.location.href;
    let presenceData = {
        largeImageKey: "telegram"
    };
    let title = document.querySelector('body > div.page_wrap > div:nth-child(1) > div > div > div.tg_head_main_wrap > div > div.tg_head_peer_title_wrap > a > div > span.tg_head_peer_title');
    if (title && title.textContent) {
        let textArea = document.querySelector('body > div.page_wrap > div.im_page_wrap.clearfix > div > div.im_history_col_wrap.noselect.im_history_loaded > div.im_history_selected_wrap > div > div.im_bottom_panel_wrap > div.im_send_panel_wrap.noselect > div > div > div > form > div.im_send_field_wrap.hasselect > textarea');
        let messages = document.querySelectorAll('div.im_message_body');
        presenceData.details = "Talking this " + (path.includes('p=@') || path.includes('p=u') ? "user" : "group") + ":";
        presenceData.state = title.textContent;
        presenceData.smallImageKey = textArea.value.length >= 1 ? "writing" : "reading";
        presenceData.smallImageText = textArea.value.length >= 1 ? "Typing a message." : `Reading ${messages.length} message${messages.length > 1 ? 's' : ''}.`;
    }
    else {
        presenceData.details = "Logging in..";
    }
    presence.setActivity(presenceData);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVqQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVsQyxJQUFJLFlBQVksR0FBaUI7UUFDN0IsYUFBYSxFQUFFLFVBQVU7S0FDNUIsQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMscUpBQXFKLENBQUMsQ0FBQztJQUUxTCxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1FBRTVCLElBQUksUUFBUSxHQUF3QixRQUFRLENBQUMsYUFBYSxDQUFDLHNSQUFzUixDQUFDLENBQUM7UUFDblYsSUFBSSxRQUFRLEdBQWEsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFMUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLEdBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQzdHLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUV2QyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEYsWUFBWSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxXQUFXLFFBQVEsQ0FBQyxNQUFNLFdBQVcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7S0FFM0o7U0FFSTtRQUVELFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0tBRXpDO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUEsQ0FBQyxDQUFDIn0=