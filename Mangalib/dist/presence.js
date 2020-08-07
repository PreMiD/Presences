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
        largeImageKey: "mangalib_large",
    };
    let route = document.location.pathname;
    let query = document.location.search;
    if (route === "/") {
        if (query === "?section=all-updates") {
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
        data.details = "Каталог";
        const queryType = query.split("&").find((q) => q.match("types"));
        const typeNumber = queryType ? queryType.split("=")[1] : null;
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
        const userPage = document.location.href.split("/").slice(4)[0];
        console.log(userPage);
        if (userPage === 'content') {
            data.details = `Мои добавления`;
            data.smallImageText = "Пишет";
            data.smallImageKey = "writing";
            data.startTimestamp = 0;
            const typeList = [
                { id: 1, name: 'moderation' },
                { id: 2, name: 'rejected' },
                { id: 3, name: 'chapters' }
            ];
            let type = typeList.find(i => i.name === document.location.href.split("/").slice(5)[0]);
            if (!type)
                type = 0;
            if (type)
                type = type.id;
            const categories = Array.from(document.querySelectorAll(".menu.menu_page .menu__item .menu__text"));
            const currentCategory = (categories.find((item, index) => index === type));
            if (currentCategory) {
                data.state = currentCategory.innerText;
            }
        }
        else if (userPage.match('edit')) {
            data.details = `Мои настройки`;
            data.smallImageText = "Настраивает";
            data.smallImageKey = "writing";
            data.startTimestamp = 0;
            let section = query.split('=')[1];
            const sections = [
                { id: 0, name: 'info' },
                { id: 1, name: 'site-settings' },
                { id: 2, name: 'notifications' },
                { id: 3, name: 'password' }
            ];
            section = sections.find(s => s.name === section).id;
            const categories = Array.from(document.querySelectorAll(".menu.menu_page .menu__item"));
            const currentCategory = (categories.find((item, index) => index === parseInt(section)));
            if (currentCategory) {
                data.state = currentCategory.innerText;
            }
        }
        else {
            const userRoute = document.location.href.split("/").slice(5)[0];
            let username = (document.querySelector(".profile-user .profile-user__username span"));
            if (!userRoute) {
                let bookmarkSize = (document.querySelector(".bookmark-sidebar .menu.bookmark-menu .menu__item .bookmark-menu__label"));
                data.details = `Закладки ${username.innerText}`;
                data.state = `Всего: ${bookmarkSize.innerText.trim()}`;
                data.smallImageText = "Читает";
                data.smallImageKey = "reading";
                data.startTimestamp = 0;
            }
            else if (userRoute === "comment") {
                data.details = `Профиль ${username.innerText}`;
                data.state = "Комментарии";
                data.smallImageText = "Читает";
                data.smallImageKey = "reading";
                data.startTimestamp = 0;
            }
            else if (userRoute === "following") {
                data.details = `Профиль ${username.innerText}`;
                data.state = "Cписок друзей";
                data.smallImageText = "Читает";
                data.smallImageKey = "reading";
                data.startTimestamp = 0;
            }
            else if (userRoute === 'ban') {
                data.details = `Профиль ${username.innerText}`;
                data.state = "Список банов";
                data.smallImageText = "Смотрит";
                data.smallImageKey = "reading";
                data.startTimestamp = 0;
            }
        }
    }
    else if (route.startsWith("/forum")) {
        const queryCategory = query.split("&").find((q) => q.match("category"));
        let categoryValue = queryCategory ? queryCategory.split("=")[1] : null;
        if (categoryValue === "all")
            categoryValue = "0";
        data.details = "Форум";
        data.smallImageText = "Читает";
        data.smallImageKey = "reading";
        const categories = Array.from(document.querySelectorAll(".f-categories__items .f-category")).splice(2);
        const currentCategory = (categories.find((item, index) => index === parseInt(categoryValue)));
        if (currentCategory) {
            data.state = currentCategory.innerText;
        }
        const forumRoute = document.location.href.split("/").slice(4)[0];
        if (forumRoute === "discussion") {
            const title = (document.querySelector(".discussion .discussion__title"));
            data.state = title.innerText;
        }
    }
    else if (route.startsWith("/messages")) {
        data.details = "Сообщения";
        data.smallImageText = "Пишет";
        data.smallImageKey = "writing";
    }
    else if (route.startsWith('/people')) {
        let arr = route.split("/");
        const action = arr[arr.length - 1];
        if (action === 'create') {
            data.details = "Добавляет автора";
            data.smallImageText = "Добавляет автора";
            data.smallImageKey = "writing";
            let title = document.getElementById('name');
            if (title.value.length > 1) {
                data.state = title.value;
            }
            else {
                data.state = 'Имя команды не задано';
            }
        }
    }
    else if (route.startsWith('/team')) {
        let arr = route.split("/");
        const action = arr[arr.length - 1];
        if (action === 'create') {
            data.details = "Добавляет команду";
            data.smallImageText = "Добавляет команду";
            data.smallImageKey = "writing";
            let title = document.getElementById('name');
            if (title.value.length > 1) {
                data.state = title.value;
            }
            else {
                data.state = 'Имя команды не задано';
            }
        }
    }
    else if (route.startsWith("/manga")) {
        let arr = route.split("/");
        const action = arr[arr.length - 1];
        if (action === "edit") {
            data.details = "Редактирует мангу";
            data.smallImageText = "Редактирует";
            data.smallImageKey = "writing";
        }
        else if (action === "bulk-create") {
            data.details = "Добавляет главы";
            data.smallImageText = "Добавляет";
            data.smallImageKey = "uploading";
        }
        else if (action === "add-chapter") {
            data.details = "Добавляет главу";
            data.smallImageText = "Добавляет";
            data.smallImageKey = "uploading";
        }
        else if (action === "create") {
            data.details = "Добавляет мангу";
            data.smallImageText = "Пишет";
            data.smallImageKey = "writing";
            let title = document.getElementById('rus_name');
            if (title.value.length > 1) {
                data.state = title.value;
            }
            else {
                data.state = 'Имя тайтла не задано';
            }
        }
        else {
            data.details = "Редактировать главу";
            data.smallImageText = "Пишет";
            data.smallImageKey = "writing";
            const title = document.querySelector('.section__header .breadcrumb a');
            if (title) {
                data.state = title.innerText;
            }
        }
    }
    else if (route.startsWith('/faq')) {
        const querySection = query.split('&')[0];
        const section = querySection.slice((querySection.length - 1));
        const categories = Array.from(document.querySelectorAll(".faq-category-list .faq-category-item"));
        const currentCategory = (categories.find((item, index) => index === parseInt(section) - 1));
        data.details = "Faq";
        data.smallImageText = "Читает";
        data.smallImageKey = "reading";
        if (currentCategory) {
            data.state = currentCategory.innerText;
        }
    }
    else if (route.startsWith('/news')) {
        const newsRoute = document.location.href.split("/").slice(4)[0];
        if (newsRoute) {
            let newsTitle = (document.querySelector(".news__title"));
            data.details = "Новости";
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            if (newsTitle) {
                data.state = newsTitle.innerText;
            }
        }
        else {
            data.details = "Новости";
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.state = 'Список новостей';
        }
    }
    else if (route.startsWith('/contact')) {
        data.details = "Контакты";
        data.smallImageText = "Пишет";
        data.smallImageKey = "writing";
        data.state = 'Свяжитесь с нами';
    }
    else {
        let isReader = document.querySelector(".reader");
        if (isReader) {
            const titleArray = document.title.split(" ");
            const mangaName = titleArray.slice(2, -4).join(" ");
            data.details = "Читает тайтл";
            data.state = mangaName;
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = browsingStamp;
        }
        else {
            const title = document.title;
            const mangaName = title
                .split("/")[0]
                .split(" ")
                .slice(1)
                .join(" ");
            data.details = "Смотрит на тайтл";
            data.state = mangaName;
            data.smallImageText = "Читает";
            data.smallImageKey = "reading";
            data.startTimestamp = browsingStamp;
        }
    }
    presence.setActivity(data, true);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRTFELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVuQyxJQUFJLElBQUksR0FBaUI7UUFDdkIsYUFBYSxFQUFFLGdCQUFnQjtLQUNoQyxDQUFDO0lBRUYsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdkMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFHckMsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUNqQjtRQUNFLElBQUksS0FBSyxLQUFLLHNCQUFzQixFQUNwQztZQUVFLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7U0FDekI7YUFFRDtZQUVFLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7U0FDekI7S0FDRjtTQUVJLElBQUksS0FBSyxLQUFLLGFBQWEsRUFDaEM7UUFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUV6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