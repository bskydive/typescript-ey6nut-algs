/* eslint-disable no-console */

/** ===================================== адаптер ============================== */

interface Lion1 {
  roar();
}

class AfricanLion implements Lion1 {
  public roar() {}
}

class AsianLion implements Lion1 {
  public roar() {}
}

class Hunter {
  public hunt(lion: Lion1) {}
}

// Это нужно добавить
class WildDog {
  public bark() {}
}

// Адаптер вокруг собаки сделает её совместимой с охотником
class WildDogAdapter implements Lion1 {
  protected dog;

  public constructor(dog: WildDog) {
    this.dog = dog;
  }

  public roar() {
    this.dog.bark();
  }
}

const wildDog = new WildDog();
const wildDogAdapter = new WildDogAdapter(wildDog);

const hunter = new Hunter();
hunter.hunt(wildDogAdapter);

/** ========================================= мост ================================== */

abstract class WebPage {
  protected theme: Theme;
  constructor(theme: Theme) {}
  getContent() {}
}

class About extends WebPage {
  protected theme;

  constructor(theme: Theme) {
    super(theme);
    this.theme = theme;
  }

  public getContent() {
    return `About page in {this.theme.getColor()}`;
  }
}

class Careers extends WebPage {
  protected theme;

  constructor(theme: Theme) {
    super(theme);
    this.theme = theme;
  }

  public getContent() {
    return `Careers page in {this.theme.getColor()}`;
  }
}

// Отделим иерархию тем:

interface Theme {
  getColor();
}

class DarkTheme implements Theme {
  public getColor() {
    return "Dark Black";
  }
}
class LightTheme implements Theme {
  public getColor() {
    return "Off white";
  }
}
class AquaTheme implements Theme {
  public getColor() {
    return "Light blue";
  }
}

// Обе иерархии:

const darkTheme = new DarkTheme();
const about = new About(darkTheme);
const careers = new Careers(darkTheme);

console.log(about.getContent()); // "About page in Dark Black";
console.log(careers.getContent()); // "Careers page in Dark Black";

/** ===================================== компоновщик ============================== */

interface Employee {
  getName(): string;
  setSalary(salary: number);
  getSalary(): number;
  getRoles(): any[];
}

class Developer implements Employee {
  protected salary;
  protected name;
  protected roles;

  public constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public getName(): string {
    return this.name;
  }

  public setSalary(salary: number) {
    this.salary = salary;
  }

  public getSalary(): number {
    return this.salary;
  }

  public getRoles(): any[] {
    return this.roles;
  }
}

class Designer implements Employee {
  protected salary;
  protected name;
  protected roles;

  public constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public getName(): string {
    return this.name;
  }

  public setSalary(salary: number) {
    this.salary = salary;
  }

  public getSalary(): number {
    return this.salary;
  }

  public getRoles(): any[] {
    return this.roles;
  }
}

class Organization {
  protected employees: Employee[];

  public addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  public getNetSalaries(): number {
    let netSalary = 0;

    for (const employee of this.employees) {
      netSalary += employee.getSalary();
    }

    return netSalary;
  }
}

// Подготовка сотрудников
const john1 = new Developer("John Doe", 12000);
const jane1 = new Designer("Jane Doe", 15000);

// Включение их в штат
const organization = new Organization();
organization.addEmployee(john1);
organization.addEmployee(jane1);

console.log("Net salaries: " + organization.getNetSalaries()); // Net Salaries: 27000

/** ===================================== декоратор ============================== */

interface Coffee {
  getCost();
  getDescription();
}

class SimpleCoffee implements Coffee {
  public getCost() {
    return 10;
  }

  public getDescription() {
    return "Simple coffee";
  }
}

class MilkCoffee implements Coffee {
  protected coffee;

  public constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public getCost() {
    return this.coffee.getCost() + 2;
  }

  public getDescription() {
    return this.coffee.getDescription() + ", milk";
  }
}

class WhipCoffee implements Coffee {
  protected coffee;

  public constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public getCost() {
    return this.coffee.getCost() + 5;
  }

  public getDescription() {
    return this.coffee.getDescription() + ", whip";
  }
}

class VanillaCoffee implements Coffee {
  protected coffee;

  public constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public getCost() {
    return this.coffee.getCost() + 3;
  }

  public getDescription() {
    return this.coffee.getDescription() + ", vanilla";
  }
}

let someCoffee = new SimpleCoffee();
console.log(someCoffee.getCost()); // 10
console.log(someCoffee.getDescription()); // Simple Coffee

someCoffee = new MilkCoffee(someCoffee);
console.log(someCoffee.getCost()); // 12
console.log(someCoffee.getDescription()); // Simple Coffee, milk

someCoffee = new WhipCoffee(someCoffee);
console.log(someCoffee.getCost()); // 17
console.log(someCoffee.getDescription()); // Simple Coffee, milk, whip

someCoffee = new VanillaCoffee(someCoffee);
console.log(someCoffee.getCost()); // 20
console.log(someCoffee.getDescription()); // Simple Coffee, milk, whip, vanilla

/** ===================================== фасад ============================== */

class Computer {
  public getElectricShock() {
    console.log("Ouch!");
  }

  public makeSound() {
    console.log("Beep beep!");
  }

  public showLoadingScreen() {
    console.log("Loading..");
  }

  public bam() {
    console.log("Ready to be used!");
  }

  public closeEverything() {
    console.log("Bup bup bup buzzzz!");
  }

  public sooth() {
    console.log("Zzzzz");
  }

  public pullCurrent() {
    console.log("Haaah!");
  }
}

class ComputerFacade {
  protected computer;

  public constructor(computer: Computer) {
    this.computer = computer;
  }

  public turnOn() {
    this.computer.getElectricShock();
    this.computer.makeSound();
    this.computer.showLoadingScreen();
    this.computer.bam();
  }

  public turnOff() {
    this.computer.closeEverything();
    this.computer.pullCurrent();
    this.computer.sooth();
  }
}

const computer = new ComputerFacade(new Computer());
computer.turnOn(); // Ouch! Beep beep! Loading.. Ready to be used!
computer.turnOff(); // Bup bup buzzz! Haah! Zzzzz

/** ===================================== приспособленец ============================== */

// Приспособленец — то, что будет закешировано.
// Типы чая здесь — приспособленцы.
class KarakTea {}

// Действует как фабрика и экономит чай
class TeaMaker {
  protected availableTea: any[] = [];

  public make(preference) {
    if (!this.availableTea[preference]) {
      this.availableTea[preference] = new KarakTea();
    }

    return this.availableTea[preference];
  }
}

class TeaShop {
  protected orders;
  protected teaMaker;

  public constructor(teaMaker: TeaMaker) {
    this.teaMaker = teaMaker;
  }

  public takeOrder(teaType: string, table: number) {
    this.orders[table] = this.teaMaker.make(teaType);
  }

  public serve() {
    for (const table of this.orders) {
      // TODO => tea
      console.log("Serving tea to table# " + table);
    }
  }
}

const teaMaker = new TeaMaker();
const shop = new TeaShop(teaMaker);

shop.takeOrder("less sugar", 1);
shop.takeOrder("more milk", 2);
shop.takeOrder("without sugar", 5);

shop.serve();
// Serving tea to table# 1
// Serving tea to table# 2
// Serving tea to table# 5

/** ===================================== заместитель ============================== */

interface Door {
  open();
  close();
}

class LabDoor implements Door {
  public open() {
    console.log("Opening lab door");
  }

  public close() {
    console.log("Closing the lab door");
  }
}

class Security {
  protected door;

  public constructor(door: Door) {
    this.door = door;
  }

  public open(password) {
    if (this.authenticate(password)) {
      this.door.open();
    } else {
      console.log("Big no! It ain't possible.");
    }
  }

  public authenticate(password) {
    return password === "ecr@t";
  }

  public close() {
    this.door.close();
  }
}

const door = new Security(new LabDoor());
door.open("invalid"); // Big no! It ain't possible.

door.open("ecr@t"); // Opening lab door
door.close(); // Closing lab door
