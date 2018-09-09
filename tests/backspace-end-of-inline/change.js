export default function(plugin, change) {
    plugin.onKeyDown(
        {
            preventDefault: () => {},
            stopPropagation: () => {},
            key: 'Backspace'
        },
        change,
        {}
    );

    return change;
}
