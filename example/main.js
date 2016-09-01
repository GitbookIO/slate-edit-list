const React = require('react');
const ReactDOM = require('react-dom');
const Slate = require('slate');
const PluginEditList = require('../lib/');

const stateJson = require('./state');

const plugins = [
    PluginEditList()
];

const SCHEMA = {
    nodes: {
        ul_list:   props => <ul {...props.attributes}>{props.children}</ul>,
        ol_list:   props => <ol {...props.attributes}>{props.children}</ol>,
        list_item: props => <li {...props.attributes}>{props.children}</li>,
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

    render() {
        return (
            <Slate.Editor
                placeholder={'Enter some text...'}
                plugins={plugins}
                state={this.state.state}
                onChange={this.onChange}
                schema={SCHEMA}
            />
    );
    }
});

ReactDOM.render(
    <Example />,
    document.getElementById('example')
);
