import { useListStore } from "../stores/listStore";

function getWinnerIndex(rotation: number, itemCount: number) {
  // 1. Переводим радианы в градусы
  const degrees = (rotation * 180 / Math.PI) % 360;

  // 2. Переворачиваем угол, потому что колесо крутится по часовой
  const pointerAngle = (360 - degrees) % 360;

  // 3. Переводим начало проверки индекса на верх как 0 градусов
  const adjustedAngle = (pointerAngle + 90) % 360;

  // 4. Размер сектора
  const anglePerSector = 360 / itemCount;

  // 5. Вычисляем индекс сектора
  return Math.floor(adjustedAngle / anglePerSector);

}



export function spinWheel(
    setRotation: (value: number) => void,
    currentRotation: number,
    setIsSpinning: (value: boolean) => void,
    itemCount: number,
) {
    const { listItems, changeResult } = useListStore.getState();

    setIsSpinning(true);
    const duration = 3000 + Math.random() * 1000;

    // Нормализуем стартовый угол (0–2π)
    const startRotation = ((currentRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);

    const spins = 5 + Math.floor(Math.random() * 4);      // 5–7 оборотов
    const randomAngle = Math.random() * Math.PI * 2;      // равномерный случайный угол
    const endRotation = spins * Math.PI * 2 + randomAngle; // не учитываем startRotation для честности

    let start: number | null = null;

    function animate(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        // easing
        const eased = 1 - Math.pow(1 - progress, 3);

        const newRotation = startRotation + eased * (endRotation - startRotation);

        // Нормализуем перед установкой
        const normalized = ((newRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        setRotation(normalized);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            setIsSpinning(false);
            const idx = getWinnerIndex(normalized, itemCount);
            changeResult([listItems[idx].value]);
        }
    }

    requestAnimationFrame(animate);
}
