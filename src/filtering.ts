
import { logAll, IRunListItem, ITestData, randomNumber } from './utils';
import { interval, of } from 'rxjs';
import { take, map, endWith, skip, mergeAll, distinct, switchMap, mergeMap, withLatestFrom, tap } from 'rxjs/operators';

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
 * 
 * 
The mathematical term symmetric difference (△ or ⊕) of two sets is the set of elements which are in either of the two sets but not in both. For example, for sets A = {1, 2, 3} and B = {2, 3, 4}, A △ B = {1, 4}.

Symmetric difference is a binary operation, which means it operates on only two elements. So to evaluate an expression involving symmetric differences among three elements (A △ B △ C), you must complete one operation at a time. Thus, for sets A and B above, and C = {2, 3}, A △ B △ C = (A △ B) △ C = {1, 4} △ {2, 3} = {1, 2, 3, 4}.

 */

const symDiffTestData: ITestData[] = [
	{ params: [[1, 2, 3], [5, 2, 1, 4]], result: [3, 4, 5] },
	{ params: [[1, 2, 3, 3], [5, 2, 1, 4]], result: [3, 4, 5] },
	{ params: [[1, 2, 3], [5, 2, 1, 4, 5]], result: [3, 4, 5] },
	{ params: [[1, 2, 5], [2, 3, 5], [3, 4, 5]], result: [1, 4, 5] },
	{ params: [[1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]], result: [1, 4, 5] },
	{ params: [[3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]], result: [2, 3, 4, 6, 7] },
	{ params: [[3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]], result: [1, 2, 4, 5, 6, 7, 8, 9] }
];

/**
 * Сигнальный поток, каждые 2 секунды
 */
const symDiffSignal$ = interval(2000).pipe(
	take(1)
);

/**
 * 10 случайных чисел с интервалом 10мсек
 */
const symDiffSrc1$ = interval(10).pipe(
	map(item => randomNumber()),
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
const isUniqInTwoArrays = (params: { itemList1: number[], itemList2: number[], value: number }): boolean => {
	return !(params.itemList1.includes(params.value) && params.itemList2.includes(params.value));
}

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
			isUniqInTwoArrays({ itemList1: list1, itemList2: list2, value: item1 }) &&
			isUniqInTwoArrays({ itemList1: list1, itemList2: list2, value: item2 })
		) {
			list1.push(item1);
			list2.push(item2);
		}
	})
)

symDiffTest$.subscribe((item) => logAll('получил: ', item), err => logAll('ошибка:', err), () => logAll('symDiff поток закрыт'));
filteringOperatorList.push({ observable$: symDiffTest$ });


//========================================================================================================================
//==================================================FILTERING ONE=========================================================
//========================================================================================================================
//указанные операторы получают и возвращают значения в потоке

/**
 * skip
 * скрывает указанное количество значений
	
	
получил:  0-1
получил:  101-1
получил:  202-1
получил:  303-1
получил:  306-2
получил:  404-1
получил:  101-закрыт
получил:  408-2
получил:  102-закрыт
skip поток закрыт
 */

const skipSrc1$ = interval(101).pipe(take(5), map(item => item * 101 + '-1'), endWith('101-закрыт'));
const skipSrc2$ = interval(102).pipe(
	take(5),
	map(item => item * 102 + '-2'),
	skip(3), endWith('102-закрыт')
);

const skip$ = of(skipSrc1$, skipSrc2$).pipe(
	mergeAll()
)

//skip$.subscribe((item) => logAll('получил: ', item), err => logAll('ошибка:', err), () => logAll('skip поток закрыт'));
filteringOperatorList.push({ observable$: skip$ });


