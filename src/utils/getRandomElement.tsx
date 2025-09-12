import { useListStore } from '../stores/listStore';
import { shuffle } from './mixList';

export const getRandomElement = (): string[] | undefined => {
  const { quantity, listItems, changeResult } = useListStore.getState();

  if (listItems.length === 0 || quantity <= 0) return;

  let result: string[];

  // Если нужно больше или столько же элементов, чем есть — перемешиваем весь массив
  if (quantity >= listItems.length) {
    result = shuffle(listItems).map(i => i.value);
    changeResult(result);
    return result;
  }

  // Выбираем случайные уникальные элементы
  const randoms = new Set<number>();
  while (randoms.size < quantity) {
    randoms.add(Math.floor(Math.random() * listItems.length));
  }

  result = [...randoms].map(i => listItems[i].value);
  changeResult(result);
  return result;
};
