const expect = require('expect');

module.exports = function(plugin, change) {
    const ret = plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {}
        },
        { key: 'enter', isShift: true },
        change
    );

    expect(ret === null).toBe(true);
};
