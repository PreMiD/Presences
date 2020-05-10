const presence = new Presence({ clientId: "684124119146692619" });
const startDate = Math.floor(Date.now() / 1000);
const locales = {
    main: "На главной",
    updates: "Смотрит обновления",
    manga: {
        action: {
            reading: "Читает мангу",
            watching: "Смотрит мангу",
            edit: "Редактирует мангу",
            add: "Добавляет главу",
            bulk: "Добавляет главы",
            create: "Добавляет мангу"
        }
    },
    search: {
        title: "Ищет",
        types: {
            "1": "Мангу",
            "5": "Манхву",
            "6": "Маньхуа",
            "4": "OEL-мангу",
            "8": "Румангу",
            "9": "Западный комикс",
            all: "Мангу"
        }
    },
    friends: {
        default: "Друзья",
        mutual: "Общие друзья"
    },
    forum: "Читает форум",
    user: {
        title: "Смотрит профиль",
        comment: "Комментарии",
        friends: {
            default: "Друзья",
            mutual: "Общие друзья"
        }
    },
    bookmark: "Проверяет закладки",
    messages: "Проверяет сообщения"
};
const presenceData = {
    largeImageKey: "mangalib_large",
    startTimestamp: startDate,
    smallImageKey: "reading"
};
presence.on("UpdateData", async () => {
    const PageRoute = document.location.href.split("/").splice(3);
    if (PageRoute.length == 0) {
        presenceData.details = locales.main;
    }
    else if (PageRoute[0].match("section=all-updates")) {
        presenceData.details = locales.updates;
    }
    else if (PageRoute[0].match("manga-list")) {
        const type = PageRoute[0].split("[]=")[1];
        presenceData.smallImageText = "Ищет";
        presenceData.smallImageKey = "search";
        switch (type) {
            case "1":
                presenceData.details = `${locales.search.title} ${locales.search.types["1"]}`;
                break;
            case "4":
                presenceData.details = `${locales.search.title} ${locales.search.types["4"]}`;
                break;
            case "5":
                presenceData.details = `${locales.search.title} ${locales.search.types["5"]}`;
                break;
            case "6":
                presenceData.details = `${locales.search.title} ${locales.search.types["6"]}`;
                break;
            case "8":
                presenceData.details = `${locales.search.title} ${locales.search.types["8"]}`;
                break;
            case "9":
                presenceData.details = `${locales.search.title} ${locales.search.types["9"]}`;
                break;
            default:
                presenceData.details = `${locales.search.title} ${locales.search.types.all}`;
                break;
        }
    }
    else if (PageRoute[0] === "bookmark") {
        presenceData.details = locales.bookmark;
        presenceData.smallImageText = "Читает";
        presenceData.smallImageKey = "reading";
    }
    else if (PageRoute[0] === "forum") {
        presenceData.details = locales.forum;
        presenceData.smallImageText = "Читает";
        presenceData.smallImageKey = "reading";
    }
    else if (PageRoute[0] === "user") {
        const username = document.getElementsByClassName("user__username text-truncate")[0];
        presenceData.details = locales.user.title;
        presenceData.smallImageText = "Читает";
        presenceData.smallImageKey = "reading";
        if (username) {
            if (PageRoute[2] === "comment") {
                presenceData.state = `${username.textContent} ❯ ${locales.user.comment}`;
            }
            else if (PageRoute[2] === "following") {
                presenceData.state = `${username.textContent} ❯ ${locales.user.friends.default}`;
            }
            else if (PageRoute[2] === "mutual-friends") {
                presenceData.state = `${username.textContent} ❯ ${locales.user.friends.mutual}`;
            }
            else {
                presenceData.state = username.textContent;
            }
        }
    }
    else if (PageRoute[0] === "messages") {
        presenceData.details = locales.messages;
        presenceData.smallImageText = "Пишет";
        presenceData.smallImageKey = "writing";
    }
    else if (PageRoute[0] === "manga") {
        const actionName = PageRoute[2];
        if (actionName && actionName.match("edit")) {
            presenceData.details = locales.manga.action.edit;
            presenceData.smallImageText = "Редактирует";
            presenceData.smallImageKey = "writing";
        }
        else if (actionName && actionName === "bulk-create") {
            presenceData.details = locales.manga.action.bulk;
            presenceData.smallImageText = "Добавляет";
            presenceData.smallImageKey = "uploading";
        }
        else if (actionName && actionName === "add-chapter") {
            presenceData.details = locales.manga.action.add;
            presenceData.smallImageText = "Добавляет";
            presenceData.smallImageKey = "uploading";
        }
        else if (actionName && actionName === "create") {
            presenceData.details = locales.manga.action.create;
            presenceData.smallImageText = "Пишет";
            presenceData.smallImageKey = "writing";
        }
    }
    else {
        let mangaName = document.getElementsByClassName("manga-bg__title")[0] ||
            document.querySelector(".manga-title h1");
        if (!mangaName) {
            mangaName = document.getElementsByClassName("reader-header-info__name-rus text-truncate")[0];
            presenceData.state = mangaName.textContent;
            presenceData.details = locales.manga.action.reading;
            presenceData.smallImageText = "Читает";
            presenceData.smallImageKey = "reading";
        }
        else {
            if (mangaName)
                presenceData.state = mangaName.textContent;
            presenceData.details = locales.manga.action.watching;
            presenceData.smallImageText = "Читает";
            presenceData.smallImageKey = "reading";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFFbEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDaEQsTUFBTSxPQUFPLEdBQUc7SUFDZCxJQUFJLEVBQUUsWUFBWTtJQUNsQixPQUFPLEVBQUUsb0JBQW9CO0lBQzdCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsR0FBRyxFQUFFLGlCQUFpQjtZQUN0QixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE1BQU0sRUFBRSxpQkFBaUI7U0FDMUI7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSxNQUFNO1FBQ2IsS0FBSyxFQUFFO1lBQ0wsR0FBRyxFQUFFLE9BQU87WUFDWixHQUFHLEVBQUUsUUFBUTtZQUNiLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLFdBQVc7WUFDaEIsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLEVBQUUsaUJBQWlCO1lBQ3RCLEdBQUcsRUFBRSxPQUFPO1NBQ2I7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLE9BQU8sRUFBRSxRQUFRO1FBQ2pCLE1BQU0sRUFBRSxjQUFjO0tBQ3ZCO0lBQ0QsS0FBSyxFQUFFLGNBQWM7SUFDckIsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLGlCQUFpQjtRQUN4QixPQUFPLEVBQUUsYUFBYTtRQUN0QixPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsUUFBUTtZQUNqQixNQUFNLEVBQUUsY0FBYztTQUN2QjtLQUNGO0lBQ0QsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixRQUFRLEVBQUUscUJBQXFCO0NBQ2hDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBaUI7SUFDakMsYUFBYSxFQUFFLGdCQUFnQjtJQUMvQixjQUFjLEVBQUUsU0FBUztJQUN6QixhQUFhLEVBQUUsU0FBUztDQUN6QixDQUFDO0FBRUYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5RCxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3pCLFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztLQUNyQztTQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1FBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUN4QztTQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMzQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxHQUFHO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5RSxNQUFNO1lBQ1I7Z0JBQ0UsWUFBWSxDQUFDLE9BQU8sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM3RSxNQUFNO1NBQ1Q7S0FDRjtTQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUN0QyxZQUFZLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxR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