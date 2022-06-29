

//appel API
function getItems(){
fetch("http://localhost:3000/api/products")
  .then((data) => data.json())
  .then((products) => {
    console.log(products);
    for(let product of products) {
      document.querySelector(".items")
      .innerHTML +=
      `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altText}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
    };
    })}
getItems();


  