var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2xELElBQUksV0FBVyxDQUFDO0FBQ2hCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxlQUFlLENBQUM7QUFDcEIsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFFbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBUyxFQUFFO0lBQ2pDLElBQUksSUFBSSxHQUFpQjtRQUNyQixhQUFhLEVBQUUsS0FBSztLQUN2QixDQUFDO0lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3ZDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNqRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLElBQUksNkJBQTZCLEVBQUU7b0JBQ3ZGLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDO29CQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU87d0JBQ3hCLElBQUksQ0FBQyxjQUFj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