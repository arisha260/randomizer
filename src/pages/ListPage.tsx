import { GoHomeBtn } from "../components/buttons/GoHomeBtn";
import { AddList, AddQuantity } from "../components/InputsFields";
import { RandomList } from "../components/List"
import { useListStore } from "../stores/listStore";
import { CheckboxInput } from "../components/inputs/CheckboxInput";

export default function ListPage() {
    const result = useListStore((state) => state.result);
    const isUnique = useListStore((state) => state.isUnique);
    const changeIsUnique = useListStore((state) => state.changeIsUnique);
    return (
        <div className="flex-30">
            <GoHomeBtn />
            <div className="content">
                <div className="flex-spb">
                    <div className="flex-30">
                        <AddList />
                        <AddQuantity />
                        <CheckboxInput value={isUnique} onChange={changeIsUnique}/>
                        <div className="random-res title-20">Результат: <div className="text">{result.join(', ')}</div></div>
                    </div>
                    <RandomList />
                </div>
            </div>
        </div>
    )
}