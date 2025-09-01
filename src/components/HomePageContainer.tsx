import { AddList, AddQuantity } from "./InputsFields";
import { RandomList } from "../components/List"
import { useListStore } from "../stores/listStore";

export function HomePageContainer () {
    const result = useListStore((state) => state.result);
    return (
        <div className="content">
            <div className="flex-spb">
                <div className="flex-30">
                    <AddList />
                    <AddQuantity />
                    <div className="random-res text">Результат - {result}</div>
                </div>
                <RandomList />
            </div>
        </div>
    )
}