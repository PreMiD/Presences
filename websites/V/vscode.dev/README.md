# Presence Parameters for Customisation
The exact parameter must be included for `details` or `state`. For example, to display the current file name the input should be `%file%`, including the `%`

- `%file%` will display the current file name.
- `%branch%` will display the current branch name. (remote URL only)
- `%error%` will display the error current workspace folder.
- `%problems%` will display the problems current workspace folder.
- `%workspace%` will display the current workspace name.
- `%lang%` will display the language current file.
- `%encoding%` will display the encoding.
- `%selection%` will display the current line.

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
