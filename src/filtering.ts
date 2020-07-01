
import { logAll, IRunListItem, ITestData } from './utils';
import { interval, of } from 'rxjs';
import { take, map, endWith, skip, mergeAll, distinct } from 'rxjs/operators';

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
 * 10 случайных чисел с интервалом 10мсек
 */
const symDiffSrc1$ = interval(10).pipe(
	map(item => crypto.getRandomValues(new Int32Array(1))[0]),
	distinct(),
	take(10)
);

/**
 * Пять чисел из первого потока
 */
const symDiffSrc2$ = symDiffSrc1$.pipe(skip(3), take(5));

const symDiffTest$ = of(symDiffSrc1$, symDiffSrc2$).pipe(
	mergeAll()
)

//symDiff$.subscribe((item) => logAll('получил: ', item), err => logAll('ошибка:', err), () => logAll('symDiff поток закрыт'));
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


