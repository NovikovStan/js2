window.onload = function() {
const products = [
  { id: 1, imgSrc: "img/notebook.jpg", title: "Notebook", price: 20000 },
  { id: 2, imgSrc: "img/mouse.jpg", title: "Mouse", price: 1500 },
  { id: 3, imgSrc: "img/keyboard.jpg", title: "Keyboard", price: 5000 },
  { id: 4, imgSrc: "img/gamepad.jpg", title: "Gamepad", price: 4500 }
];

class Product {
  constructor(product) {
    this.id = product.id;
    this.imgSrc = product.imgSrc;
    this.title = product.title;
    this.price = product.price;
  }

  renderProduct() {
    return `<div class="product-item">
      <img src="${this.imgSrc}">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
    </div>`;
  }
}

class Catalog {
  constructor() {
    this.productList = [];
  }

  fillCatalog(products) {  // заполняем каталог из бд
    products.forEach(element => {
      this.productList.push(new Product(element));
    })
  }

  renderCatalog(parentNode) {  // рендер каталога в указанный враппер
    let parent = document.querySelector(parentNode);
    this.productList.forEach(element => {
      parent.insertAdjacentHTML('beforeend', element.renderProduct()); 
    })
  }

}

class ProductCart {
  constructor() {
    // this.userID = userID; // идентификатор пользователя или сеанса, добавить позже
    this.goods = []; // массив покупок
    this.total = 0; // общая сумма товаров, пока под вопросом, возможно не нужна.
  }

  addProduct(product) {
    this.goods.push(product);
  }

  calcTotal() {
    console.log(this);  // выводим содержимое тележки
    this.goods.forEach(element => {
      this.total += element.price;
    });
    console.log(this.total);  // выводим общую стоимость всех товаров в тележке
  }

  renderCart() {
    this.goods.forEach(element => {
      console.log(element);
    })
  }
}

let catalog = new Catalog();
catalog.fillCatalog(products);
catalog.renderCatalog('.products');

let cart = new ProductCart();
cart.addProduct(catalog.productList[0]);
cart.addProduct(catalog.productList[1]);
cart.calcTotal();

}
