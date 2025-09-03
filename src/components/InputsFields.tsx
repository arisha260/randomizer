import { useState } from "react";
import { useListStore } from '../stores/listStore'
import { getRandomElement } from "../utils/getRandomElement";

export function AddList () {

    const [value, setValue] = useState("");
    const addItem = useListStore((state) => state.addItem);

    const handleClick = () => {
        if (!value.trim()) return;
        addItem(value.trim());
        setValue("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        e.preventDefault();
        handleClick();
        }
    };

    return (
        <div className="flex-30">
            <div className="text">Введите из чего выбирать</div>
            <div className="input-con">
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} className="text input input-reset" />
                <button onClick={() => handleClick()} className="text button btn-r">Добавить</button>
            </div>
        </div>
    )
}


export function AddQuantity () {

    const [value, setValue] = useState<string>("1");
    const changeQuantity = useListStore((state) => state.changeQuantity);

    const handleClick = () => {
        const num = Number(value);
        if (!num || num < 1) return; // защита
        changeQuantity(num);
        getRandomElement();
        setValue("1");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        e.preventDefault();
        handleClick();
        }
    };

    const handleBlur = () => {
        // при потере фокуса возвращаем 1, если пусто или меньше 1
        if (!value || Number(value) < 1) {
            setValue("1");
        }
    };

    return (
        <div className="flex-30">
            <div className="text">Сколько нужно получить</div>
            <div className="input-con">
                <input type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className="text input input-reset" />
                <button onClick={() => handleClick()} className="text button btn-r">Получить</button>
            </div>
        </div>
    )
}