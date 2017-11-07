const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const { Editor } = require('slate-react');

const PluginEditList = require('../lib/');

const INITIAL_VALUE = require('./value');

const plugin = PluginEditList();
const plugins = [plugin];

const highlightedItems = props => {
    const { node, editor } = props;
    const isCurrentItem = plugin.utils
        .getItemsAtRange(editor.value)
        .contains(node);

    return (
        <li
            className={isCurrentItem ? 'current-item' : ''}
            title={isCurrentItem ? 'Current Item' : ''}
            {...props.attributes}
        >
            {props.children}
        </li>
    );
};
// To update the highlighting of nodes inside the selection
highlightedItems.suppressShouldComponentUpdate = true;

function renderNode(props) {
    const { node, attributes, children } = props;

    switch (node.type) {
        case 'ul_list':
            return <ul {...attributes}>{children}</ul>;
        case 'ol_list':
            return <ol {...attributes}>{children}</ol>;

        case 'list_item':
            return highlightedItems(props);

        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'heading':
            return <h1 {...attributes}>{children}</h1>;
    }
}

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: INITIAL_VALUE };
        this.onChange = this.onChange.bind(this);
    }

    onChange({ value }) {
        this.setState({
            value
        });
    }

    call(change) {
        this.setState({
            value: this.state.value.change().call(change).value
        });
    }

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
                        props.node.type === 'list_item'
                    }
                />
            </div>
        );
    }
}

ReactDOM.render(<Example />, document.getElementById('example'));
