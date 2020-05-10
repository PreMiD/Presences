const presence = new Presence({
    clientId: "630777829478498326"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "pastrlogo"
    };
    const pageTitle = document.title.slice(11);
    let action;
    let state;
    if (pageTitle == "Create") {
        action = "Creating a paste";
        let pasteName = document.getElementById("paste-title")
            .value;
        if (!pasteName) {
            pasteName = "Untitled";
        }
        state = pasteName;
    }
    else if (pageTitle == "The smoothest paste service") {
        action = "Viewing a page";
        state = "Homepage";
    }
    else if (window.location.href.includes("view")) {
        action = "Viewing a paste";
        state = pageTitle;
    }
    else {
        action = "Viewing a page";
        state = pageTitle;
    }
    presenceData.details = action;
    presenceData.state = state;
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFdBQVc7S0FDM0IsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLElBQUksTUFBTSxDQUFDO0lBQ1gsSUFBSSxLQUFLLENBQUM7SUFDVixJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUU7UUFDekIsTUFBTSxHQUFHLGtCQUFrQixDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFzQjthQUN6RSxLQUFLLENBQUM7UUFDVCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsU0FBUyxHQUFHLFVBQVUsQ0FBQztTQUN4QjtRQUNELEtBQUssR0FBRyxTQUFTLENBQUM7S0FDbkI7U0FBTSxJQUFJLFNBQVMsSUFBSSw2QkFBNkIsRUFBRTtRQUNyRCxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUIsS0FBSyxHQUFHLFVBQVUsQ0FBQztLQUNwQjtTQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2hELE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztRQUMzQixLQUFLLEdBQUcsU0FBUyxDQUFDO0tBQ25CO1NBQU07UUFDTCxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUIsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUNuQjtJQUVELFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzlCLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRTNCLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUMifQ==