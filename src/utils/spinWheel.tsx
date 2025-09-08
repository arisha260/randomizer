import { useListStore } from "../stores/listStore";

const TWO_PI = Math.PI * 2;

function getWinnerIndex(rotation: number, itemCount: number) {
    const normalized = ((rotation % TWO_PI) + TWO_PI) % TWO_PI; // [0, 2π)
    const anglePerSector = TWO_PI / itemCount;

    // угол сектора под стрелкой (стрелка = 0 рад, колесо крутится по часовой)
    const targetAngle = ((0 - normalized) + TWO_PI) % TWO_PI;

    const index = (Math.floor(targetAngle / anglePerSector) + 0) % itemCount;
    return index;
}



export function spinWheel(
    setRotation: (value: number) => void,
    currentRotation: number,
    setIsSpinning: (value: boolean) => void,
    itemCount: number,
    options?: { duration?: number; spins?: number },
) {

    const { listItems, changeResult } = useListStore.getState();

    setIsSpinning(true);
    const duration = options?.duration ?? 3000; // по умолчанию 3 секунды
    const spins = 5 + Math.floor(Math.random() * 3);
    const startRotation = currentRotation;
    const randomAngle = Math.random() * Math.PI * 2; // 0 - 360 градусов
    const endRotation = currentRotation + Math.PI * 2 * spins + randomAngle;

    let start: number | null = null;

    function animate(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        // easing (замедление в конце)
        const eased = 1 - Math.pow(1 - progress, 3);

        const newRotation = startRotation + eased * (endRotation - startRotation);
        setRotation(newRotation);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            setIsSpinning(false);
            const idx = getWinnerIndex(endRotation, itemCount);
            changeResult([listItems[idx]]);
            console.log("Выиграл сектор:", idx, "значение:", listItems[idx]);
        }
    }

    requestAnimationFrame(animate);
}