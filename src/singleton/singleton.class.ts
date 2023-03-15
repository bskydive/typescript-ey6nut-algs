/** es6 modules+classes 
 * https://code.tutsplus.com/tutorials/how-to-implement-the-singleton-pattern-in-javascript-es6--cms-39927
 * https://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-a-singleton-in-javascript
 */
class ClassSingleton {
    private static instance;

    constructor(conString) {}

    static getInstance(conString) {
        if (!this.instance) {
            this.instance = new ClassSingleton(conString);
        }

        return this.instance;
    }
}

export default ClassSingleton;
