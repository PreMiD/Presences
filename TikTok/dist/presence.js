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
    clientId: "621881103380381716",
    mediaKeys: false
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "tiktok-logo"
    };
    var path = document.location.pathname;
    if (path.includes("/trending")) {
        data.details = "Viewing Trending";
        data.startTimestamp = elapsed;
    }
    else if (path.includes("/tag")) {
        var tag = document.querySelector("._challenge_header_title").textContent;
        data.details = "Viewing a tag";
        data.state = tag;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/@")) {
        if (path.includes("/video/")) {
            var user = document.querySelector("._video_card_big_user_info_handle").textContent;
            data.details = "Viewing a TikTok";
            data.state = user;
            data.startTimestamp = elapsed;
        }
        else {
            var user = document.querySelector("._user_header_uniqueId").textContent;
            data.details = "Viewing a Profile";
            data.state = user;
            data.startTimestamp = elapsed;
        }
    }
    else {
        data.details = "Viewing the Homepage";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
}));
