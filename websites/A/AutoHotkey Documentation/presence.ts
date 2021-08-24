const presence = new Presence({
    clientId: "879675566385659945"
});

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "biglogo",
        smallImageText: "AHK v2 Documentation",
        startTimestamp: Math.floor(Date.now() / 1000)
    };

    switch (document.location.pathname) {
        case "/":
            presenceData.details = "Selecting AHK / docs version...";
            return presence.setActivity(presenceData);
        case "/v2/docs/AutoHotkey.htm":
            return presence.setActivity(presenceData);
        default:
            presenceData.details = "Viewing a Doc page";
            break;
    }

    /* Define the "unwanted character" regex here, cause we need that more than once XD */
    const reg = '([^,(\\n\'"]*)',

    /* Get the iframe the actual content is in.
      This is such basic text retrieval that using the iframe data retrieval method from the documentation would be overkill... */
     iframeObj = document.querySelector('iframe').contentDocument;
    if (!iframeObj) {
        presence.setActivity();
        return;
    }

    /* h1 heading at the top of the page + textContent handling
        Some headings, such as the one at "Hotkeys.htm", have extra info, like "(Mouse, Joystick and Keyboard Shortcuts)". My initial clean-up method for this was just removing everything from the first comma to the end of the textContent, however, this results in shit like "Hotkeys (Mouse", which is obviously unwanted. Basically, everything BEFORE and unwanted character (such as a comma or an opening parenthesis) is to be kept (which might include leading/trailing whitespace, so trim() that), end of the story. */
    const headingObj = iframeObj.querySelector('h1');
    let headingTxt;
    if (headingObj !== null) 
        headingTxt = headingObj.textContent.match(reg)[0].trim();
     else {
        presence.setActivity();
        return;
    }

    /* Subheading + textContent handling
        The initial problem wasn't retrieving the contents, that part was easy. However, sometimes an anchor (e.g. "/Send.htm#blind") does not refer to a heading, but just a normal <p> or even a <div>. This is problematic because the textContent property is WAY too long obviously, so I decided to implement some clean-up procedures here as well. */
        /* While this may very well succeed and return a non-null value, it's not guaranteed that the returned selector will be "valid", whatever that means. For example, Firefox complains about the selector "#Seek_(SearchTheStartMenu)" being invalid despite obviously working when clicking the link on the Doc page (https://lexikos.github.io/v2/docs/scripts/index.htm). Why that is, no idea. Is it a pain in the ass, though? Hell yes.
        However, the way I initially wrote this already provides a veeeery fragile safety net against any potential problems, because a null value in subMatch just leads to the entirety of the subTxt routine being skipped. The problem is, subMatch is not null in the above example, meaning the SyntaxError is thrown during the part where it is assumed that subMatch is 100% valid.
        Solution is easy enough, however, just add some checks whether subMatch contains parentheses and we're set. That is, assuming no other "invalid" selectors are anywhere in the AHK v2 Docs.
        I'll leave *those* to be sorted by that safety net though, it'll just not display a subpart / heading and that's it. */
        let subTxt;
    try {
        const [subMatch] = document.location.href.match(new RegExp("#.*"));
        if (subMatch !== null && !(subMatch.includes("(") || subMatch.includes(")"))) {
            const subObj = iframeObj.querySelector(subMatch);
            if (subObj.tagName.toLowerCase() === "p") {
                // Retrieve part of the textContent of the <p> element, truncate at 50 chars and ellipsize
                subTxt = `${subObj.textContent.slice(0, 51)}(...)`;
            } else if (subObj.tagName.toLowerCase() === "div") {
                // Get a child node of the <div> which's class name contains "head" and retrieve its textContent (this should always be a heading, no clean-up or ellipsis needed)
                subTxt = subObj.querySelector('[class*="head"]').textContent;
            } else if (subObj.tagName.toLowerCase() === "tr") {
                // Get the <tr>'s first child node's textContent (which is <td>), then clean it up and trim
                subTxt = subObj.children[0].textContent.match(reg)[0].trim();
            } else { subTxt = subObj.textContent; }
        }
    } catch { }

    if (headingObj !== null) {
        // Finish piecing the parts of presenceData.state together
        presenceData.state = headingTxt + (subTxt === null ? "" : ` - ${subTxt}`);
    }

    presence.setActivity(presenceData);
});