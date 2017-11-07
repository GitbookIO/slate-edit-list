import expect from 'expect';

export default function(plugin, change) {
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
