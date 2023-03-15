/** [Как работает JavaScript: часть вторая GC утечки](https://geekbrains.ru/posts/javascript_internals_part2)
 */
var theThing = null;
var replaceThing = function () {
    var originalThing = theThing;
    var unused = function () {
        if (originalThing) {
            // a reference to 'originalThing'
            console.log("originalThing");
        }
    };

    theThing = {
        // замена в родительском окружении
        longStr: new Array(1000000).join("*"),
        someMethod: function () {
            console.log("replacedThing");
        },
    };
};

// TODO экспортировать и подключить к index.ts
setInterval(replaceThing, 1000);
