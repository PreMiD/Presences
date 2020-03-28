const presence = new Presence({
  clientId: "673651706139246612",
});

presence.on("UpdateData", async () => {
  const objectElement = document.querySelector("#object");

  if (
    objectElement &&
    objectElement.textContent &&
    JSON.parse(objectElement.textContent) &&
    Object.keys(JSON.parse(objectElement.textContent)).length > 0 &&
    JSON.parse(objectElement.textContent).details &&
    JSON.parse(objectElement.textContent).largeImageKey
  ) {
    presence.setActivity(JSON.parse(objectElement.textContent));
  } else presence.setActivity();
});
