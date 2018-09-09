/** @jsx h */
import h from 'h';

export default (
    <value>
        <document>
            <ul_list style={{ listStyleType: 'disc' }}>
                <list_item>
                    <paragraph>First item</paragraph>
                </list_item>
                <list_item>
                    <paragraph>
                        <anchor />
                        Second item
                        <focus />
                    </paragraph>
                </list_item>
            </ul_list>
        </document>
    </value>
);
