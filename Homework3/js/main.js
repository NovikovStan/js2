const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// Переделать в ДЗ
let getRequest = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          reject("Error");
        } else {
          resolve(xhr.responseText);
        }
      }
    };
    xhr.send();
  });
};

getRequest(`${API}/catalogData.json`)
  .then(result => console.log(JSON.parse(result)))
  .catch(error => `Error: ${error}`);

class ProductItem {
  constructor(product, img = "https://placehold.it/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>
            </div>`;
  }
}

class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts().then(data => {
      this.goods = [...data];
      this._render();
    });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log("Error: ", error);
      });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML("beforeend", productObject.render());
    }
  }
}

class ProductCart {
  constructor() {
    // this.userID = userID; // идентификатор пользователя или сеанса, добавить позже
    this.goods = []; // массив покупок
    this.total = 0; // общая сумма товаров, пока под вопросом, возможно не нужна.
    this._renderCart();
  }

  _addProduct(product) {
    //TODO: Очень кривая проверка на наличие продукта в корзине. Придумать как исправить.
    let itemCheck = false;
    this.goods.forEach(element => {
      console.log(element[0]);

      if (element[0].id_product === product.id_product) {
        element[1]++;
        itemCheck = true;
      }
    });

    if (!itemCheck) {
      this.goods.push([product, 1]);
    }

    this._renderCart();
  }

  _calcTotal() {
    this.total = 0;
    this.goods.forEach(element => {
      this.total += element[0].price * element[1];
    });
    return this.total;
  }

  _renderCart() {
    var cartBlock = document.querySelector(".cart-block");
    cartBlock.innerHTML = "";
    if (this.goods.length != 0) {
      cartBlock.innerHTML += `Ваши покупки: <hr>`;
      var htmlStr = "";
      for (let i = 0; i < this.goods.length; i++) {
        htmlStr += `<div class="cart-item"><p>${
          this.goods[i][0].product_name
        }: ${this.goods[i][0].price *
          this.goods[i][1]}
          </p><button class="buy-btn" data-id="${
          this.goods[i][0].id
        }">+</button><button class="del-btn" data-id="${
          this.goods[i][0].id
        }">-</button></div>`;
      }
      cartBlock.innerHTML += htmlStr;
      cartBlock.innerHTML += `<hr> Итоговая сумма: ${this._calcTotal()}`;
    } else cartBlock.innerHTML += `<p>Ваша корзина пуста :(</p>`;
  }
}

window.onload = () => {
  const list = new ProductList();
  let cart = new ProductCart();
  cart._renderCart();

  document.querySelector(".btn-cart").addEventListener("click", function() {
    document.querySelector(".cart-block").classList.toggle("invisible");
  });

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("buy-btn")) {
      list.goods.forEach(element => {
        if (element.id_product === +e.target.dataset["id"]) {
          cart._addProduct(element);
        }
      });
    }

    // TODO: Доделать кнопки удаления.
    // if (e.target.classList.contains("del-btn")) {
    //   removeFromCart(+e.target.dataset["id"]);
    // }
  });
};
