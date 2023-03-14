
# Библиотека алгоритмов TS

Сборник готовых алгоритмов с удобным поиском и тестированием на группе данных

<!-- TODO переделать описание -->

Это в большей степени конструктор, чем учебное пособие. Прочитав код, вы вряд ли его запомните. Лучше добавить или поменять в этом коде что-то на свой лад. 
Для ускорения тестирования алгоритмы завёрнуты в rxJS.

 * [Развёрнутая статья]()
	* [Полезные ссылки]()
	* [Автоматическая проверка кода]()
	* [Как использовать]()
	* [Что хорошо]()
	* [Группировка операторов]()
	* [Что плохо]()
	* [Типовой пример]()
 * [облачный сервис с развёрнутым кодом](https://stackblitz.com/edit/typescript-ey6nut-algs)
 * Список того, к чему вы сами можете приложить руку(TODO)
	* юнит-тесты
	* ссылки на развёрнутые примеры с алгоритмами и их применение на практике

## Список основных ресурсов, на основе которых написана библиотека

* [Примеры операторов RxJs](https://github.com/bskydive/rxjs-aj4vwd-stackblitz)

## Автоматическая проверка кода

По прикрутил в проект два линтера и несколько наборов правил:
* сорян, но табы. Они позволяют настраивать каждому своё отображение, не меняя код в репе.
* именование файлов в шашлычном стиле
* именование интерфейсов с префиксом `I`
* многие правила `es/ts lint` дублируются, часть отключено в одном из двух, но большинство оставлено, т.к. непонятно как конкретно работают правила, и непонятно что лучше.
* правила форматирования переведены в `severity: warn`.
* нельзя оставлять в коде `console.log()`
* [Финская нотация](https://medium.com/@benlesh/observables-and-finnish-notation-df8356ed1c9b). Да, она через линтер помогает, например, не проглядеть тип значений внутри операторов `map(item=>item... | map(item$=>item$...` , т.к. вместо объекта может прилететь `Observable`, и это не всегда отлавливается tslint.
* перелопатил [все правила eslint](https://eslint.org/docs/rules/), и добавил что добавилось. Искал правило для [сложного](https://github.com/bskydive/angular-docdja) [случая](https://stackblitz.com/edit/angular-docdja), который периодически трепал мне нервы. Не нашёл :(.
* [rxjs-tslint-rules](https://github.com/cartant/rxjs-tslint-rules#rules)
* [codelyzer for Angular](https://github.com/mgechev/codelyzer)
* [angular-tslint-rules: a configuration preset for both TSLint & codelyzer](https://medium.com/burak-tasci/angular-tslint-rules-a-configuration-preset-for-both-tslint-codelyzer-8b5fa1455908)
* [RxJS: Avoiding takeUntil Leaks](https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef)
* [Best practices for a clean and performant Angular application](https://medium.com/free-code-camp/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f)

## Как использовать

* можно [открыть в IDE](https://github.com/bskydive/rxjs-aj4vwd-stackblitz), а можно через chrome в облаке [stackblitz](https://stackblitz.com/edit/rxjs-aj4vwd)
* Необходимые операторы ищутся ctrl+f, в конце добавляем $ к названию оператора. Например `switchMap$`. Также операторы видны в "структуре кода" - специальном окне IDE. 
* Перед каждым примером есть небольшое описание и результат выполнения
* В облаке stackblitz:
	 * обновить страницу(stackblitz)
	 * раскомментировать `*$.subscribe(*` строку необходимого оператора
	 * открыть консоль встроенного браузера(stackblitz)
 * Локально в IDE:
	```bash
		git clone https://github.com/bskydive/rxjs-aj4vwd-stackblitz.git
		cd rxjs-aj4vwd-stackblitz
		npm i
		npm run b
	```
* Список плагинов VSCode, которые относятся к теме:
	* [tslint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) 
	* [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 
	* [учёт времени с привязкой к git wakatime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime)
	* [открытый аналог локально](https://marketplace.visualstudio.com/items?itemName=hangxingliu.vscode-coding-tracker)
	* [открытый аналог локально для подсчёта эффективности без привязки к веткам и комитам](https://marketplace.visualstudio.com/items?itemName=softwaredotcom.swdc-vscode)
 * чтобы заглушить ненужный входной поток достаточно дописать в начеле `*.pipe(*` оператор `take(0)`

## Виды алгоритмов

 * `filtering.ts`- фильтрации
 * `math.ts`- 
 * `string.ts`- 
 * `utils.ts`- Интерфейсы и служебные функции

## Типовой пример

```ts
const auditProbe$ = item => { // функция-аргумент для передачи в оператор
	logAll('проверка: ' + item); // для отладки пишем полученное значение
	return interval(300).pipe(take(3)); // возвращаем наблюдатель. В данном случае - для имитации трёх значений. 
	//.pipe(take(X)) - хорошее правило для ограничения утечек памяти
}

const audit2$ = interval(102).pipe( // поток для отладки оператора
	take(10), // ограничиваем количество значений
	map(item => item * 102), // делаем значения человеко-понятными, выводим время их имитации в мсек, выбрали 102 вместо 100 чтобы не было случайных гонок асинхронных потоков(перестраховка)
	tap(logAll), // выводим сырые значения перед отправкой в недра исследуемого оператора
	audit(auditProbe$) // исследуемый оператор
)

const audit1$ = interval(101).pipe( // контрольный поток для сравнения, без оператора для исследования
	take(10),
	map(item => item * 101 + '-control'), // добавляем постфикс для облегчения чтения отладки
)

const audit$ = of(audit1$, audit2$).pipe( // одновременно запускаем два потока
	mergeAll(), // собираем значения потоков в один, "конвертируем" потоки в значения
);

//запускаем потоки и выводим всё в консоль. префиксы нужны, чтобы понимать, что значение долетело до конца
audit$.subscribe((item) => 
	logAll('получил: ', item), // пишем всё, что получили по сигналу next().
	err => logAll('ошибка:', err), // пишем что прилетело по сигналу error()
	() => logAll('audit поток закрыт') // пишем когда прилетело complete(). Отдельно указываем какой именно оператор закончил тестирование, чтобы быстрее ловить другие ошибочно не закоментированные операторы
);

```
