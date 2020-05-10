const presence = new Presence({
    clientId: "691593596692070420"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.getElementsByClassName("sics-component__headline__title")[0] ===
        undefined) {
        if (document.URL === "https://www.stuff.co.nz/" ||
            document.URL === "https://www.stuff.co.nz") {
            presenceData.details = "Viewing the headlines";
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        }
        else if (document.location.href.includes("/national")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/nz-earthquake")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Earthquakes";
            }
            else if (document.location.href.includes("/crime")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Crime";
            }
            else if (document.location.href.includes("/politics")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Politics";
            }
            else if (document.location.href.includes("/stuff-circuit")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Stuff Circuit";
            }
            else if (document.location.href.includes("/science")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Science";
            }
            else if (document.location.href.includes("/education")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Education";
            }
            else if (document.location.href.includes("/health")) {
                presenceData.details = "Viewing national articles on...";
                presenceData.state = "Health";
            }
            else if (document.location.href.includes("/1-news")) {
                presenceData.details = "Viewing national articles from...";
                presenceData.state = "1 NEWS";
            }
            else if (document.location.href.includes("/maori-television")) {
                presenceData.details = "Viewing national articles from...";
                presenceData.state = "Māori Television";
            }
            else if (document.location.href.includes("/weather")) {
                presenceData.details = "Viewing the weather...";
                presenceData.state =
                    document.getElementsByClassName("section-location-header")[0]
                        .textContent || "National Forecast";
            }
            else if (document.location.href.includes("/quizzies")) {
                presenceData.details = "Looking at quizzes";
                presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            }
            else {
                presenceData.details = "Viewing national headlines";
            }
        }
        else if (document.location.href.includes("/environment")) {
            presenceData.details = "Viewing national articles on the...";
            presenceData.state = "Environment";
        }
        else if (document.location.href.includes("/world")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/americas/donald-trumps-america")) {
                presenceData.details = "Viewing international news from the...";
                presenceData.state = "United States of America";
            }
            else if (document.location.href.includes("/americas")) {
                presenceData.details = "Viewing international news from the...";
                presenceData.state = "Americas";
            }
            else if (document.location.href.includes("/australia")) {
                presenceData.details = "Viewing international news from...";
                presenceData.state = "Australia";
            }
            else if (document.location.href.includes("/europe")) {
                presenceData.details = "Viewing international news from...";
                presenceData.state = "Europe";
            }
            else if (document.location.href.includes("/middle-east")) {
                presenceData.details = "Viewing international news from the...";
                presenceData.state = "Middle East";
            }
            else if (document.location.href.includes("/asia")) {
                presenceData.details = "Viewing international news from...";
                presenceData.state = "Asia";
            }
            else if (document.location.href.includes("/africa")) {
                presenceData.details = "Viewing international news from...";
                presenceData.state = "Africa";
            }
            else if (document.location.href.includes("/south-pacific")) {
                presenceData.details = "Viewing international news from the...";
                presenceData.state = "South Pacific";
            }
            else {
                presenceData.details = "Viewing world-wide headlines";
            }
        }
        else if (document.location.href.includes("/business")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/property")) {
                presenceData.details = "Viewing business news related to...";
                presenceData.state = "Property";
            }
            else if (document.location.href.includes("/industries")) {
                presenceData.details = "Viewing business news related to...";
                presenceData.state = "Industries";
            }
            else if (document.location.href.includes("/money")) {
                presenceData.details = "Viewing business news related to...";
                presenceData.state = "Money";
            }
            else if (document.location.href.includes("/farming")) {
                presenceData.details = "Viewing business news related to...";
                presenceData.state = "NZ Farmer";
            }
            else if (document.location.href.includes("/opinion-analysis")) {
                presenceData.details = "Viewing business news related to...";
                presenceData.state = "Opinion & Analysis";
            }
            else if (document.location.href.includes("/small-business")) {
                presenceData.details = "Viewing business news related to...";
                presenceData.state = "Small Businesses";
            }
            else if (document.location.href.includes("/world")) {
                presenceData.details = "Viewing international business news";
            }
            else {
                presenceData.details = "Viewing business headlines";
            }
        }
        else if (document.location.href.includes("/sport")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/scores")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Scoring";
            }
            else if (document.location.href.includes("/opinion")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Opinion";
            }
            else if (document.location.href.includes("/rugby")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Rugby";
            }
            else if (document.location.href.includes("/cricket")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Cricket";
            }
            else if (document.location.href.includes("/league")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "League";
            }
            else if (document.location.href.includes("/football")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Football";
            }
            else if (document.location.href.includes("/basketball")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Basketball";
            }
            else if (document.location.href.includes("/golf")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Golf";
            }
            else if (document.location.href.includes("/netball")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Netball";
            }
            else if (document.location.href.includes("/tennis")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Tennis";
            }
            else if (document.location.href.includes("/motorsport")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Motorsport";
            }
            else if (document.location.href.includes("/esport")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "esport";
            }
            else if (document.location.href.includes("/combat")) {
                presenceData.details = "Viewing sports news related to...";
                presenceData.state = "Combat";
            }
            else if (document.location.href.includes("/other-sports")) {
                presenceData.details = "Viewing sporting news";
            }
            else {
                presenceData.details = "Viewing sporting headlines";
            }
        }
        else if (document.location.href.includes("/entertainment")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/bravo")) {
                presenceData.details = "Viewing articles related to...";
                presenceData.state = "Bravo";
            }
            else if (document.location.href.includes("/celebrities")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "Celebrities";
            }
            else if (document.location.href.includes("/film")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "Film";
            }
            else if (document.location.href.includes("/music")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "Music";
            }
            else if (document.location.href.includes("/tv-radio")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "TV & Radio";
            }
            else if (document.location.href.includes("/games")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "Games";
            }
            else if (document.location.href.includes("/books")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "Books";
            }
            else if (document.location.href.includes("/arts")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "The Arts";
            }
            else if (document.location.href.includes("/events")) {
                presenceData.details = "Viewing entertainment articles related to...";
                presenceData.state = "Events";
            }
            else {
                presenceData.details = "Viewing entertainment headlines";
            }
        }
        else if (document.location.href.includes("/life-style")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/love-sex")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Love & Sex";
            }
            else if (document.location.href.includes("/well-good")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Well & Good";
            }
            else if (document.location.href.includes("/food-wine")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Food & Wine";
            }
            else if (document.location.href.includes("/parenting")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Parenting";
            }
            else if (document.location.href.includes("/beauty")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Beauty";
            }
            else if (document.location.href.includes("/fashion")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Fashion";
            }
            else if (document.location.href.includes("/homed")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Homed";
            }
            else if (document.location.href.includes("/weddings")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Weddings";
            }
            else if (document.location.href.includes("/royal-family")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "The Royal Family";
            }
            else if (document.location.href.includes("/cutestuff")) {
                presenceData.details = "Viewing lifestyle articles related to...";
                presenceData.state = "Cute Stuff";
            }
            else if (document.location.href.includes("/puzzles")) {
                presenceData.details = "Viewing puzzles";
            }
            else {
                presenceData.details = "Viewing lifestyle headlines";
            }
        }
        else if (document.location.href.includes("/travel")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/back-your-backyard")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Back your Backyard";
            }
            else if (document.location.href.includes("/green-travel")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Green Travel";
            }
            else if (document.location.href.includes("/kiwi-traveller")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Kiwi Traveller";
            }
            else if (document.location.href.includes("/snow")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Snow";
            }
            else if (document.location.href.includes("/destinations")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Destinations";
            }
            else if (document.location.href.includes("/themes")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Themes";
            }
            else if (document.location.href.includes("/news")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "News";
            }
            else if (document.location.href.includes("/travel-troubles")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Travel Troubles";
            }
            else if (document.location.href.includes("/cruising")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Cruising";
            }
            else {
                presenceData.details = "Viewing travel headlines";
            }
        }
        else if (document.location.href.includes("/motoring")) {
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            if (document.location.href.includes("/electric-vehicles")) {
                presenceData.details = "Viewing motoring articles related to...";
                presenceData.state = "Electric Vehicles";
            }
            else if (document.location.href.includes("/road-tests")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Reviews";
            }
            else if (document.location.href.includes("/bikes")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Bikes";
            }
            else if (document.location.href.includes("/customs-classics")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Customs & Classics";
            }
            else if (document.location.href.includes("/top-cars")) {
                presenceData.details = "Viewing travel articles related to...";
                presenceData.state = "Top Cars";
            }
            else if (document.location.href.includes("/news")) {
                presenceData.details = "Viewing motoring news";
            }
            else {
                presenceData.details = "Viewing motoring headlines";
            }
        }
    }
    else {
        presenceData.details = "Reading an article...";
        presenceData.state = document.getElementsByClassName("sics-component__headline__title")[0].textContent;
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQ0UsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGlDQUFpQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLFNBQVMsRUFDVDtRQUNBLElBQ0UsUUFBUSxDQUFDLEdBQUcsS0FBSywwQkFBMEI7WUFDM0MsUUFBUSxDQUFDLEdBQUcsS0FBSyx5QkFBeUIsRUFDMUM7WUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1lBQy9DLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDN0Q7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzVELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7Z0JBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcsaUNBQWlDLENBQUM7Z0JBQ3pELFlBQVksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO2FBQ3BDO2lCQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFB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