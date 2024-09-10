import React, { useState } from "react";
import useDragNDrop from "./useDragNDrop";

interface IListItems {
    name: string,
}

const listItems: IListItems[] = [{
    name: 'First',
}, {
    name: 'Second',
}, {
    name: 'Third'
}, {
    name: 'Fourth'
}, {
    name: 'Fifth'
}, {
    name: 'Sixth'
}, {
    name: 'Seventh'
}];

const List: React.FC = (): React.ReactElement => {

    const [items, setItems] = useState<IListItems[]>(listItems);

    const renderedItems = useDragNDrop<IListItems>(items, setItems, ((item, _index) => (
        <Card
            item={item}
        />
    )), {
        marginTop: "1rem",
        border: "1px solid #ccc",
        justifyContent: "space-between",
        listStyle: "none",
        display: "flex",
        cursor: "move",
        background: "#ffffff",
        alignItems: "center",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "10px",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    });

    return (
        <>
            {
                renderedItems
            }
        </>
    );
};
export default List;

interface ICardProps {
    item: IListItems;
}
const Card: React.FC<ICardProps> = ({
    item,
}): React.ReactElement => {

    return (
        <span>
            {
                item.name
            }
        </span>
    );
};