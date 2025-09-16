import { useState } from "react";
import { GoHomeBtn } from "../components/buttons/GoHomeBtn";
import { inTheRange } from "../utils/inTheRange";
import { useNumberStore } from "../stores/numberStore";
import { NumberInput } from "../components/inputs/NumberInput";
import { validateNumber } from "../utils/validateNumber";

export default function NumbersPage() {
    const { min, max, quantity, result, changeMin, changeMax, changeQuantity, changeResult } = useNumberStore();

    const [fromValue, setFromValue] = useState<string>(String(min));
    const [toValue, setToValue] = useState<string>(String(max));
    const [quantityValue, setQuantityValue] = useState<string>(String(quantity));
    const [isUnique, setIsUnique] = useState<boolean>(true);

    const handleClick = () => {
        const numMin = Number(fromValue);
        const numMax = Number(toValue);
        const numQ = Number(quantityValue);

        if (!numQ || numQ < 1) return;

        changeMin(numMin);
        changeMax(numMax);
        changeQuantity(numQ);

        const res = inTheRange(numMin, numMax, numQ, isUnique);
        changeResult(res);
    };

return (
    <div className="flex-30">
    <GoHomeBtn />
    <div className="content flex-30 centered">
        <div className="title-20">Результат</div>
        <div className="title-20">{result.join(", ")}</div>

        <div className="flex-5-c">
        <div className="flex-5-r">
            <NumberInput
            label="от"
            value={fromValue}
            onChange={setFromValue}
            onBlur={() => setFromValue(validateNumber(fromValue, 1))}
            />
            <NumberInput
            label="до"
            value={toValue}
            onChange={setToValue}
            onBlur={() => setToValue(validateNumber(toValue, 1))}
            />
        </div>

        <NumberInput
            label="получить"
            value={quantityValue}
            onChange={setQuantityValue}
            onBlur={() => setQuantityValue(validateNumber(quantityValue, 1))}
        />

            <div className="text flex-5-r">
                Только уникальные
                <input
                    type="checkbox"
                    name="unique"
                    checked={isUnique}
                    onChange={(e) => setIsUnique(e.target.checked)}
                    className="input-reset input-checkbox"
                />
            </div>
        </div>

        <button onClick={handleClick} className="title-20 btn-r">
            Сгенерировать
        </button>
    </div>
    </div>
    );
}