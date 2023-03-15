/**Реализовать метод, который на вход получает последовательность целых значений, а на выходе
	выводит последовательность, где все значения кратные 3 заменены на 'Fizz', кратные 5 на 'Buzz',
	кратные 3 и 5 на 'FizzBuzz'*/
const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 15, 25, 34, 33, 9];
const FIZZ = "Fizz";
const BUZZ = "Buzz";
// const res = [1, 2, Fizz, 4, Buzz, Fizz, 7, 8, FizzBuzz, 'Buzz', 34, 'Fizz', 'Fizz'];
//				1, 2, Fizz, 4, Buzz, Fizz, 7, 8, FizzBuzz, Buzz,   34,  Fizz, Fizz

let result: (number | string)[] = [];
let parsedItem: number | string;

for (let i = 0; i < arr.length; i++) {
    parsedItem = "";

    if (typeof arr[i] === "number" && arr[i] % 3 !== 0 && arr[i] % 5 !== 0) {
        parsedItem = arr[i];
    }

    if (typeof arr[i] === "number" && arr[i] % 3 === 0) {
        parsedItem = FIZZ;
    }

    if (typeof arr[i] === "number" && arr[i] % 5 === 0) {
        parsedItem = parsedItem + BUZZ;
    }

    result.push(parsedItem);
}

console.log(`src=${arr};\nresult=${result};`);
