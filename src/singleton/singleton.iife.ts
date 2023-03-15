/** IIFE singleton
* https://stackoverflow.com/questions/27701887/what-is-instance-in-javascript
* https://www.digitalocean.com/community/conceptual_articles/singleton-design-pattern-in-javascript
*/
var IIFESingleton = (function () {
    // 2. `instance` gets defined with value `undefined`
    var instance;

    // 3. `createInstance` gets declared inside the closure
    function createInstance() {
        // 8. `createInstance` creates an instance of `Object` and returns it
        var object = {};
        return object;
    }

    // 4. The closure returns an object with getInstance, and gets assigned to `Singleton`
    return {
        getInstance: function () {
            // 6. Check if `instance` refers to something
            if (!instance) {
                // 7. Which it doesn't, so it calls `createInstance` and assigns it to `instance`
                // where `instance` is the variable declared in the closure in step 2
                instance = createInstance();
            }
            // 9. Return whatever is assigned to `instance`
            // 11. since `instance` already points to something, return it
            return instance;
        },
    };

    // 1. This function executes immediately
})();

export default IIFESingleton;