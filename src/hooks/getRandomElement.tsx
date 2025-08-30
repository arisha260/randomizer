import { useListStore } from '../stores/listStore'

export const getRandomElement = () => {
    const { quantity, listItems, changeResult } = useListStore.getState();

    if(listItems.length === 0) return;
    if (quantity <= 0) return;

    const randoms = new Set<number>();

    while (randoms.size < quantity) {
        randoms.add(Math.floor(Math.random() * listItems.length));
    }

    const res = [...randoms].map((i) => listItems[i]).join('');
    changeResult(res);
    return res;
};
