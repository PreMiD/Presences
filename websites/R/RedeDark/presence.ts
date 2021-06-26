const presence = new Presence({
  clientId: "858109643347066941"
}),

 browsedTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rededark"
  };

  if (document.location.hostname == "rededark.com") {
    presenceData.startTimestamp = browsedTimestamp;
    if (document.location.pathname == "/") {
      presenceData.details = 'Página inicial | Notícias',
      presenceData.state = 'discord.gg/rededarkoficial';

    } else if (document.location.pathname.includes("loja")) {
      presenceData.details = 'Navegando na loja..',
      presenceData.state = 'discord.gg/rededarkoficial';

    } else if (document.location.pathname.includes("itens")) {
      presenceData.details = 'Navegando na loja..',
      presenceData.state = 'discord.gg/rededarkoficial';

    } else if (document.location.pathname.includes("equipe")) {
      presenceData.details = 'Equipe RD | Lista',
      presenceData.state = 'discord.gg/rededarkoficial';

    } else if (document.location.pathname.includes("regras")) {
      presenceData.details = 'Regras In-Game | RD',
      presenceData.state = 'discord.gg/rededarkoficial';
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
