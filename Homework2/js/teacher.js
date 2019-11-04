// Ошибка на уроке заключалась в том, что мы не передали в Teacher свойство words.
// При вызове super.sayWord() метод sayWord() класса Person вызывается в контексте объекта Teacher,
// у которого свойство words было объектом(а не массивом) и не могло быть вызвано как words[1].


class Person {
    constructor(name, yearOfBirth) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.words = ['мяч', 'дом', 'дорога'];
    }

   sayWord() {
        return `${this.words[1]}`;
    }
}

class Teacher extends Person {
    constructor(name, yearOfBirth, words, subject) {
        super(name, yearOfBirth, words);
        this.subject = subject;
        this.dictionary = {
            'мяч': 'ball',
            'дом': 'house',
            'дорога': 'road',
        }
    }

    sayWord() {
        return `${this.dictionary[super.sayWord()]}`;
    }
}

let oleg = new Person('Oleg', '1990');
console.log(`Person says: ${oleg.sayWord()}`);

let ann = new Teacher('Anna', '1995', 'English');
console.log(`Teacher says: ${ann.sayWord()}`);
