const expect = require('expect');

module.exports = function(plugin, state) {
    const res = plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {}
        },
        { key: 'enter', isShift: true },
        state
    );

    expect(res == null).toBe(true);
};
