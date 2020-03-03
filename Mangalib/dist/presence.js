var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    }); 
};
let presence = new Presence({
	clientId: '684124119146692619',
	mediaKeys: false
})

let startDate = Math.floor(Date.now() / 1000)

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let route = document.location.href.split("/").slice(2);
    let presenceData = { largeImageKey: "mangalib_large", smallImageText: "mangalib" };

    presenceData.startTimestamp = startDate
    if (route.length === 2 && route[1] === "?section=all-updates") {
        presenceData.details = "Ждет мангу";
    }
    else if (route[1].match('manga-list')) {
        presenceData.details = `Ищет мангу`;
    } else if (route[1].match('forum')) {
        presenceData.details = "Читает форум";
    } else if (route[1].match('user')) {
        let username = document.getElementsByClassName('user__username text-truncate')[0]
        presenceData.details = "Открыл профиль";
        if (username) presenceData.state = username.innerText;
    } else if (route[1].match('bookmark')) {
        presenceData.details = "Смотрит закладки";
    } else if (route[1].match('messages')) {
        presenceData.details = "Проверяет сообщения";
    } else {
        let mangaName = document.getElementsByClassName('manga-bg__title')[0] || document.querySelector('.manga-title h1')
        if (!mangaName) {
            mangaName = document.getElementsByClassName('reader-header-info__name-rus text-truncate')[0]

            presenceData.state = mangaName.innerText;
            presenceData.details = "Читает мангу";
        } else {
            if (mangaName) presenceData.state = mangaName.innerText;
            presenceData.details = "Просматривает мангу";
        }
    }
    
    presence.setActivity(presenceData);
}))
