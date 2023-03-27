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
    return `About page in ${this.theme.getColor()}`;
  }
}

class Careers extends WebPage {
  protected theme;

  constructor(theme: Theme) {
    super(theme);
    this.theme = theme;
  }

  public getContent() {
    return `Careers page in ${this.theme.getColor()}`;
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

/** ===================================== декоратор ============================== */

/** ===================================== фасад ============================== */

/** ===================================== приспособленец ============================== */

/** ===================================== заместитель ============================== */
