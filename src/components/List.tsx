import { CircleSvg } from "./svg/circle";
import { ColSvg } from "./svg/col";
import { RowSvg } from "./svg/row";
import { RemoveSvg } from "./svg/remove";
import { useListStore } from "../stores/listStore";
import { useDisplayStore } from "../stores/displayStore";

export function RandomList () {
    const listItems = useListStore((state) => state.listItems);
    const { display, changeDisplay } = useDisplayStore();

    const layoutClass = {
        col: 'list-col',
        row: 'list-row',
        circle: 'list-circle',
    }[display];

    return (
        <div className="flex-30 list">

            <div className="flex-20-r">
                <div className="text">Добавленное:</div>
                <div className="flex-5-r">
                    <button className="btn-r" onClick={() => changeDisplay("col")}>
                        <ColSvg />
                    </button>
                    <button className="btn-r" onClick={() => changeDisplay("row")}>
                        <RowSvg />
                    </button>
                    <button className="btn-r" onClick={() => changeDisplay("circle")}>
                        <CircleSvg />
                    </button>
                 </div>
            </div>

            <div className={layoutClass}>
                {listItems.map((item,ind) => (
                    <ListItem key={ind} text={item} item={item}/>
                ))}
            </div>
        </div>
    )
}

type ListItem = {
    text: string;
    item: string;
}

export function ListItem ({text, item}: ListItem) {
    const removeItem = useListStore((state) => state.removeItem);
    return (
        <div className="list-item">
            <div className="text">{text}</div>
            <div className="centered" onClick={() => removeItem(item)}>
                <RemoveSvg />
            </div>
        </div>
    )
}