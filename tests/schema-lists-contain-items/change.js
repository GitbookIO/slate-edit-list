const Slate = require('slate');

module.exports = function(plugin, change) {
    const schema = Slate.Schema.create({plugins: [plugin]});
    return change.setValue({ schema }).normalize();
};
