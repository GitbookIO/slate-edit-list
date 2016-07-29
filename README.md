# slate-edit-list

[![NPM version](https://badge.fury.io/js/slate-edit-list.svg)](http://badge.fury.io/js/slate-edit-list)

A Slate plugin to handle keyboard events in lists.

### Install

```js
npm install slate-edit-list
```

### Features

- Pressing <kbd>Enter</kbd> insert a new list entry
- Pressing <kbd>Tab</kbd> wrap the entry in a new list
- Pressing <kbd>Delete</kbd> remove the indentation before cursor if possible

### Simple Usage

```js
import EditList from 'slate-edit-list'

const plugins = [
  EditList()
]
```

#### Arguments

- ``[onlyIn: Function(Node)]`` — a filtering function to select list blocks.
