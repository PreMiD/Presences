var presence = new Presence({
    clientId: "652773935829614592",
    mediaKeys: false
});

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "logo"
    };

    if (window.location.pathname.endsWith("about")) {

        presenceData.details = "Hakkında kısmına göz atıyor...";
     presenceData.state = "tatsumaki.xyz/about"

    }


else if (window.location.pathname.endsWith("settings.html")) {

        presenceData.details = "Sunucu ayarları sekmesine göz atıyor...";
     presenceData.state = "tatsumaki.xyz/settings.html"

    }

    else if (window.location.pathname.endsWith("commands.html")) {

            presenceData.details = "Tüm komutlara göz atıyor...";
         presenceData.state = "tatsumaki.xyz/commands.html"

        }

        else if (window.location.pathname.endsWith("faq.html")) {

                presenceData.details = "Sıkça sorulan sorulara göz atıyor...";
             presenceData.state = "tatsumaki.xyz/faq.html"

            }

            else if (window.location.pathname.endsWith("globalRankings")) {

                    presenceData.details = "Küresel sıralamaya göz atıyor...";
                 presenceData.state = "tatsumaki.xyz/globalRankings"

                }

                else if (window.location.pathname.endsWith("dashboard")) {

                        presenceData.details = "Dashboard'da bir şeyleri kontrol ediyor...";
                     presenceData.state = "tatsumaki.xyz/dashboard"

                    }

                    else if (window.location.pathname.endsWith("profile")) {

                            presenceData.details="Profilini düzenliyor..."
                         presenceData.state = "tatsumaki.xyz/profile"

                        }

                        else if (window.location.pathname.startsWith("/serverRankings/")) {

                                presenceData.details="Bir sunucunun level sıralamasına bakıyor..."
                             presenceData.state=document.querySelector("#top > div.jumbotron > div > div > div.col-md-10 > p").textContent

                            }

                            else if (window.location.pathname.startsWith("/guild/")) {

                                    presenceData.details=document.querySelector("#top > div.jumbotron > div > div > div.col-md-10 > h1").textContent + " adlı sunucuyu dashboard üzerinden kontrol ediyor."
                                 presenceData.state= "tatsumaki.xyz/dashboard"

                                }

    presence.setActivity(presenceData);

});
