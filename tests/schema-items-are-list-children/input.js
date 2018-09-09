/** @jsx h */
import h from 'h';

export default (
    <document>
        <list_item>
            <paragraph>Orphan</paragraph>
        </list_item>
        <ul_list>
            <list_item>
                <paragraph>Valid item</paragraph>
            </list_item>
            <list_item>
                <list_item>
                    <paragraph>Direct child of another item</paragraph>
                </list_item>
            </list_item>
        </ul_list>
    </document>
);
