/** @jsx h */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createHyperscript } from '@gitbook/slate-hyperscript';

const h = createHyperscript({
    blocks: {
        heading: 'heading',
        paragraph: 'paragraph',
        ul_list: 'ul_list',
        ol_list: 'ol_list',
        list_item: 'list_item'
    }
});

export default (
    <value>
        <document>
            <heading>Slate + List Edition</heading>
            <paragraph>
                This page is a basic example of Slate + slate-edit-list plugin.
                Press Enter in a list to create a new list item. Press Enter
                again to exit and Shift+Enter to create a paragraph in a list.
                The items at range are detected and highlighted, for
                demonstration purpose.
            </paragraph>
            <ul_list style={{ listStyleType: 'disc' }}>
                <list_item>
                    <paragraph>First item in the list</paragraph>
                </list_item>
                <list_item>
                    <paragraph>List item can contain blocks</paragraph>
                    <heading>Here is a heading</heading>
                    <paragraph>And another paragraph</paragraph>
                </list_item>
                <list_item>
                    <paragraph>
                        Third item in the list, with a nested list
                    </paragraph>
                    <ol_list style={{ listStyleType: 'decimal' }}>
                        <list_item>
                            <paragraph>First item in the nested list</paragraph>
                        </list_item>
                        <list_item>
                            <paragraph>
                                Second item in the nested list
                            </paragraph>
                        </list_item>
                    </ol_list>
                </list_item>
            </ul_list>
            <paragraph>End paragraph</paragraph>
        </document>
    </value>
);
