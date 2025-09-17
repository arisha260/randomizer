import { useState } from "react";
import { GoHomeBtn } from "../components/buttons/GoHomeBtn";
import { inTheRange } from "../utils/inTheRange";
import { useNumberStore } from "../stores/numberStore";
import { NumberInput } from "../components/inputs/NumberInput";
import { validateNumber } from "../utils/validateNumber";
import { adaptingToTheNumber } from "../utils/adaptingToTheNumber";
import { CheckboxInput } from "../components/inputs/CheckboxInput";

export default function NumbersPage() {
    const { min, max, quantity, result, changeMin, changeMax, changeQuantity, changeResult } = useNumberStore();

    const [fromValue, setFromValue] = useState<string>(String(min));
    const [toValue, setToValue] = useState<string>(String(max));
    const [quantityValue, setQuantityValue] = useState<string>(String(quantity));
    const [isUnique, setIsUnique] = useState<boolean>(true);

    const handleQuantity = (val: string) => {
        const num = Number(val);
        setQuantityValue(num > 500 ? "500" : val);
    }

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
            secLabel={adaptingToTheNumber(Number(quantityValue))}
            value={quantityValue}
            onChange={handleQuantity}
            onBlur={() => setQuantityValue(validateNumber(quantityValue, 1))}
        />

        <CheckboxInput value={isUnique} onChange={setIsUnique}/>
        </div>

        <button onClick={handleClick} className="title-20 btn-r">
            Сгенерировать
        </button>
    </div>
    </div>
    );
}