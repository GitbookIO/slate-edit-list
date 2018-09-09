/** @jsx h */
import h from 'h';

export default (
    <value>
        <document>
            <paragraph>Blah blah</paragraph>
            <ul_list style={{ listStyleType: 'square' }}>
                <list_item>
                    <paragraph>First item</paragraph>
                    <ul_list>
                        <list_item>
                            <paragraph>Subitem</paragraph>
                        </list_item>
                    </ul_list>
                </list_item>
                <list_item>
                    <paragraph>Second item</paragraph>
                </list_item>
            </ul_list>
            <paragraph>Blah blah</paragraph>
        </document>
    </value>
);
