import { GoHomeBtn } from "../components/buttons/GoHomeBtn";
import { AddList, AddQuantity } from "../components/InputsFields";
import { RandomList } from "../components/List"
import { useListStore } from "../stores/listStore";

export default function ListPage() {
  const result = useListStore((state) => state.result);
      return (
        <div className="flex-30">
            <GoHomeBtn />
            <div className="content">
                <div className="flex-spb">
                    <div className="flex-30">
                        <AddList />
                        <AddQuantity />
                        <div className="random-res text">Результат: {result.join(', ')}</div>
                    </div>
                    <RandomList />
                </div>
            </div>
        </div>
      )
}