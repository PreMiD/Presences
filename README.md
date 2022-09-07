<div align="center">
    <img src="https://avatars3.githubusercontent.com/u/46326568?s=400&amp;u=15e4a4988014780288d30ffb969fd1569fec23e6&amp;v=4" width="128px" style="max-width:100%;">
    <h1>PreMiD Presences</h1>
</div>

This repository contains the source code of all Presences that are available in [**PreMiD's Store**](https://premid.app/store). If you wish to <strong>publish</strong> your Presence, open a [**Pull Request**](https://github.com/PreMiD/Presences/pulls).

<div align="left">
    <a target="_blank" href="https://discord.premid.app/" title="Join our Discord!">
        <img  src="https://discordapp.com/api/guilds/493130730549805057/widget.png?style=banner2" height="75px" draggable="false" alt="Join our Discord!">
    </a>
</div>

## Requirements to create a Presence
- [**Git**](https://git-scm.com)
- [**Node.js**](https://nodejs.org/)
- [**NPM**](https://npmjs.org/) (Or any other package manager)
- Basic knowlege of TypeScript

## Getting started

Please refer to our [**documentation**](https://docs.premid.app/dev/presence).

## Folder structure

```bash
Presence
├── dist
│   └── metadata.json
├── presence.ts
└── tsconfig.json
```

For Presences that require `iframe.ts`:

```bash
Presence
├── dist
│   └── metadata.json
├── presence.ts
├── iframe.ts
└── tsconfig.json
```

---

## Translator Tool Guide

### Setup

- Fork this repository.
- Install repository dependencies with `npm install` or your package manager of choice.

### Using the script

- Open a terminal and run `npm run translator`
- When prompted, select the **Language Code** for the language you wish to add translations for (e.g `ga_IE` for Irish)
- Once selected, the script will first cache all Presences metadata files, it will then go through each one and remove the files containing the language you inputted from the cache.
- You will then be prompted to select a mode, afterwards you might get asked for some aditional information to finalize your filter.
- Then at last you will be asked to fill in your translations. (You can type "skip" to skip)
- To stop at any time, hit `ctrl+c` or type `stop`.

## Committing

This repository strictly enforces the use of commitlint. For more information read the [**Commit Convention guide**](./.github/COMMIT_CONVENTION.md)
