<div align="center">
    <img src="https://avatars3.githubusercontent.com/u/46326568?s=400&amp;u=15e4a4988014780288d30ffb969fd1569fec23e6&amp;v=4" width="128px" style="max-width:100%;">
    <h1>Presence Guidelines</h1>
</div>

# Guidelines
> If you do not follow all of the guidelines, your presence or pull request will be deleted off of the github.

When publishing presences to this github, we require you to follow a set of guidelines.
To some, these strict rules may seem harsh. However, the implementation of these rulesets will keep our servers from running into any issues.

## Creation

Before you begin working on your presence, keep the following list in mind.
- The pull request must be complete, you need to have a proper file structure. Including the `dist` folder, `presence.js` file, and `metadata.json` file.
- The presence **must** be related to the website you have chosen.
- The presence must not be of any illegal websites. These include stressors, drugs, child porn, etc...
- The presence metadata must have well written content, including valid titles, and descriptions.
- The media you include (icon/thumbnail) must be related to the website and should be understandable in terms of size and quality.
- The file structure must be clean and managed, do not have random files which provide nothing to the presence's function.
- The presence **must not** have any malicious intentions. These include stealing/leaking private information, negatively affecting the behavior of the website, etc...
- If you design a presence for a website and the website happens to change in the future, you **ARE** responsible for updating the presence again to work as expected. If you do not fix it within an acceptable time frame, other presence developers are allowed to **overwrite** your presence to comply with the changes.
- The presence must be tested before publishing to confirm that everything works as expected.
- Your presence must have sfw images and descriptions regardless if it is nsfw or not. If your presence is about an `nsfw` website, please add the `nsfw` tag to your metadata. 

## Modification

In some situations, presences may behave unexpectedly or could use some minor changes to improve its functionality. Here is a compiled list that you must follow in order to modify presences.
- You are not allowed to change the creator of the presence. This is only applicable if you are allowed to re-write it.
- Make sure the modifications are useful. These may include fixes (code and typos),  additions (descriptions and tags), etc... Do not change images if they are not outdated and have a decent resolution.
- Confirm that your changes work before publishing. Do not create pull requests without knowing the outcome of your changes.
- Do not re-brand/overwrite a presence completely unless permitted by a `Presence Verifier` or staff member. 

# Verification
> When you make pull requests about adding or modifying existing presences, you must include a screenshot. However, modifications to a presence's metadata/tsconfig do not require a screenshot. *Your screenshot must be uploaded directly to github with the pull request, do not use third-party image sharing websites.*

In order for your presence to reach the stores, it must go through a process on github to confirm that it works as expected. Here is a couple of things to look out for when your make your pull request.

Our presence verification team has their own role, look out for `Presence Verifier` on the discord server to know who is involved.

1. It takes two verifiers to confirm that your presence is up to standards. If you happen to get change requests, make the proper effort to fix it or it will not be added.
2. If we request changes and your Pull Request exceeds **7 days of inactivity** without making the necessary ones, we'll be forced to close it.
3. You are allowed to take screenshots of changes made with the help of another user. ( e.g. its author in case you can't access it for any reason).
4. If it is an update or patch, the screenshot **must** show the new additions working, not any old features from previous pull requests.
5. The provided screenshots should be real, not edited.
6. Any contributed code that gets merged to this repository will be licensed under the **Mozilla Public License 2.0**.

After all of the proper reviews have been met, your pull request will be merged with the store.
