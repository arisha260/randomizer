// interface Props {
//     min: number,
//     max: number,
//     count: number
// }

export const inTheRange = (min: number, max: number, count: number = 1, isUnique: boolean = true): number[] => {

    if (!isUnique) {
        const res = [];
        while (res.length < count){
            res.push(Math.floor(Math.random() * (max - min + 1) + min))
        }
        return res;
    }

    const rangeSize = max - min + 1;
    if (count >= rangeSize) count = rangeSize;
    const res = new Set<number>();
    while (res.size < count){
        res.add(Math.floor(Math.random() * (max - min + 1) + min));
    }

    return [...res];
};
