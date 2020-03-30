const presence = new Presence({ clientId: "653156362548805652" });
const pages = {
  "/docs": "Documention",
  "/login": "Login Page",
};

presence.on("UpdateData", async () => {
  const page = document.location.pathname;
  const head = document.querySelector(
    "#page-wrapper > div > div > div > div > div.panel-heading"
  );

  let data = {
    largeImageKey: "ap-logo_new",
    startTimestamp: Math.floor(Date.now() / 1000),
  };

  if (pages[page] || pages[page.slice(0, -1)]) {
    data.details = pages[page] || pages[page.slice(0, -1)];
  } else if (head && head.textContent == "Configuration Editor") {
    data.details = "Configuration Page";
  } else if (head && head.textContent == "Infractions") {
    data.details = "Infraction List";
  } else if (head && head.textContent == "Guild Weekly Message Throughput") {
    data.details = "Guild Stats";
  } else if (head && head.textContent == " Guild Banner") {
    data.details = "Guild Info Page";
  } else {
    data.details = "Read to Documentation";
  }

  if (data.details && data.details != "") presence.setActivity(data);
});
