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
