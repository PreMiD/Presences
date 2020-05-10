const presence = new Presence({
    clientId: "477919120789078026"
});
let language = navigator.language;
switch (language) {
    case "de":
    case "de-CH":
    case "de-AT":
    case "de-LU":
    case "de-LI":
        language = "de";
        break;
    case "en":
    case "en-US":
    case "en-EG":
    case "en-AU":
    case "en-GB":
    case "en-CA":
    case "en-NZ":
    case "en-IE":
    case "en-ZA":
    case "en-JM":
    case "en-BZ":
    case "en-TT":
    default:
        language = "en";
        break;
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    const playing = parseInt(document.querySelector("#playstop").textContent);
    if (playing > 0) {
        const station = document.getElementsByClassName("channelname")[0]
            .textContent;
        switch (language) {
            case "de":
                presenceData.details = "Spielt gerade";
                break;
            case "en":
                presenceData.details = "Listening to";
                break;
        }
        presenceData.state = station;
        presenceData.smallImageKey = "live";
        presence.setActivity(presenceData);
    }
    else {
        try {
            const channelstation = document.querySelector("#content > h1")
                .textContent;
            switch (language) {
                case "de":
                    presenceData.details = "Stöbert durch";
                    break;
                case "en":
                    presenceData.details = "Browsing through";
                    break;
            }
            presenceData.state = channelstation;
            presence.setActivity(presenceData);
        }
        catch (e) {
        }
        if (document.location.pathname == "/") {
            switch (language) {
                case "de":
                    presenceData.details = "Stöbert durch";
                    presenceData.state = "die Startseite";
                    break;
                case "en":
                    presenceData.details = "Browsing through";
                    presenceData.state = "mainpage";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/voting/") {
            switch (language) {
                case "de":
                    presenceData.details = "Votet für";
                    presenceData.state = "neue Lieder";
                    break;
                case "en":
                    presenceData.details = "Voting for";
                    presenceData.state = "new songs";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/the-battle/") {
            switch (language) {
                case "de":
                    presenceData.details = "Votet für";
                    presenceData.state = "The Battle";
                    break;
                case "en":
                    presenceData.details = "Voting for";
                    presenceData.state = "the battlee";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/charts/") {
            switch (language) {
                case "de":
                    presenceData.details = "Sucht in Charts...";
                    break;
                case "en":
                    presenceData.details = "Looking for charts...";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/dance/") {
            switch (language) {
                case "de":
                    presenceData.details = "Sucht in Dance & DJ's...";
                    break;
                case "en":
                    presenceData.details = "Looking for";
                    presenceData.state = "Dance & DJ's...";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/hiphop/") {
            switch (language) {
                case "de":
                    presenceData.details = "Sucht in Hip Hop...";
                    break;
                case "en":
                    presenceData.details = "Looking for Hip Hop...";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/channels/") {
            switch (language) {
                case "de":
                    presenceData.details = "Durchsucht die";
                    presenceData.state = "Channelliste";
                    break;
                case "en":
                    presenceData.details = "Search in";
                    presenceData.state = "Channel list";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/streams/") {
            switch (language) {
                case "de":
                    presenceData.details = "Sucht nach";
                    presenceData.state = "Streamlinks";
                    break;
                case "en":
                    presenceData.details = "Looking for";
                    presenceData.state = "stream links";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/datenschutz/") {
            switch (language) {
                case "de":
                    presenceData.details = "Liest den Datenschutz...";
                    break;
                case "en":
                    presenceData.details = "Reading privacy policy";
                    break;
            }
            presence.setActivity(presenceData);
        }
        else if (document.location.pathname == "/impressum/") {
            switch (language) {
                case "de":
                    presenceData.details = "Liest das Impressum...";
                    break;
                case "en":
                    presenceData.details = "Reading imprint...";
                    break;
            }
            presence.setActivity(presenceData);
        }
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFFbEMsUUFBUSxRQUFRLEVBQUU7SUFJaEIsS0FBSyxJQUFJLENBQUM7SUFDVixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU87UUFDVixRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE1BQU07SUFJUixLQUFLLElBQUksQ0FBQztJQUNWLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYixLQUFLLE9BQU8sQ0FBQztJQUNiLEtBQUssT0FBTyxDQUFDO0lBQ2IsS0FBSyxPQUFPLENBQUM7SUFDYjtRQUNFLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsTUFBTTtDQUNUO0FBR0QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxRSxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7UUFDZixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMs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