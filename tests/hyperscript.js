import { createHyperscript } from '@gitbook/slate-hyperscript';

// Hyperscript function used to convert the JSX syntax
// in tests to Slate models `create` calls.
const h = createHyperscript({
    blocks: {
        heading: 'heading',
        list_item: 'list_item',
        ul_list: 'ul_list',
        ol_list: 'ol_list',
        paragraph: 'paragraph',
        unknown: 'unknown'
    },
    inlines: {
        link: 'link'
    },
    marks: {}
});

export default h;
