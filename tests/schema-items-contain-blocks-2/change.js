import Slate from 'slate';

export default function(plugin, change) {
    const schema = Slate.Schema.create({ plugins: [plugin] });
    return change.setValue({ schema }).normalize();
};
