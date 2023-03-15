// ================================ порождающие
/** фабрика */
interface IDoor {
    getWidth(): number;
    getHeight(): number;
}

class WoodenDoor implements IDoor {
    protected width;
    protected height;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}

class DoorFactory {
    public static makeDoor(width, height): IDoor {
        return new WoodenDoor(width, height);
    }
}

const door = DoorFactory.makeDoor(100, 200);
console.log("Width: ", door.getWidth());
console.log("Height: ", door.getHeight());

/** ===================================== фабричный метод ============================== */

interface Interviewer {
    askQuestions();
}

class Developer implements Interviewer {
    public askQuestions() {
        console.log("Asking about design patterns!");
    }
}

class CommunityExecutive implements Interviewer {
    public askQuestions() {
        console.log("Asking about community building");
    }
}

abstract class HiringManager {
    private interviewer;
    // Фабричный метод
    public abstract makeInterviewer(): Interviewer;

    public takeInterview() {
        this.interviewer = this.makeInterviewer();
        this.interviewer.askQuestions();
    }
}

// Любой дочерний класс может расширять его и предоставлять нужного собеседующего:

class DevelopmentManager extends HiringManager {
    public makeInterviewer(): Interviewer {
        return new Developer();
    }
}

class MarketingManager extends HiringManager {
    public makeInterviewer(): Interviewer {
        return new CommunityExecutive();
    }
}

// Использование:

const devManager = new DevelopmentManager();
devManager.takeInterview(); // Output: Спрашивает о шаблонах проектирования.

const marketingManager = new MarketingManager();
marketingManager.takeInterview(); // Output: Спрашивает о создании сообщества.

/** ==================================== абстрактная фабрика =================================== */

interface Door {
    getDescription();
}

class WoodenDoor2 implements Door {
    public getDescription() {
        console.log("I am a wooden door");
    }
}

class IronDoor implements Door {
    public getDescription() {
        console.log("I am an iron door");
    }
}

// Теперь нам нужны специалисты по установке каждого вида дверей.

interface DoorFittingExpert {
    getDescription();
}

class Welder implements DoorFittingExpert {
    public getDescription() {
        console.log("I can only fit iron doors");
    }
}

class Carpenter implements DoorFittingExpert {
    public getDescription() {
        console.log("I can only fit wooden doors");
    }
}

// Мы получили абстрактную фабрику, которая позволяет создавать семейства объектов или взаимосвязанные объекты. То есть фабрика деревянных дверей создаст деревянную дверь и человека для её монтажа, фабрика стальных дверей — стальную дверь и соответствующего специалиста и т. д.

interface DoorFactory {
    makeDoor(): Door;
    makeFittingExpert(): DoorFittingExpert;
}

// Фабрика деревянных дверей возвращает плотника и деревянную дверь
class WoodenDoorFactory implements DoorFactory {
    public makeDoor(): Door {
        return new WoodenDoor2();
    }

    public makeFittingExpert(): DoorFittingExpert {
        return new Carpenter();
    }
}

// Фабрика стальных дверей возвращает стальную дверь и сварщика
class IronDoorFactory implements DoorFactory {
    public makeDoor(): Door {
        return new IronDoor();
    }

    public makeFittingExpert(): DoorFittingExpert {
        return new Welder();
    }
}

// Использование:

const woodenFactory = new WoodenDoorFactory();

let door2 = woodenFactory.makeDoor();
let expert2 = woodenFactory.makeFittingExpert();

door2.getDescription(); // Output: Я деревянная дверь
expert2.getDescription(); // Output: Я могу устанавливать только деревянные двери

// Same for Iron Factory
const ironFactory = new IronDoorFactory();

door2 = ironFactory.makeDoor();
expert2 = ironFactory.makeFittingExpert();

door2.getDescription(); // Output: Я стальная дверь
expert2.getDescription(); // Output: Я могу устанавливать только стальные двери

/** ================================================= строитель ============================== */

class Burger {
    protected size;

    protected cheese = false;
    protected pepperoni = false;
    protected lettuce = false;
    protected tomato = false;

    constructor(builder: BurgerBuilder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.lettuce = builder.lettuce;
        this.tomato = builder.tomato;
    }
}

// А затем добавим «строителя»:

class BurgerBuilder {
    public size;

    public cheese = false;
    public pepperoni = false;
    public lettuce = false;
    public tomato = false;

    constructor(size: number) {
        this.size = size;
    }

    public addPepperoni() {
        this.pepperoni = true;
        return this;
    }

    public addLettuce() {
        this.lettuce = true;
        return this;
    }

    public addCheese() {
        this.cheese = true;
        return this;
    }

    public addTomato() {
        this.tomato = true;
        return this;
    }

    public build(): Burger {
        return new Burger(this);
    }
}

//Использование:
const burger = new BurgerBuilder(14)
    .addPepperoni()
    .addLettuce()
    .addTomato()
    .build();
