let presence = new Presence({
    clientId: "691494438349832227",
    mediaKeys: false
});
let browsingStamp = Math.floor(Date.now() / 1000);
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
                    data.smallImageKey = "lobby",
                        data.smallImageText = "Rooms count: " + lobbyNumber,
                        data.details = "Browsing the game rooms",
                        data.startTimestamp = browsingStamp;
                    presence.setActivity(data);
                }
                else if (document.querySelector("#gameChatPage").className == "gamePage") {
                    if (document.querySelector("#lobbyPage").className == "text-center") {
                        lobbyName = document.querySelector("#lobbyRoomName").textContent;
                        data.smallImageKey = "room",
                            data.smallImageText = "Room: " + lobbyName,
                            data.details = "In the room:",
                            data.state = lobbyName,
                            data.startTimestamp = browsingStamp;
                        presence.setActivity(data);
                    }
                    else {
                        if (document.querySelector("#battleRoyalPage").className == "text-center") {
                            timeRemainingBR = document.querySelector("#brTimeLeft").textContent;
                            data.smallImageKey = "btr",
                                data.smallImageText = "Time remaining: " + timeRemainingBR,
                                data.details = "Choosing songs for",
                                data.state = "battle royale mode",
                                presence.setActivity(data);
                        }
                        else {
                            totalRoundNumber = document.querySelector("#qpCounter").textContent.replace("/", " of ");
                            actualRoundNumber = document.querySelector("#qpCounter").textContent.split("/")[0].trim();
                            if (document.querySelector("#qpAnimeNameHider").className == "center-text qpAnimeNameContainer hide") {
                                animeName = document.querySelector("#qpAnimeName").textContent;
                                data.smallImageKey = "headset",
                                    data.smallImageText = "Song from: " + animeName,
                                    data.details = "Round " + actualRoundNumber + " ended",
                                    data.state = "Song from: " + animeName,
                                    presence.setActivity(data);
                            }
                            else {
                                if (document.querySelector("#qpHiderText").textContent.startsWith("Loading")) {
                                    data.smallImageKey = "gamepad",
                                        data.smallImageText = "Loading...",
                                        data.details = "The game is beginning",
                                        data.state = "Loading...",
                                        presence.setActivity(data);
                                }
                                else if (document.querySelector("#qpHiderText").textContent == "Answers") {
                                    data.smallImageKey = "gamepad",
                                        data.smallImageText = "Waiting for the results...",
                                        data.details = "Round " + actualRoundNumber + " ended",
                                        data.state = "Waiting for the results...",
                                        presence.setActivity(data);
                                }
                                else {
                                    timeRemaining = document.querySelector("#qpHiderText").textContent;
                                    data.smallImageKey = "gamepad",
                                        data.smallImageText = "Round: " + actualRoundNumber + "｜Countdown: " + timeRemaining;
                                    data.details = "Round: " + totalRoundNumber,
                                        data.state = "Time remaining: " + timeRemaining,
                                        presence.setActivity(data);
                                }
                            }
                        }
                    }
                }
                else {
                    data.smallImageKey = "menu",
                        data.smallImageText = "In the menu...",
                        data.details = "In the menu...",
                        data.startTimestamp = browsingStamp;
                    presence.setActivity(data);
                }
            }
            else {
                data.smallImageKey = "menu",
                    data.smallImageText = "In the homepage...",
                    data.details = "In the homepage...",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/legal/tos")) {
            data.smallImageKey = "info",
                data.smallImageText = "Terms of Service",
                data.details = "Reading the terms of",
                data.state = "service",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/legal/privacy")) {
            data.smallImageKey = "info",
                data.smallImageText = "Privacy Police",
                data.details = "Reading the privacy",
                data.state = "police",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search",
                data.smallImageText = "Browsing...",
                data.details = "Browsing...",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
    else {
        if (document.location.pathname == ("/")) {
            if (document.querySelector("#gameChatPage") != null) {
                if (document.querySelector("#roomBrowserPage").className != "gamePage text-center hidden") {
                    lobbyNumber = document.querySelector("#rbTotalGameCount").textContent;
                    data.smallImageKey = "lobby",
                        data.smallImageText = "Numero stanze: " + lobbyNumber,
                        data.details = "Naviga tra le stanze",
                        data.state = "di gioco",
                        data.startTimestamp = browsingStamp;
                    presence.setActivity(data);
                }
                else if (document.querySelector("#gameChatPage").className == "gamePage") {
                    if (document.querySelector("#lobbyPage").className == "text-center") {
                        lobbyName = document.querySelector("#lobbyRoomName").textContent;
                        data.smallImageKey = "room",
                            data.smallImageText = "Stanza: " + lobbyName,
                            data.details = "Nella stanza:",
                            data.state = lobbyName,
                            presence.setActivity(data);
                    }
                    else {
                        if (document.querySelector("#battleRoyalPage").className == "text-center") {
                            timeRemainingBR = document.querySelector("#brTimeLeft").textContent;
                            data.smallImageKey = "btr",
                                data.smallImageText = "Tempo rimanente: " + timeRemainingBR,
                                data.details = "Sceglie le canzoni per",
                                data.state = "la battle royale",
                                presence.setActivity(data);
                        }
                        else {
                            totalRoundNumber = document.querySelector("#qpCounter").textContent.replace("/", " di ");
                            actualRoundNumber = document.querySelector("#qpCounter").textContent.split("/")[0].trim();
                            if (document.querySelector("#qpAnimeNameHider").className == "center-text qpAnimeNameContainer hide") {
                                animeName = document.querySelector("#qpAnimeName").textContent;
                                data.smallImageKey = "headset",
                                    data.smallImageText = "Canzone da: " + animeName,
                                    data.details = "Round " + actualRoundNumber + " terminato",
                                    data.state = "Canzone da: " + animeName,
                                    presence.setActivity(data);
                            }
                            else {
                                if (document.querySelector("#qpHiderText").textContent.startsWith("Loading")) {
                                    data.smallImageKey = "gamepad",
                                        data.smallImageText = "Caricamento...",
                                        data.details = "La partita sta per iniziare",
                                        data.state = "Caricamento...",
                                        presence.setActivity(data);
                                }
                                else if (document.querySelector("#qpHiderText").textContent == "Answers") {
                                    data.smallImageKey = "gamepad",
                                        data.smallImageText = "Aspettando i risultati...",
                                        data.details = "Round " + actualRoundNumber + " finito",
                                        data.state = "Aspettando i risultati...",
                                        presence.setActivity(data);
                                }
                                else {
                                    timeRemaining = document.querySelector("#qpHiderText").textContent;
                                    data.smallImageKey = "gamepad",
                                        data.smallImageText = "Round: " + actualRoundNumber + "｜Tempo rimanente: " + timeRemaining;
                                    data.details = "Round: " + totalRoundNumber,
                                        data.state = "Tempo rimanente: " + timeRemaining,
                                        presence.setActivity(data);
                                }
                            }
                        }
                    }
                }
                else {
                    data.smallImageKey = "menu",
                        data.smallImageText = "Nel menù...",
                        data.details = "Nel menù...",
                        data.startTimestamp = browsingStamp;
                    presence.setActivity(data);
                }
            }
            else {
                data.smallImageKey = "menu",
                    data.smallImageText = "Nella homepage...",
                    data.details = "Nella homepage",
                    data.startTimestamp = browsingStamp;
                presence.setActivity(data);
            }
        }
        else if (document.location.pathname.startsWith("/legal/tos")) {
            data.smallImageKey = "info",
                data.smallImageText = "Termini di Servizio",
                data.details = "Legge i termini",
                data.state = "di servizio",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else if (document.location.pathname.startsWith("/legal/privacy")) {
            data.smallImageKey = "info",
                data.smallImageText = "Politica della Privacy",
                data.details = "Legge la politica della",
                data.state = "privacy",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
        else {
            data.smallImageKey = "search",
                data.smallImageText = "Navigando...",
                data.details = "Navigando...",
                data.startTimestamp = browsingStamp;
            presence.setActivity(data);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxDQUFDO0FBQ2hCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxlQUFlLENBQUM7QUFDcEIsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFFbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsSUFBSSxJQUFJLEdBQWlCO1FBQ3JCLGFBQWEsRUFBRSxLQUFLO0tBQ3ZCLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ2pELElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVMsSUFBSSw2QkFBNkIsRUFBRTtvQkFDM0YsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBQ3RFLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTzt3QkFDNUIsSUFBSSxDQUFDLGNBQWMsR0FB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