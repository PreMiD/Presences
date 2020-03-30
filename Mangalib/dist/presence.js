var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    }); 
};


let presence = new Presence({ clientId: '684124119146692619',  })

let startDate = Math.floor(Date.now() / 1000)
let locales = {
    main: 'На главной',
    updates: 'Смотрит обновления',
    manga: {
        action: {
            reading: 'Читает мангу',
            watching: 'Смотрит мангу',
            edit: 'Редактирует мангу',
            add: 'Добавляет главу',
            bulk: 'Добавляет главы',
            create: 'Добавляет мангу'
        }
    },
    search: {
        title: 'Ищет',
        types: {
            '1': 'Мангу',
            '5': 'Манхву',
            '6': 'Маньхуа',
            '4': 'OEL-мангу',
            '8': 'Румангу',
            '9': 'Западный комикс',
            all: 'Мангу'
        }
    },
    friends: {
        default: 'Друзья',
        mutual: 'Общие друзья'
    },
    forum: 'Читает форум',
    user: {
        title: 'Смотрит профиль',
        comment: 'Комментарии',
        friends: {
            default: 'Друзья',
            mutual: 'Общие друзья'
        }
    },
    bookmark: 'Проверяет закладки',
    messages: 'Проверяет сообщения'
}

let presenceData = { largeImageKey: "mangalib_large", startTimestamp: startDate, smallImageKey: 'reading' }

presence.on("UpdateData", () => {
    __awaiter(this, void 0, void 0, function* () {

        let PageRoute = document.location.href.split("/").splice(3)

        if (PageRoute.length == 0) { 
            presenceData.details = locales.main 
        } else if (PageRoute[0].match('section=all-updates')) { 
            presenceData.details = locales.updates
        } else if (PageRoute[0].match('manga-list')) {
            let type = PageRoute[0].split('[]=')[1]
            presenceData.smallImageText = 'Ищет'
            presenceData.smallImageKey = 'search'
            switch (type) {
                case '1': presenceData.details = `${locales.search.title} ${locales.search.types['1']}`
                    break;
                case '4': presenceData.details = `${locales.search.title} ${locales.search.types['4']}`
                    break;
                case '5': presenceData.details = `${locales.search.title} ${locales.search.types['5']}`
                    break;
                case '6': presenceData.details = `${locales.search.title} ${locales.search.types['6']}`
                    break;
                case '8': presenceData.details = `${locales.search.title} ${locales.search.types['8']}`
                    break;
                case '9': presenceData.details = `${locales.search.title} ${locales.search.types['9']}`
                    break;
                default: presenceData.details = `${locales.search.title} ${locales.search.types.all}`
                    break;
            }
        } else if (PageRoute[0] === 'bookmark') {
            presenceData.details = locales.bookmark 
            presenceData.smallImageText = 'Читает'
            presenceData.smallImageKey = 'reading'
        } else if (PageRoute[0] === 'forum') {
            presenceData.details = locales.forum
            presenceData.smallImageText = 'Читает'
            presenceData.smallImageKey = 'reading'
        } else if (PageRoute[0] === 'user'){
            let username = document.getElementsByClassName('user__username text-truncate')[0]
            presenceData.details = locales.user.title;
            presenceData.smallImageText = 'Читает'
            presenceData.smallImageKey = 'reading'

            if (username) {
                if (PageRoute[2] === 'comment') { presenceData.state = `${username.innerText} ❯ ${locales.user.comment}` } 
                else if (PageRoute[2] === 'following') { presenceData.state = `${username.innerText} ❯ ${locales.user.friends.default}` }
                else if (PageRoute[2] === 'mutual-friends') { presenceData.state = `${username.innerText} ❯ ${locales.user.friends.mutual}` }
                else { presenceData.state = username.innerText }
            }
        } else if (PageRoute[0] === 'messages') {
            presenceData.details = locales.messages
            presenceData.smallImageText = 'Пишет'
            presenceData.smallImageKey = 'writing'
        } else if (PageRoute[0] === 'manga') {
            let actionName = PageRoute[2]
            
            if (actionName && actionName.match('edit')) {
                presenceData.details = locales.manga.action.edit
                presenceData.smallImageText = 'Редактирует'
                presenceData.smallImageKey = 'writing'
            } else if (actionName && actionName === 'bulk-create') {
                presenceData.details = locales.manga.action.bulk
                presenceData.smallImageText = 'Добавляет'
                presenceData.smallImageKey = 'uploading'
            } else if (actionName && actionName === 'add-chapter') {
                presenceData.details = locales.manga.action.add
                presenceData.smallImageText = 'Добавляет'
                presenceData.smallImageKey = 'uploading'
            } else if (actionName && actionName === 'create') {
                presenceData.details = locales.manga.action.create
                presenceData.smallImageText = 'Пишет'
                presenceData.smallImageKey = 'writing'
            }
            
        } else {
            let mangaName = document.getElementsByClassName('manga-bg__title')[0] || document.querySelector('.manga-title h1')
            if (!mangaName) {
                mangaName = document.getElementsByClassName('reader-header-info__name-rus text-truncate')[0]

                presenceData.state = mangaName.innerText;
                presenceData.details = locales.manga.action.reading
                presenceData.smallImageText = 'Читает'
                presenceData.smallImageKey = 'reading'
            } else {
                if (mangaName) presenceData.state = mangaName.innerText;
                presenceData.details = locales.manga.action.watching
                presenceData.smallImageText = 'Читает'
                presenceData.smallImageKey = 'reading'
            }
        }

        presence.setActivity(presenceData, true)
    })
})
