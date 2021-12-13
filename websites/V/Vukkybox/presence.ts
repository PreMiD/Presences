const presence = new Presence({
  clientId: "918248582459555871"
});
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon",
    smallImageKey: "vukky",
    smallImageText: "Playing Vukkybox"
  };

  if (document.location.pathname === "/gallery") {
    presenceData.details = "Browsing the Gallery";
    presenceData.state = `Unlocked ${document
      .getElementById("total_text")
      .childNodes[3].textContent.substring(14, 21)} Vukkies!`;
    presenceData.startTimestamp = Date.now();
  } else if (document.location.pathname === "/") {
    presenceData.details = "Browsing the Homepage";
    presenceData.state = `Obtained ${
      document.getElementById("balance").innerText
    }!`;
    presenceData.startTimestamp = Date.now();
  } else if (document.location.pathname === "/store") {
    presenceData.details = "Browsing the Store";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } to spend!`;
    presenceData.startTimestamp = Date.now();
  } else if (document.location.pathname === "/buyBox/classic") {
    presenceData.details = "Opening a Classic Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left to spend!`;
  } else if (document.location.pathname === "/buyBox/veggie") {
    presenceData.details = "Opening a Veggie Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left to spend!`;
  } else if (document.location.pathname === "/buyBox/fire") {
    presenceData.details = "Opening a Fire Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left to spend!`;
  } else if (document.location.pathname === "/buyBox/warped") {
    presenceData.details = "Opening a Cursed Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left to spend!`;
  } else if (document.location.pathname === "/buyBox/pukky") {
    presenceData.details = "Opening a Pukky Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left to spend!`;
  } else if (document.location.pathname === "/buyBox/shark") {
    presenceData.details = "Opening a Shark Box";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } left to spend!`;
  } else if (document.location.pathname === "/profile") {
    presenceData.details = "Changing profile settings";
    presenceData.state = `${
      document.getElementById("balance").innerText
    } to spend!`;
  } else if (document.location.pathname.includes("/redeem")) {
    presenceData.details = "Redeeming a coupon!";
    if (document.body.style.backgroundImage === 'url("https://i.imgur.com/NlGok01.png")')
      presenceData.state = "Yay, it's a valid coupon!";
    else presenceData.state = "Uh oh, the coupon is invalid!";
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
