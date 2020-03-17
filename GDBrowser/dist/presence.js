var presence = new Presence({
    clientId: "635876670146084880"
})

presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "coin"
    }

    const q = new URLSearchParams(window.location.search);

    if (window.location.href.includes("gdbrowser.com")) {
            console.log("PreMID Presence Active.")

            // LevelData is just for regular levels
            function LevelData(){
                let downloads = document.getElementsByClassName("inline smaller spaced")[0].innerHTML
                let likes = document.getElementsByClassName("inline smaller spaced")[1].innerHTML
                let orbs = document.getElementsByClassName("orbs")[1].innerHTML
                presenceData.state = `🔽 ${downloads} | 👍 ${likes} | 🔵 ${orbs}`;
                presenceData.details = `${document.getElementsByTagName("h1")[0].innerText} ${document.getElementById("authorLink").innerText}`
                presenceData.smallImageKey = `diff_${document.getElementById("difficultytext").innerHTML.toLowerCase().replace("<br>", "_")}`
                presenceData.smallImageText = `${document.getElementById("difficultytext").innerHTML.replace("<br>", " ")}`
            }

            // If the url has numbers at the end (/)
            if (!isNaN(window.location.pathname.toLowerCase().replace("/", "")) && window.location.pathname.toLowerCase() !== "/"){
                LevelData()
            }

            if (window.location.pathname.toLowerCase() === "/daily") {
                LevelData()
            }
            
            if (window.location.pathname.toLowerCase() === "/weekly") {
                LevelData()
            }


            // Homepage
            if (window.location.pathname.toLowerCase() === "/") {
                if(document.getElementById("credits").style.display === "block"){
                    console.log("yes")
                    presenceData.details = "Viewing the credits"
                    presenceData.state = "❤"
                } else {
                    presenceData.details = "Viewing the homepage";
                }
                // presenceData.details = "Viewing the homepage";
            }


            // other stuff 
            if (window.location.pathname.toLowerCase() === "/iconkit") {
                presenceData.details = "In the iconkit";
            }

            // if (window.location.pathname.toLowerCase() === ("/search")) {
            //         presenceData.details = "Searching for levels";
                    
            // }
            
            if (window.location.pathname.toLowerCase().includes("/search")) {

                if (window.location.pathname.toLowerCase() === ("/search")) {
                        presenceData.details = "Searching for levels";        
                } else {

                    presenceData.details = "Searching for levels";

                    // Map Pack
                    if(q.get("mappack") === 1){
                        presenceData.state = "Viewing a map pack";


                    // Quick Search
                    } else if(q.get("type") === "recent"){
                        presenceData.state = "🕒 Viewing recent levels";
                    } else if(q.get("type") === "mostdownloaded"){
                        presenceData.state = "🔽 Viewing top downloaded levels";
                    } else if(q.get("type") === "mostliked"){
                        presenceData.state = "👍 Viewing top liked levels";
                    } else if(q.get("type") === "trending"){
                        presenceData.state = "📈 Viewing trending levels";
                    } else if(q.get("type") === "magic"){
                        presenceData.state = "✨ Viewing magic levels"
                    } else if(q.get("type") === "awarded"){
                        presenceData.state = "⭐ Viewing awarded levels"
                    } else if(q.get("type") === "featured"){
                        presenceData.state = "⭐ Viewing featured levels"
                    } else if(q.get("type") === "followed"){
                        presenceData.state = "💙 Viewing followed levels"
                    
                        
                    // Diffs
                    } else if(q.get("diff") === "1"){
                        presenceData.state = "😄 Viewing Easy levels"
                    } else if(q.get("diff") === "2"){
                        presenceData.state = "😃 Viewing Normal levels"
                    } else if(q.get("diff") === "3"){
                        presenceData.state = "😅 Viewing Hard levels"
                    } else if(q.get("diff") === "4"){
                        presenceData.state = "😐 Viewing Harder levels"
                    } else if(q.get("diff") === "5"){
                        presenceData.state = "🙁 Viewing Insane levels"
                    } else if(q.get("diff") === "-1"){
                        presenceData.state = "😶 Viewing Unrated levels"
                    } else if(q.get("diff") === "-3"){
                        presenceData.state = "🤖 Viewing Auto levels"

                    // Demons
                    } else if(q.get("diff") === "-2"){
                        if(q.get("demonFilter") === "1"){
                            presenceData.state = "😠 Viewing Easy Demons"
                        } else if(q.get("demonFilter") === "2"){
                            presenceData.state = "😡 Viewing Medium Demons"
                        } else if(q.get("demonFilter") === "3"){
                            presenceData.state = "🤬 Viewing Hard Demons"
                        } else if(q.get("demonFilter") === "4"){
                            presenceData.state = "😈 Viewing Insane Demons"
                        } else if(q.get("demonFilter") === "5"){
                            presenceData.state = "👿 Viewing Extreme Demons"
                        } 
                    } else {
                        presenceData.state = `Searching for ${document.getElementById("header").innerHTML}`
                    }
                }
            }

            if (window.location.pathname.toLowerCase().includes("/mappacks")){
                presenceData.details = "Viewing the Map Packs"
            }

            if (window.location.pathname.toLowerCase().includes("/gauntlets")){
                presenceData.details = "Viewing the Gauntlets"
            }

            if (window.location.pathname.toLowerCase().includes("/leaderboards")){
                presenceData.details = "Viewing the leaderboards"
            }

            if (window.location.pathname.toLowerCase() === "/messages"){
                presenceData.details = "Checking messages"
            }

            if(window.location.pathname.toLowerCase().includes("/profile")){
                presenceData.details = `Looking at ${window.location.href.split("/")[4]}'s profile`
            }
            
            
                
    presence.setActivity(presenceData);
    }
})