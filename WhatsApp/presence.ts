// Not sure if this TypeScript works. JavaScript file works just fine :3

let presence = new Presence({
    clientId: "628019683718856714"
});

presence.on("UpdateData", async () => {
    let name = document.querySelector("#main > header > div._3V5x5 > div._1lpto > div > span") as HTMLElement,
        typing = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)") ? document.querySelector("#main > footer > div._2i7Ej.copyable-area > div:nth-child(3)").firstChild as HTMLElement : null,
        textPermission = document.querySelector("#main > footer > div._2i7Ej.copyable-area > div._13mgZ") as HTMLElement ? true : false,
        contactName = null;

    if (!name || name === null || name.innerText == "") return presence.clearActivity();
    if (isNaN(name.innerText.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "") as any)) contactName = name.innerText; // This will protect you from showing people the unsaved contact's number.

    const data = {
        largeImageKey: "waweb-logo",
        details: `Texting with ${contactName ? contactName : 'someone'}`,
        state: `${typing && typing.tagName == "BUTTON" ? "Typing..." : `${!typing && !textPermission ? "Can't really type..." : "Just waiting..."}`}`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    presence.setActivity(data);
});