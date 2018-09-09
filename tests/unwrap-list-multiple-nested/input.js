/** @jsx h */
import h from 'h';

export default (
    <value>
        <document>
            <ul_list>
                <list_item>
                    <paragraph>First item</paragraph>
                </list_item>
                <list_item>
                    <paragraph>Second item, with nested list</paragraph>
                    <ol_list>
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
                <list_item>
                    <paragraph>Third item</paragraph>
                </list_item>
            </ul_list>
        </document>
    </value>
);
