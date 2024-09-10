import React, { useCallback, useState } from "react";

const useDragNDrop = <T,>(
    items: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>,
    onRenderItem: (item: T, index: number) => React.ReactElement,
    style?: React.CSSProperties | undefined,
    className?: string,
) => {
    const [draggingItem, setDraggingItem] = useState<T | undefined>(undefined);
    const [draggingItemIndex, setDraggingItemIndex] = useState<number | undefined>(undefined);

    const onDragStart = useCallback((e: React.DragEvent<HTMLLIElement>, item: T, index: number) => {
        setDraggingItem(item);
        setDraggingItemIndex(index);
        e.dataTransfer.setData('text/plain', '');
    }, []);

    const onDragEnd = useCallback((_e: React.DragEvent<HTMLLIElement>) => {
        setDraggingItem(undefined);
    }, []);

    const onDragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    }, []);

    const onDrop = useCallback((_e: React.DragEvent<HTMLLIElement>, _targetItem: T, targetIndex: number) => {
        if (!draggingItem) return;


        const currentIndex = draggingItemIndex;

        if (currentIndex !== undefined && currentIndex !== -1 && targetIndex !== undefined && targetIndex !== -1) {
            setItems((old) => {
                const copy = [...old];
                copy.splice(currentIndex, 1);
                copy.splice(targetIndex, 0, draggingItem);
                return copy;
            });
        }
    }, [draggingItem, items, draggingItemIndex]);

    return (
        <ul>
            {
                items.map((item, index) => (
                    <li
                        draggable
                        onDragStart={(e: React.DragEvent<HTMLLIElement>) => {
                            onDragStart?.(e, item, index);
                        }}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                        onDrop={(e: React.DragEvent<HTMLLIElement>) => {
                            onDrop?.(e, item, index);
                        }}
                        key={index} // should not use id as key
                        style={style}
                        className={className}
                    >
                        {
                            onRenderItem(item, index)
                        }
                    </li>
                ))
            }
        </ ul >
    );
};
export default useDragNDrop;