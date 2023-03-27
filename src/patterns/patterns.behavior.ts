/** ===================================== Цепочка ответственности ============================== */

abstract class Account {
  protected successor;
  protected balance;

  public setNext(account: Account) {
    this.successor = account;
  }

  public pay(amountToPay: number) {
    if (this.canPay(amountToPay)) {
      console.log(`Paid ${amountToPay} using ${this.constructor.name}`);
    } else if (this.successor) {
      console.log(`Cannot pay using ${this.constructor.name}. Proceeding ..`);
      this.successor.pay(amountToPay);
    } else {
      throw new Error("None of the accounts have enough balance");
    }
  }

  public canPay(amount): boolean {
    return this.balance >= amount;
  }
}

class Bank extends Account {
  protected balance;

  public constructor(balance: number) {
    super();
    this.balance = balance;
  }
}

class Paypal extends Account {
  protected balance;

  public constructor(balance: number) {
    super();
    this.balance = balance;
  }
}

class Bitcoin extends Account {
  protected balance;

  public constructor(balance: number) {
    super();
    this.balance = balance;
  }
}

// Сделаем такую цепочку
//      bank.paypal.bitcoin
//
// Приоритет у банка
//      Если банк не может оплатить, переходим к Paypal
//      Если Paypal не может, переходим к Bitcoin

const bank = new Bank(100); // У банка баланс 100
const paypal = new Paypal(200); // У Paypal баланс 200
const bitcoin = new Bitcoin(300); // У Bitcoin баланс 300

bank.setNext(paypal);
paypal.setNext(bitcoin);

// Начнём с банка
bank.pay(259);

// Выходной вид
// ==============
// Нельзя оплатить с помощью банка. Обрабатываю...
// Нельзя оплатить с помощью Paypal. Обрабатываю...
// Оплачено 259 с помощью Bitcoin!

/** ===================================== Команда ============================== */

// Receiver
class Bulb {
  public turnOn() {
    console.log("Bulb has been lit");
  }

  public turnOff() {
    console.log("Darkness!");
  }
}

interface Command {
  execute();
  undo();
  redo();
}

// Command
class TurnOn implements Command {
  protected bulb;

  public constructor(bulb: Bulb) {
    this.bulb = bulb;
  }

  public execute() {
    this.bulb.turnOn();
  }

  public undo() {
    this.bulb.turnOff();
  }

  public redo() {
    this.execute();
  }
}

class TurnOff implements Command {
  protected bulb;

  public constructor(bulb: Bulb) {
    this.bulb = bulb;
  }

  public execute() {
    this.bulb.turnOff();
  }

  public undo() {
    this.bulb.turnOn();
  }

  public redo() {
    this.execute();
  }
}

// Invoker
class RemoteControl {
  public submit(command: Command) {
    command.execute();
  }
}

const bulb = new Bulb();

const turnOn = new TurnOn(bulb);
const turnOff = new TurnOff(bulb);

const remote = new RemoteControl();
remote.submit(turnOn); // Лампочка зажглась!
remote.submit(turnOff); // Темнота!

/** ===================================== Итератор ============================== */

interface Iterator1 {}

class RadioStation {
  protected frequency;

  public constructor(frequency: number) {
    this.frequency = frequency;
  }

  public getFrequency(): number {
    return this.frequency;
  }
}

class StationList implements Iterator1 {
  /** @var RadioStation[] stations */
  protected stations: RadioStation[] = [];

  /** @var number counter */
  protected counter;

  public addStation(station: RadioStation) {
    this.stations.push(station);
  }

  public removeStation(toRemove: RadioStation) {
    const toRemoveFrequency = toRemove.getFrequency();
    this.stations = this.stations.filter(
      (station: RadioStation) => station.getFrequency() !== toRemoveFrequency
    );
  }

  public count(): number {
    return this.stations.length;
  }

  public current(): RadioStation {
    return this.stations[this.counter];
  }

  public key() {
    return this.counter;
  }

  public next() {
    this.counter++;
  }

  public rewind() {
    this.counter = 0;
  }

  public valid(): boolean {
    return !!this.stations[this.counter];
  }
}

/** ===================================== Посредник ============================== */

interface ChatRoomMediator {
  showMessage(user: User, message: string);
}

// Посредник
class ChatRoom implements ChatRoomMediator {
  public showMessage(user: User, message: string) {
    const time = new Date("M d, y H:i");
    const sender = user.getName();

    console.log(`${time}[${sender}]:${message}`);
  }
}

class User {
  protected name;
  protected chatMediator;

  public constructor(name: string, chatMediator: ChatRoomMediator) {
    this.name = name;
    this.chatMediator = chatMediator;
  }

  public getName() {
    return this.name;
  }

  public send(message) {
    this.chatMediator.showMessage(this, message);
  }
}

const mediator = new ChatRoom();

const john = new User("John Doe", mediator);
const jane = new User("Jane Doe", mediator);

john.send("Hi there!");
jane.send("Hey!");

// Выходной вид
// Feb 14, 10:58 [John]: Hi there!
// Feb 14, 10:58 [Jane]: Hey!

/** ===================================== Хранитель ============================== */

class EditorMemento {
  protected content;

  public constructor(content: string) {
    this.content = content;
  }

  public getContent() {
    return this.content;
  }
}

class Editor {
  protected content = "";

  public type(words: string) {
    this.content = this.content + " " + words;
  }

  public getContent() {
    return this.content;
  }

  public save() {
    return new EditorMemento(this.content);
  }

  public restore(memento: EditorMemento) {
    this.content = memento.getContent();
  }
}

const editor1 = new Editor();

// Пишем что-нибудь
editor1.type("This is the first sentence.");
editor1.type("This is second.");

// Сохранение состояния в: This is the first sentence. This is second.
const saved = editor1.save();

// Пишем ещё
editor1.type("And this is third.");

// Output: Содержимое до сохранения
console.log(editor1.getContent()); // This is the first sentence. This is second. And this is third.

// Восстанавливаем последнее сохранённое состояние
editor1.restore(saved);

editor1.getContent(); // This is the first sentence. This is second.

/** ===================================== Наблюдатель ============================== */

interface Observer {
  onJobPosted(job: JobPost);
}
interface Observable {}

class JobPost {
  protected title;

  public constructor(title: string) {
    this.title = title;
  }

  public getTitle() {
    return this.title;
  }
}

class JobSeeker implements Observer {
  protected name;

  public constructor(name: string) {
    this.name = name;
  }

  public onJobPosted(job: JobPost) {
    // Do something with the job posting
    console.log("Hi " + this.name + "! New job posted: " + job.getTitle());
  }
}

class JobPostings implements Observable {
  protected observers: Observer[] = [];

  protected notify(jobPosting: JobPost) {
    for (let observer of this.observers) {
      observer.onJobPosted(jobPosting);
    }
  }

  public attach(observer: Observer) {
    this.observers.push(observer);
  }

  public addJob(jobPosting: JobPost) {
    this.notify(jobPosting);
  }
}

// Создаём подписчиков
const johnDoe = new JobSeeker("John Doe");
const janeDoe = new JobSeeker("Jane Doe");

// Создаём публикатора и прикрепляем подписчиков
const jobPostings = new JobPostings();
jobPostings.attach(johnDoe);
jobPostings.attach(janeDoe);

// Добавляем новую вакансию и смотрим, будут ли уведомлены подписчики
jobPostings.addJob(new JobPost("Software Engineer"));

// Output
// Hi John Doe! New job posted: Software Engineer
// Hi Jane Doe! New job posted: Software Engineer

/** ===================================== Посетитель ============================== */

// Место посещения
interface Animal {
  accept(operation: AnimalOperation);
}

// Посетитель
interface AnimalOperation {
  visitMonkey(monkey: Monkey);
  visitLion(lion: Lion);
  visitDolphin(dolphin: Dolphin);
}

class Monkey implements Animal {
  public shout() {
    console.log("Ooh oo aa aa!");
  }

  public accept(operation: AnimalOperation) {
    operation.visitMonkey(this);
  }
}

class Lion implements Animal {
  public roar() {
    console.log("Roaaar!");
  }

  public accept(operation: AnimalOperation) {
    operation.visitLion(this);
  }
}

class Dolphin implements Animal {
  public speak() {
    console.log("Tuut tuttu tuutt!");
  }

  public accept(operation: AnimalOperation) {
    operation.visitDolphin(this);
  }
}

class Speak implements AnimalOperation {
  public visitMonkey(monkey: Monkey) {
    monkey.shout();
  }

  public visitLion(lion: Lion) {
    lion.roar();
  }

  public visitDolphin(dolphin: Dolphin) {
    dolphin.speak();
  }
}

class Jump implements AnimalOperation {
  public visitMonkey(monkey: Monkey) {
    console.log("Jumped 20 feet high! on to the tree!");
  }

  public visitLion(lion: Lion) {
    console.log("Jumped 7 feet! Back on the ground!");
  }

  public visitDolphin(dolphin: Dolphin) {
    console.log("Walked on water a little and disappeared");
  }
}

const monkey = new Monkey();
const lion = new Lion();
const dolphin = new Dolphin();

const speak = new Speak();

monkey.accept(speak); // Уа-уа-уааааа!
lion.accept(speak); // Ррррррррр!
dolphin.accept(speak); // Туут тутт туутт!

const jump = new Jump();

monkey.accept(speak); // Ooh oo aa aa!
monkey.accept(jump); // Jumped 20 feet high! on to the tree!

lion.accept(speak); // Roaaar!
lion.accept(jump); // Jumped 7 feet! Back on the ground!

dolphin.accept(speak); // Tuut tutt tuutt!
dolphin.accept(jump); // Walked on water a little and disappeared

/** ===================================== Стратегия ============================== */

interface SortStrategy {
  sort(dataset: any[]): any[];
}

class BubbleSortStrategy implements SortStrategy {
  public sort(dataset: any[]): any[] {
    console.log("Sorting using bubble sort");

    // Do sorting
    return dataset;
  }
}

class QuickSortStrategy implements SortStrategy {
  public sort(dataset: any[]): any[] {
    console.log("Sorting using quick sort");

    // Do sorting
    return dataset;
  }
}

class Sorter {
  protected sorter;

  public constructor(sorter: SortStrategy) {
    this.sorter = sorter;
  }

  public sort(dataset: any[]): any[] {
    return this.sorter.sort(dataset);
  }
}

const dataset = [1, 5, 4, 3, 2, 8];

let sorter = new Sorter(new BubbleSortStrategy());
sorter.sort(dataset); // Output : Пузырьковая сортировка

sorter = new Sorter(new QuickSortStrategy());
sorter.sort(dataset); // Output : Быстрая сортировка

/** ===================================== Состояние ============================== */

interface WritingState {
  write(words: string);
}

class UpperCase implements WritingState {
  public write(words: string) {
    console.log(words.toUpperCase);
  }
}

class LowerCase implements WritingState {
  public write(words: string) {
    console.log(words.toLowerCase);
  }
}

class Default implements WritingState {
  public write(words: string) {
    console.log(words);
  }
}

class TextEditor {
  protected state;

  public constructor(state: WritingState) {
    this.state = state;
  }

  public setState(state: WritingState) {
    this.state = state;
  }

  public type(words: string) {
    this.state.write(words);
  }
}

const editor = new TextEditor(new Default());

editor.type("First line");

editor.setState(new UpperCase());

editor.type("Second line");
editor.type("Third line");

editor.setState(new LowerCase());

editor.type("Fourth line");
editor.type("Fifth line");

// Output:
// First line
// SECOND LINE
// THIRD LINE
// fourth line
// fifth line

/** ===================================== Шаблонный метод ============================== */

abstract class Builder {
  // Шаблонный метод
  public build() {
    this.test();
    this.lnumber();
    this.assemble();
    this.deploy();
  }

  public abstract test();
  public abstract lnumber();
  public abstract assemble();
  public abstract deploy();
}

class AndroidBuilder extends Builder {
  public test() {
    console.log("Running android tests");
  }

  public lnumber() {
    console.log("Lnumbering the android code");
  }

  public assemble() {
    console.log("Assembling the android build");
  }

  public deploy() {
    console.log("Deploying android build to server");
  }
}

class IosBuilder extends Builder {
  public test() {
    console.log("Running ios tests");
  }

  public lnumber() {
    console.log("Lnumbering the ios code");
  }

  public assemble() {
    console.log("Assembling the ios build");
  }

  public deploy() {
    console.log("Deploying ios build to server");
  }
}

const androidBuilder = new AndroidBuilder();
androidBuilder.build();

// Output:
// Выполнение Android-тестов
// Линтинг Android-кода
// Создание Android-сборки
// Развёртывание Android-сборки на сервере

const iosBuilder = new IosBuilder();
iosBuilder.build();

// Output:
// Выполнение iOS-тестов
// Линтинг iOS-кода
// Создание iOS-сборки
// Развёртывание iOS-сборки на сервере
