const presence = new Presence({
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
    const data = {
        largeImageKey: "amq"
    };
    if (!navigator.language.includes("it-IT")) {
        if (document.location.pathname == "/") {
            if (document.querySelector("#gameChatPage") != null) {
                if (document.querySelector("#roomBrowserPage").className !=
                    "gamePage text-center hidden") {
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
                        if (document.querySelector("#battleRoyalPage").className ==
                            "text-center") {
                            timeRemainingBR = document.querySelector("#brTimeLeft")
                                .textContent;
                            data.smallImageKey = "btr";
                            data.smallImageText = "Time remaining: " + timeRemainingBR;
                            data.details = "Choosing songs for";
                            data.state = "battle royale mode";
                            presence.setActivity(data);
                        }
                        else {
                            totalRoundNumber = document
                                .querySelector("#qpCounter")
                                .textContent.replace("/", " of ");
                            actualRoundNumber = document
                                .querySelector("#qpCounter")
                                .textContent.split("/")[0]
                                .trim();
                            if (document.querySelector("#qpAnimeNameHider").className ==
                                "center-text qpAnimeNameContainer hide") {
                                animeName = document.querySelector("#qpAnimeName").textContent;
                                data.smallImageKey = "headset";
                                data.smallImageText = "Song from: " + animeName;
                                data.details = "Round " + actualRoundNumber + " ended";
                                data.state = "Song from: " + animeName;
                                presence.setActivity(data);
                            }
                            else {
                                if (document
                                    .querySelector("#qpHiderText")
                                    .textContent.startsWith("Loading")) {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Loading...";
                                    data.details = "The game is beginning";
                                    data.state = "Loading...";
                                    presence.setActivity(data);
                                }
                                else if (document.querySelector("#qpHiderText").textContent ==
                                    "Answers") {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Waiting for the results...";
                                    data.details = "Round " + actualRoundNumber + " ended";
                                    data.state = "Waiting for the results...";
                                    presence.setActivity(data);
                                }
                                else {
                                    timeRemaining = document.querySelector("#qpHiderText")
                                        .textContent;
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText =
                                        "Round: " +
                                            actualRoundNumber +
                                            "｜Countdown: " +
                                            timeRemaining;
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
        if (document.location.pathname == "/") {
            if (document.querySelector("#gameChatPage") != null) {
                if (document.querySelector("#roomBrowserPage").className !=
                    "gamePage text-center hidden") {
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
                        if (document.querySelector("#battleRoyalPage").className ==
                            "text-center") {
                            timeRemainingBR = document.querySelector("#brTimeLeft")
                                .textContent;
                            data.smallImageKey = "btr";
                            data.smallImageText = "Tempo rimanente: " + timeRemainingBR;
                            data.details = "Sceglie le canzoni per";
                            data.state = "la battle royale";
                            presence.setActivity(data);
                        }
                        else {
                            totalRoundNumber = document
                                .querySelector("#qpCounter")
                                .textContent.replace("/", " di ");
                            actualRoundNumber = document
                                .querySelector("#qpCounter")
                                .textContent.split("/")[0]
                                .trim();
                            if (document.querySelector("#qpAnimeNameHider").className ==
                                "center-text qpAnimeNameContainer hide") {
                                animeName = document.querySelector("#qpAnimeName").textContent;
                                data.smallImageKey = "headset";
                                data.smallImageText = "Canzone da: " + animeName;
                                data.details = "Round " + actualRoundNumber + " terminato";
                                data.state = "Canzone da: " + animeName;
                                presence.setActivity(data);
                            }
                            else {
                                if (document
                                    .querySelector("#qpHiderText")
                                    .textContent.startsWith("Loading")) {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Caricamento...";
                                    data.details = "La partita sta per iniziare";
                                    data.state = "Caricamento...";
                                    presence.setActivity(data);
                                }
                                else if (document.querySelector("#qpHiderText").textContent ==
                                    "Answers") {
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText = "Aspettando i risultati...";
                                    data.details = "Round " + actualRoundNumber + " terminato";
                                    data.state = "Aspettando i risultati...";
                                    presence.setActivity(data);
                                }
                                else {
                                    timeRemaining = document.querySelector("#qpHiderText")
                                        .textContent;
                                    data.smallImageKey = "gamepad";
                                    data.smallImageText =
                                        "Round: " +
                                            actualRoundNumber +
                                            "｜Tempo rimanente: " +
                                            timeRemaining;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBVyxDQUFDO0FBQ2hCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxlQUFlLENBQUM7QUFDcEIsSUFBSSxnQkFBZ0IsQ0FBQztBQUNyQixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLElBQUksU0FBUyxDQUFDO0FBQ2QsSUFBSSxhQUFhLENBQUM7QUFFbEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQWlCO1FBQ3pCLGFBQWEsRUFBRSxLQUFLO0tBQ3JCLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFFekMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDbkQsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUztvQkFDcEQsNkJBQTZCLEVBQzdCO29CQUNBLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDO29CQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLEdBQUcsV0FBVyxDQUFDO29CQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO29CQUN6QyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtxQkFBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxJQUFJLFVBQVUsRUFDL0Q7b0JBQ0EsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsSUFBSSxhQUFhLEVBQUU7d0JBQ25FLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDO3dCQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLEdBQUcsU0FBUyxDQUFDO3dCQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7d0JBQ3ZCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNMLElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVM7NEJBQ3BELGFBQWEsRUFDYjs0QkFDQSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7aUNBQ3BELFdBQVcsQ0FBQzs0QkFDZixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs0QkFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsR0FBRyxlQUFlLENBQUM7NEJBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUM7NEJBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUM7NEJBQ2xDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCOzZCQUFNOzRCQUNMLGdCQUFnQixHQUFHLFFBQVE7aUNBQ3hCLGFBQWEsQ0FBQyxZQUFZLENBQUM7aUNBQzNCLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxpQkFBaUIsR0FBRyxRQUFRO2lDQUN6QixhQUFhLENBQUMsWUFBWSxDQUFDO2lDQUMzQixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDekIsSUFBSSxFQUFFLENBQUM7NEJBQ1YsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsU0FBUztnQ0FDckQsdUNBQXVDLEVBQ3ZDO2dDQUNBLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQ0FDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0NBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxHQUFHLFNBQVMsQ0FBQztnQ0FDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO2dDQUN2RCxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0NBQ3ZDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQzVCO2lDQUFNO2dDQUNMLElBQ0UsUUFBUTtxQ0FDTCxhQUFhLENBQUMsY0FBYyxDQUFDO3FDQUM3QixXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUNwQztvQ0FDQSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7b0NBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7b0NBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO29DQUMxQixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUM1QjtxQ0FBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVztvQ0FDbEQsU0FBUyxFQUNUO29DQUNBLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO29DQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLDRCQUE0QixDQUFDO29DQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7b0NBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUM7b0NBQzFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUNBQzVCO3FDQUFNO29DQUNMLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQzt5Q0FDbkQsV0FBVyxDQUFDO29DQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO29DQUMvQixJQUFJLENBQUMsY0FBYzt3Q0FDakIsU0FBUzs0Q0FDVCxpQkFBaUI7NENBQ2pCLGNBQWM7NENBQ2QsYUFBYSxDQUFDO29DQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztvQ0FDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsR0FBRyxhQUFhLENBQUM7b0NBQ2hELFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUNBQzVCOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO3FCQUFNO29CQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO29CQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLGdCQUFnQixDQUFDO29CQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO29CQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLG9CQUFvQixDQUFDO2dCQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO2dCQUNwQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLGtCQUFrQixDQUFDO1lBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ3RCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7S0FDRjtTQUFNO1FBRUwsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7WUFDckMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDbkQsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUztvQkFDcEQsNkJBQTZCLEVBQzdCO29CQUNBLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDO29CQUN0RSxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7b0JBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO29CQUN4QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjtxQkFBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxJQUFJLFVBQVUsRUFDL0Q7b0JBQ0EsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsSUFBSSxhQUFhLEVBQUU7d0JBQ25FLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxDQUFDO3dCQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7d0JBQ3ZCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzVCO3lCQUFNO3dCQUNMLElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFNBQVM7NEJBQ3BELGFBQWEsRUFDYjs0QkFDQSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7aUNBQ3BELFdBQVcsQ0FBQzs0QkFDZixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzs0QkFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxtQkFBbUIsR0FBRyxlQUFlLENBQUM7NEJBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7NEJBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUM7NEJBQ2hDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCOzZCQUFNOzRCQUNMLGdCQUFnQixHQUFHLFFBQVE7aUNBQ3hCLGFBQWEsQ0FBQyxZQUFZLENBQUM7aUNBQzNCLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxpQkFBaUIsR0FBRyxRQUFRO2lDQUN6QixhQUFhLENBQUMsWUFBWSxDQUFDO2lDQUMzQixXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQ0FDekIsSUFBSSxFQUFFLENBQUM7NEJBQ1YsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsU0FBUztnQ0FDckQsdUNBQXVDLEVBQ3ZDO2dDQUNBLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztnQ0FDL0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0NBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQztnQ0FDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsWUFBWSxDQUFDO2dDQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxTQUFTLENBQUM7Z0NBQ3hDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQzVCO2lDQUFNO2dDQUNMLElBQ0UsUUFBUTtxQ0FDTCxhQUFhLENBQUMsY0FBYyxDQUFDO3FDQUM3QixXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUNwQztvQ0FDQSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztvQ0FDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztvQ0FDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztvQ0FDOUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQ0FDNUI7cUNBQU0sSUFDTCxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVc7b0NBQ2xELFNBQVMsRUFDVDtvQ0FDQSxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQztvQ0FDbEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsWUFBWSxDQUFDO29DQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLDJCQUEyQixDQUFDO29DQUN6QyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUM1QjtxQ0FBTTtvQ0FDTCxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7eUNBQ25ELFdBQVcsQ0FBQztvQ0FDZixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztvQ0FDL0IsSUFBSSxDQUFDLGNBQWM7d0NBQ2pCLFNBQVM7NENBQ1QsaUJBQWlCOzRDQUNqQixvQkFBb0I7NENBQ3BCLGFBQWEsQ0FBQztvQ0FDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7b0NBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQW1CLEdBQUcsYUFBYSxDQUFDO29DQUNqRCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUM1Qjs2QkFDRjt5QkFDRjtxQkFDRjtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztvQkFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO29CQUM3QixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO2dCQUNoQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO1NBQ0Y7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDO1lBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7WUFDM0IsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDbEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyx3QkFBd0IsQ0FBQztZQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLHlCQUF5QixDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQzlCLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7S0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=