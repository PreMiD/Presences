// Not sure if this TypeScript works. JavaScript file works just fine :3

let presence = new Presence({
    clientId: "628019683718856714"
});

presence.on("UpdateData", async () => {
    let name = document.querySelectorAll("header")[1] ? document.querySelectorAll("header")[1].getElementsByTagName("span")[1].innerText : null,
        typing = document.getElementsByClassName("hnQHL")[1] ? document.getElementsByClassName("hnQHL")[1].firstElementChild.tagName : null,
        textPermission = document.getElementsByClassName("wjdTm")[0] ? true : false;

    if (!name || name === null || name == "") return;
    if (!isNaN(document.querySelectorAll("header")[1].getElementsByTagName("span")[1].innerText.replace("+", "").replace(/ /g, "") as any)) name = "a private person"; // This will protect you from showing people the unsaved contact's number.

    const data = {
        largeImageKey: "waweb-logo",
        details: `Texting with ${name}`,
        state: `${typing && typing == "BUTTON" ? "Typing..." : `${!typing && !textPermission ? "Can't really type..." : "Just waiting..."}`}`,
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    presence.setActivity(data);
});