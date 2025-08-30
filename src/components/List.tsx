import { CircleSvg } from "./svg/circle";
import { ColSvg } from "./svg/col";
import { RowSvg } from "./svg/row";
import { RemoveSvg } from "./svg/remove";
import { useListStore } from "../stores/listStore";

export function RandomList () {
    const listItems = useListStore((state) => state.listItems)
    return (
        <div className="flex-30">

            <div className="flex-20-r">
                <div className="text">Добавленное:</div>
                <div className="flex-5-r">
                     <ColSvg />
                     <RowSvg />
                     <CircleSvg />
                 </div>
            </div>

            <div className="list">
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