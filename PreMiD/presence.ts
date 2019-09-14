var presence = new Presence({
  clientId: "622478766450540544",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "lg-premid"
  }
  if(document.location.pathname == "/") {
    presenceData.state = "Viewing Homepage...";
  } else if(document.location.pathname.includes("downloads")) {
    presenceData.state = "Viewing Downloads...";
  } else if(document.location.pathname.includes("contributors")) {
    presenceData.state = "Viewing Contributors...";
  } else if(document.location.pathname.includes("store")) {
    presenceData.state = "Viewing Store...";
  }
  presence.setActivity(presenceData);
});
