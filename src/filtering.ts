import { interval, of } from 'rxjs';
import { take, map, endWith, skip, mergeAll } from 'rxjs/operators';
import { IRunListItem } from './utils';


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

//==================================================FILTERING ONE======================================================

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


