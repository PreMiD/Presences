const presence = new Presence({ clientId: "653578846448123906" });
const pages = {
  "/usercp.php": "Kullanıcı Profili",
  "/ihbar/": "İhbar Portalı"
};

presence.on("UpdateData", async () => {
  const page = document.location.pathname;
  const kategori = document.querySelector(
    "#inlinemodform > table.tborder.respborder > tbody > tr > td.tcat"
  );
  const CevapButon = document.querySelector(
    "body > div:nth-child(5) > div.showth-top-bor > div > div:nth-child(1) > a"
  );
  const login = document.querySelector(
    "body > div:nth-child(3) > table.tborder > tbody > tr:nth-child(2) > td > div > div > form > fieldset > legend"
  );
  const register = document.querySelector(
    "body > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td > div.panel > div > fieldset > legend"
  );
  const report = document.querySelector(
    "body > div:nth-child(5) > form > table > tbody > tr:nth-child(1) > td"
  );

  let data = {
    largeImageKey: "tht-logo",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

  if (kategori && kategori.textContent != "") {
    data.details = "Bir kategoriyi inceliyor:";
    data.state = kategori.textContent.split(":")[1];
  } else if (CevapButon && CevapButon.textContent != "") {
    data.details = "Bir konuyu inceliyor:";
    data.state = document.querySelector(
      "body > div:nth-child(6) > h1"
    ).textContent;
  } else if (login && login.textContent == "Giriş") {
    data.details = "Kullanıcı Paneli";
    data.state = "Giriş Yap";
  } else if (
    register &&
    register.textContent == "Lütfen Doğum tarihinizi verin"
  ) {
    data.details = "Kullanıcı Paneli";
    data.state = "Kayıt Ol";
  } else if (
    report.textContent.toLowerCase().includes("mesaji moderatöre bi̇ldi̇r")
  ) {
    data.details = "Bir Mesajı Moderatöre Bildiriyor";
    data.state = "Forum: " + report.textContent.split(":")[1];
  } else if (pages[page] || pages[page.slice(0, -1)]) {
    data.details = "Forumda geziniyor:";
    data.state = pages[page] || pages[page.slice(0, -1)];
  } else {
    data.details = "Forumda geziniyor:";
    data.state = "Ana Sayfa";
  }

  if (data.details && data.state && data.details != "" && data.state != "")
    presence.setActivity(data);
});
