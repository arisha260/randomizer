export const adaptingToTheNumber = (num: number): string => {
    const lastTwo = num % 100;
    const lastOne = num % 10;

    if (lastTwo >= 10 && lastTwo <= 20) {
        return 'чисел';
    }

    if (lastOne === 1) {
        return 'число';
    }

    if (lastOne >= 2 && lastOne <= 4) {
        return 'числа';
    }

    return 'чисел';
};