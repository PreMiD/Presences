<div align="center">
    <img src="https://avatars3.githubusercontent.com/u/46326568" width="128px" style="max-width:100%;">
    <h1>Presence Guidelines</h1>
</div>

# Guidelines
> If you do not follow all of the guidelines, your presence or pull request will be deleted off of the GitHub repository.

When publishing presences to this GitHub, we require you to follow a set of guidelines.
To some, these strict rules may seem harsh. However, the implementation of these rulesets will keep our servers from running into any issues.

## Creation

Before you begin working on your presence, keep the following list in mind.
- The pull request must be complete, you need to have a proper file structure. Including the `dist` folder, `presence.js` file, and `metadata.json` file, which is represented in the following example schema :
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
- The presence **must** be related to the website you have chosen.
- The presence must not be of any illegal websites. These include stressors, drugs, child porn, etc...
- The presence metadata must have well-written content, including valid titles, and descriptions.
- The media you include (icon/thumbnail) must be related to the website and should be understandable in terms of size and quality.
- The file structure must be clean and managed, do not have random files that provide nothing to the presence's function.
- The presence **must not** have any malicious intentions. These include stealing/leaking private information, negatively affecting the behavior of the website, etc...
- If you design a presence for a website and the website happens to change in the future, you **ARE** responsible for updating the presence again to work as expected. If you do not fix it within an acceptable time frame, other presence developers are allowed to **overwrite** your presence to comply with the changes.
- The presence must be tested before publishing to confirm that everything works as expected.
- Your presence must have SFW images and descriptions regardless if it is NSFW or not. If your presence is about an NSFW website, please add the `nsfw` tag to your metadata.

## Modification

In some situations, presences may behave unexpectedly or could use some minor changes to improve its functionality. Here is a compiled list that you must follow to modify presences.
- You are not allowed to change the creator of the presence. This is only applicable if you are allowed to re-write it.
- Make sure the modifications are useful. These may include fixes (code and typos),  additions (descriptions and tags), etc... Do not change images if they are not outdated and have a decent resolution.
- Confirm that your changes work before publishing. Do not create pull requests without knowing the outcome of your changes.
- Do not re-brand/overwrite a presence completely unless permitted by a `Presence Verifier` or staff member. 

# Verification
> When you make pull requests about adding or modifying existing presences, you must include a screenshot. However, modifications to a presence's **"metadata.json"** or **tsconfig.json** files do not require a screenshot. *Your screenshot must be uploaded directly to GitHub with the pull request, do not use third-party image sharing websites.*

For your presence to reach the stores, it must go through a process on GitHub to confirm that it works as expected. Here is a couple of things to look out for when you make your pull request.

Our presence verification team has their role, look out for `Presence Verifier`s on the discord server to know who is involved.

1. It takes two verifiers to confirm that your presence is up to standards. If you happen to get change requests, make the proper effort to fix it or it will not be added.
2. If we request changes and your Pull Request exceeds **7 days of inactivity** without making the necessary ones, we'll be forced to close it.
3. You are allowed to take screenshots of changes made with the help of another user. ( e.g. its author in case you can't access it for any reason).
4. If it is an update or patch, the screenshot **must** show the new additions working, not any old features from previous pull requests.
5. The provided screenshots should be real, not edited.
6. Any contributed code that gets merged to this repository will be licensed under the **Mozilla Public License 2.0**.
7. Presences for free domains or hosts (e.g. .TK, [all free Freenom domains], .RF.GD, etc...) are **NOT** allowed at all, exceptions can be made if a proof is presented showing that they paid for the domain.
8. The `smallImageKey` and `smallImageText` fields are intended to provide additional/secondary context (such as "playing"/"paused" for video sites, "browsing" for regular sites and other cases) not to promote Discord profiles or anything unrelated to PreMiD.
9. The requirements for logos are 1:1 (Square) in 512px, thumbnails, however, should either be [wide promotional cards](https://i.imgur.com/3QfIc5v.jpg) or simply [screenshots](https://i.imgur.com/OAcBmwW.png) if the first is not available.
10. Presences should at least have 1 tag, this is a requirement by design and may be optional in the future.
11. The `url` field must not include `http://` or `https://`, neither the parameters (e.g. a presence for `https://www.google.com/search?gws_rd=ssl` will only have `www.google.com` in the `url` field).
12. Descriptions and tags should always be in arrays, even when it's only one element. The `url` field, however, should only be a string if it's one domain.
13. Unstable sites that constantly change APIs/domains, randomize HTML elements or just still being in heavy development are not allowed and will be removed from the store.

After all of the proper reviews have been met, your pull request will be merged with the store.
