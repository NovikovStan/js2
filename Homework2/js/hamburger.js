const SIZE_SMALL = {
  name: "small",
  cost: 50,
  calories: 20
};

const SIZE_BIG = {
  name: "big",
  cost: 100,
  calories: 40
};

const STUFFING_CHEEZE = {
  name: "cheeze",
  cost: 10,
  calories: 20
};

const STUFFING_SALAD = {
  name: "salad",
  cost: 20,
  calories: 5
};

const STUFFING_POTATO = {
  name: "potato",
  cost: 15,
  calories: 10
};

const TOPPING_SEASONING = {
  name: "seasoning",
  cost: 15,
  calories: 0
};

const TOPPING_MAYONNAISE = {
  name: "mayonnaise",
  cost: 20,
  calories: 5
};

class Hamburger {
  constructor(size, ...stuffing) {
    this.size = size;
    // TODO: Можно ли упростить эту конструкцию? Цель - поместить в this.stuffing только уникальные значения.
    this.stuffing = Array.from(new Set(stuffing));
    this.topping = [];
  }

  addTopping(topping) {
    // Добавить добавку
    if (!this.topping.includes(topping)) {
      this.topping.push(topping);
    } else {
      console.log(`Топпинг ${topping.name} уже добавлен.`);
    }
  }

  removeTopping(topping) {
    // Убрать добавку
    if (this.topping.includes(topping)) {
      this.topping.splice(this.topping.indexOf(topping), 1);
    } else {
      console.log(`Топпинга ${topping.name} в бургере нет.`);
    }
  }

  getToppings() {
    // Получить список добавок
    if (this.topping.length) {
      // TODO: УПРОСТИТЬ ЭТУ СЛОЖНУЮ КОНСТРУКЦИЮ!
      console.log(
        `Hamburger toppings: ${this.topping.map(item => item.name).join(", ")}`
      );
    } else {
      console.log(`Hamburger has no toppings.`);
    }
  }
  getSize() {
    // Узнать размер гамбургера
    console.log(`Hamburger size: ${this.size.name}`);
  }

  getStuffing() {
    // Узнать начинку гамбургера
    console.log(
      `Hamburger stuffing: ${this.stuffing
        .map(element => element.name)
        .join(", ")}`
    );
  }

  calculatePrice() {
    // Узнать цену
    let cost = this.size.cost;
    this.stuffing.forEach(element => (cost += element.cost));
    this.topping.forEach(element => (cost += element.cost));
    return cost;
  }

  calculateCalories() {
    // Узнать калорийность
    let calories = this.size.calories;
    this.stuffing.forEach(element => (calories += element.calories));
    this.topping.forEach(element => (calories += element.calories));
    return calories;
  }
}

window.onload = function() {
  let burger = new Hamburger(
    SIZE_SMALL,
    STUFFING_SALAD,
    STUFFING_CHEEZE,
    STUFFING_POTATO,
    STUFFING_SALAD
  );

  burger.getSize(); // Hamburger size: small
  burger.getStuffing(); // Hamburger stuffing: salad, cheeze, potato
  burger.getToppings(); // Hamburger has no toppings.
  burger.addTopping(TOPPING_SEASONING); // 60
  burger.addTopping(TOPPING_MAYONNAISE); // 130
  console.log(burger.calculateCalories());
  console.log(burger.calculatePrice());
  burger.getToppings(); // Hamburger toppings: seasoning, mayonnaise
  burger.removeTopping(TOPPING_MAYONNAISE);
  burger.removeTopping(TOPPING_MAYONNAISE); // Топпинга mayonnaise в бургере нет.
  console.log(burger.calculateCalories()); // 55
  console.log(burger.calculatePrice()); // 110
  burger.getToppings(); // Hamburger toppings: seasoning
};
