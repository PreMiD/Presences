const presence = new Presence({ clientId: "653578846448123906" });
const pages = {
    "/usercp.php": "Kullanıcı Profili",
    "/ihbar/": "İhbar Portalı"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname;
    const kategori = document.querySelector("#inlinemodform > table.tborder.respborder > tbody > tr > td.tcat");
    const CevapButon = document.querySelector("body > div:nth-child(5) > div.showth-top-bor > div > div:nth-child(1) > a");
    const login = document.querySelector("body > div:nth-child(3) > table.tborder > tbody > tr:nth-child(2) > td > div > div > form > fieldset > legend");
    const register = document.querySelector("body > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td > div.panel > div > fieldset > legend");
    const report = document.querySelector("body > div:nth-child(5) > form > table > tbody > tr:nth-child(1) > td");
    const presenceData = {
        largeImageKey: "tht-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (kategori && kategori.textContent != "") {
        presenceData.details = "Bir kategoriyi inceliyor:";
        presenceData.state = kategori.textContent.split(":")[1];
    }
    else if (CevapButon && CevapButon.textContent != "") {
        presenceData.details = "Bir konuyu inceliyor:";
        presenceData.state = document.querySelector("body > div:nth-child(6) > h1").textContent;
    }
    else if (login && login.textContent == "Giriş") {
        presenceData.details = "Kullanıcı Paneli";
        presenceData.state = "Giriş Yap";
    }
    else if (register &&
        register.textContent == "Lütfen Doğum tarihinizi verin") {
        presenceData.details = "Kullanıcı Paneli";
        presenceData.state = "Kayıt Ol";
    }
    else if (report.textContent.toLowerCase().includes("mesaji moderatöre bi̇ldi̇r")) {
        presenceData.details = "Bir Mesajı Moderatöre Bildiriyor";
        presenceData.state = "Forum: " + report.textContent.split(":")[1];
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presenceData.details = "Forumda geziniyor:";
        presenceData.state = pages[page] || pages[page.slice(0, -1)];
    }
    else {
        presenceData.details = "Forumda geziniyor:";
        presenceData.state = "Ana Sayfa";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFDbEUsTUFBTSxLQUFLLEdBQUc7SUFDWixhQUFhLEVBQUUsbUJBQW1CO0lBQ2xDLFNBQVMsRUFBRSxlQUFlO0NBQzNCLENBQUM7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyxrRUFBa0UsQ0FDbkUsQ0FBQztJQUNGLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLDJFQUEyRSxDQUM1RSxDQUFDO0lBQ0YsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsK0dBQStHLENBQ2hILENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNyQyw2R0FBNkcsQ0FDOUcsQ0FBQztJQUNGLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ25DLHVFQUF1RSxDQUN4RSxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxVQUFVO1FBQ3pCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDOUMsQ0FBQztJQUVGLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQzFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7UUFDbkQsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6RDtTQUFNLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7UUFDL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6Qyw4QkFBOEIsQ0FDL0IsQ0FBQyxXQUFXLENBQUM7S0FDZjtTQUFNLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxXQUFXLElBQUksT0FBTyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7S0FDbEM7U0FBTSxJQUNMLFFBQVE7UUFDUixRQUFRLENBQUMsV0FBVyxJQUFJLCtCQUErQixFQUN2RDtRQUNBLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7UUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDakM7U0FBTSxJQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLEVBQ3ZFO1FBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQ0FBa0MsQ0FBQztRQUMxRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRTtTQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDbEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztRQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzlEO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO0tBQ2xDO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==