/**
* symbol singleton
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
* https://coderoad.ru/26205565/Преобразование-Singleton-JS-объектов-использования-классов-на-ES6

*/
const singleton = Symbol("");
const singletonEnforcer = Symbol("");

class SymbolSingleton {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Cannot construct singleton");
        }
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new SymbolSingleton(singletonEnforcer);
        }
        return this[singleton];
    }
}

export default SymbolSingleton;


