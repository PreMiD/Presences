const presence = new Presence({
    clientId: "651454408768487441"
}), pages = {
    "/questions": "Questions ",
    "/tags": "Tags ",
    "/users": "Users ",
    "/unanswered": "Unanswered "
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, title = document.querySelector("#question-header > h1"), user = document.querySelector("#user-card > div > div.grid--cell.fl1.wmn0 > div > div.grid--cell.fl1.w0.overflow-x-hidden.overflow-y-auto.pr16.profile-user--about.about > div > div:nth-child(1) > h2 > div"), searchresult = document.querySelector("#bigsearch > div > input");
    let presenceData = {
        largeImageKey: "logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (title && title.textContent != "") {
        presenceData.details = "Reads a Question:";
        presenceData.state = `${title.textContent}`;
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presenceData.details = "Viewing Page:";
        presenceData.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (page.includes("/search")) {
        presenceData.details = "Searching:";
        presenceData.state = searchresult.value;
        presenceData.smallImageKey = "logo";
    }
    else if (page.includes("/users")) {
        presenceData.details = "Viewing User Profile:";
        presenceData.state = user.textContent.trim();
    }
    else {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Homepage";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixZQUFZLEVBQUUsWUFBWTtJQUMxQixPQUFPLEVBQUUsT0FBTztJQUNoQixRQUFRLEVBQUUsUUFBUTtJQUNsQixhQUFhLEVBQUUsYUFBYTtDQUM3QixDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ3JDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLEVBQ3ZELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMzQiwrS0FBK0ssQ0FDaEwsRUFDRCxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRXBFLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsTUFBTTtRQUNyQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0tBQzlDLENBQUM7SUFFRixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDN0M7U0FBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2xELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUQ7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7UUFDcEMsWUFBWSxDQUFDLEtBQUssR0FBSSxZQUFpQyxDQUFDLEtBQUssQ0FBQztRQUM5RCxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztLQUNyQztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQyxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQy9DLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM5QztTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDakM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9