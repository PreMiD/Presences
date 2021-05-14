const presence = new Presence({
  clientId: "653220659887079434"
});

presence.on("UpdateData", async () => {
  /* THIS IS EASY AND EFFICIENT! */
  if (document.location.pathname != "/projects/premid/custom-status") {
    // Adding this, probably not needed but it's fine.
    const details = document.querySelector("[name~=premid-details][content]")
        ? (
            document.querySelector(
              "[name~=premid-details][content]"
            ) as HTMLMetaElement
          ).content
        : null,
      state = document.querySelector("[name~=premid-state][content]")
        ? (
            document.querySelector(
              "[name~=premid-state][content]"
            ) as HTMLMetaElement
          ).content
        : null,
      smallImage = document.querySelector("[name~=premid-smallImage][content]")
        ? (
            document.querySelector(
              "[name~=premid-smallImage][content]"
            ) as HTMLMetaElement
          ).content
        : null;

    if (state && details)
      presence.setActivity({
        largeImageKey: "ec-logo",
        details: details,
        state: state,
        smallImageKey: smallImage ? smallImage : "SOMETHING-SKETCHY",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
    else
      presence.setActivity({
        largeImageKey: "ec-logo",
        details: "Viewing a page:",
        state: "Homepage",
        startTimestamp: Math.floor(Date.now() / 1000)
      });
  }
});
