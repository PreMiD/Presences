## Translator Tool Guide

### Setup

- Fork this repository and clone it.
- Install repository dependencies with `npm install` or your package manager of choice.

### Using the script

- Open a terminal and run `npm run translator`
- When prompted, select the **Language Code** for the language you wish to add translations for (e.g `ga_IE` for Irish)
- Once selected, the script will first cache all Presences metadata files, it will then go through each one and remove the files containing the language you inputted from the cache.
- You will then be prompted to select a mode, afterwards you might get asked for some aditional information to finalize your filter.
- Then at last you will be asked to fill in your translations. (You can type "skip" to skip)
- To stop at any time, hit `ctrl+c` or type `stop`.
