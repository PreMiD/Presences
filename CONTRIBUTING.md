<div align="center">
    <img src="https://avatars3.githubusercontent.com/u/46326568" width="128px" style="max-width:100%;">
    <h1>Presence Guidelines</h1>
</div>

# Guidelines

> If you do **NOT** follow all of the guidelines, a `Presence Verifier` will request the proper changes or your pull request may even be closed under certain circumstances.

> When you make pull requests about adding or modifying existing presences, you **MUST** include a screenshot. However, modifications to a presence's `metadata.json` or `tsconfig.json` files do **NOT** require a screenshot. _Your screenshot MUST be uploaded directly to GitHub with the pull request, do **NOT** use third-party image sharing websites._

When publishing presences to this GitHub, we require you to follow a set of guidelines.
To some, these strict rules may seem harsh. However, the implementation of these rulesets will keep our servers from running into any issues.

> :x: **Note**: Media key support has been **COMPLETELY REMOVED**, if you are a presence developer that has media key support in any of your presences (new or old), please remove it.

## Creation

> The code you write MUST be _well-written_ and MUST be _readable_. `DeepScan` on GitHub will report code quality issues to the `Presence Verification Team`. We recommend that your fork is up to date when you make pull requests, it will help limit false positives.

- The pull request **MUST** be complete, you need to have a proper file structure, drafts are **NOT** allowed. Including the `dist` folder, `presence.js` file, and `metadata.json` file, which is represented in the following example schema:

```bash
presence
└── dist
    ├── metadata.json
    └── presence.js
```

or if you're using TypeScript and `iframe` (the max you could reach) :

```bash
presence
├── dist
│   ├── metadata.json
│   ├── presence.js
│   └── iframe.js
├── presence.ts
├── iframe.ts
└── tsconfig.json
```

Before you begin working on your presence, keep the following list in mind.

- The presence **MUST** be related to the website you have chosen.
- The presence **MUST NOT** be of any illegal websites. These include stressors, drugs, child porn, etc...
- The presence metadata **MUST** have well-written content, including valid titles, and descriptions.
- The media you include (icon/thumbnail) **MUST** be related to the website and should be understandable in terms of size and quality.
- The file structure **MUST** be clean and managed, do **NOT** have random files that provide nothing to the presence's function.
- The presence **MUST NOT** have any malicious intentions. These include stealing/leaking private information, negatively affecting the behavior of the website, etc...
- If you design a presence for a website and the website happens to change in the future, you **ARE** responsible for updating the presence again to work as expected. If you do **NOT** fix it within 7 days, other presence developers are allowed to **OVERWRITE** your presence to comply with the changes.
- The presence **MUST** be tested before publishing to confirm that everything works as expected.
- Your presence **MUST** have SFW images and descriptions regardless if it is NSFW or not. If your presence is about an NSFW website, please add the `nsfw` tag to your metadata.
- Your presence **CANNOT** manipulate local storage on the browser.
- Your presence may use cookies to store data. All data stored by the presence should be prefixed with `pmd_`.
- The name of your presence **MUST** be the name of your presence's directory name. For example, a presence named `Google Docs` must have a directory of `/Google Docs/`. (All spaces, periods, commas, and any other special characters must be included.)

## Modification

> You MUST change the version in the **metadata** to be a higher value from previous version when making changes to either the **presence.js** or **metadata.json**.

In some situations, presences may behave unexpectedly or could use some minor changes to improve its functionality. Here is a compiled list that you **MUST** follow to modify presences.

- You are **NOT** allowed rewrite a presence or change it's author. If the presence author was banned from the official server or hasn't made required changes in a 7 day period, you may contact a PreMiD `Presence Verifier` to see if you are applicable to rewrite the presence of choice.
- Anyone may provide hotfixes to fix bugs, however, try **NOT** to make changes to code that does **NOT** need to be fixed. Valid modifications are, but **NOT** limited to, _missing paths_, _typos_, _missing images_, etc...
- If you make modifications to a presence and change at least a **QUARTER** of the presence's codebase, you are allowed to add yourself as a contributor. Contact a `Presence Verifier` for more information about this subject.
- Make sure the modifications are useful. These may include fixes (code and typos), additions (descriptions and tags), etc... Do **NOT** change images if they are not outdated and have a decent resolution.
- Confirm that your changes work before publishing. Do **NOT** create pull requests without knowing the outcome of your changes.
- Maintain the language the presence author used when writing the presence. For example, do **NOT** delete typescript files and use the javascript files instead.

# Verification

> If you need to contact someone, please use our official Discord server. All `Presence Verifiers` will have a unique role on their profile.

For your presence to reach the stores, it MUST go through a process on GitHub to confirm that it works as expected. These are a few things to look out for when making your pull request.

1. It takes two verifiers to confirm that your presence is up to standards. If you happen to get change requests, make the proper effort to fix it or it will **NOT** be added.
2. If we request changes and your pull request exceeds **7 days of inactivity** without making the necessary ones, we'll be forced to close it.
3. You are allowed to take screenshots of changes made with the help of another user, and you are allowed to stitch screenshots for viewing pleasure. ( e.g. its author in case you can't access it for any reason).
4. If it is an update or patch, the screenshot **MUST** show the new additions working, **NOT** any old features from previous pull requests.
5. The provided screenshots should be real, **NOT** edited.
6. Any contributed code that gets merged to this repository will be licensed under the **Mozilla Public License 2.0**.
7. Presences for free domains or hosts (e.g. .TK, [all free Freenom domains], .RF.GD, etc...) are **NOT** allowed at all, exceptions can be made if a proof is presented showing that they paid for the domain.
8. The `smallImageKey` and `smallImageText` fields are intended to provide additional/secondary context (such as "playing"/"paused" for video sites, "browsing" for regular sites and other cases) not to promote Discord profiles or anything unrelated to PreMiD.
9. The requirements for logos are 1:1 (Square) in 512px, thumbnails, however, should either be [wide promotional cards](https://i.imgur.com/3QfIc5v.jpg) or simply [screenshots](https://i.imgur.com/OAcBmwW.png) if the first is **NOT** available.
10. Presences should at least have 1 tag. Tags must **NOT** include any spaces, slashes, single/double quotation marks, unicode characters and should always be lowercase.
11. The `url` field **MUST NOT** include `http://` or `https://`, neither the parameters (e.g. a presence for `https://www.google.com/search?gws_rd=ssl` will only have `www.google.com` in the `url` field).
12. Descriptions and tags should always be in an array, even when it's only one element. The `url` field, however, should only be a string if it's one domain.
13. Tags should be used as alternate names whenever possible, shortened versions must be included as well (e.g. if an Amazon presence had included AWS support it would have its tags like : "amazon-web-services" and "aws").
14. Unstable sites that constantly change APIs/domains, randomize HTML elements or just still being in heavy development are not allowed and will be removed from the store.
15. The logo and thumbnail on your presence MUST either be `i.imgur.com`, from a CDN that **YOU** own, or from a CDN that gives you permission to **CHANGE** image files.
16. Verifiers will check if the presence contains an `__awaiter` function in the beginning of the code, whether it's in Typescript or Javascript, and in addition to that, make sure the `UpdateData` event used is similar to this:
```ts
presence.on("UpdateData", async () => { /*...*/ });
```
It should **NOT** this:
```ts
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () { /*...*/ });
```
17. You **MUST** include all source files (such as `presence.ts` or `iframe.ts`), do **NOT** include a source mapping url if your presence's language is Javascript.
18. When **Deepscan** throws a lot of errors (and it will), it is mostly an issue with your branch being outdated, always have an up-to-date fork when making pull requests.
19. Always make sure the version number is `<MAJOR>.<MINOR>.<PATCH>`, anything else like a `1.0.0.1` or `1.0` or `1` even a `1.0.0BETA` is **NOT** permitted.
20. Presences with one context are **NOT** be allowed (only shows the logo and some text but never changes again).

After meeting all of the guidelines and having your presence reviewed at least twice, your presence will be merged with the store.
