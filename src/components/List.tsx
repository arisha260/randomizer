import { CircleSvg } from "./svg/circle";
import { ColSvg } from "./svg/col";
import { RowSvg } from "./svg/row";
import { useListStore } from "../stores/listStore";
import { useDisplayStore } from "../stores/displayStore";
import { Wheel } from "./Wheel";

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

            { display !== "circle" ?
            <div className={layoutClass}>
                {listItems.map((item) => (
                    <ListItem key={item.id} text={item.value} item={item.id}/>
                ))}
            </div>
            :

            <div className="list-circle">
                <Wheel />
                <div className="list-row">
                    {listItems.map((item) => (
                        <ListItem key={item.id} text={item.value} item={item.id}/>
                    ))}
                </div>
            </div>
            }
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
        <div className="list-item" onClick={() => removeItem(item)}>
            <div className="text">{text}</div>
            <div className="list-item-btn abs-p">
            </div>
        </div>
    )
}