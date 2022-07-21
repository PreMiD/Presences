# Presence Parameters for Customisation
The exact parameter must be included for `details` or `state`. For example, to display the current file name the input should be `%file%`, including the `%`

- `%file%` will be replaced with the current file name.
- `%branch%` will be replaced with the current branch name. (remote URL only)
- `%error%` will be replaced with error current workspace folder.
- `%problems%` will be replaced with problems current workspace folder.
- `%workspace%` will be replaced with the current workspace name.
- `%lang%` will be replaced with the language current file.
- `%encoding%` will be replaced with the encoding.
- `%selection%` will be replaced with the current line.

if not it will show empty space

#### output example

```
 - file presence.ts
 - branch main
 - error 0
 - problems 0
 - workspace Presences
 - lang typescript
 - encoding UTF-8
 - selection Ln 20, Col 20
```

_Much of the code in this repository is based on [iCrawl/discord-vscode](https://github.com/iCrawl/discord-vscode) and image from [leonardssh/vscord](https://github.com/leonardssh/vscord/tree/main/assets/icons)_
