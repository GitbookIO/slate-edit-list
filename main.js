const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const yaml = require('yaml-js');

const PluginEditList = require('../lib/');

const stateJson = yaml.load(require('./state.yaml'));

const plugin = PluginEditList();
const plugins = [plugin];

const highlightedItems = (props) => {
    const { node, state } = props;
    const isCurrentItem = plugin.utils.getItemsAtRange(state).contains(node);

    return (
        <li className={isCurrentItem ? 'current-item' : ''}
            title={isCurrentItem ? 'Current Item' : ''}
            {...props.attributes}>
            {props.children}
        </li>
    );
};
// To update the highlighting of nodes inside the selection
highlightedItems.suppressShouldComponentUpdate = true;

const SCHEMA = {
    nodes: {
        ul_list:   props => <ul {...props.attributes}>{props.children}</ul>,
        ol_list:   props => <ol {...props.attributes}>{props.children}</ol>,

        list_item: highlightedItems,

        paragraph: props => <p {...props.attributes}>{props.children}</p>,
        heading:   props => <h1 {...props.attributes}>{props.children}</h1>
    }
};

const Example = React.createClass({
    getInitialState() {
        return {
            state: Slate.Raw.deserialize(stateJson, { terse: true })
        };
    },

    onChange(state) {
        this.setState({
            state
        });
    },

    call(transform) {
        this.setState({
            state: this.state.state.transform().call(transform).apply()
        });
    },

    renderToolbar() {
        const { wrapInList, unwrapList, increaseItemDepth, decreaseItemDepth } = plugin.transforms;
        const inList = plugin.utils.isSelectionInList(this.state.state);

        return (
            <div>
                <button className={inList ? 'active' : ''}
                        onClick={() => this.call(inList ? unwrapList : wrapInList)}>
                    <i className="fa fa-list-ul fa-lg"></i>
                </button>

                <button className={inList ? '' : 'disabled'}
                        onClick={() => this.call(decreaseItemDepth)}>
                    <i className="fa fa-outdent fa-lg"></i>
                </button>

                <button className={inList ? '' : 'disabled'}
                        onClick={() => this.call(increaseItemDepth)}>
                    <i className="fa fa-indent fa-lg"></i>
                </button>

                <span className="sep">·</span>

                <button onClick={() => this.call(wrapInList)}>Wrap in list</button>
                <button onClick={() => this.call(unwrapList)}>Unwrap from list</button>
            </div>
        );
    },

    render() {
        return (
            <div>
                {this.renderToolbar()}
                <Slate.Editor placeholder={'Enter some text...'}
                              plugins={plugins}
                              state={this.state.state}
                              onChange={this.onChange}
                              schema={SCHEMA} />
            </div>
        );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
