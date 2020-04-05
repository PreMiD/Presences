let presence = new Presence({
    clientId: "691494438349832227"
});
let lobbyNumber;
let lobbyName;
let timeRemainingBR;
let totalRoundNumber;
let actualRoundNumber;
let animeName;
let timeRemaining;
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "amq"
    };
    if (!navigator.language.includes("it-IT")) {
        if (document.location.pathname == ("/")) {
            if (document.querySelector("#gameChatPage") != null) {
                if (document.querySelector("#roomBrowserPage").className != "gamePage text-center hidden") {
                    lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
                    data.smallImageKey = "lobby";
                    data.smallImageText = "Rooms count: " + lobbyNumber;
                    data.details = "Browsing the game rooms";
                    presence.setActivity(data);
                }
                else if (document.querySelector("#gameChatPage").className == "gamePage") {
                    if (document.querySelector("#lobbyPage").className == "text-center") {
                        lobbyName = document.querySelector("#lobbyRoomName").textContent;
                        data.smallImageKey = "room";
                        data.smallImageText = "Room: " + lobbyName;
                        data.details = "In the room:";
                        data.state = lobbyName;
                        presence.setActivity(data);
                    }
                    else {
                        if (document.querySelector("#battleRoyalPage").className == "text-center") {
                            timeRemainingBR = document.querySelector("#brTimeLeft").textContent;
                            data.smallImageKey = "btr";
                            data.smallImageText = "Time remaining: " + timeRemainingBR;
                            data.details = "Choosing songs for";
                            data.state = "battle royale mode";
                            presence.setActivity(data);
                        }
                        else {
                            totalRoundNumber = document.querySelector("#qpCounter").textContent.replace("/", " of ");
                            actualRoundNumber = document.querySelector("#qpCounter").textContent.split("/")[0].trim();
                            if (document.querySelector("#qpAnimeNameHider").className == "center-text qpAnimeNameContainer hide") {
                                animeName = document.querySelector("#qpAnimeName").textContent;
                                data.smallImageKey = "headset";
                                data.smallImageText = "Song from: " + animeName;
                                data.details = "Round " + actualRoundNumber + " ended";
                                data.state = "Song from: " + animeName;
                                presence.setActivity(data);
                            }
                            else {
                                if (document.querySelector("#qpHiderText").textContent.startsWith("Loading")) {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Loading...";
                                    data.details = "The game is beginning";
                                    data.state = "Loading...";
                                    presence.setActivity(data);
                                }
                                else if (document.querySelector("#qpHiderText").textContent == "Answers") {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Waiting for the results...";
                                    data.details = "Round " + actualRoundNumber + " ended";
                                    data.state = "Waiting for the results...";
                                    presence.setActivity(data);
                                }
                                else {
                                    timeRemaining = document.querySelector("#qpHiderText").textContent;
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Round: " + actualRoundNumber + "｜Countdown: " + timeRemaining;
                                    data.details = "Round: " + totalRoundNumber;
                                    data.state = "Time remaining: " + timeRemaining;
                                    presence.setActivity(data);
                                }
                            }
                        }
                    }
                }
                else {
                    data.smallImageKey = "menu";
                    data.smallImageText = "In the menu...";
                    data.details = "In the menu...";
                    presence.setActivity(data);
                }
            }
            else {
                data.smallImageKey = "menu";
                data.smallImageText = "In the homepage...";
                data.details = "In the homepage...";
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/legal/tos")) {
            data.smallImageKey = "info";
            data.smallImageText = "Terms of Service";
            data.details = "Reading the terms of";
            data.state = "service";
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/legal/privacy")) {
            data.smallImageKey = "info";
            data.smallImageText = "Privacy Police";
            data.details = "Reading the privacy";
            data.state = "police";
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search";
            data.smallImageText = "Browsing...";
            data.details = "Browsing...";
            presence.setActivity(data);
        }
    }
    else {
        if (document.location.pathname == ("/")) {
            if (document.querySelector("#gameChatPage") != null) {
                if (document.querySelector("#roomBrowserPage").className != "gamePage text-center hidden") {
                    lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
                    data.smallImageKey = "lobby";
                    data.smallImageText = "Numero stanze: " + lobbyNumber;
                    data.details = "Naviga tra le stanze";
                    data.state = "di gioco";
                    presence.setActivity(data);
                }
                else if (document.querySelector("#gameChatPage").className == "gamePage") {
                    if (document.querySelector("#lobbyPage").className == "text-center") {
                        lobbyName = document.querySelector("#lobbyRoomName").textContent;
                        data.smallImageKey = "room";
                        data.smallImageText = "Stanza: " + lobbyName;
                        data.details = "Nella stanza:";
                        data.state = lobbyName;
                        presence.setActivity(data);
                    }
                    else {
                        if (document.querySelector("#battleRoyalPage").className == "text-center") {
                            timeRemainingBR = document.querySelector("#brTimeLeft").textContent;
                            data.smallImageKey = "btr";
                            data.smallImageText = "Tempo rimanente: " + timeRemainingBR;
                            data.details = "Sceglie le canzoni per";
                            data.state = "la battle royale";
                            presence.setActivity(data);
                        }
                        else {
                            totalRoundNumber = document.querySelector("#qpCounter").textContent.replace("/", " di ");
                            actualRoundNumber = document.querySelector("#qpCounter").textContent.split("/")[0].trim();
                            if (document.querySelector("#qpAnimeNameHider").className == "center-text qpAnimeNameContainer hide") {
                                animeName = document.querySelector("#qpAnimeName").textContent;
                                data.smallImageKey = "headset";
                                data.smallImageText = "Canzone da: " + animeName;
                                data.details = "Round " + actualRoundNumber + " terminato";
                                data.state = "Canzone da: " + animeName;
                                presence.setActivity(data);
                            }
                            else {
                                if (document.querySelector("#qpHiderText").textContent.startsWith("Loading")) {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Caricamento...";
                                    data.details = "La partita sta per iniziare";
                                    data.state = "Caricamento...";
                                    presence.setActivity(data);
                                }
                                else if (document.querySelector("#qpHiderText").textContent == "Answers") {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Aspettando i risultati...";
                                    data.details = "Round " + actualRoundNumber + " terminato";
                                    data.state = "Aspettando i risultati...";
                                    presence.setActivity(data);
                                }
                                else {
                                    timeRemaining = document.querySelector("#qpHiderText").textContent;
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Round: " + actualRoundNumber + "｜Tempo rimanente: " + timeRemaining;
                                    data.details = "Round: " + totalRoundNumber;
                                    data.state = "Tempo rimanente: " + timeRemaining;
                                    presence.setActivity(data);
                                }
                            }
                        }
                    }
                }
                else {
                    data.smallImageKey = "menu";
                    data.smallImageText = "Nel menù...";
                    data.details = "Nel menù...";
                    presence.setActivity(data);
                }
            }
            else {
                data.smallImageKey = "menu";
                data.smallImageText = "Nella homepage...";
                data.details = "Nella homepage";
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/legal/tos")) {
            data.smallImageKey = "info";
            data.smallImageText = "Termini di Servizio";
            data.details = "Legge i termini";
            data.state = "di servizio";
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/legal/privacy")) {
            data.smallImageKey = "info";
            data.smallImageText = "Politica della Privacy";
            data.details = "Legge la politica della";
            data.state = "privacy";
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search";
            data.smallImageText = "Navigando...";
            data.details = "Navigando...";
            presence.setActivity(data);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxDQUFDO0FBQ2hCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxlQUFlLENBQUM7QUFDcEIsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFFbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxLQUFLO0tBQ3BCLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BELElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsSUFBSSw2QkFBNkIsRUFBRTtvQkFDMUYsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO29CQUM3QixJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxXQUFXLENBQUM7b0JBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7b0JBQ3pDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFD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