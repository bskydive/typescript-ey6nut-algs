// // Import stylesheets
// import './style.css';

// // Write TypeScript code!
// const appDiv: HTMLElement = document.getElementById('app');
// appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

import { logAll } from "./src/utils";
import { filteringOperatorList } from "./src/filtering";
import { Observable, of } from "rxjs";
import testSingleton from "./src/singleton/singleton";
import { mergeAll } from "rxjs/operators";

/**
 * ==========================================================
 * ========== Библиотека живых примеров алгоритмов ==========
 * ==========================================================
 * 
 * Ликбез

 * Observable - объект наблюдения - по сути генерирует поток значений. Есть метод подписки(subscribe) на значения потоков, а также метод последовательной обработки потока(pipe()). Может порождать несколько потоков значений.
 * Observer - наблюдатели - объекты(функции), которые обрабатывают(принимают/генерируют) поток значений. 
	next()
	error()
	complete()
 * Subscriber - вид наблюдателя. Объект(функция), которая обрабатывает конечные результаты потока. Передаётся внутрь метода Observable.subscribe(subscriber)
 * pipe(аргументы) - организует последовательную передачу значений потока между аргументами-наблюдателями. Сделано для избегания конфликтов с методами объектов, также помогает делать `tree-shaking`.
 * subscribe(item => logAll('значение потока', item), err => logAll('ошибка', err), () => logAll('поток закрыт штатно')); - запускает поток, принимает три аргумента для значений(next), ошибок(error), завершения потока(complete)
 
 */

/**
 * Облегчение автоматизации запуска операторов
 */
const operatorList: Observable<any>[] = [];
operatorList.push(...filteringOperatorList.map((item) => item.observable$));
operatorList.push(of(Object.call(testSingleton())));

// небольшая проверка, что все модули собраны
logAll(`Библиотека алгоритмов. Итого примеров: ${operatorList.length} шт.`);

/**
 * Запуск операторов для автоматической проверки
 */
of(...operatorList)
    .pipe(mergeAll())
    .subscribe(
        (item) => logAll("получил: ", item),
        (err) => logAll("ошибка:", err),
        () => logAll("поток закрыт")
    );

// =========================================== Статика синхронно
// testSingleton();
