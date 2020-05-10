const presence = new Presence({
    clientId: "602573554780733450"
});
let state, page;
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    switch (window.location.pathname.toLowerCase()) {
        case "/": {
            state = "On the homepage";
            page = "Browsing Livida Blog";
            break;
        }
        case "/signin/": {
            state = "On the login page";
            page = "Browsing Livida Blog";
            break;
        }
        case "/signup/": {
            state = "On the signup page";
            page = "Browsing Livida Blog";
            break;
        }
        case "/account/": {
            state = "On the account page";
            page = "Browsing Livida Blog";
            break;
        }
        default: {
            state = document.querySelector("title").innerText;
            page = "Reading an article";
        }
    }
    presence.setActivity({
        state: state,
        details: page,
        largeImageKey: "icon",
        startTimestamp: browsingStamp
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBSyxFQUFFLElBQUksQ0FBQztBQUVoQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVwRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7SUFDN0IsUUFBUSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM5QyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ1IsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1lBQzFCLElBQUksR0FBRyxzQkFBc0IsQ0FBQztZQUM5QixNQUFNO1NBQ1A7UUFDRCxLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxHQUFHLG1CQUFtQixDQUFDO1lBQzVCLElBQUksR0FBRyxzQkFBc0IsQ0FBQztZQUM5QixNQUFNO1NBQ1A7UUFDRCxLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxHQUFHLG9CQUFvQixDQUFDO1lBQzdCLElBQUksR0FBRyxzQkFBc0IsQ0FBQztZQUM5QixNQUFNO1NBQ1A7UUFDRCxLQUFLLFdBQVcsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztZQUM5QixJQUFJLEdBQUcsc0JBQXNCLENBQUM7WUFDOUIsTUFBTTtTQUNQO1FBQ0QsT0FBTyxDQUFDLENBQUM7WUFDUCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDbEQsSUFBSSxHQUFHLG9CQUFvQixDQUFDO1NBQzdCO0tBQ0Y7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQ25CLEtBQUssRUFBRSxLQUFLO1FBQ1osT0FBTyxFQUFFLElBQUk7UUFDYixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsYUFBYTtLQUM5QixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9