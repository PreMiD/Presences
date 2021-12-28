const presence = new Presence({
    clientId: "918248582459555871"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    smallImageKey: "vukky",
    smallImageText: "Playing Vukkybox",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/gallery") {
    presenceData.details = "Browsing their gallery";
    presenceData.state = `Unlocked ${document
      .getElementById("total_text")
      .childNodes[3].textContent.substring(14, 21)} Vukkies!`;
  } else if (document.location.pathname.includes("guestgallery")) {
    presenceData.details = "Browsing someone's gallery";
    presenceData.state = `Unlocked ${document
      .getElementById("total_text")
      .childNodes[3].textContent.substring(14, 21)} Vukkies!`;
  } else if (document.location.pathname === "/store") {
    presenceData.details = "Browsing the store";
    if (document.getElementById("balance")) {
      presenceData.state = `${
        document.getElementById("balance").innerText
      } to spend!`;
    }
  } else if (document.location.pathname === "/buyBox/classic") {
    presenceData.details = "Opening a Classic Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname === "/buyBox/veggie") {
    presenceData.details = "Opening a Veggie Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname === "/buyBox/fire") {
    presenceData.details = "Opening a Fire Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname === "/buyBox/warped") {
    presenceData.details = "Opening a Cursed Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname === "/buyBox/pukky") {
    presenceData.details = "Opening a Pukky Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname === "/buyBox/shark") {
    presenceData.details = "Opening a Shark Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname === "/buyBox/beggars") {
    presenceData.details = "Opening a Beggar's Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left!`;
  } else if (document.location.pathname.includes("/redeem")) {
    presenceData.details = "Redeeming a coupon!";
    if (
      document.body.style.backgroundImage ===
      'url("https://i.imgur.com/NlGok01.png")'
    )
      presenceData.state = "Yay, it's a valid coupon!";
    else presenceData.state = "Uh oh, the coupon is invalid!";
  } else if (document.location.pathname === "/")
    presenceData.details = "Browsing the homepage";
  else if (document.location.pathname === "/login")
    presenceData.details = "Logging in";
  else if (document.location.pathname === "/profile")
    presenceData.details = "Changing profile settings";
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
