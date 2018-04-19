# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]

[Unreleased]: https://github.com/GitbookIO/slate-edit-list/compare/0.11.0...HEAD

## 0.11.3 - 2018-04-19

- Limit package size by publishing only the `dist` folder

## 0.11.2 - 2018-02-06
## 0.11.1 - 2018-02-06

- Fixed build

## 0.11.0 - 2018-02-05

- Upgrade to be compatible with Slate 0.32.x

## 0.10.3 - 2018-02-05

- Fix: delete selection while pressing Enter in a list

## 0.10.2 - 2018-01-09

- Wider slate peer dependency range

## 0.10.1 - 2017-11-08

- Fix errors due to some unwanted normalizations in changes.

## 0.10.0 - 2017-11-07

- Upgrade to be compatible with Slate 0.30.x

## 0.9.0 - 2017-11-06

- Upgrade to be compatible with Slate 0.27.x

## 0.8.0 - 2017-09-20

- Upgrade to be compatible with Slate after the `expose-transform` branch went in.
- Change all instances of `transform` to `change`
- Change the namespace of `plugin.transforms` to `plugin.changes`

## 0.7.1 - 2017-06-21

- Add normalization rule to join adjacent lists of the same types.

## 0.7.0 - 2016-05-12

- Add support for more than two list types through the option `types`
  - **BREAKING** Removed old options for `typeUL` and `typeOL`.
  - **BREAKING** `wrapInList` now takes a `type` param

## 0.6.4 - 2016-03-20

- Now supports custom `data` for list containers. Added `data` parameter to `wrapInList`.

## 0.6.3 - 2016-03-20

- Fix normalization of list items containing just one inline node.
- List items normalization now wraps all their children in a single default block, when needed.

## 0.6.2 - 2016-02-14

- `isSelectionInList` made smarter, adapted to fit the case where we can, and cannot, use `unwrapList`.

## 0.6.1 - 2016-02-14

- `wrapInList` now wraps the highest blocks in the selection, and merge selected list together.
- Fixed schema rule for list items containing list items.

## 0.6.0 - 2016-02-13

- Added `utils.getItemsAtRange`
- `wrapInList` now wraps the selected blocks in distinct items (not a big, single one)
- `unwrapList` now unwraps all the selected items. Ignores complex ranges that span outside of lists.

## 0.5.7 - 2016-02-13

- Fix item being unwrapped when hitting Enter in an empty block

## 0.5.6 - 2016-12-16

- Fix bug with increasing item depth, that would reorder items.

## 0.5.5 - 2016-12-08

- Fixed issue with selection when unwrapping

## 0.5.4 - 2016-12-08

- Adapted for Slate@0.16.1
- Fix unwrapping items with nested lists
- Fix items being unwrapped when backspacing after an inline

## 0.5.3 - 2016-11-29

- Fix slate peer dependency to be less restrictive

## 0.5.2 - 2016-11-29

- Fix schema validation for content of list items

## 0.5.1 - 2016-11-03

- Move slate to `peerDependencies`

## 0.4.2 - 2016-09-19

- Use of this plugin with other container plugins (such as `slate-edit-blockquote`)

## 0.4.1 - 2016-09-15

- Undo/Redo of `splitListItem` and `decreaseItemDepth` actions

## 0.4.0 - 2016-09-14

- **BREAKING** Updated to `slate^0.14.x`
