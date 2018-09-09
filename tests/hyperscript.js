import { createHyperscript } from 'slate-hyperscript';

// Hyperscript function used to convert the JSX syntax
// in tests to Slate models `create` calls.
const h = createHyperscript({
    blocks: {},
    inlines: {},
    marks: {}
});

export default h;
