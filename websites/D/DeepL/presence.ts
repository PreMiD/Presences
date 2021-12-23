const presence = new Presence({
  clientId: "614903529240395782"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/translator") {
    presence.setActivity({
      details:
        document.getElementsByClassName("translate_from")[0].parentNode
          .textContent,
      state:
        document.getElementsByClassName("translate_to")[0].parentNode
          .textContent,
      largeImageKey: "lg-deepl"
    });
  } else {
    presence.setActivity({
      largeImageKey: "lg-deepl"
    });
  }
});
