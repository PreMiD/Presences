const presence = new Presence({
    clientId: "916918590354104320"
  }),
    strings = presence.getStrings({
      play: "presence.playback.playing",
      pause: "presence.playback.paused"
    }),
  time = Math.floor(Date.now() / 1000);

  presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
    largeImageKey: "betterhash_1024x1024",
    startTimestamp: time
  };

  if (document.location.pathname === "/" || !document.location.pathname)
   presenceData.details = "Browsing...";
 else if (document.location.pathname.startsWith("/bh/myaccount/login.php"))
    presenceData.details = "Logging In";
  else if (document.location.pathname.startsWith("/bh/myaccount/index.php"))
    presenceData.details = "Checking my current crypto stash";
    else if (document.location.pathname.startsWith("/bh/myaccount/transfers.php"))
    presenceData.details = "Transferring out a crypto to my wallet!";
  else if (document.location.pathname.startsWith("/bh/myaccount/history.php"))
    presenceData.details = "Checking transaction history";
 else if (document.location.pathname.startsWith("/bh/myaccount/workers.php"))
    presenceData.details = "Checking what my current workers are doing";
 
  else if (document.location.pathname.startsWith("/bh/myaccount/btc-transfer.php"))
    presenceData.details = "Transferring out Bitcoin/BTC to my wallet!";
    else if (document.location.pathname.startsWith("/bh/myaccount/settings.php"))
    presenceData.details = "Changing some settings!";
    else if (document.location.pathname.startsWith("/bh/myaccount/notifications.php"))
    presenceData.details = "Changing notification settings!";
    else if (document.location.pathname.startsWith("/bh/myaccount/timezone.php"))
    presenceData.details = "Changing timezone!";
    else if (document.location.pathname.startsWith("/bh/myaccount/currency.php"))
    presenceData.details = "Changing currency!";
    else if (document.location.pathname.startsWith("/bh/myaccount/pools.php"))
    presenceData.details = "Checking Pool URL's!";
    else if (document.location.pathname.startsWith("/bh/myaccount/reporting.php"))
    presenceData.details = "Generating a withdrawls report!";
    else if (document.location.pathname.startsWith("/bh/myaccount/2fa.php"))
    presenceData.details = "Changing 2FA settings!";

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});

