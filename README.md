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
