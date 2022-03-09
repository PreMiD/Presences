## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

### TL;DR:

Messages must be matched by the following regex:

```js
/^(revert: )?(feat|fix|style|refactor|perf|test|workflow|ci|chore|types|wip)(\(.+\))?: .{1,72}/;
```

### Known issues

husky hooks are currently not compatible with GitHub Desktop's commit tool on Node 16+. There is an [open issue](https://github.com/desktop/desktop/issues/12562) about this on their repo, therefore there is nothing we can do about this. We recommend either committing through the command line, or using VSCode's source control.

### Examples

Appears under the "Features" header, `YouTube` subheader in a potential changelog:

```
feat(YouTube): add cover art
```

Appears under the "Bug Fixes" header, `Netflix` subheader, with a link to issue #28 in a potential changelog:

```
fix(Netflix): handle watching movies better

close #28
```

Appears under the "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation in a potential changelog:

```
perf(Amazon Music): improve patching by removing 'bar' option

BREAKING CHANGE: The 'bar' option has been removed.
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat: Discussions (#4662)

This reverts commit c8cb81ec50aae940efa35ad3d69ee69c2db89125.
```

### Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** and the **subject** are mandatory, while the **scope** of the header is optional.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `chore`, `style`, `refactor`, and `test` for non-changelog related tasks.

### Scope

The scope could be anything specifying the place of the commit change, usually the name of a Presence. For example `YouTube`, `Netflix`, `SE` (syntax enforcer script), `Amazon Music` etc...

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the phrase `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
