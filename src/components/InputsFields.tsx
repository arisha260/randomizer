import { useState } from "react";
import { useListStore } from '../stores/listStore'
import { getRandomElement } from "../hooks/getRandomElement";

export function AddList () {

    const [value, setValue] = useState("");
    const addItem = useListStore((state) => state.addItem);

    const handleClick = () => {
        if (!value.trim()) return;
        addItem(value.trim());
        setValue("");
    }

    return (
        <div className="flex-30">
            <div className="text">Введите из чего выбирать</div>
            <div className="input-con">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="text input input-reset" />
                <button onClick={() => handleClick()} className="text button btn-r">Добавить</button>
            </div>
        </div>
    )
}


export function AddQuantity () {

    const [value, setValue] = useState<number>(1);
    const changeQuantity = useListStore((state) => state.changeQuantity);

    const handleClick = () => {
        if (value <= 0) return;
        changeQuantity(value);
        getRandomElement();
        setValue(1);
    }

    return (
        <div className="flex-30">
            <div className="text">Сколько нужно получить</div>
            <div className="input-con">
                <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="text input input-reset" />
                <button onClick={() => handleClick()} className="text button btn-r">Получить</button>
            </div>
        </div>
    )
}