<div align="center">
    <img src="https://avatars3.githubusercontent.com/u/46326568" width="128px" style="max-width:100%;">
    <h1>Presence Guidelines</h1>
</div>

# Guidelines

> If you do **NOT** follow the guidelines, a `Presence Verifier` will request the proper changes, or will have to close it under certain circumstances.

> When you make pull requests about adding or modifying existing Presences, you **MUST** include a screenshot. However, modifications to a Presence's `metadata.json` or `tsconfig.json` files do **NOT** require a screenshot. _Your screenshot **MUST** be directly uploaded to GitHub with the pull request, do **NOT** use third-party image sharing sites._

When publishing Presences to this GitHub, we require you to follow a set of guidelines.
To some, these strict rules may seem harsh. However, the implementation of these rulesets will keep us and the users from running into any issues.

## Creation

> The code you write **MUST** be _well-written_ and **MUST** be _readable_. `DeepScan` on GitHub will report code quality issues to the `Presence Verification Team`. We recommend that your fork is up to date when you make pull requests, it will help limit false positives.

- The pull request **MUST** be complete, you need to have a proper file structure, drafts are **NOT** allowed. Including the `dist` folder, `presence.ts` file, and `metadata.json` file is mandatory so the result would be what is represented in the following schema:

```bash
presence
├── dist
│   ├── metadata.json
│   └── presence.js
├── presence.ts
└── tsconfig.json
```

or if you're using `iframe` :

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

Before you begin working on your Presence, keep the following list in mind.

- The Presence **MUST** be related to the site you have chosen.
- The Presence **MUST NOT** be of any illegal sites. These include stressors, drugs, child porn, etc.
- The Presence metadata **MUST** have well-written content, including valid titles, and descriptions.
- The media you include ( icon/thumbnail ) **MUST** be related to the site and should be understandable in terms of size and quality.
- The file structure **MUST** be clean and managed, do **NOT** have random files that provide nothing to the Presence's function.
- The Presence **MUST NOT** have any malicious intentions. These include stealing/leaking private information, negatively affecting the behavior of the site, etc.
- If you design a Presence for a site that happens to change in the future and as a result, potentially breaking your Presence, you **ARE** responsible for updating it to work as expected. If you do **NOT** fix it within seven days, other Presence developers are allowed to **OVERWRITE** it to comply with the changes.
- The Presence **MUST** be tested before publishing to confirm that everything works as expected.
- Your Presence **MUST** have SFW images and descriptions regardless if it is NSFW or not. If your Presence is about an NSFW site, please add the `nsfw` tag to your metadata.
- Your Presence **CANNOT** manipulate local storage on the browser.
- Your Presence may use cookies to store data, you have to prefix all of them with `pmd_`.
- The name of your Presence **MUST** be the name of your Presence's directory name. For example, a Presence named `Google Docs` must have a directory of `/Google Docs/`. ( You should include all spaces, periods, commas, and any other special characters. )

## Modification

> You **MUST** change the version in the **metadata** to be a higher value from the previous version when making changes to either the **presence.ts**, **iframe.ts** or **metadata.json**.

In some situations, Presences may behave unexpectedly or could use some minor changes to improve their functionality. Here is a compiled list that you **MUST** follow to modify Presences.

- You are **NOT** allowed to rewrite a Presence or change its author. If the Presence author was banned from the official server or hasn't made the required changes in seven days, you may contact a `Presence Verifier` to see if you can to rewrite the Presence of your choice.
- Anyone may provide hotfixes to fix bugs; however, try **NOT** to make changes to code that does **NOT** need to be fixed. Valid modifications are, but **NOT** limited to, _missing paths_, _typos_, _missing images_, etc.
- If you make modifications to a Presence and change at least a **QUARTER** of the Presence's codebase, you are allowed to add yourself as a contributor. Contact a `Presence Verifier` for more information about this subject.
- Make sure the modifications are useful. These may include fixes ( code and typos ), additions ( descriptions and tags ), etc. Do **NOT** change images if they are not outdated and have a decent resolution.
- Confirm that your changes work before publishing. Do **NOT** create pull requests without knowing the outcome of your changes.
- When you make changes to a presence, modify the `presence.ts` file and compile it, do not make changes to the `presence.js` file directly.

# Verification

> ⚠️ **Warning**: Presence developers are now required to use `TypeScript`, the option for `JavaScript` presences has been completely removed.

> **Confirm** that your presence's [metadata](https://docs.premid.app/en/dev/presence/metadata) is valid and has all of the necessary fields before making a pull request. If your metadata contains an optional variable that is set to the default value, remove it ( Presence Verifiers will request you to remove them ).  

> If you need to contact someone, please use our official Discord server. All `Presence Verifiers` will have a unique role in their profile.

For your Presence to reach the stores, it **MUST** go through a process on GitHub to confirm that it works as expected. These are a few things to look out for when making your pull request.

1. It takes two verifiers to confirm that your Presence is up to standards. If you happen to get change requests, make the proper effort to fix it, or it will **NOT** be added.
2. If we request changes and your pull request exceeds **7 days of inactivity** without making the necessary ones, we'll be forced to close it.
3. You are allowed to take screenshots of changes made with the help of another user, and you are allowed to stitch screenshots for viewing pleasure. ( e.g., its author in case you can't access it for any reason ).
4. If it is an update or patch, the screenshot **MUST** show the new additions working, **NOT** any old features from previous pull requests.
5. The provided screenshots should be real, **NOT** edited.
6. Any contributed code that gets merged to this repository will be licensed under the **Mozilla Public License 2.0**.
7. Presences for free domains or hosts ( e.g., .TK, [all free Freenom domains], .RF.GD, etc ) are **NOT** allowed at all, exceptions can be made if a proof is presented showing that they paid for the domain.
8. The `smallImageKey` and `smallImageText` fields are intended to provide additional/secondary context (such as "playing"/"paused" for video sites, "browsing" for regular sites, and other cases) not to promote Discord profiles or anything unrelated to PreMiD.
9. The requirements for logos are 1:1 (Square) in 512px, thumbnails, however, should either be [wide promotional cards](https://i.imgur.com/3QfIc5v.jpg) or simply [screenshots](https://i.imgur.com/OAcBmwW.png) if the first is **NOT** available.
10. Presences should at least have one tag. Tags must **NOT** include any spaces, slashes, single/double quotation marks, Unicode characters, and should always be lowercase.
11. The `url` field **MUST NOT** include `http://` or `https://`, neither the parameters ( e.g. a Presence for `https://www.google.com/search?gws_rd=ssl` will only have `www.google.com` in the `url` field ).
12. Descriptions and tags should always be in an array, even when it's only one element. The `url` field, however, should only be a string if it's one domain.
13. Tags should be used as alternate names whenever possible, and shortened versions must be included as well ( e.g., if an Amazon Presence had included AWS support, it would have its tags like "amazon-web-services" and "aws" ).
14. Unstable sites that constantly change APIs/domains, randomize HTML elements, or just still being in heavy development are not allowed and will be removed from the store.
15. The logo and thumbnail on your Presence **MUST** either be `i.imgur.com`, from a CDN that **YOU** own, or from a CDN that gives you permission to **CHANGE** image files.
16. Verifiers will check if the Presence contains an `__awaiter` function at the beginning of the code ( which comes from an earlier version of ECMAScript ), and in addition to that, make sure the `UpdateData` event used is similar to this:

```ts
presence.on("UpdateData", async () => {
  /*...*/
  // Always use await when using async in the event
  data.smallImageText = (await strings).playing;
  /*...*/
});
```

It should **NOT** be this:

```ts
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
  /*...*/
  // Never use yield
  data.smallImageText = (yield strings).playing;
  /*...*/
});
```

17. When **Deepscan** throws a lot of errors ( and it will ), it is mostly an issue with your branch being outdated, always update your GitHub fork when making pull requests.
18. The version in your metadata **MUST** start with `1.0.0` unless specified, any other version will **NOT** be permitted.
19. Low-quality Presences ( or ones with one context ) are **NOT** allowed ( e.g., only showing the logo and some text but never changing again ).
20. **NEVER** use custom functions when [native variants are available](https://docs.premid.app/dev/presence#files-explained); this makes sure fixes on the extension level also apply to your Presences, you're free to use whatever you need if you do not find them listed in the docs.
21. Declare the Presence const **BEFORE** everything to avoid such rare issues that may occur; this is not a requirement by design so it could be removed in the future.
22. Presences that target internal browser pages ( like Chrome Web Store, `chrome://`, `about:` pages, etc ) are **NOT** allowed as they require an _experimental flag_ to be enabled on the user's end and could potentially cause damage to their browsers.
23. It is **FORBIDDEN** to code Presences for a site without adding support to its main language (e.g., a YouTube Presence coded with support for Portuguese and Japanese, but not English itself).
24. You **MUST** compile all `TypeScript` files in your presence before making a pull request. 
25. Declare the presence variable before anything, ( can cause some users issues that can be prevented ).
26. Do **NOT** edit the `tsconfig.json` file, use exactly what is specified on the [documentation](https://docs.premid.app/en/dev/presence/tsconfig#presence-configuration).
27. Presences with support only for a single subdomain will **NOT** be permitted, as they may seem broken for other pages ( like the homepage ), exceptions can be made for policy and contact pages ( content that isn't used much ) or sites where the other content is unrelated ( e.g wikia pages ).
28. All presences **MUST**  include an English description, including websites that aren't natively English.

After meeting all of the guidelines and having your Presence reviewed at least twice, your Presence will be merged with the store.
