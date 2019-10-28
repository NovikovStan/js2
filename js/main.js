const products = [
  {id: 1, imgSrc: "img/notebook.jpg", title: 'Notebook', price: 20000},
  {id: 2, imgSrc: "img/mouse.jpg", title: 'Mouse', price: 1500},
  {id: 3, imgSrc: "img/keyboard.jpg", title: 'Keyboard', price: 5000},
  {id: 4, imgSrc: "img/gamepad.jpg", title: 'Gamepad', price: 4500},
];


const renderProduct = (good) => `<div class="product-item">
                                  <img src="${good.imgSrc}">
                                  <h3>${good.title}</h3>
                                  <p>${good.price}</p>
                                </div>`;


const renderProducts = goodsList => {
  goodsList.map(good => renderProduct(good)).forEach(element => {
    document.querySelector('.products').innerHTML += element;
  });

  // Данная запись добавляет массив productsList в DOM в виде массива, включая разделители.
  // document.querySelector('.products').innerHTML = productsList;
};

renderProducts(products);
