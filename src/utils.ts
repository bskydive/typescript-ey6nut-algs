import { Observable } from 'rxjs';
import { randomBytes } from 'crypto';
// import * as crypto from 'crypto';

/**
 * Интерфейсы и служебные функции
 * 
 */

/**
 * Чтобы обойти ошибку TS2496: The 'arguments' object cannot be referenced in an arrow function in ES3 and ES5. Consider using a standard function expression.
 * https://github.com/microsoft/TypeScript/issues/1609
 * Чтобы не светились ошибки использования console.log
 * Здесь такое логирование применимо, на проде - нет
 */
export function logAll(...values) {
	console.log(...values); // ...arguments
}

export function randomNumber() {
	if (typeof window === 'object') {
		// run from browser
		return window.crypto.getRandomValues(new Int16Array(1))[0]
	} else {
		// run from console
		return randomBytes(16).readInt16LE(0)
	}
}

export type TTypeItem = 'observable' | 'observable' | 'primitive' | 'function' | 'object';
export type TOperationItem = 'filter' | 'sort' | 'parse' | 'reply' | 'exhaust' | 'merge' | 'last' | 'debounce' | 'time' | 'accumulate' | 'recursion' | 'switch' | 'array/concat' | 'flattening' | 'missing' | 'unsubscribing';

/**
 * Интерфейс для построения модулей, поиска и тестирования операторов
 */
export interface IRunListItem {
	observable$: Observable<any>;
	inputTypeList?: TTypeItem[];
	outputTypeList?: TTypeItem[];
	operationTypeList?: TOperationItem[];
	result?: any;
}


export interface ITestData {
	params: any[];
	result: any[];
}
