var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
    clientId: "643771565951025153"
});

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        postTitle = document.querySelector("#content-body-area > div > div > div.content-heading > h1");

    if (page.includes("/kategori/")) {
        const category = document.title[0].toUpperCase() + document.title.replace(" - Ekşi Şeyler", "").slice(1, document.title.length).toLowerCase();

        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir kategoriye göz atıyor:",
            state: category && category != "" ? category : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/kanal/")) {
        const channel = document.title[0].toUpperCase() + document.title.replace(" - Ekşi Şeyler", "").slice(1, document.title.length).toLowerCase();

        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir kanala göz atıyor:",
            state: channel && channel != "" ? channel : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page.includes("/derleme/arama/")) {
        const searchingFor = document.querySelector("#main-content > div > div > div.search-result-info > span");

        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir şey arıyor:",
            state: searchingFor && searchingFor.textContent != "" ? searchingFor.textContent : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (postTitle && postTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir gönderiyi okuyor:",
            state: postTitle.textContent || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else {
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
}));