import { AddList, AddQuantity } from "./InputsFields";
import { RandomList } from "../components/List"
import { useListStore } from "../stores/listStore";

export function HomePageContainer () {
    const result = useListStore((state) => state.result);
    return (
        <div className="flex-30">
            <div className="flex-spb">
                <div className="flex-30">
                    <AddList />
                    <AddQuantity />
                </div>
                <RandomList />
            </div>
            <div className="text">Результат - {result}</div>
        </div>
    )
}