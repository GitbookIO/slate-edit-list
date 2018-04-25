// @flow
/* global window */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'slate-react';

import PluginEditList from '../src/';
import INITIAL_VALUE from './value';
import './main.css';

const plugin = PluginEditList();
const plugins = [plugin];

function renderNode(props: *) {
    const { node, attributes, children, editor } = props;
    const isCurrentItem = plugin.utils
        .getItemsAtRange(editor.value)
        .contains(node);

    switch (node.type) {
        case 'ul_list':
            return <ul {...attributes}>{children}</ul>;
        case 'ol_list':
            return <ol {...attributes}>{children}</ol>;

        case 'list_item':
            return (
                <li
                    className={isCurrentItem ? 'current-item' : ''}
                    title={isCurrentItem ? 'Current Item' : ''}
                    {...props.attributes}
                >
                    {props.children}
                </li>
            );

        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
        default:
            return <p {...attributes}>{children}</p>;
    }
}

class Example extends React.Component<*, *> {
    state = {
        value: INITIAL_VALUE
    };

    renderToolbar() {
        const {
            wrapInList,
            unwrapList,
            increaseItemDepth,
            decreaseItemDepth
        } = plugin.changes;
        const inList = plugin.utils.isSelectionInList(this.state.value);

        return (
            <div>
                <button
                    className={inList ? 'active' : ''}
                    onClick={() => this.call(inList ? unwrapList : wrapInList)}
                >
                    <i className="fa fa-list-ul fa-lg" />
                </button>

                <button
                    className={inList ? '' : 'disabled'}
                    onClick={() => this.call(decreaseItemDepth)}
                >
                    <i className="fa fa-outdent fa-lg" />
                </button>

                <button
                    className={inList ? '' : 'disabled'}
                    onClick={() => this.call(increaseItemDepth)}
                >
                    <i className="fa fa-indent fa-lg" />
                </button>

                <span className="sep">·</span>

                <button onClick={() => this.call(wrapInList)}>
                    Wrap in list
                </button>
                <button onClick={() => this.call(unwrapList)}>
                    Unwrap from list
                </button>
            </div>
        );
    }

    call(change) {
        this.setState({
            value: this.state.value.change().call(change).value
        });
    }

    onChange = ({ value }) => {
        this.setState({
            value
        });
    };

    render() {
        return (
            <div>
                {this.renderToolbar()}
                <Editor
                    placeholder={'Enter some text...'}
                    plugins={plugins}
                    value={this.state.value}
                    onChange={this.onChange}
                    renderNode={renderNode}
                    shouldNodeComponentUpdate={props =>
                        // To update the highlighting of nodes inside the selection
                        props.node.type === 'list_item'
                    }
                />
            </div>
        );
    }
}

/**
 * Mount the router.
 */

const root = window.document.createElement('div');
root.id = 'example';
window.document.body.appendChild(root);

const render = () => {
    ReactDOM.render(<Example />, root);
};

render();
