import SymbolSingleton from "./singleton.symbol";
import IIFESingleton from "./singleton.iife";
import ClassSingleton from "./singleton.class";

export default function testSingleton() {
    // symbol
    const instance1 = SymbolSingleton.instance;
    const instance2 = SymbolSingleton.instance;
    console.log("Symbol singleton", instance1 === instance2);

    // IIFE
    // 5. `getInstance` is called and assigned to instance1
    var instance11 = IIFESingleton.getInstance();
    // 10. `getInstance` is called again and assigns whatever is returned to instance2
    var instance22 = IIFESingleton.getInstance();
    // instance1 === instance2 because `getInstance` returned the same thing.
    console.log("IIFE singleton", instance11 === instance22);

    // class
    const instanceTwo = ClassSingleton.getInstance("mysqldb1");
    const instanceOne = ClassSingleton.getInstance("mysqldb1");
    console.log("Class singleton", instanceOne === instanceTwo);
}
