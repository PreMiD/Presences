<div align="center">
    <img src="https://avatars3.githubusercontent.com/u/46326568?s=400&amp;u=15e4a4988014780288d30ffb969fd1569fec23e6&amp;v=4" width="128px" style="max-width:100%;">
    <h1>PreMiD Presences</h1>
</div>

This repository contains the source code of all presences that are available in
PreMiD Store. If you would like to <strong>publish</strong> your presence,
please feel free to open a
<a href="https://github.com/PreMiD/Presences/pulls">pull request</a>.

<div align="left">
    <a target="_blank" href="https://discord.premid.app/" title="Join our Discord!">
        <img  src="https://discordapp.com/api/guilds/493130730549805057/widget.png?style=banner2" height="76px" draggable="false" alt="Join our Discord!">
    </a>
</div>

## Requirements to create a presence

- You must have the
  [latest TypeScript compiler](https://www.typescriptlang.org/#download-links)
  version installed
- Basic knowlege of TypeScript

## Getting started

We made a documentation to make your development process a little bit better and
faster. You can see it [**here**](https://docs.premid.app/dev/presence).

## Folder structure

```bash
presence
├── dist
│   └── metadata.json
├── presence.ts
└── tsconfig.json
```

For presences with `iframe.ts`:

```bash
presence
├── dist
│   └── metadata.json
├── presence.ts
├── iframe.ts
└── tsconfig.json
```

---

## Translator Tool Guide

### Setup

- Clone the PreMiD repository to your system.
- Install repository modules with `yarn` or `npm install`.

### Using the script

- Open up a terminal and run `yarn translator` or `npm run translator`
- When prompted, select the **Language Code** for the language you are
  translated (e.g `ga_IE` for Irish)
- Once selected. The script will first cache all presences metadata files, it
  will then go through each one and remove the files containing the language you
  inputted from the cache.
- You will then be prompted to select a mode, afterwards you might get asked
  some aditional information to finalize your filter.
- Then at last you will be asked to fill in you translations. (You can type
  "skip" to skip)
- To stop at any time, hit `ctrl+c` or type `stop`.
