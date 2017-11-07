import expect from 'expect';

module.exports = function(plugin, change) {
    const ret = plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Enter',
            shiftKey: true
        },
        change,
        {}
    );

    expect(ret === null).toBe(true);
};
