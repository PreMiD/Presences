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
    clientId: "684124119146692619",
    mediaKeys: false,
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let data = {
        largeImageKey: "mangalib_large"
    };
    let route = document.location.pathname;
    let query = document.location.search;
    if (route === "/") {
        if (query === '?section=all-updates') {
            data.details = "Обновления манги";
            data.startTimestamp = 0;
        }
        else {
            data.details = "Главная страница";
            data.startTimestamp = 0;
        }
    }
    else if (route === "/manga-list") {
        data.smallImageText = "Ищет";
        data.smallImageKey = "search";
        data.startTimestamp = 0;
        data.details = 'Каталог';
        const queryType = query.split('&').find(q => q.match('types'));
        const typeNumber = queryType ? queryType.split('=')[1] : null;
        switch (typeNumber) {
            case "1":
                data.state = `Ищу мангу`;
                break;
            case "4":
                data.state = `Ищу OEL-мангу`;
                break;
            case "5":
                data.state = `Ищу манхву`;
                break;
            case "6":
                data.state = `Ищу маньхуа`;
                break;
            case "8":
                data.state = `Ищу румангу`;
                break;
            case "9":
                data.state = `Ищу западный комикс`;
                break;
            default:
                data.state = `Ищу мангу`;
                break;
        }
    }
    else if (route.startsWith("/user/")) {
        const userRoute = document.location.href.split('/').slice(5)[0];
        let username = (document.querySelector('.profile-user .profile-user__username span'));
        if (!userRoute) {
            let bookmarkSize = (document.querySelector('.bookmark-sidebar .menu.bookmark-menu .menu__item .bookmark-menu__label'));
            data.details = `Закладки ${username.innerText}`;
            data.state = `Всего: ${bookmarkSize.innerText.trim()}`;
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = 0;
        }
        else if (userRoute === 'comment') {
            data.details = `Профиль ${username.innerText}`;
            data.state = 'Комментарии';
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = 0;
        }
        else if (userRoute === 'following') {
            data.details = `Профиль ${username.innerText}`;
            data.state = 'Cписок друзей';
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = 0;
        }
    }
    else if (route.startsWith("/forum")) {
        const queryCategory = query.split('&').find(q => q.match('category'));
        let categoryValue = queryCategory ? queryCategory.split('=')[1] : null;
        if (categoryValue === 'all')
            categoryValue = '0';
        data.details = "Форум";
        data.smallImageText = "Читает";
        data.smallImageKey = "reading";
        const categories = Array.from(document.querySelectorAll('.f-categories__items .f-category')).splice(2);
        const currentCategory = (categories.find((item, index) => index === parseInt(categoryValue)));
        if (currentCategory) {
            data.state = currentCategory.innerText;
        }
        const forumRoute = document.location.href.split('/').slice(4)[0];
        if (forumRoute === 'discussion') {
            const title = (document.querySelector('.discussion .discussion__title'));
            data.state = title.innerText;
        }
    }
    else if (route.startsWith("/messages")) {
        data.details = 'Сообщения';
        data.smallImageText = "Пишет";
        data.smallImageKey = "writing";
    }
    else if (route.startsWith("/manga")) {
        let arr = route.split('/');
        const action = arr[arr.length - 1];
        if (action === "edit") {
            data.details = 'Редактирует мангу';
            data.smallImageText = "Редактирует";
            data.smallImageKey = "writing";
        }
        else if (action === "bulk-create") {
            data.details = 'Добавляет главы';
            data.smallImageText = "Добавляет";
            data.smallImageKey = "uploading";
        }
        else if (action === "add-chapter") {
            data.details = "Добавляет главу";
            data.smallImageText = "Добавляет";
            data.smallImageKey = "uploading";
        }
        else if (action === "create") {
            data.details = 'Добавляет мангу';
            data.smallImageText = "Пишет";
            data.smallImageKey = "writing";
        }
    }
    else {
        let isReader = document.querySelector(".reader");
        if (isReader) {
            const titleArray = document.title.split(' ');
            const mangaName = titleArray.slice(2, -4).join(' ');
            data.details = 'Читает тайтл';
            data.state = mangaName;
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = browsingStamp;
        }
        else {
            const title = document.title;
            const mangaName = title.split('/')[0].split(' ').slice(1).join(' ');
            data.details = 'Смотрит на тайтл';
            data.state = mangaName;
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = browsingStamp;
        }
    }
    presence.setActivity(data, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTFELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLElBQUksR0FBaUI7UUFDdkIsYUFBYSxFQUFFLGdCQUFnQjtLQUNoQyxDQUFDO0lBRUYsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUE7SUFDdEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUE7SUFHcEMsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUNqQjtRQUVFLElBQUksS0FBSyxLQUFLLHNCQUFzQixFQUNwQztZQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUE7WUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUE7U0FDeEI7YUFFRDtZQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUE7U0FDeEI7S0FDRjtTQUVJLElBQUksS0FBSyxLQUFLLGFBQWEsRUFDaEM7UUFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQTtRQUV4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