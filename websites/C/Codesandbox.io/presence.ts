const presence = new Presence({
    //The client ID of the Application created at https://discordapp.com/developers/applications
    clientId: "961652082027421746"
}),
    browsingTimestamp = Math.floor(Date.now()),

    //supported formats to display in largeImageKey
    formats = ["js", "jsx", "ts", "tsx", "json", "py", "cpp", "cs", "c", "py", "swift", "java", "html", "css"];
presence.on("UpdateData", async () => {

    const presenceData: PresenceData = {
        largeImageKey: "smallimagekey",
        smallImageKey: "smallimagekey",
        smallImageText: "Codesandbox",
        details: "Codesandbox.io",
        startTimestamp: browsingTimestamp
    },
        { pathname } = window.location;
    if (pathname.includes("/dashboard/")) {
        presenceData.details = "Looking at their dashboard";
        presenceData.largeImageKey = "dashboard";
    // A user's page
    } else if (pathname.includes("/u/")) {
        const uname = document.querySelector<HTMLSpanElement>('[class="sc-bdnylx sc-gtssRu gDXMLZ itZLEx"]');
        presenceData.details = "Looking at a user's profile";
        presenceData.state = `@${uname.textContent}`;
        presenceData.buttons = [
            {
                label: `View @${uname.textContent}'s Profile`,
                url: location.href.toString()
            }
        ];
    // sandbox page
    } else if (pathname.includes("/s/")) {
        // if Explorer button is visible, user owns the sandbox and is "Editing"
        if (document.querySelector<HTMLButtonElement>('[aria-label="Explorer"]')) {
            /* yoinks the name of the workspace from the page rather than the url (text is already clean and easy to grab, also always stays there) */
            const workspaceName = document.querySelector<HTMLButtonElement>('[class="sc-bdnylx lfgQvf SandboxName___StyledButton-sc-1nxafha-0 gsbQdg"]'),
                /* splits the search part of the url (?file=/src/Pages/Login.js) to get the file name at the end of the url */
                cfile = window.location.search.split("/").filter(elm => elm !== ""),
                /* splits the search part of the url (?file=/src/Pages/Login.js) where "." is visible to get the file type */
                formatImg = window.location.search.split(".").filter(elm => elm !== "");
            presenceData.details = `Editing ${window.location.search ? ` ${cfile[cfile.length - 1]}` : "a sandbox"}`;
            presenceData.state = `Workspace: ${workspaceName.textContent}`;
            // if any of the file types returned matches up with the defined supported list, it'll take it and match imgs
            if (formats.includes(formatImg[formatImg.length - 1].toString().toLowerCase()))
                presenceData.largeImageKey = `${formatImg[formatImg.length - 1].toLowerCase()}`;
            // if not, then it'll just return a text file img
            else
                presenceData.largeImageKey = "txt";
            // if Explorer button is not visible, then the user is viewing another user's sandbox
        } else {
            const workspaceName = document.querySelector<HTMLButtonElement>('[class="sc-bdnylx sc-gtssRu gDXMLZ efjlMo"]');
            const suser = document.querySelector<HTMLSpanElement>('[class="sc-bdnylx sc-gtssRu gDXMLZ kEgnIE"]');
            presenceData.details = `Looking at ${suser.textContent}'s sandbox`;
            presenceData.state = `Workspace: ${workspaceName.textContent}`;
            presenceData.largeImageKey = "usersandbox";
            // link to user's sandbox
            presenceData.buttons = [
                {
                    label: "View Sandbox",
                    url: location.href.toString()
                }
            ];
        }
    }
    presence.setActivity(presenceData);
});
