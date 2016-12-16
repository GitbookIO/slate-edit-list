# slate-edit-list

[![NPM version](https://badge.fury.io/js/slate-edit-list.svg)](http://badge.fury.io/js/slate-edit-list)
[![Linux Build Status](https://travis-ci.org/GitbookIO/slate-edit-list.png?branch=master)](https://travis-ci.org/GitbookIO/slate-edit-list)

A Slate plugin to handle keyboard events in lists. List items can contain blocks.

### Install

```
npm install slate-edit-list
```

### Features

Natural keybindings:

- Pressing <kbd>Enter</kbd> insert a new list item
- Pressing <kbd>Shift+Enter</kbd> split the block in the list item
- Pressing <kbd>Tab</kbd> increase the depth of the item (creates a sub-list)
- Pressing <kbd>Shift+Tab</kbd> decrease the depth of the item
- Pressing <kbd>Delete</kbd> (OSX) or <kbd>Backspace</kbd> at the start, remove the list item (or the list)

Simple validation/normalization (see [assumptions about the schema](#assumption-about-the-schema)):

- Lists can contain only list items, and at least one.
- List items can only be the direct children of a list.
- List items must always contain blocks.

Useful transforms: see [Utilities and Transform](#utilities-and-transform).

### Simple Usage

```js
import EditList from 'slate-edit-list'

const plugins = [
  EditList()
]
```

#### Arguments

This plugin accepts options to redefine the following block types:

- ``[typeUL: String]`` — type for bulleted lists.
- ``[typeOL: String]`` — type for numbered lists.
- ``[typeItem: String]`` — type for list items.

#### Assumption about the schema

You can use this plugins with custom list block types (using plugin [arguments](#arguments)). But your lists structure should still conform to a few rules. These rules are implemented as schema.

Here is what a minimal list would look like:


```yaml
nodes:
    - kind: block
      type: ul_list
      nodes:
          - kind: block
            type: list_item
            nodes:
              - kind: block
                type: paragraph
                nodes:
                  - kind: text
                    text: Hello World
```

And here is an example of a multi-level list:

```yaml
nodes:
  - kind: block
    type: ol_list
    nodes:
      - kind: block
        type: list_item
        nodes:
          - kind: block
            type: paragraph
            nodes:
              - kind: text
                text: Item 1
          - kind: block
            type: ol_list
            nodes:
              - kind: block
                type: list_item
                nodes:
                  - kind: block
                    type: paragraph
                    nodes:
                      - kind: text
                        text: Item 1.1
              - kind: block
                type: list_item
                nodes:
                  - kind: block
                    type: paragraph
                    nodes:
                      - kind: text
                        text: Item 1.2
```

### Utilities and Transform

`slate-edit-list` exports utilities and transforms:

#### `utils.isSelectionInList`

`plugin.utils.isSelectionInList(state: State) => Boolean`

Return true if selection is inside a list (and it can be unwrap).

#### `utils.isList`

`plugin.utils.isList(node: Node) => Boolean`

Return true if the node is one of the list type.

#### `utils.getItemDepth`

`plugin.utils.getItemDepth(state: State, block: Block?) => Number`

Returns the depth of the current item (or the depth of the given block) in a list. 0 means not in a list.

#### `utils.getCurrentItem`

`plugin.utils.getCurrentItem(state: State, block: Block?) => Block || Void`

Returns the current item at selection (or at the given block).

#### `utils.getCurrentList`

`plugin.utils.getCurrentList(state: State, block: Block?) => Block || Void`

Returns the current list at selection (or at the given block).

#### `transforms.increaseItemDepth`

`plugin.transforms.increaseItemDepth(transform: Transform) => Transform`

Increase the depth of the current item.

#### `transforms.decreaseItemDepth`

`plugin.transforms.decreaseItemDepth(transform: Transform) => Transform`

Decrease the depth of the current item.

#### `transforms.wrapInList`

`plugin.transforms.wrapInList(transform: Transform, ordered: Boolean?) => Transform`

Wrap current block in a new list.

#### `transforms.unwrapList`

`plugin.transforms.unwrapList(transform: Transform) => Transform`

Unwrap block of current list.

#### `transforms.splitListItem`

`plugin.transforms.splitListItem(transform: Transform) => Transform`

Split current block into a new list item.
