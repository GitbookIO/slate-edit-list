# slate-edit-list

[![NPM version](https://badge.fury.io/js/slate-edit-list.svg)](http://badge.fury.io/js/slate-edit-list)

A Slate plugin to handle keyboard events in lists. List items can contain blocks.

### Install

```
npm install slate-edit-list
```

### Features

- Pressing <kbd>Enter</kbd> insert a new list item
- Pressing <kbd>Shift+Enter</kbd> split the block in the list item
- Pressing <kbd>Tab</kbd> wrap the item in a new list
- Pressing <kbd>Delete</kbd> at the start, remove the list item (or the list)

### Simple Usage

```js
import EditList from 'slate-edit-list'

const plugins = [
  EditList()
]
```

#### Arguments

- ``[typeUL: String]`` — type for bulleted lists.
- ``[typeOL: String]`` — type for numbered lists.
- ``[typeItem: String]`` — type for list items.

### Utilities and Transform

`slate-edit-list` exports utilities and transforms:

#### `utils.isSelectionInList`

`plugin.utils.isSelectionInList(state: State) => Boolean`

Return true if selection is inside a list (and it can be unwrap).

#### `transforms.wrapInList`

`plugin.transforms.wrapInList(transform: Transform, ordered: Boolean?) => Transform`

Wrap current block in a new list.

#### `transforms.unwrapList`

`plugin.transforms.unwrapList(transform: Transform, ordered: Boolean?) => Transform`

Unwrap block of current list.

#### `transforms.splitListItem`

`plugin.transforms.splitListItem(transform: Transform) => Transform`

Split current block into a new list item.
