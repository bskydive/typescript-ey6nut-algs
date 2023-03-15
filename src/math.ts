import { logAll, ITestData, randomNumber, IRunListItem } from "./utils";
import { interval, of } from "rxjs";
import { take, map, skip, distinct, withLatestFrom } from "rxjs/operators";

/**
 * Операторы фильтрации
 *
 * для массового выполнения тестов, комментировать не надо, запуск управляется из index.ts
 * filteringOperatorList.push({ observable$: xxx$ });
 *
 * раскомментировать для ручного запуска
 * xxx$.subscribe((item) => logAll('получил: ', item), err => logAll('ошибка:', err), () => logAll('skip поток закрыт'));
 */
export const filteringOperatorList: IRunListItem[] = [];

/**
 * Симметричная разница (△ or ⊕): чего нет в обоих наборах одновременно. Пример: A = {1, 2, 3}, B = {2, 3, 4}, A △ B = {1, 4}.
 * Это бинарная операция, только для 2 элементов. Для 3 элементов (A △ B △ C) нужны 2 операции. Пример: A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}.
 * https://www.freecodecamp.org/learn/coding-interview-prep/algorithms/find-the-symmetric-difference
 */
const symDiffTestData: ITestData[] = [
    {
        params: [
            [1, 2, 3],
            [5, 2, 1, 4],
        ],
        result: [3, 4, 5],
    },
    {
        params: [
            [1, 2, 3, 3],
            [5, 2, 1, 4],
        ],
        result: [3, 4, 5],
    },
    {
        params: [
            [1, 2, 3],
            [5, 2, 1, 4, 5],
        ],
        result: [3, 4, 5],
    },
    {
        params: [
            [1, 2, 5],
            [2, 3, 5],
            [3, 4, 5],
        ],
        result: [1, 4, 5],
    },
    {
        params: [
            [1, 1, 2, 5],
            [2, 2, 3, 5],
            [3, 4, 5, 5],
        ],
        result: [1, 4, 5],
    },
    {
        params: [
            [3, 3, 3, 2, 5],
            [2, 1, 5, 7],
            [3, 4, 6, 6],
            [1, 2, 3],
        ],
        result: [2, 3, 4, 6, 7],
    },
    {
        params: [
            [3, 3, 3, 2, 5],
            [2, 1, 5, 7],
            [3, 4, 6, 6],
            [1, 2, 3],
            [5, 3, 9, 8],
            [1],
        ],
        result: [1, 2, 4, 5, 6, 7, 8, 9],
    },
];

const isUniqInTwoArrays = (params: {
    itemList1: number[];
    itemList2: number[];
    value: number;
}): boolean => {
    return !(
        params.itemList1.includes(params.value) &&
        params.itemList2.includes(params.value)
    );
};

/** TODO доделать */
function filterUniqInAllArrays(...itemLists: any[][]): number[] {
    let item1: number;
    let item2: number;

    for (
        let itemListsIndex = 0;
        itemListsIndex < itemLists.length;
        itemListsIndex++
    ) {
        // item1 = arguments[itemListsIndex];

        if (
            item1 !== item2 &&
            isUniqInTwoArrays({
                itemList1: list1,
                itemList2: list2,
                value: item1,
            }) &&
            isUniqInTwoArrays({
                itemList1: list1,
                itemList2: list2,
                value: item2,
            })
        ) {
            list1.push(item1);
            list2.push(item2);
        }
    }
    return [];
}

/**
 * Проверка работы по всем наборам тестовых данных
 */
const symDiffTest1$ = of(symDiffTestData).pipe(
    // tap(logAll),
    // map((data: ITestData[]) => logAll(data)),
    map((data: ITestData[]) =>
        data.map((item) => filterUniqInAllArrays(item.params))
    )
);

// symDiffTest1$.subscribe((item) => logAll('получил: ', item), err => logAll('ошибка:', err), () => logAll('symDiff поток закрыт'));
filteringOperatorList.push({ observable$: symDiffTest1$ });

//===================================================== поточная обработка

/**
 * Сигнальный поток, каждые 2 секунды
 */
const symDiffSignal$ = interval(2000).pipe(take(1));

/**
 * 10 случайных чисел с интервалом 10мсек
 */
const symDiffSrc1$ = interval(10).pipe(
    map((item) => randomNumber()),
    distinct(),
    take(10)
);

/**
 * Пять чисел из первого потока
 */
const symDiffSrc2$ = symDiffSrc1$.pipe(skip(3), take(5));
const list1: number[] = [];
const list2: number[] = [];
// const listsFilteredUniq: { list1: number[], list2: number[] } = { list1: [], list2: [] };

/**
 * Проверка работы
 */
const symDiffTest$ = symDiffSignal$.pipe(
    withLatestFrom(symDiffSrc1$, symDiffSrc2$),
    // tap(logAll),
    map(([signal, item1, item2]: [number, number, number]) => {
        logAll(item1, item2);
        if (
            item1 !== item2 &&
            isUniqInTwoArrays({
                itemList1: list1,
                itemList2: list2,
                value: item1,
            }) &&
            isUniqInTwoArrays({
                itemList1: list1,
                itemList2: list2,
                value: item2,
            })
        ) {
            list1.push(item1);
            list2.push(item2);
        }
    })
);

// symDiffTest$.subscribe((item) => logAll('получил: ', item), err => logAll('ошибка:', err), () => logAll('symDiff поток закрыт'));
filteringOperatorList.push({ observable$: symDiffTest$ });

// =====================================================================================

// https://www.geeksforgeeks.org/how-to-get-symmetric-difference-between-two-arrays-in-javascript/
/* Defining two arrays and a resultant array*/
const a = [1, 2, 3, 4, 5, 7, 9];
const b = [5, 6, 7, 8, 9];
const result = [];

/* Defining the function with two arguments array inputs */
function difference(arr1, arr2) {
    let i = 0;
    let j = 0;
    let flag = false;

    /* For array 1 */
    for (i = 0; i < arr1.length; i++) {
        /* Reseting the flag and the other array iterator */
        j = 0;
        flag = false;
        while (j !== arr2.length) {
            if (arr1[i] === arr2[j]) {
                flag = true;
                break;
            }
            j++;
        }

        /* If value is not present in the second array then push that value to the resultant array */
        if (!flag) {
            result.push(arr1[i]);
        }
    }
    flag = false;

    /* For array 2 */
    for (i = 0; i < arr2.length; i++) {
        /* Reseting the flag and the other array iterator */
        j = 0;
        flag = false;
        while (j != arr1.length) {
            if (arr2[i] == arr1[j]) {
                flag = true;
                break;
            }
            j++;
        }

        /* If value is not present in the
                        first array then push that value
                        to the resultant array */
        if (!flag) {
            result.push(arr2[i]);
        }
    }
    return result;
}

console.log(difference(a, b));


//  * [Функциональный JavaScript: пять способов нахождения среднего арифметического элементов массива и метод .reduce()](https://habr.com/ru/company/ruvds/blog/458030/)