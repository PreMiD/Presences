const presence = new Presence({
    clientId: "713563682722021436"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let home, login, register, e, target: string, bullsEye: string, user, playing, action, textArray;
const path = document.location.pathname;
const play = document.querySelector("#root > div > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-1niwhzg.r-1p0dtai.r-18u37iz.r-12vffkv.r-u8s1d.r-zchlnj.r-ipm5af > div:nth-child(1) > div");
const menu = document.querySelector("#root > div > div > div > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div > div.css-1dbjc4n.r-1awozwy.r-1niwhzg.r-1p0dtai.r-18u37iz.r-1d2f490.r-12vffkv.r-u8s1d.r-ipm5af > div:nth-child(1) > div");

const check = window.addEventListener("click", function(event:any) {
    target = event.target.innerText;
    if(target != undefined){
        if(target.includes("Home")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("Explore")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("My Stuff")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("Premium")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("Contribute")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("Settings")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("About")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("New Updates")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("NEW SINGLEPLAYER GAME") || target.includes("CONTINUE GAME") || target.includes("NEW MULTIPLAYER GAME")){
            bullsEye = target;
            return bullsEye;
        }
        else if(target.includes("")){
            return bullsEye = "NEW SINGLEPLAYER GAME";
        }
        else{
            return;
        }
    }
    else{
        return bullsEye = "Home";
    }
});
presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "ailogo"
    };
    // Due to unfortunate errors regarding regExp the main site aidungeon.io is pushed back to a later date.
    // if(window.location.hostname == "aidungeon.io"){
    //     console.log("Online");
    //     if(path == "/" || path == ""){
    //         presenceData.startTimestamp = browsingStamp;
    //         presenceData.details = "Home";
    //         home = document.querySelector("body > main > div > div.elementor.elementor-12 > div > div > section.elementor-element.elementor-element-57749c3.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default.elementor-section.elementor-top-section > div > div > div > div > div > div > div > h3 > span.elementor-headline-plain-text.elementor-headline-text-wrapper");
    //         textArray = document.getElementsByClassName("elementor-headline-dynamic-letter elementor-headline-animation-in");
    //         if(textArray){
    //             if(textArray[0].textContent == "s"){
    //                 presenceData.state = "Create your own Story";
    //             }
    //             else if(textArray[0].textContent == "a"){
    //                 presenceData.state = "Create your own Adventure";
    //             }
    //             else if(textArray[0].textContent == "f"){
    //                 presenceData.state = "Create your own Fantasy";
    //             }
    //             else if(textArray[0].textContent == "m"){
    //                 presenceData.state = "Create your own Mystery";
    //             }
    //             else if(textArray[0].textContent == "r"){
    //                 presenceData.state = "Create your own Romance";
    //             }
    //             else if(textArray[0].textContent == "d"){
    //                 presenceData.state = "Create your own Dream";
    //             }
    //             else if(textArray[0].textContent == "w"){
    //                 presenceData.state = "Create your own World";
    //             }
    //         }
    //     }
    //     else if(path == "/play-ai-dungeon/"){
    //         presenceData.details = "Selecting Platform to play On";
    //     }
    // }
    if(window.location.hostname == "play.aidungeon.io"){
        login = document.querySelector("#root > div > div > div > div > div:nth-child(2) > div > div.css-1dbjc4n.r-13awgt0 > div > div > div > div.css-1dbjc4n.r-18u37iz.r-1wtj0ep.r-15d164r.r-156q2ks.r-13qz1uu > div:nth-child(1)");
        register = document.querySelector("#root > div > div > div > div > div:nth-child(2) > div > div.css-1dbjc4n.r-13awgt0 > div > div > div > div.css-1dbjc4n.r-18u37iz.r-1wtj0ep.r-15d164r.r-156q2ks.r-13qz1uu > div:nth-child(2)");
        
        home = document.querySelector("#root > div > div > div > div > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div > div");
        user = document.querySelector("#root > div > div > div > div > div.css-1dbjc4n.r-1niwhzg.r-1p0dtai.r-1d2f490.r-105ug2t.r-u8s1d.r-zchlnj.r-ipm5af > div > div.css-1dbjc4n.r-13awgt0 > div > div > div.css-1dbjc4n.r-1awozwy > div > div.css-1dbjc4n.r-eqz5dr > div");
        
        playing = document.querySelector("#root > div > div > div > div > div:nth-child(2) > div > div.css-1dbjc4n.r-13awgt0 > div > div:nth-child(2) > div.css-1dbjc4n.r-18u37iz.r-13qz1uu > div.css-1dbjc4n.r-13awgt0.r-18u37iz > textarea");
        action = document.querySelector("#root > div > div > div > div > div:nth-child(2) > div > div.css-1dbjc4n.r-13awgt0 > div > div:nth-child(2) > div.css-1dbjc4n.r-18u37iz.r-13qz1uu > div.css-1dbjc4n.r-13awgt0.r-18u37iz > div > div");
        
        if(login != null){
            // @ts-ignore
            if((login).ariaLabel == "Login (selected)"){
                presenceData.details = "Logging in";
                presenceData.startTimestamp = browsingStamp;
            }
            // @ts-ignore
            else if(register.ariaLabel == "Register (selected)"){
                presenceData.details = "Registering";
                presenceData.startTimestamp = browsingStamp;
            }
            else{
                presenceData.details = "Loading ...";
                presenceData.startTimestamp = browsingStamp;
            }
        }
        else{
            check;
            console.log(bullsEye);
            if(bullsEye == "Home" || bullsEye == "home"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Home";
            }
            else if(bullsEye == "Explore" || bullsEye == "explore"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Exploring Scenarios and Adventures";
            }
            else if(bullsEye == "My Stuff" || bullsEye == "my stuff"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Browsing my stuff";
            }
            else if(bullsEye == "Premium" || bullsEye == "premium"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Considering Premium";
            }
            else if(bullsEye == "Contribute" || bullsEye == "contribute"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Reading the Contribute Message";
            }
            else if(bullsEye == "Settings" || bullsEye == "settings"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Changing Settings";
            }
            else if(bullsEye == "About" || bullsEye == "about"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Looking at the about";
            }
            else if(bullsEye == "Profile"){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Profile";
            }
            else if(bullsEye == ""){
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Menu";
            }
            else if(bullsEye == "NEW SINGLEPLAYER GAME" || bullsEye == "CONTINUE GAME" || bullsEye == "NEW MULTIPLAYER GAME"){
                if(playing){
                    if(playing.textContent == "" || playing.textContent == null){
                        presenceData.details = "Playing";
                        presenceData.state = "Reading";
                        presenceData.smallImageKey = "read";
                        presenceData.smallImageText = "Reading Current Message";
                    }
                    else{
                        presenceData.details = "Playing";
                        presenceData.smallImageKey = "play";
                        presenceData.smallImageText = "Playing a Game";
                        // @ts-ignore
                        if(action.ariaLabel == "Do"){
                            presenceData.state = "Doing: " + playing.textContent;
                        } 
                        // @ts-ignore
                        else if(action.ariaLabel == "Say"){
                            presenceData.state = "Saying: " + playing.textContent;
                        } 
                        // @ts-ignore
                        else if(action.ariaLabel == "Story"){
                            presenceData.state = "Story is: " + playing.textContent;
                        }
                    }
                }
                else if(!playing){
                    playing = document.querySelector("#root > div > div > div > div > div:nth-child(4) > div > div.css-1dbjc4n.r-13awgt0 > div > div:nth-child(2) > div.css-1dbjc4n.r-18u37iz.r-13qz1uu > div.css-1dbjc4n.r-13awgt0.r-18u37iz > textarea");
                    if(playing){
                        if(playing.textContent == "" || playing.textContent == null){
                            presenceData.details = "Playing";
                            presenceData.state = "Reading";
                            presenceData.smallImageKey = "read";
                            presenceData.smallImageText = "Reading Current Message";
                        }
                        else{
                            presenceData.details = "Playing";
                            presenceData.smallImageKey = "play";
                            presenceData.smallImageText = "Playing a Game";
                            action = document.querySelector("#root > div > div > div > div > div:nth-child(4) > div > div.css-1dbjc4n.r-13awgt0 > div > div:nth-child(2) > div.css-1dbjc4n.r-18u37iz.r-13qz1uu > div.css-1dbjc4n.r-13awgt0.r-18u37iz > div > div");
                            // @ts-ignore
                            if(action.ariaLabel == "Do"){
                                presenceData.state = "Doing: " + playing.textContent;
                            } 
                            // @ts-ignore
                            else if(action.ariaLabel == "Say"){
                                presenceData.state = "Saying: " + playing.textContent;
                            } 
                            // @ts-ignore
                            else if(action.ariaLabel == "Story"){
                                presenceData.state = "Story is: " + playing.textContent;
                            }
                        }
                    }
                
                }
            }
            else{
                presenceData.startTimestamp = browsingStamp;
                presenceData.details = "Viewing Home";
            }
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